"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "./db";
import { requireUser, getCurrentUser } from "./auth";
import { toAiInput } from "./app-data";
import { applyOnboarding, saveDraft } from "./onboarding";
import {
  generateIdeas,
  generatePlan,
  analyzeVideo,
  generateLaunchPosts,
  hasApiKey,
  type VideoAnalysis,
  type LaunchPost,
} from "./ai";
import { getSocialProvider } from "./social";
import {
  hasStripe,
  stripe,
  ensureCustomer,
  priceIdFor,
  normalizePlan,
  trialDays,
  isValidFreeCode,
} from "./billing";
import { headers } from "next/headers";
import type { GeneratedIdea, SocialVideo } from "./types";

// --------------------------------------------------------------- Onboarding

const onboardingSchema = z.object({
  appName: z.string().trim().min(1, "What's your app called?").max(80),
  category: z.string().trim().min(1, "Pick a category.").max(60),
  oneLiner: z.string().trim().min(4, "Give a one-line pitch.").max(160),
  audience: z.string().trim().min(4, "Who is it for?").max(400),
  problem: z.string().trim().min(4, "What problem does it solve?").max(400),
  stage: z.string().trim().max(40).optional(),
  appStoreUrl: z.string().trim().max(300).optional(),
  tiktokHandle: z.string().trim().max(60).optional(),
  igHandle: z.string().trim().max(60).optional(),
});

export type OnboardingState = { error?: string } | undefined;

// Runs BEFORE login. If a user is already signed in, it saves directly;
// otherwise it stashes a draft and routes to signup, which consumes it.
export async function submitOnboarding(
  _prev: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  const parsed = onboardingSchema.safeParse({
    appName: formData.get("appName"),
    category: formData.get("category"),
    oneLiner: formData.get("oneLiner"),
    audience: formData.get("audience"),
    problem: formData.get("problem"),
    stage: (formData.get("stage") as string) || undefined,
    appStoreUrl: (formData.get("appStoreUrl") as string) || undefined,
    tiktokHandle: (formData.get("tiktokHandle") as string) || undefined,
    igHandle: (formData.get("igHandle") as string) || undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  const user = await getCurrentUser();
  if (user) {
    await applyOnboarding(user.id, parsed.data);
    redirect(user.plan ? "/app" : "/welcome");
  }

  await saveDraft(parsed.data);
  redirect("/signup");
}

// Resolve the public origin for Stripe redirects from the incoming request,
// with an explicit env override. Works on localhost/previews with no config.
async function appOrigin(): Promise<string> {
  const env = process.env.NEXT_PUBLIC_APP_URL;
  if (env && env.trim()) return env.trim().replace(/\/$/, "");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto =
    h.get("x-forwarded-proto") ??
    (process.env.NODE_ENV === "production" ? "https" : "http");
  return host ? `${proto}://${host}` : "http://localhost:3000";
}

export async function choosePlan(formData: FormData) {
  const user = await requireUser();
  const plan = normalizePlan(formData.get("plan"));

  // Honest no-keys fallback (mirrors lib/ai): with Stripe unconfigured, picking
  // a plan unlocks the app in demo mode — we never pretend a charge happened.
  const priceId = priceIdFor(plan);
  if (!hasStripe() || !priceId) {
    await prisma.user.update({ where: { id: user.id }, data: { plan } });
    redirect("/app");
  }

  // Live billing → start a real Stripe Checkout session and hand off.
  // (If session creation fails, fall back to demo-unlock rather than dead-end.)
  let checkoutUrl: string | null = null;
  try {
    const customerId = await ensureCustomer(user);
    const days = trialDays();
    const origin = await appOrigin();
    const session = await stripe().checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      client_reference_id: user.id,
      subscription_data: {
        metadata: { userId: user.id, plan },
        ...(days > 0 ? { trial_period_days: days } : {}),
      },
      metadata: { userId: user.id, plan },
      allow_promotion_codes: true,
      success_url: `${origin}/app?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/welcome?checkout=cancelled`,
    });
    checkoutUrl = session.url;
  } catch (e) {
    console.error("[billing] choosePlan checkout failed:", e);
  }

  if (checkoutUrl) redirect(checkoutUrl);

  // Couldn't reach Stripe — don't strand the user; unlock locally.
  await prisma.user.update({ where: { id: user.id }, data: { plan } });
  redirect("/app");
}

// ----------------------------------------------------------- Free-access code

export type RedeemState = { error?: string } | undefined;

/**
 * Redeem a free-access code → unlock the app with no charge. Works whether or
 * not Stripe is configured: it grants a plan so hasAccess() lets the user in,
 * and never creates a Stripe customer or subscription.
 */
export async function redeemCode(
  _prev: RedeemState,
  formData: FormData,
): Promise<RedeemState> {
  const user = await requireUser();
  const code = String(formData.get("code") ?? "");
  if (!isValidFreeCode(code)) {
    return { error: "That code isn’t valid. Double-check it and try again." };
  }
  await prisma.user.update({
    where: { id: user.id },
    data: { plan: "wildfire" },
  });
  redirect("/app");
}

// --------------------------------------------------------------- Idea Engine

function persistIdea(userId: string, idea: GeneratedIdea, status = "new") {
  return prisma.idea.create({
    data: {
      userId,
      title: idea.title,
      hook: idea.hook,
      format: idea.format,
      lengthSec: idea.lengthSec,
      scriptJson: JSON.stringify(idea.script),
      onScreenJson: JSON.stringify(idea.onScreen),
      caption: idea.caption,
      hashtagsJson: JSON.stringify(idea.hashtags),
      sound: idea.sound,
      rationale: idea.rationale,
      hookScore: idea.hookScore,
      pillar: idea.pillar,
      basedOn: idea.basedOn ?? null,
      status,
    },
  });
}

export async function generateMoreIdeas(pillar?: string) {
  const user = await requireUser();
  if (!user.profile) redirect("/onboarding");

  const offset = await prisma.idea.count({ where: { userId: user.id } });

  // Ground ideas on what's actually trending — but only with real, live data
  // (and a live AI to use it). Demo/sample videos carry invented stats and must
  // never be passed off as real trends, so we skip them here.
  const provider = getSocialProvider();
  let trendingVideos: SocialVideo[] = [];
  if (hasApiKey() && !provider.isDemo) {
    try {
      const vids = await provider.getViralVideos(user.profile.category);
      trendingVideos = vids.slice(0, 5);
    } catch (e) {
      console.error("[ideas] trending fetch failed:", e);
    }
  }

  const ideas = await generateIdeas(toAiInput(user.profile), {
    count: 4,
    offset,
    pillar,
    trendingVideos,
  });

  for (const idea of ideas) {
    await persistIdea(user.id, idea);
  }
  revalidatePath("/app/ideas");
  revalidatePath("/app");
}

export async function setIdeaStatus(ideaId: string, status: string) {
  const user = await requireUser();
  await prisma.idea.updateMany({
    where: { id: ideaId, userId: user.id },
    data: { status },
  });
  revalidatePath("/app/ideas");
  revalidatePath("/app");
}

export async function deleteIdea(ideaId: string) {
  const user = await requireUser();
  await prisma.idea.deleteMany({ where: { id: ideaId, userId: user.id } });
  revalidatePath("/app/ideas");
}

// ----------------------------------------------------------------- Progress

export async function toggleProgress(kind: string, key: string) {
  const user = await requireUser();
  const existing = await prisma.progress.findUnique({
    where: { userId_kind_key: { userId: user.id, kind, key } },
  });
  if (existing) {
    await prisma.progress.delete({ where: { id: existing.id } });
  } else {
    await prisma.progress.create({ data: { userId: user.id, kind, key } });
  }

  const pageByKind: Record<string, string> = {
    playbook: "/app/playbook",
    lesson: "/app/academy",
    plan: "/app/plan",
  };
  if (pageByKind[kind]) revalidatePath(pageByKind[kind]);
  revalidatePath("/app");
}

// --------------------------------------------------------------------- Plan

export async function regeneratePlan() {
  const user = await requireUser();
  if (!user.profile) redirect("/onboarding");

  const plan = await generatePlan(toAiInput(user.profile));
  await prisma.appProfile.update({
    where: { userId: user.id },
    data: { planJson: JSON.stringify(plan) },
  });
  revalidatePath("/app/plan");
  revalidatePath("/app");
}

// --------------------------------------------------------------------- Radar

export async function analyzeRadarVideo(
  videoId: string,
  query?: string,
): Promise<VideoAnalysis> {
  const user = await requireUser();
  if (!user.profile) redirect("/onboarding");

  // Use the same niche query the Radar page used so the video is found
  // (the live provider returns different videos per keyword).
  const videos = await getSocialProvider().getViralVideos(
    query || user.profile.category,
  );
  const video = videos.find((v) => v.id === videoId);
  if (!video) throw new Error("Video not found");

  return analyzeVideo(video, toAiInput(user.profile));
}

// ------------------------------------------------------------- Launch posts

export async function draftLaunchPosts(): Promise<LaunchPost[]> {
  const user = await requireUser();
  if (!user.profile) redirect("/onboarding");
  return generateLaunchPosts(toAiInput(user.profile));
}
