import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Eyebrow } from "@/components/ui/container";
import { OnboardingWizard } from "@/components/app/onboarding-wizard";

export const metadata: Metadata = { title: "Set up your growth engine" };

export default function OnboardingPage() {
  return (
    <div>
      <Link href="/" aria-label="Wildgrow home" className="inline-flex">
        <Logo />
      </Link>

      <div className="mt-9">
        <Eyebrow>Two minutes · no account needed yet</Eyebrow>
        <h1 className="mt-5 text-balance font-display text-3xl font-extrabold leading-[1.05] text-paper md:text-4xl">
          Let’s build your{" "}
          <span className="text-gradient-ember">growth engine</span>.
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-paper-dim">
          A few quick questions and Wildgrow tailors your angle, your first video
          ideas, and a step-by-step plan — to your exact app.
        </p>
      </div>

      <div className="mt-9 rounded-2xl border border-line bg-ink-900 p-6 shadow-lift md:p-8">
        <OnboardingWizard />
      </div>
    </div>
  );
}
