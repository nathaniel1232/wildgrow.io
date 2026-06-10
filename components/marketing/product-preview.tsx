import { Sparkles, RotateCw, Music2, Gauge } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const beats = [
  { t: "0:00", label: "Hook", text: "Hold phone up to face, dead serious: \"I had 47 tabs open.\"" },
  { t: "0:03", label: "Turn", text: "Hard cut to the app — tabs collapsing into one clean list." },
  { t: "0:09", label: "Payoff", text: "Speedrun saving 3 articles + a video. \"It just… remembers.\"" },
  { t: "0:18", label: "CTA", text: "\"Link in bio. Your future self says thanks.\"" },
];

export function ProductPreview() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-line-strong bg-ink-900 shadow-lift">
      {/* App top bar */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <Sparkles size={15} className="text-ember" />
          <span className="text-sm font-medium text-paper">Idea Engine</span>
          <Badge tone="outline" className="ml-1 hidden sm:inline-flex">
            productivity · note-taking
          </Badge>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ink-850 px-2.5 py-1 text-xs text-paper-dim">
          <RotateCw size={12} /> Regenerate
        </span>
      </div>

      <div className="space-y-5 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="ember">Hook · POV</Badge>
          <Badge tone="default">15–22s</Badge>
          <Badge tone="default">Trending sound</Badge>
        </div>

        <p className="font-display text-xl font-semibold leading-snug text-paper md:text-2xl">
          “POV: you found the app that finally killed your 47 open browser tabs.”
        </p>

        {/* Script beats */}
        <div className="rounded-xl border border-line bg-ink-925 p-1.5">
          {beats.map((b, i) => (
            <div
              key={b.t}
              className={`flex gap-3 rounded-lg px-3 py-2.5 ${
                i % 2 ? "" : "bg-ink-850/60"
              }`}
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

        {/* Footer meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="inline-flex items-center gap-2 text-paper-dim">
            <Music2 size={14} className="text-paper-faint" />
            “oh no” — original audio · 41.2K videos
          </span>
          <span className="inline-flex items-center gap-2">
            <Gauge size={14} className="text-up" />
            <span className="text-paper-dim">Hook strength</span>
            <span className="font-semibold text-up">92</span>
          </span>
        </div>
      </div>
    </div>
  );
}
