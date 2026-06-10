import "server-only";
import { cookies } from "next/headers";
import { prisma } from "./db";
import { deriveGrowthProfile, generatePlan } from "./ai";

const COOKIE = "wf_onboarding";

export interface OnboardingData {
  appName: string;
  category: string;
  oneLiner: string;
  audience: string;
  problem: string;
  stage?: string;
  appStoreUrl?: string;
  tiktokHandle?: string;
  igHandle?: string;
}

export async function saveDraft(data: OnboardingData) {
  const jar = await cookies();
  jar.set(COOKIE, JSON.stringify(data), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function readDraft(): Promise<OnboardingData | null> {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as OnboardingData;
  } catch {
    return null;
  }
}

export async function clearDraft() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

/** Derive the AI growth profile + plan and persist the AppProfile. */
export async function applyOnboarding(userId: string, d: OnboardingData) {
  const base = {
    appName: d.appName,
    category: d.category,
    oneLiner: d.oneLiner,
    audience: d.audience,
    problem: d.problem,
  };
  const growth = await deriveGrowthProfile(base);
  const plan = await generatePlan({ ...base, ...growth });

  const fields = {
    ...d,
    positioning: growth.positioning,
    pillarsJson: JSON.stringify(growth.pillars),
    personaJson: JSON.stringify(growth.persona),
    planJson: JSON.stringify(plan),
    onboarded: true,
  };

  await prisma.appProfile.upsert({
    where: { userId },
    update: fields,
    create: { userId, ...fields },
  });
}
