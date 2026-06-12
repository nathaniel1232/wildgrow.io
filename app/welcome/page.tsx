import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Check } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { hasAccess, hasStripe } from "@/lib/billing";
import { choosePlan } from "@/lib/app-actions";
import { Logo } from "@/components/ui/logo";
import { buttonVariants } from "@/components/ui/button";
import { RedeemCode } from "@/components/app/redeem-code";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Choose your plan" };

const plans = [
  {
    id: "wildfire",
    name: "Wildgrow",
    price: "$29",
    tagline: "Everything you need to go viral, organically.",
    features: [
      "Unlimited AI ideas & full scripts",
      "Niche & Competitor Radar",
      "The full launch playbook",
      "30 / 60 / 90 growth plan",
      "Viral Academy",
    ],
    featured: true,
  },
  {
    id: "studio",
    name: "Studio",
    price: "$79",
    tagline: "For founders with a portfolio of apps.",
    features: [
      "Everything in Wildgrow",
      "Up to 5 apps / brands",
      "Priority AI generation",
      "Export to CSV & Notion",
    ],
    featured: false,
  },
];

export default async function WelcomePage() {
  const user = await requireUser();
  if (!user.profile?.onboarded) redirect("/onboarding");
  if (hasAccess(user)) redirect("/app");

  // With Stripe unconfigured (beta), picking a plan unlocks everything
  // free of charge — the copy must promise exactly that, not a trial.
  const billing = hasStripe();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="glow-ember pointer-events-none absolute left-1/2 top-[-160px] h-[460px] w-[760px] -translate-x-1/2 opacity-35 blur-[30px]"
      />
      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
        <div className="text-center">
          <Logo className="justify-center" />
          <h1 className="mt-8 font-display text-3xl font-extrabold text-paper md:text-4xl">
            You’re in{user.name ? `, ${user.name.split(" ")[0]}` : ""}. Pick your plan.
          </h1>
          <p className="mt-3 text-paper-dim">
            Your growth plan for{" "}
            <span className="text-paper">{user.profile.appName}</span> is ready.
            {billing
              ? " Start a 7-day free trial below — or redeem a code to jump in free."
              : " Pick a plan to unlock everything — free while we're in beta, no card needed."}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6",
                plan.featured
                  ? "border-ember/40 bg-ink-900 shadow-[0_0_60px_-22px_var(--ember)]"
                  : "border-line bg-ink-900",
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-ember px-3 py-1 text-xs font-semibold text-ink-950">
                  Recommended
                </span>
              )}
              <h2 className="font-display text-lg font-semibold text-paper">
                {plan.name}
              </h2>
              <p className="mt-1 text-sm text-paper-dim">{plan.tagline}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-extrabold text-paper">
                  {plan.price}
                </span>
                <span className="text-sm text-paper-faint">/ month</span>
              </div>
              <ul className="mt-5 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check size={16} className="mt-0.5 shrink-0 text-ember" />
                    <span className="text-paper-soft">{f}</span>
                  </li>
                ))}
              </ul>
              <form action={choosePlan} className="mt-6">
                <input type="hidden" name="plan" value={plan.id} />
                <button
                  className={cn(
                    buttonVariants({
                      variant: plan.featured ? "primary" : "outline",
                    }),
                    "w-full",
                  )}
                >
                  {billing ? "Start 7-day free trial" : "Unlock free during beta"}
                </button>
              </form>
            </div>
          ))}
        </div>

        {/* Free-access code — try it without a card */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex w-full max-w-sm items-center gap-3 font-mono text-xs uppercase tracking-wider text-paper-faint">
            <span className="h-px flex-1 bg-line" />
            or try it free
            <span className="h-px flex-1 bg-line" />
          </div>
          <RedeemCode />
          <p className="text-center text-xs text-paper-faint">
            Got an invite code? Redeem it for full access — no card, no charge.
          </p>
        </div>
      </div>
    </div>
  );
}
