import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  Film,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TodayPlan } from "@/lib/app-data";

const PLATFORM_LABEL: Record<string, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
};

export function TodayPlanCard({ plan }: { plan: TodayPlan }) {
  const { format, note, steps, ideaToFilm, postingWindows, dayLabel } = plan;

  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-ink-900">
      {/* Hero */}
      <div className="border-b border-line bg-ember/[0.05] p-6 md:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ember/25 bg-ember/12 text-ember">
              <CalendarCheck size={18} />
            </span>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper-faint">
                Post today · {dayLabel}
              </p>
              <h2 className="mt-1 font-display text-xl font-bold leading-tight text-paper">
                {format ? format.name : "Plan your next post"}
              </h2>
              {note && (
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-paper-dim">
                  {note}
                </p>
              )}
            </div>
          </div>
          <Badge tone="ember" className="shrink-0">
            <Sparkles size={12} /> Today’s format
          </Badge>
        </div>

        {format?.why && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper-soft">
            {format.why}
          </p>
        )}
      </div>

      <div className="grid gap-6 p-6 md:p-7 lg:grid-cols-[1.4fr_1fr]">
        {/* Make it: steps + concrete idea */}
        <div className="space-y-5">
          {steps.length > 0 && (
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-paper-faint">
                How to make it
              </p>
              <ol className="space-y-2.5">
                {steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ember/12 font-mono text-[11px] font-semibold text-ember">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-paper-dim">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Concrete thing to film */}
          <div className="rounded-xl border border-line bg-ink-925 p-4">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-paper-faint">
              Film this today
            </p>
            {ideaToFilm ? (
              <Link
                href="/app/ideas"
                className="group flex items-center gap-3 rounded-lg border border-line bg-ink-900 px-3.5 py-3 transition-colors hover:border-line-strong hover:bg-ink-850"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ember/12 text-ember">
                  <Film size={15} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-paper">
                    {ideaToFilm.title}
                  </p>
                  {ideaToFilm.hook && (
                    <p className="truncate text-xs text-paper-dim">
                      {ideaToFilm.hook}
                    </p>
                  )}
                </div>
                <ArrowRight
                  size={15}
                  className="shrink-0 text-paper-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ember"
                />
              </Link>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-paper-dim">
                  No idea queued yet — generate a batch to pair with today’s
                  format.
                </p>
                <Link
                  href="/app/ideas"
                  className={cn(buttonVariants({ size: "sm" }), "shrink-0")}
                >
                  <Sparkles size={15} /> Generate ideas
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Posting windows */}
        <div className="rounded-xl border border-line bg-ink-925 p-5">
          <div className="flex items-center gap-2">
            <Clock size={15} className="text-ember" />
            <p className="font-mono text-xs uppercase tracking-wider text-paper-faint">
              Recommended windows
            </p>
          </div>
          <div className="mt-4 space-y-4">
            {postingWindows.map((w) => (
              <div key={w.platform}>
                <p className="mb-1.5 text-sm font-medium text-paper">
                  {PLATFORM_LABEL[w.platform] ?? w.platform}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {w.windows.map((slot) => (
                    <Badge key={slot} tone="outline">
                      {slot}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-paper-faint">
            General short-form guidance — not your account’s analytics. Treat
            these as starting points and watch what actually lands for you.
          </p>
        </div>
      </div>

      {/* This-week cadence strip */}
      <div className="border-t border-line p-6 md:p-7">
        <p className="mb-3 font-mono text-xs uppercase tracking-wider text-paper-faint">
          This week’s cadence
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {plan.week.map((d) => (
            <div
              key={d.dayOfWeek}
              title={d.note}
              className={cn(
                "rounded-xl border px-3 py-3 transition-colors",
                d.isToday
                  ? "border-ember/40 bg-ember/[0.08]"
                  : "border-line bg-ink-925",
              )}
            >
              <div className="flex items-center justify-between">
                <p
                  className={cn(
                    "font-mono text-[11px] uppercase tracking-wider",
                    d.isToday ? "text-ember" : "text-paper-faint",
                  )}
                >
                  {d.label}
                </p>
                {d.isToday && (
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ember">
                    Today
                  </span>
                )}
              </div>
              <p
                className={cn(
                  "mt-1.5 text-xs font-medium leading-snug",
                  d.isToday ? "text-paper" : "text-paper-soft",
                )}
              >
                {d.formatName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
