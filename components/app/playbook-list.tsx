"use client";

import * as React from "react";
import { Check, Lightbulb } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { PlaybookStep } from "@/lib/types";
import { toggleProgress } from "@/lib/app-actions";

export function PlaybookList({
  steps,
  phases,
  doneKeys,
}: {
  steps: PlaybookStep[];
  phases: readonly string[];
  doneKeys: string[];
}) {
  const [done, setDone] = React.useState<Set<string>>(new Set(doneKeys));
  const [, startTransition] = React.useTransition();

  function toggle(key: string) {
    setDone((prev) => {
      const nextSet = new Set(prev);
      if (nextSet.has(key)) nextSet.delete(key);
      else nextSet.add(key);
      return nextSet;
    });
    startTransition(async () => {
      await toggleProgress("playbook", key);
    });
  }

  return (
    <div className="space-y-8">
      {/* Progress header */}
      <div className="rounded-2xl border border-line bg-ink-900 p-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-paper-faint">
            Launch playbook progress
          </span>
          <span className="text-sm font-semibold text-paper">
            {done.size} / {steps.length}
          </span>
        </div>
        <div className="mt-3">
          <ProgressBar
            value={done.size}
            max={steps.length}
            tone={done.size === steps.length ? "up" : "ember"}
          />
        </div>
      </div>

      {phases.map((phase) => {
        const phaseSteps = steps.filter((s) => s.phase === phase);
        if (phaseSteps.length === 0) return null;
        const phaseDone = phaseSteps.filter((s) => done.has(s.key)).length;
        return (
          <section key={phase}>
            <div className="mb-3 flex items-center gap-3">
              <h2 className="font-display text-lg font-semibold text-paper">
                {phase}
              </h2>
              <span className="text-xs text-paper-faint">
                {phaseDone}/{phaseSteps.length}
              </span>
            </div>
            <div className="space-y-2.5">
              {phaseSteps.map((step) => {
                const isDone = done.has(step.key);
                return (
                  <div
                    key={step.key}
                    className={cn(
                      "flex gap-3.5 rounded-xl border border-line bg-ink-900 p-4 transition-colors",
                      isDone && "opacity-70",
                    )}
                  >
                    <button
                      onClick={() => toggle(step.key)}
                      aria-pressed={isDone}
                      className={cn(
                        "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                        isDone
                          ? "border-up bg-up text-ink-950"
                          : "border-line-strong text-transparent hover:border-paper-faint",
                      )}
                    >
                      <Check size={14} strokeWidth={3} />
                    </button>
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "font-medium text-paper",
                          isDone && "line-through decoration-paper-faint",
                        )}
                      >
                        {step.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-paper-dim">
                        {step.detail}
                      </p>
                      {step.tip && (
                        <p className="mt-2.5 flex items-start gap-2 rounded-lg border border-ember/20 bg-ember/[0.06] px-3 py-2 text-xs leading-relaxed text-paper-soft">
                          <Lightbulb size={13} className="mt-0.5 shrink-0 text-ember" />
                          <span>{step.tip}</span>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
