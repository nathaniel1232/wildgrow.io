import { NextResponse } from "next/server";
import type Stripe from "stripe";
import {
  hasStripe,
  stripe,
  syncSubscription,
  markSubscriptionDeleted,
} from "@/lib/billing";

// Stripe needs the raw request body to verify the signature, so never let a
// framework parse/cache it. This route is intentionally dynamic.
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!hasStripe()) {
    // No keys configured — nothing to verify. Acknowledge so senders don't retry.
    return NextResponse.json({ received: true, configured: false });
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[stripe] STRIPE_WEBHOOK_SECRET is not set; rejecting webhook.");
    return NextResponse.json(
      { error: "Webhook secret not configured." },
      { status: 500 },
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const payload = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe().webhooks.constructEventAsync(payload, signature, secret);
  } catch (e) {
    console.error("[stripe] signature verification failed:", e);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const subId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id;
        if (subId) {
          const sub = await stripe().subscriptions.retrieve(subId);
          await syncSubscription(sub);
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        await syncSubscription(event.data.object as Stripe.Subscription);
        break;
      }
      case "customer.subscription.deleted": {
        await markSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      }
      default:
        // Ignore unrelated events.
        break;
    }
  } catch (e) {
    // Returning 500 tells Stripe to retry; log for diagnosis.
    console.error(`[stripe] handler failed for ${event.type}:`, e);
    return NextResponse.json({ error: "Handler error." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
