"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Play,
  Heart,
  MessageCircle,
  X,
  Loader2,
  Sparkles,
  Check,
  Wand2,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { CopyButton } from "@/components/app/copy-button";
import { cn, formatCompact, embedSrc, tiktokSearchUrl } from "@/lib/utils";
import type { SocialVideo } from "@/lib/types";
import type { VideoAnalysis } from "@/lib/ai/types";
import { analyzeRadarVideo } from "@/lib/app-actions";

function platformLabel(p: string) {
  return p === "instagram" ? "Reels" : "TikTok";
}

export function RadarVideos({
  videos,
  appName,
  query,
  isDemo,
}: {
  videos: SocialVideo[];
  appName: string;
  query: string;
  isDemo: boolean;
}) {
  const [selected, setSelected] = React.useState<SocialVideo | null>(null);
  const [analysis, setAnalysis] = React.useState<VideoAnalysis | null>(null);
  const [, startTransition] = React.useTransition();
  const [loading, setLoading] = React.useState(false);

  function open(v: SocialVideo) {
    setSelected(v);
    setAnalysis(null);
    setLoading(true);
    startTransition(async () => {
      try {
        const a = await analyzeRadarVideo(v.id, query);
        setAnalysis(a);
      } catch {
        setAnalysis({
          whyItWorked: ["Couldn't analyze this one right now — try again."],
          howToAdapt: "",
          suggestedHook: "",
        });
      } finally {
        setLoading(false);
      }
    });
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {videos.map((v) => (
          <button
            key={v.id}
            onClick={() => open(v)}
            className="group flex flex-col rounded-2xl border border-line bg-ink-900 p-5 text-left transition-colors hover:border-line-strong hover:bg-ink-850"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-paper">{v.creator}</span>
              <Badge tone="outline">{platformLabel(v.platform)}</Badge>
            </div>
            <p className="mt-3 line-clamp-3 font-display text-base font-medium leading-snug text-paper-soft">
              “{v.hook}”
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-paper-dim">
              <span className="inline-flex items-center gap-1">
                <Play size={12} className="text-paper-faint" />
                {formatCompact(v.views)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Heart size={12} className="text-paper-faint" />
                {formatCompact(v.likes)}
              </span>
              <span className="inline-flex items-center gap-1">
                <MessageCircle size={12} className="text-paper-faint" />
                {formatCompact(v.comments)}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
              <div className="flex items-center gap-2">
                <Badge tone="default">{v.format}</Badge>
                {isDemo && <Badge tone="amber">Sample data</Badge>}
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-ember opacity-0 transition-opacity group-hover:opacity-100">
                <Sparkles size={12} /> Break it down
              </span>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
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
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-paper">
                      {selected.creator}
                    </span>
                    <Badge tone="outline">{platformLabel(selected.platform)}</Badge>
                    <Badge tone="default">{selected.format}</Badge>
                    {isDemo && <Badge tone="amber">Sample data</Badge>}
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-xs text-paper-dim">
                    <span>{formatCompact(selected.views)} views</span>
                    <span>{formatCompact(selected.likes)} likes</span>
                    <span>{formatCompact(selected.comments)} comments</span>
                  </div>
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

                {/* Watch */}
                {(() => {
                  const src = embedSrc(selected);
                  const watchUrl = selected.url ?? tiktokSearchUrl(selected.hook);
                  if (src) {
                    return (
                      <div className="mx-auto w-full max-w-[325px]">
                        <iframe
                          src={src}
                          title="Video preview"
                          allow="encrypted-media; fullscreen"
                          className="h-[560px] w-full rounded-xl border border-line bg-ink-950"
                        />
                      </div>
                    );
                  }
                  return (
                    <div>
                      <a
                        href={watchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(buttonVariants({ size: "lg" }), "w-full")}
                      >
                        <Play size={16} />
                        {selected.url
                          ? `Watch on ${platformLabel(selected.platform)}`
                          : `Watch videos like this on ${platformLabel(selected.platform)}`}
                        <ExternalLink size={14} />
                      </a>
                      {!selected.url && (
                        <p className="mt-2 text-center text-xs text-paper-faint">
                          Connect a data provider to play the exact videos right
                          here, in-app.
                        </p>
                      )}
                    </div>
                  );
                })()}

                {loading || !analysis ? (
                  <div className="flex items-center gap-3 rounded-xl border border-line bg-ink-925 p-5 text-sm text-paper-dim">
                    <Loader2 size={16} className="animate-spin text-ember" />
                    Breaking down why this worked…
                  </div>
                ) : (
                  <>
                    <div>
                      <h4 className="mb-3 font-mono text-xs uppercase tracking-wider text-paper-faint">
                        Why it worked
                      </h4>
                      <ul className="space-y-2.5">
                        {analysis.whyItWorked.map((w, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm">
                            <Check size={15} className="mt-0.5 shrink-0 text-up" />
                            <span className="text-paper-soft">{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {analysis.howToAdapt && (
                      <div>
                        <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-paper-faint">
                          How to adapt it for {appName}
                        </h4>
                        <p className="rounded-xl border border-line bg-ink-925 p-3.5 text-sm leading-relaxed text-paper-soft">
                          {analysis.howToAdapt}
                        </p>
                      </div>
                    )}

                    {analysis.suggestedHook && (
                      <div className="rounded-xl border border-ember/20 bg-ember/[0.06] p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ember">
                            <Wand2 size={12} /> Your version
                          </h4>
                          <CopyButton text={analysis.suggestedHook} />
                        </div>
                        <p className="font-display text-base font-medium text-paper">
                          “{analysis.suggestedHook}”
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
