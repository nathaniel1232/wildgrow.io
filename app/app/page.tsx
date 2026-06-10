import Link from "next/link";
import {
  Sparkles,
  Radar,
  ListChecks,
  CalendarRange,
  GraduationCap,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { progressSet, getTodayPlan } from "@/lib/app-data";
import { parseJSON } from "@/lib/parse";
import { PLAYBOOK_STEPS } from "@/lib/content/playbook";
import { LESSONS } from "@/lib/content/lessons";
import type { ContentPillar, GrowthPlan } from "@/lib/types";
import { PageHeader, PageBody } from "@/components/app/page-header";
import { TodayPlanCard } from "@/components/app/today-plan";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress";
import { buttonVariants } from "@/components/ui/button";

const tools = [
  { href: "/app/ideas", icon: Sparkles, name: "Idea Engine", desc: "Generate scripted video ideas" },
  { href: "/app/radar", icon: Radar, name: "Niche Radar", desc: "See what's working in your niche" },
  { href: "/app/playbook", icon: ListChecks, name: "Launch Playbook", desc: "From setup to your first viral hit" },
  { href: "/app/plan", icon: CalendarRange, name: "30/60/90 Plan", desc: "Your roadmap to a breakout" },
  { href: "/app/academy", icon: GraduationCap, name: "Viral Academy", desc: "Learn the craft of short-form" },
];

export default async function DashboardPage() {
  const user = await requireUser();
  const profile = user.profile!;

  const [ideas, progress] = await Promise.all([
    prisma.idea.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.progress.findMany({ where: { userId: user.id } }),
  ]);

  const playbookDone = progressSet(progress, "playbook");
  const lessonDone = progressSet(progress, "lesson");
  const planDone = progressSet(progress, "plan");

  const plan = parseJSON<GrowthPlan>(profile.planJson, { phases: [] });
  const planItems = plan.phases.flatMap((p) => p.items);
  const pillars = parseJSON<ContentPillar[]>(profile.pillarsJson, []);

  const savedIdeas = ideas.filter((i) => i.status === "saved");
  const nextPlaybook = PLAYBOOK_STEPS.find((s) => !playbookDone.has(s.key));
  const nextPlan = planItems.find((i) => !planDone.has(i.id));

  // "What to post today" — recommended format for the local day-of-week,
  // paired with one of the user's own ideas. Computed server-side at request.
  const todayPlan = getTodayPlan(new Date(), ideas);

  // Secondary next moves (filming today is owned by the Post-today hero).
  const actions: { tag: string; label: string; href: string }[] = [];
  if (nextPlaybook)
    actions.push({ tag: "Playbook", label: nextPlaybook.title, href: "/app/playbook" });
  if (nextPlan)
    actions.push({ tag: "Plan", label: nextPlan.title, href: "/app/plan" });
  if (actions.length === 0)
    actions.push({
      tag: "Ideas",
      label: "Generate a fresh batch of ideas",
      href: "/app/ideas",
    });

  const stats = [
    {
      label: "Ideas in your studio",
      value: ideas.length,
      sub: `${savedIdeas.length} saved to film`,
      done: ideas.length,
      total: Math.max(ideas.length, 7),
      hideBar: true,
    },
    {
      label: "Launch playbook",
      value: `${playbookDone.size}/${PLAYBOOK_STEPS.length}`,
      done: playbookDone.size,
      total: PLAYBOOK_STEPS.length,
    },
    {
      label: "Growth plan",
      value: `${planDone.size}/${planItems.length}`,
      done: planDone.size,
      total: planItems.length,
    },
    {
      label: "Academy lessons",
      value: `${lessonDone.size}/${LESSONS.length}`,
      done: lessonDone.size,
      total: LESSONS.length,
    },
  ];

  const firstName = user.name?.split(" ")[0];

  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title={`Welcome back${firstName ? `, ${firstName}` : ""}`}
        description={`Here's where ${profile.appName} stands today — and the next moves that compound.`}
      >
        <Link href="/app/ideas" className={buttonVariants({})}>
          <Sparkles size={16} /> Generate ideas
        </Link>
      </PageHeader>

      <PageBody className="space-y-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-line bg-ink-900 p-5"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-paper-faint">
                {s.label}
              </p>
              <p className="mt-2 font-display text-3xl font-bold text-paper">
                {s.value}
              </p>
              {s.hideBar ? (
                <p className="mt-2 text-xs text-paper-dim">{s.sub}</p>
              ) : (
                <div className="mt-3">
                  <ProgressBar value={s.done} max={s.total} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Post today — recommended format, idea to film, posting windows */}
        <TodayPlanCard plan={todayPlan} />

        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          {/* Next moves */}
          <div className="rounded-2xl border border-line bg-ink-900 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-paper">
                Next moves
              </h2>
              <Badge tone="ember">Keep momentum</Badge>
            </div>
            <div className="mt-5 space-y-2.5">
              {actions.slice(0, 3).map((a, i) => (
                <Link
                  key={i}
                  href={a.href}
                  className="group flex items-center gap-3 rounded-xl border border-line bg-ink-850 px-4 py-3.5 transition-colors hover:border-line-strong hover:bg-ink-800"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ember/12 text-ember">
                    <CheckCircle2 size={15} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-paper-faint">
                      {a.tag}
                    </p>
                    <p className="truncate text-sm text-paper-soft">{a.label}</p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="shrink-0 text-paper-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ember"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Positioning */}
          <div className="rounded-2xl border border-line bg-ink-900 p-6">
            <h2 className="font-display text-lg font-semibold text-paper">
              Your angle
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-paper-dim">
              {profile.positioning ??
                "Lead every video with one sharp pain, then show your app as the obvious fix."}
            </p>
            {pillars.length > 0 && (
              <div className="mt-5">
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-paper-faint">
                  Content pillars
                </p>
                <div className="flex flex-wrap gap-2">
                  {pillars.map((p) => (
                    <Badge key={p.title} tone="outline">
                      {p.title}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Jump back in */}
        <div>
          <h2 className="mb-4 font-display text-lg font-semibold text-paper">
            Jump back in
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-ink-900 p-5 transition-colors hover:border-line-strong hover:bg-ink-850"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-ink-850 text-ember">
                  <t.icon size={19} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-paper">{t.name}</p>
                  <p className="truncate text-sm text-paper-dim">{t.desc}</p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-paper-faint transition-colors group-hover:text-ember"
                />
              </Link>
            ))}
          </div>
        </div>
      </PageBody>
    </>
  );
}
