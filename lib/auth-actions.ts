"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./db";
import {
  createSession,
  destroySession,
  emailVerificationEnabled,
  hasEmailProvider,
  sendVerificationEmail,
} from "./auth";
import { readDraft, clearDraft, applyOnboarding } from "./onboarding";

const emailRe = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// --------------------------------------------------------------- Rate limiting
// In-memory sliding window — fine for this single-instance SQLite app. Keyed by
// client IP + action + email so neither credential-stuffing one account nor
// spraying many from one IP gets unlimited tries. Resets on server restart.

type Hit = { count: number; resetAt: number };
const buckets = new Map<string, Hit>();
const RATE_LIMIT = { login: { max: 8, windowMs: 60_000 }, signup: { max: 5, windowMs: 60_000 } };

async function clientIp(): Promise<string> {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "local";
}

/** Returns true if the caller is over the limit (should be blocked). */
function rateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const hit = buckets.get(key);
  if (!hit || now > hit.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  hit.count += 1;
  if (buckets.size > 5000) {
    // Opportunistic cleanup so the map can't grow unbounded.
    for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k);
  }
  return hit.count > max;
}

const TOO_MANY = "Too many attempts. Please wait a minute and try again.";

const loginSchema = z.object({
  email: z.string().regex(emailRe, "Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

const signupSchema = z.object({
  name: z.string().trim().max(80).optional(),
  email: z.string().regex(emailRe, "Enter a valid email address."),
  password: z.string().min(8, "Use at least 8 characters."),
});

export type AuthState = { error?: string } | undefined;

export async function signupAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = signupSchema.safeParse({
    name: (formData.get("name") as string) || undefined,
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check your details." };
  }
  const email = parsed.data.email.toLowerCase();

  const ip = await clientIp();
  if (
    rateLimited(`signup:${ip}`, RATE_LIMIT.signup.max, RATE_LIMIT.signup.windowMs) ||
    rateLimited(`signup:${email}`, RATE_LIMIT.signup.max, RATE_LIMIT.signup.windowMs)
  ) {
    return { error: TOO_MANY };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with that email already exists. Try logging in." };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash, name: parsed.data.name },
  });

  // Email verification (scaffold): only when explicitly enabled AND a provider
  // is configured. Otherwise we never block signup — stay honest and let them
  // in, exactly like the no-keys AI/billing fallbacks.
  if (emailVerificationEnabled() && hasEmailProvider()) {
    try {
      await sendVerificationEmail(user.id, user.email);
    } catch (e) {
      console.error("[auth] verification email failed (continuing):", e);
    }
  } else {
    // No provider → treat the address as verified so nothing downstream blocks.
    await prisma.user.update({ where: { id: user.id }, data: { emailVerified: true } });
  }

  await createSession(user.id);

  // Consume the pre-login onboarding draft, if any.
  const draft = await readDraft();
  if (draft) {
    await applyOnboarding(user.id, draft);
    await clearDraft();
    redirect("/welcome");
  }
  redirect("/onboarding");
}

export async function loginAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check your details." };
  }
  const email = parsed.data.email.toLowerCase();

  const ip = await clientIp();
  if (
    rateLimited(`login:${ip}`, RATE_LIMIT.login.max, RATE_LIMIT.login.windowMs) ||
    rateLimited(`login:${email}`, RATE_LIMIT.login.max, RATE_LIMIT.login.windowMs)
  ) {
    return { error: TOO_MANY };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  const ok = user && (await bcrypt.compare(parsed.data.password, user.passwordHash));
  if (!user || !ok) {
    return { error: "That email and password don't match an account." };
  }

  await createSession(user.id);

  // If they onboarded anonymously then logged into an existing account, apply it.
  const draft = await readDraft();
  if (draft) {
    await applyOnboarding(user.id, draft);
    await clearDraft();
    redirect(user.plan ? "/app" : "/welcome");
  }
  redirect("/app");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
