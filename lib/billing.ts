import "server-only";
import Stripe from "stripe";
import { prisma } from "./db";
import type { CurrentUser } from "./auth";

// ---------------------------------------------------------------------------
// Billing layer
//
// Mirrors how lib/ai handles a missing API key: Wildgrow runs fully without
// any Stripe keys. When keys are absent (dev / demo), `hasStripe()` is false
// and the app falls back to "billing not configured" — picking a plan just
// sets `user.plan` and lets the founder in, exactly like the pre-Stripe
// behaviour. We never crash, never hard-block, and never claim a charge
// happened when no keys are set. Add real keys to switch on live billing.
// ---------------------------------------------------------------------------

export type PlanId = "wildfire" | "studio";

export const PLANS: Record<PlanId, { name: string; envPrice: string }> = {
  wildfire: { name: "Wildgrow", envPrice: "STRIPE_PRICE_WILDFIRE" },
  studio: { name: "Studio", envPrice: "STRIPE_PRICE_STUDIO" },
};

export function normalizePlan(raw: unknown): PlanId {
  return raw === "studio" ? "studio" : "wildfire";
}

/** True only when live Stripe billing is fully configured. */
export function hasStripe(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/** Stripe statuses that grant access to the product. */
const ACTIVE_STATUSES = new Set(["active", "trialing"]);

let stripeClient: Stripe | null = null;

/**
 * The shared Stripe client. Throws if keys are missing — callers must gate on
 * `hasStripe()` first (the no-key path never reaches here).
 */
export function stripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "Stripe is not configured (STRIPE_SECRET_KEY missing). Guard with hasStripe().",
    );
  }
  if (!stripeClient) {
    stripeClient = new Stripe(key, {
      apiVersion: "2026-05-27.dahlia",
      typescript: true,
      appInfo: { name: "Wildgrow" },
    });
  }
  return stripeClient;
}

/** The Stripe Price id for a plan, or undefined if its env var isn't set. */
export function priceIdFor(plan: PlanId): string | undefined {
  const value = process.env[PLANS[plan].envPrice];
  return value && value.trim() ? value.trim() : undefined;
}

/** Days of free trial to grant on new subscriptions (0 = no trial). */
export function trialDays(): number {
  const raw = process.env.STRIPE_TRIAL_DAYS;
  if (raw === undefined) return 7; // keep the "7-day free trial" framing by default
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

// ----------------------------------------------------------- Free-access codes
// Shareable promo codes that unlock the app for free (no card, no Stripe).
// Set FREE_ACCESS_CODES as a comma-separated, case-insensitive list in the env;
// defaults to a single code so "try it free" works out of the box.

export function freeAccessCodes(): string[] {
  const raw = process.env.FREE_ACCESS_CODES ?? "WILDGROW";
  return raw
    .split(",")
    .map((c) => c.trim().toUpperCase())
    .filter(Boolean);
}

export function isValidFreeCode(code: string): boolean {
  const c = code.trim().toUpperCase();
  return c.length > 0 && freeAccessCodes().includes(c);
}

// --------------------------------------------------------------- Access state

export type BillingAccess = {
  /** Whether the user may use the paid product right now. */
  active: boolean;
  /** Why: a real Stripe subscription, the no-keys demo fallback, or none. */
  reason: "subscription" | "demo-fallback" | "none";
  status?: string;
  plan?: string;
};

type UserWithSub = CurrentUser & {
  subscription?: { status: string; plan: string } | null;
};

/**
 * Resolve whether a user has access.
 *
 * - Stripe configured  → access requires a live subscription in an active or
 *   trialing state. (We still honour a legacy `user.plan` set before billing
 *   existed, so we never lock out accounts created pre-migration — see note.)
 * - Stripe NOT configured → honest demo fallback: any chosen `user.plan`
 *   grants access, just like the original no-op paywall.
 */
export function resolveAccess(user: UserWithSub): BillingAccess {
  const sub = user.subscription;
  if (sub && ACTIVE_STATUSES.has(sub.status)) {
    return { active: true, reason: "subscription", status: sub.status, plan: sub.plan };
  }

  if (!hasStripe()) {
    // No keys: fall back to the pre-Stripe behaviour. Picking a plan is enough.
    if (user.plan) {
      return { active: true, reason: "demo-fallback", plan: user.plan };
    }
    return { active: false, reason: "none" };
  }

  // Stripe is live but this user has no active subscription. We still let in
  // accounts that were granted a plan before billing existed (e.g. the seeded
  // demo account) so an env change never strands an existing user.
  if (user.plan && !sub) {
    return { active: true, reason: "demo-fallback", plan: user.plan };
  }

  return {
    active: false,
    reason: "none",
    status: sub?.status,
    plan: sub?.plan,
  };
}

export function hasAccess(user: UserWithSub): boolean {
  return resolveAccess(user).active;
}

// ----------------------------------------------------------- Customer + sync

/** Ensure the user has a Stripe customer, creating one on first use. */
export async function ensureCustomer(user: {
  id: string;
  email: string;
  name?: string | null;
  stripeCustomerId?: string | null;
}): Promise<string> {
  if (user.stripeCustomerId) return user.stripeCustomerId;

  const customer = await stripe().customers.create({
    email: user.email,
    name: user.name ?? undefined,
    metadata: { userId: user.id },
  });
  await prisma.user.update({
    where: { id: user.id },
    data: { stripeCustomerId: customer.id },
  });
  return customer.id;
}

function periodEndOf(sub: Stripe.Subscription): Date | null {
  // The current-period end lives on the subscription item in recent API
  // versions; fall back to the top-level field for older shapes.
  const item = sub.items?.data?.[0] as { current_period_end?: number } | undefined;
  const ts =
    item?.current_period_end ??
    (sub as unknown as { current_period_end?: number }).current_period_end;
  return typeof ts === "number" ? new Date(ts * 1000) : null;
}

function planFromSubscription(sub: Stripe.Subscription): PlanId {
  const priceId = sub.items?.data?.[0]?.price?.id;
  if (priceId && priceId === priceIdFor("studio")) return "studio";
  if (priceId && priceId === priceIdFor("wildfire")) return "wildfire";
  // Fall back to metadata we stamp at checkout, then default.
  return normalizePlan(sub.metadata?.plan);
}

/**
 * Upsert our local Subscription row from a Stripe Subscription object, and
 * keep `user.plan` / `user.stripeCustomerId` in sync. Resolves the owning user
 * by metadata, the local customer id, or the Stripe customer's metadata.
 */
export async function syncSubscription(sub: Stripe.Subscription): Promise<void> {
  const customerId =
    typeof sub.customer === "string" ? sub.customer : sub.customer?.id;

  const userId = await resolveUserId(sub, customerId);
  if (!userId) {
    console.error("[billing] could not resolve user for subscription", sub.id);
    return;
  }

  const plan = planFromSubscription(sub);
  const priceId = sub.items?.data?.[0]?.price?.id ?? null;

  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: sub.id },
    create: {
      userId,
      stripeSubscriptionId: sub.id,
      stripeCustomerId: customerId ?? null,
      status: sub.status,
      priceId,
      plan,
      currentPeriodEnd: periodEndOf(sub),
      cancelAtPeriodEnd: sub.cancel_at_period_end ?? false,
    },
    update: {
      stripeCustomerId: customerId ?? null,
      status: sub.status,
      priceId,
      plan,
      currentPeriodEnd: periodEndOf(sub),
      cancelAtPeriodEnd: sub.cancel_at_period_end ?? false,
    },
  });

  // Reflect entitlement on the user. Clear `plan` when the sub is dead so the
  // demo-fallback can't silently keep a churned, Stripe-managed user in.
  const entitled = ACTIVE_STATUSES.has(sub.status);
  await prisma.user.update({
    where: { id: userId },
    data: {
      plan: entitled ? plan : null,
      ...(customerId ? { stripeCustomerId: customerId } : {}),
    },
  });
}

async function resolveUserId(
  sub: Stripe.Subscription,
  customerId: string | undefined,
): Promise<string | null> {
  const metaUserId = sub.metadata?.userId;
  if (metaUserId) {
    const u = await prisma.user.findUnique({ where: { id: metaUserId } });
    if (u) return u.id;
  }
  if (customerId) {
    const byCustomer = await prisma.user.findUnique({
      where: { stripeCustomerId: customerId },
    });
    if (byCustomer) return byCustomer.id;

    // Last resort: the Stripe customer carries our userId in metadata.
    try {
      const customer = await stripe().customers.retrieve(customerId);
      if (!customer.deleted) {
        const uid = customer.metadata?.userId;
        if (uid) {
          const u = await prisma.user.findUnique({ where: { id: uid } });
          if (u) return u.id;
        }
      }
    } catch (e) {
      console.error("[billing] customer lookup failed:", e);
    }
  }
  return null;
}

/** Mark a deleted subscription as canceled and drop the user's plan. */
export async function markSubscriptionDeleted(
  sub: Stripe.Subscription,
): Promise<void> {
  const existing = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: sub.id },
  });
  if (!existing) return;

  await prisma.subscription.update({
    where: { stripeSubscriptionId: sub.id },
    data: { status: "canceled", cancelAtPeriodEnd: false },
  });
  await prisma.user.update({
    where: { id: existing.userId },
    data: { plan: null },
  });
}
