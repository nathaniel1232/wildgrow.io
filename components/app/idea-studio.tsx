"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  Loader2,
  X,
  Bookmark,
  BookmarkCheck,
  Film,
  Trash2,
  Clock,
  Music2,
  Gauge,
  Wand2,
  Radar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { CopyButton } from "@/components/app/copy-button";
import { cn } from "@/lib/utils";
import type { ScriptBeat } from "@/lib/types";
import {
  generateMoreIdeas,
  setIdeaStatus,
  deleteIdea,
} from "@/lib/app-actions";

export interface IdeaView {
  id: string;
  title: string;
  hook: string;
  format: string;
  lengthSec: number | null;
  script: ScriptBeat[];
  onScreen: string[];
  caption: string;
  hashtags: string[];
  sound: string | null;
  rationale: string | null;
  hookScore: number | null;
  pillar: string | null;
  basedOn: string | null;
  status: string;
}

function scoreTone(score: number | null) {
  if (score == null) return "default" as const;
  if (score >= 88) return "up" as const;
  if (score >= 78) return "ember" as const;
  return "default" as const;
}

function plainText(idea: IdeaView): string {
  const beats = idea.script
    .map((b) => `${b.t}  [${b.label}] ${b.text}`)
    .join("\n");
  return [
    `HOOK: ${idea.hook}`,
    `FORMAT: ${idea.format}${idea.lengthSec ? ` · ${idea.lengthSec}s` : ""}`,
    "",
    "SCRIPT:",
    beats,
    "",
    `ON-SCREEN: ${idea.onScreen.join(" / ")}`,
    `CAPTION: ${idea.caption}`,
    `HASHTAGS: ${idea.hashtags.join(" ")}`,
    idea.sound ? `SOUND: ${idea.sound}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function IdeaStudio({
  ideas,
  live,
}: {
  ideas: IdeaView[];
  live: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();
  const [selected, setSelected] = React.useState<IdeaView | null>(null);
  const [busyId, setBusyId] = React.useState<string | null>(null);

  function generate() {
    startTransition(async () => {
      await generateMoreIdeas();
      router.refresh();
    });
  }

  function changeStatus(id: string, status: string) {
    setBusyId(id);
    startTransition(async () => {
      await setIdeaStatus(id, status);
      router.refresh();
      setBusyId(null);
      setSelected((s) => (s && s.id === id ? { ...s, status } : s));
    });
  }

  function remove(id: string) {
    setBusyId(id);
    startTransition(async () => {
      await deleteIdea(id);
      router.refresh();
      setBusyId(null);
      setSelected(null);
    });
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-paper-dim">
          <Badge tone={live ? "up" : "ember"}>
            {live ? "Live AI" : "Smart engine"}
          </Badge>
          <span>
            {ideas.length} idea{ideas.length === 1 ? "" : "s"} in your studio
          </span>
        </div>
        <button
          onClick={generate}
          disabled={pending}
          className={buttonVariants({})}
        >
          {pending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Sparkles size={16} />
          )}
          Generate 4 more
        </button>
      </div>

      {ideas.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-ink-900 px-6 py-20 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-ink-850 text-ember">
            <Wand2 size={24} />
          </span>
          <h3 className="mt-5 font-display text-xl font-semibold text-paper">
            Your studio is empty
          </h3>
          <p className="mt-2 max-w-sm text-sm text-paper-dim">
            Generate your first batch of fully-scripted video ideas, tuned to
            your app and niche.
          </p>
          <button
            onClick={generate}
            disabled={pending}
            className={cn(buttonVariants({ size: "lg" }), "mt-6")}
          >
            {pending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Sparkles size={16} />
            )}
            Generate ideas
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ideas.map((idea) => (
            <button
              key={idea.id}
              onClick={() => setSelected(idea)}
              className="group flex flex-col rounded-2xl border border-line bg-ink-900 p-5 text-left transition-colors hover:border-line-strong hover:bg-ink-850"
            >
              <div className="flex items-center justify-between gap-2">
                <Badge tone="default">{idea.format}</Badge>
                {idea.hookScore != null && (
                  <span className="inline-flex items-center gap-1 text-xs text-paper-dim">
                    <Gauge size={12} className="text-paper-faint" />
                    <span
                      className={cn(
                        "font-semibold",
                        scoreTone(idea.hookScore) === "up"
                          ? "text-up"
                          : "text-ember",
                      )}
                    >
                      {idea.hookScore}
                    </span>
                  </span>
                )}
              </div>
              <p className="mt-3 line-clamp-3 font-display text-base font-medium leading-snug text-paper">
                “{idea.hook}”
              </p>
              {idea.basedOn && (
                <p className="mt-2 inline-flex max-w-full items-center gap-1 text-xs text-up">
                  <Radar size={11} className="shrink-0" />
                  <span className="truncate">Based on {idea.basedOn}</span>
                </p>
              )}
              <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                <span className="truncate text-xs text-paper-faint">
                  {idea.pillar ?? "Idea"}
                </span>
                {idea.status === "saved" && <Badge tone="ember">Saved</Badge>}
                {idea.status === "filmed" && <Badge tone="up">Filmed</Badge>}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-paper/40 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-line bg-ink-900 shadow-lift sm:rounded-2xl"
              initial={{ y: 30, opacity: 0, scale: 0.99 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            >
              <div className="flex items-start justify-between gap-3 border-b border-line p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="ember">{selected.format}</Badge>
                  {selected.lengthSec && (
                    <Badge tone="default">
                      <Clock size={11} /> {selected.lengthSec}s
                    </Badge>
                  )}
                  {selected.hookScore != null && (
                    <Badge tone={scoreTone(selected.hookScore)}>
                      <Gauge size={11} /> Hook {selected.hookScore}
                    </Badge>
                  )}
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-paper-dim hover:bg-ink-800 hover:text-paper"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 space-y-6 overflow-y-auto p-5">
                <p className="font-display text-xl font-semibold leading-snug text-paper">
                  “{selected.hook}”
                </p>

                {selected.basedOn && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-up/20 bg-up/[0.06] p-3.5 text-sm">
                    <Radar size={15} className="mt-0.5 shrink-0 text-up" />
                    <span className="text-paper-soft">
                      <span className="font-medium text-up">
                        Based on a real trend
                      </span>{" "}
                      · {selected.basedOn}
                    </span>
                  </div>
                )}

                {/* Script */}
                <div>
                  <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-paper-faint">
                    Script
                  </h4>
                  <div className="rounded-xl border border-line bg-ink-925 p-1.5">
                    {selected.script.map((b, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex gap-3 rounded-lg px-3 py-2.5",
                          i % 2 === 0 && "bg-ink-850/60",
                        )}
                      >
                        <span className="mt-0.5 w-9 shrink-0 font-mono text-xs text-paper-faint">
                          {b.t}
                        </span>
                        <div>
                          <span className="mr-2 font-mono text-[11px] uppercase tracking-wider text-ember">
                            {b.label}
                          </span>
                          <span className="text-sm text-paper-soft">{b.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* On-screen text */}
                {selected.onScreen.length > 0 && (
                  <div>
                    <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-paper-faint">
                      On-screen text
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.onScreen.map((t, i) => (
                        <span
                          key={i}
                          className="rounded-lg border border-line bg-ink-850 px-3 py-1.5 text-sm text-paper-soft"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Caption */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-paper-faint">
                      Caption
                    </h4>
                    <CopyButton text={selected.caption} />
                  </div>
                  <p className="rounded-xl border border-line bg-ink-925 p-3.5 text-sm text-paper-soft">
                    {selected.caption}
                  </p>
                </div>

                {/* Hashtags + sound */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-paper-faint">
                        Hashtags
                      </h4>
                      <CopyButton text={selected.hashtags.join(" ")} />
                    </div>
                    <p className="text-sm text-ember">
                      {selected.hashtags.join(" ")}
                    </p>
                  </div>
                  {selected.sound && (
                    <div>
                      <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-paper-faint">
                        Sound
                      </h4>
                      <p className="inline-flex items-center gap-2 text-sm text-paper-soft">
                        <Music2 size={14} className="text-paper-faint" />
                        {selected.sound}
                      </p>
                    </div>
                  )}
                </div>

                {/* Why it works */}
                {selected.rationale && (
                  <div className="rounded-xl border border-ember/20 bg-ember/[0.06] p-4">
                    <h4 className="mb-1.5 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ember">
                      <Sparkles size={12} /> Why this works
                    </h4>
                    <p className="text-sm leading-relaxed text-paper-soft">
                      {selected.rationale}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 border-t border-line p-4">
                <CopyButton
                  text={plainText(selected)}
                  label="Copy full script"
                  className="px-3 py-2"
                />
                <div className="flex-1" />
                {selected.status === "saved" ? (
                  <button
                    onClick={() => changeStatus(selected.id, "new")}
                    disabled={busyId === selected.id}
                    className={buttonVariants({ variant: "subtle", size: "sm" })}
                  >
                    <BookmarkCheck size={15} className="text-ember" /> Saved
                  </button>
                ) : (
                  <button
                    onClick={() => changeStatus(selected.id, "saved")}
                    disabled={busyId === selected.id}
                    className={buttonVariants({ variant: "subtle", size: "sm" })}
                  >
                    <Bookmark size={15} /> Save
                  </button>
                )}
                <button
                  onClick={() =>
                    changeStatus(
                      selected.id,
                      selected.status === "filmed" ? "saved" : "filmed",
                    )
                  }
                  disabled={busyId === selected.id}
                  className={buttonVariants({
                    variant: selected.status === "filmed" ? "subtle" : "outline",
                    size: "sm",
                  })}
                >
                  <Film size={15} className={selected.status === "filmed" ? "text-up" : ""} />
                  {selected.status === "filmed" ? "Filmed" : "Mark filmed"}
                </button>
                <button
                  onClick={() => remove(selected.id)}
                  disabled={busyId === selected.id}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-paper-faint transition-colors hover:bg-down/10 hover:text-down"
                  title="Delete idea"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
