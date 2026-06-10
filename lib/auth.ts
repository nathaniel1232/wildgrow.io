import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { SignJWT, jwtVerify } from "jose";
import { prisma } from "./db";

const COOKIE = "wf_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function secret() {
  return new TextEncoder().encode(
    process.env.AUTH_SECRET ?? "dev-only-wildfire-secret-change-me-please",
  );
}

export async function createSession(userId: string) {
  const token = await new SignJWT({ uid: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret());

  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

async function getUserId(): Promise<string | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return (payload.uid as string) ?? null;
  } catch {
    return null;
  }
}

export const getCurrentUser = cache(async () => {
  const uid = await getUserId();
  if (!uid) return null;
  return prisma.user.findUnique({
    where: { id: uid },
    include: { profile: true, subscription: true },
  });
});

export type CurrentUser = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>;

export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

// ---------------------------------------------------------------------------
// Email verification (scaffold)
//
// Off by default. Turn on with REQUIRE_EMAIL_VERIFICATION=true. Even then, it
// only sends mail when a provider is configured (RESEND_API_KEY). With no
// provider we NEVER block signup — the caller marks the address verified and
// lets the user in, mirroring the no-keys AI/billing fallbacks. When a real
// provider is wired in, replace the dev log in `sendVerificationEmail` with the
// provider call; the signed-token plumbing here is already production-shaped.
// ---------------------------------------------------------------------------

export function emailVerificationEnabled(): boolean {
  return process.env.REQUIRE_EMAIL_VERIFICATION === "true";
}

export function hasEmailProvider(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

/** Sign a short-lived, single-purpose token for an email-verification link. */
export async function createVerificationToken(userId: string): Promise<string> {
  return new SignJWT({ uid: userId, purpose: "verify-email" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret());
}

/** Verify a token from a verification link; returns the userId or null. */
export async function consumeVerificationToken(
  token: string,
): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    if (payload.purpose !== "verify-email") return null;
    return (payload.uid as string) ?? null;
  } catch {
    return null;
  }
}

/**
 * Send (or, with no provider, log) a verification email. Best-effort: callers
 * must not let a failure here block signup.
 */
export async function sendVerificationEmail(
  userId: string,
  email: string,
): Promise<void> {
  const token = await createVerificationToken(userId);
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000")
    .trim()
    .replace(/\/$/, "");
  const link = `${base}/verify-email?token=${encodeURIComponent(token)}`;

  if (!hasEmailProvider()) {
    // No provider configured — log the link so dev/demo flows can still verify
    // by hand, and stay honest that nothing was actually emailed.
    console.info(`[auth] (no email provider) verification link for ${email}: ${link}`);
    return;
  }

  // Provider configured (Resend). Send the link. Network/auth failures bubble
  // to the caller, which logs and continues without blocking signup.
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? "Wildgrow <onboarding@resend.dev>",
      to: email,
      subject: "Verify your Wildgrow email",
      text: `Welcome to Wildgrow! Confirm your email to finish setting up:\n\n${link}\n\nThis link expires in 24 hours.`,
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}`);
  }
}
