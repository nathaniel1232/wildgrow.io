"use client";

import * as React from "react";
import { useActionState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Sparkles,
  Check,
} from "lucide-react";
import { Input, Textarea, Field } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  submitOnboarding,
  type OnboardingState,
} from "@/lib/app-actions";

const CATEGORIES = [
  "AI tools",
  "Productivity",
  "Health & fitness",
  "Finance",
  "Education",
  "Mobile games",
  "Social",
  "Photo & video",
  "Food & cooking",
  "Travel",
  "Dating",
  "Developer tools",
  "Music",
  "Lifestyle",
];

const STEPS = [
  {
    label: "Your app",
    title: "Tell us what you built",
    hint: "The basics. This is what every idea and script gets tailored around.",
  },
  {
    label: "Your people",
    title: "Who is it for?",
    hint: "The sharper this is, the sharper your hooks. Be vivid.",
  },
  {
    label: "Where you’re at",
    title: "Where are you today?",
    hint: "So your plan starts from the right place. The rest is optional.",
  },
];

export function OnboardingWizard() {
  const [state, formAction, pending] = useActionState<OnboardingState, FormData>(
    submitOnboarding,
    undefined,
  );
  const [step, setStep] = React.useState(0);
  const [stepError, setStepError] = React.useState<string | null>(null);

  const [appName, setAppName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [oneLiner, setOneLiner] = React.useState("");
  const [audience, setAudience] = React.useState("");
  const [problem, setProblem] = React.useState("");

  function next() {
    if (step === 0 && (!appName.trim() || !category.trim() || !oneLiner.trim())) {
      return setStepError("Fill in your app name, category, and one-liner.");
    }
    if (step === 1 && (!audience.trim() || !problem.trim())) {
      return setStepError("Tell us who it’s for and what problem it solves.");
    }
    setStepError(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  return (
    <div className="w-full">
      {/* Stepper */}
      <div className="mb-7 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.label} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300",
                i < step
                  ? "bg-ember text-ink-950"
                  : i === step
                    ? "bg-ink-800 text-paper ring-2 ring-ember"
                    : "bg-ink-850 text-paper-faint",
              )}
            >
              {i < step ? <Check size={14} /> : i + 1}
            </span>
            <span
              className={cn(
                "hidden text-sm transition-colors sm:block",
                i === step ? "text-paper" : "text-paper-faint",
              )}
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <span className="mx-1 hidden h-px flex-1 overflow-hidden rounded-full bg-line sm:block">
                <span
                  className={cn(
                    "block h-full bg-ember transition-all duration-500",
                    i < step ? "w-full" : "w-0",
                  )}
                />
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Active step heading + why-we-ask */}
      <div className="mb-6">
        <h2 className="font-display text-xl font-semibold leading-tight text-paper">
          {STEPS[step].title}
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-paper-dim">
          {STEPS[step].hint}
        </p>
      </div>

      <form action={formAction} className="flex flex-col gap-5">
        {(state?.error || stepError) && (
          <div className="flex items-start gap-2.5 rounded-lg border border-down/30 bg-down/10 px-3.5 py-3 text-sm text-down">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{state?.error || stepError}</span>
          </div>
        )}

        {/* Step 1 */}
        <div className={cn("flex-col gap-5", step === 0 ? "flex" : "hidden")}>
          <Field label="App name" htmlFor="appName">
            <Input
              id="appName"
              name="appName"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="e.g. Stash"
              autoFocus
            />
          </Field>
          <Field label="Category" htmlFor="category" hint="Pick one or type your own.">
            <Input
              id="category"
              name="category"
              list="categories"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Productivity"
            />
            <datalist id="categories">
              {CATEGORIES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </Field>
          <Field
            label="One-line pitch"
            htmlFor="oneLiner"
            hint="The promise, in a sentence."
          >
            <Input
              id="oneLiner"
              name="oneLiner"
              value={oneLiner}
              onChange={(e) => setOneLiner(e.target.value)}
              placeholder="The second brain that actually remembers."
            />
          </Field>
        </div>

        {/* Step 2 */}
        <div className={cn("flex-col gap-5", step === 1 ? "flex" : "hidden")}>
          <Field
            label="Who is it for?"
            htmlFor="audience"
            hint="Be specific — the more vivid, the better the ideas."
          >
            <Textarea
              id="audience"
              name="audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="Overwhelmed knowledge workers and students drowning in tabs, links, and screenshots."
            />
          </Field>
          <Field
            label="What problem does it kill?"
            htmlFor="problem"
            hint="The pain your audience feels before they find you."
          >
            <Textarea
              id="problem"
              name="problem"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="People save dozens of links a day and can never find them again."
            />
          </Field>
        </div>

        {/* Step 3 */}
        <div className={cn("flex-col gap-5", step === 2 ? "flex" : "hidden")}>
          <Field label="Where are you at?" htmlFor="stage">
            <select
              id="stage"
              name="stage"
              defaultValue="launched"
              className="h-11 w-full rounded-lg border border-line bg-ink-850 px-3.5 text-sm text-paper focus:border-ember/70 focus:outline-none focus:ring-2 focus:ring-ember/25"
            >
              <option value="idea">Just an idea</option>
              <option value="prelaunch">Pre-launch / waitlist</option>
              <option value="launched">Launched, still early</option>
              <option value="growing">Launched & growing</option>
            </select>
          </Field>
          <Field label="App store / website link" htmlFor="appStoreUrl" hint="Optional">
            <Input
              id="appStoreUrl"
              name="appStoreUrl"
              placeholder="https://apps.apple.com/app/…"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="TikTok" htmlFor="tiktokHandle" hint="Optional">
              <Input id="tiktokHandle" name="tiktokHandle" placeholder="@yourapp" />
            </Field>
            <Field label="Instagram" htmlFor="igHandle" hint="Optional">
              <Input id="igHandle" name="igHandle" placeholder="@yourapp" />
            </Field>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-ember/20 bg-ember/[0.05] px-4 py-3.5">
            <Sparkles size={16} className="mt-0.5 shrink-0 text-ember" />
            <p className="text-sm leading-relaxed text-paper-soft">
              Next, Wildgrow builds your positioning, a batch of fully-scripted
              video ideas, and your 30/60/90 plan — ready the moment you land.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-2 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => {
                setStepError(null);
                setStep((s) => Math.max(s - 1, 0));
              }}
              className={buttonVariants({ variant: "ghost" })}
              disabled={pending}
            >
              <ArrowLeft size={16} /> Back
            </button>
          ) : (
            <span />
          )}

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className={buttonVariants({})}
            >
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={pending}
              className={buttonVariants({ size: "lg" })}
            >
              {pending ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Building your
                  engine…
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Build my growth engine
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
