import type { Metadata } from "next";
import Link from "next/link";
import { Check, Play, Clock } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { progressSet } from "@/lib/app-data";
import { ACADEMY_MODULES, LESSONS, lessonsByModule } from "@/lib/content/lessons";
import { PageHeader, PageBody } from "@/components/app/page-header";
import { ProgressBar } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Viral Academy" };

export default async function AcademyPage() {
  const user = await requireUser();
  const progress = await prisma.progress.findMany({
    where: { userId: user.id, kind: "lesson" },
  });
  const done = progressSet(progress, "lesson");

  return (
    <>
      <PageHeader
        eyebrow="Viral Academy"
        title="Learn the system behind the for-you page"
        description="Short, founder-friendly lessons on the real mechanics of short-form — so every idea you generate actually makes sense."
      />
      <PageBody className="space-y-8">
        <div className="rounded-2xl border border-line bg-ink-900 p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-paper-faint">
              Course progress
            </span>
            <span className="text-sm font-semibold text-paper">
              {done.size} / {LESSONS.length} lessons
            </span>
          </div>
          <div className="mt-3">
            <ProgressBar
              value={done.size}
              max={LESSONS.length}
              tone={done.size === LESSONS.length ? "up" : "ember"}
            />
          </div>
        </div>

        {ACADEMY_MODULES.sort((a, b) => a.order - b.order).map((mod) => {
          const lessons = lessonsByModule(mod.id);
          return (
            <section key={mod.id}>
              <div className="mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-ember">
                  Module {String(mod.order).padStart(2, "0")}
                </span>
                <h2 className="mt-1 font-display text-lg font-semibold text-paper">
                  {mod.title}
                </h2>
                <p className="mt-1 text-sm text-paper-dim">{mod.blurb}</p>
              </div>
              <div className="space-y-2">
                {lessons.map((lesson) => {
                  const isDone = done.has(lesson.slug);
                  return (
                    <Link
                      key={lesson.slug}
                      href={`/app/academy/${lesson.slug}`}
                      className="group flex items-center gap-4 rounded-xl border border-line bg-ink-900 p-4 transition-colors hover:border-line-strong hover:bg-ink-850"
                    >
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                          isDone
                            ? "border-up/40 bg-up/10 text-up"
                            : "border-line bg-ink-850 text-paper-faint",
                        )}
                      >
                        {isDone ? <Check size={16} /> : <Play size={15} />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-paper">{lesson.title}</p>
                        <p className="truncate text-sm text-paper-dim">
                          {lesson.summary}
                        </p>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1 text-xs text-paper-faint">
                        <Clock size={12} />
                        {lesson.minutes}m
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </PageBody>
    </>
  );
}
