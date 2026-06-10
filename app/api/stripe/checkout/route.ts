import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  hasStripe,
  stripe,
  ensureCustomer,
  priceIdFor,
  normalizePlan,
  trialDays,
} from "@/lib/billing";

// Resolve the public base URL for Stripe redirects: explicit env wins, else the
// request's own origin (works on localhost and previews without configuration).
function baseUrl(req: Request): string {
  const env = process.env.NEXT_PUBLIC_APP_URL;
  if (env && env.trim()) return env.trim().replace(/\/$/, "");
  return new URL(req.url).origin;
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let plan: "wildfire" | "studio" = "wildfire";
  try {
    const body = await req.json().catch(() => ({}));
    plan = normalizePlan((body as { plan?: string })?.plan);
  } catch {
    // default plan
  }

  // No keys → honest demo fallback. Don't pretend to charge: just grant the
  // chosen plan locally and let the caller route into the app.
  if (!hasStripe()) {
    return NextResponse.json({
      configured: false,
      demo: true,
      message: "Billing is not configured — continuing in demo mode.",
    });
  }

  const priceId = priceIdFor(plan);
  if (!priceId) {
    // Stripe is on but this plan has no price id. Be honest rather than crash.
    return NextResponse.json(
      {
        configured: false,
        demo: true,
        message: `No Stripe price configured for the ${plan} plan.`,
      },
      { status: 200 },
    );
  }

  try {
    const customerId = await ensureCustomer(user);
    const days = trialDays();
    const origin = baseUrl(req);

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

    return NextResponse.json({ configured: true, url: session.url });
  } catch (e) {
    console.error("[stripe] checkout session failed:", e);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}
