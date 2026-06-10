import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { LESSONS, ACADEMY_MODULES } from "@/lib/content/lessons";
import { PageBody } from "@/components/app/page-header";
import { LessonComplete } from "@/components/app/lesson-complete";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = LESSONS.find((l) => l.slug === slug);
  return { title: lesson ? lesson.title : "Lesson" };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = LESSONS.find((l) => l.slug === slug);
  if (!lesson) notFound();

  const user = await requireUser();
  const record = await prisma.progress.findUnique({
    where: {
      userId_kind_key: { userId: user.id, kind: "lesson", key: slug },
    },
  });
  const isDone = !!record;

  const mod = ACADEMY_MODULES.find((m) => m.id === lesson.moduleId);
  const index = LESSONS.findIndex((l) => l.slug === slug);
  const prev = index > 0 ? LESSONS[index - 1] : null;
  const next = index < LESSONS.length - 1 ? LESSONS[index + 1] : null;

  return (
    <PageBody className="mx-auto max-w-2xl">
      <Link
        href="/app/academy"
        className="inline-flex items-center gap-1.5 text-sm text-paper-dim transition-colors hover:text-paper"
      >
        <ArrowLeft size={15} /> Viral Academy
      </Link>

      <div className="mt-6">
        {mod && (
          <span className="font-mono text-xs uppercase tracking-wider text-ember">
            {mod.title}
          </span>
        )}
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-paper">
          {lesson.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-paper-faint">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} /> {lesson.minutes} min read
          </span>
        </div>
        <p className="mt-5 text-lg leading-relaxed text-paper-soft">
          {lesson.summary}
        </p>
      </div>

      <article className="mt-8 space-y-7">
        {lesson.sections.map((s, i) => (
          <section key={i}>
            <h2 className="font-display text-lg font-semibold text-paper">
              {s.heading}
            </h2>
            <p className="mt-2 leading-relaxed text-paper-dim">{s.body}</p>
          </section>
        ))}
      </article>

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6">
        <LessonComplete slug={lesson.slug} initialDone={isDone} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/app/academy/${prev.slug}`}
            className="group flex items-center gap-3 rounded-xl border border-line bg-ink-900 p-4 transition-colors hover:border-line-strong hover:bg-ink-850"
          >
            <ArrowLeft size={16} className="shrink-0 text-paper-faint group-hover:text-ember" />
            <div className="min-w-0">
              <p className="text-xs text-paper-faint">Previous</p>
              <p className="truncate text-sm text-paper-soft">{prev.title}</p>
            </div>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/app/academy/${next.slug}`}
            className="group flex items-center justify-end gap-3 rounded-xl border border-line bg-ink-900 p-4 text-right transition-colors hover:border-line-strong hover:bg-ink-850 sm:col-start-2"
          >
            <div className="min-w-0">
              <p className="text-xs text-paper-faint">Next</p>
              <p className="truncate text-sm text-paper-soft">{next.title}</p>
            </div>
            <ArrowRight size={16} className="shrink-0 text-paper-faint group-hover:text-ember" />
          </Link>
        )}
      </div>
    </PageBody>
  );
}
