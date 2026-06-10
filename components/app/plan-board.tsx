"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  RefreshCw,
  Loader2,
  Clapperboard,
  Zap,
  Trophy,
} from "lucide-react";
import { ProgressBar } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GrowthPlan, PlanItemKind } from "@/lib/types";
import { toggleProgress, regeneratePlan } from "@/lib/app-actions";

const kindMeta: Record<
  PlanItemKind,
  { icon: typeof Zap; tone: "ember" | "default" | "amber"; label: string }
> = {
  post: { icon: Clapperboard, tone: "ember", label: "Post" },
  action: { icon: Zap, tone: "default", label: "Action" },
  milestone: { icon: Trophy, tone: "amber", label: "Milestone" },
};

export function PlanBoard({
  plan,
  doneKeys,
}: {
  plan: GrowthPlan;
  doneKeys: string[];
}) {
  const router = useRouter();
  const [done, setDone] = React.useState<Set<string>>(new Set(doneKeys));
  const [, startTransition] = React.useTransition();
  const [regenerating, setRegenerating] = React.useState(false);

  const allItems = plan.phases.flatMap((p) => p.items);

  function toggle(id: string) {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    startTransition(async () => {
      await toggleProgress("plan", id);
    });
  }

  function regenerate() {
    setRegenerating(true);
    startTransition(async () => {
      await regeneratePlan();
      router.refresh();
      setRegenerating(false);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-ink-900 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-paper-faint">
              Plan progress
            </span>
            <span className="text-sm font-semibold text-paper">
              {done.size} / {allItems.length}
            </span>
          </div>
          <div className="mt-3 max-w-md">
            <ProgressBar
              value={done.size}
              max={allItems.length}
              tone={done.size === allItems.length ? "up" : "ember"}
            />
          </div>
        </div>
        <button
          onClick={regenerate}
          disabled={regenerating}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          {regenerating ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <RefreshCw size={15} />
          )}
          Regenerate plan
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {plan.phases.map((phase) => {
          const phaseDone = phase.items.filter((i) => done.has(i.id)).length;
          return (
            <div
              key={phase.id}
              className="flex flex-col rounded-2xl border border-line bg-ink-900"
            >
              <div className="border-b border-line p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-ember">
                    {phase.range}
                  </span>
                  <span className="text-xs text-paper-faint">
                    {phaseDone}/{phase.items.length}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-base font-semibold text-paper">
                  {phase.label}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-paper-dim">
                  {phase.focus}
                </p>
              </div>
              <div className="flex-1 space-y-2 p-3">
                {phase.items.map((item) => {
                  const meta = kindMeta[item.kind] ?? kindMeta.action;
                  const isDone = done.has(item.id);
                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "rounded-xl border border-line bg-ink-925 p-3.5 transition-colors",
                        isDone && "opacity-70",
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggle(item.id)}
                          aria-pressed={isDone}
                          className={cn(
                            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                            isDone
                              ? "border-up bg-up text-ink-950"
                              : "border-line-strong text-transparent hover:border-paper-faint",
                          )}
                        >
                          <Check size={12} strokeWidth={3} />
                        </button>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <Badge tone={meta.tone}>
                              <meta.icon size={10} />
                              {meta.label}
                            </Badge>
                          </div>
                          <p
                            className={cn(
                              "text-sm font-medium text-paper",
                              isDone && "line-through decoration-paper-faint",
                            )}
                          >
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-paper-dim">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
