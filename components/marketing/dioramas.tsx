"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  animate,
} from "framer-motion";
import { Sparkles, Music2, Check } from "lucide-react";
import { useMotionPref } from "@/components/motion/pref";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Product dioramas — the tool, performing itself.                    */
/*  Every number in here is labelled sample output; nothing pretends   */
/*  to be a real Wildgrow result.                                      */
/* ------------------------------------------------------------------ */

type Idea = {
  format: string;
  length: string;
  hook: string;
  beats: { t: string; label: string; text: string }[];
  sound: string;
  score: number;
};

export const SAMPLE_IDEAS: Idea[] = [
  {
    format: "POV",
    length: "15–22s",
    hook: "POV: you found the app that finally killed your 47 open tabs.",
    beats: [
      { t: "0:00", label: "Hook", text: "Phone to face, dead serious: “I had 47 tabs open.”" },
      { t: "0:03", label: "Turn", text: "Hard cut — tabs collapsing into one clean list." },
      { t: "0:09", label: "Payoff", text: "Speedrun saving 3 articles. “It just… remembers.”" },
      { t: "0:16", label: "CTA", text: "“Link in bio. Your future self says thanks.”" },
    ],
    sound: "original audio · low lo-fi",
    score: 87,
  },
  {
    format: "Founder story",
    length: "20–30s",
    hook: "I built an app because I kept losing every article I saved.",
    beats: [
      { t: "0:00", label: "Hook", text: "Screen-record scroll through 9 chaos bookmarks." },
      { t: "0:04", label: "Stakes", text: "“Three years of ‘read later’. Read: never.”" },
      { t: "0:11", label: "Build", text: "Timelapse: first commit → the clean inbox view." },
      { t: "0:22", label: "CTA", text: "“It’s free this week — roast it in the comments.”" },
    ],
    sound: "trending · soft piano loop",
    score: 81,
  },
  {
    format: "Reply demo",
    length: "12–18s",
    hook: "“Does it work offline?” — answering the comment section.",
    beats: [
      { t: "0:00", label: "Hook", text: "Comment pinned on screen, airplane mode ON." },
      { t: "0:03", label: "Proof", text: "Open app, full library loads. No spinner." },
      { t: "0:08", label: "Flex", text: "Save a page, kill the app, reopen — still there." },
      { t: "0:13", label: "CTA", text: "“Next question. Drop it below.”" },
    ],
    sound: "original audio · keyboard asmr",
    score: 89,
  },
];

/* ----------------------------- typing ----------------------------- */

function useTypewriter(text: string, play: boolean, cps = 38) {
  const reduced = useMotionPref();
  const [count, setCount] = React.useState(reduced ? text.length : 0);

  React.useEffect(() => {
    if (reduced) {
      setCount(text.length);
      return;
    }
    if (!play) return;
    setCount(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) window.clearInterval(id);
    }, 1000 / cps);
    return () => window.clearInterval(id);
  }, [text, play, cps, reduced]);

  return { shown: text.slice(0, count), done: count >= text.length };
}

/* ---------------------------- hook dial --------------------------- */

/** Semi-circular gauge that sweeps to `score` with a count-up numeral. */
function HookDial({
  score,
  play = true,
  className,
}: {
  score: number;
  play?: boolean;
  className?: string;
}) {
  const reduced = useMotionPref();
  const [value, setValue] = React.useState(reduced ? score : 0);

  React.useEffect(() => {
    if (reduced) {
      setValue(score);
      return;
    }
    if (!play) return;
    const controls = animate(0, score, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [score, play, reduced]);

  const sweep = value / 100;

  return (
    <div className={cn("flex items-end gap-2", className)}>
      <svg viewBox="0 0 64 36" className="w-14 shrink-0" aria-hidden>
        <path
          d="M6 32 A 26 26 0 0 1 58 32"
          fill="none"
          stroke="var(--ink-750)"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <motion.path
          d="M6 32 A 26 26 0 0 1 58 32"
          fill="none"
          stroke="var(--ember)"
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray="1"
          strokeDashoffset={1 - sweep}
          pathLength={1}
        />
      </svg>
      <div className="leading-none">
        <p className="font-mono text-[10px] uppercase tracking-wider text-paper-faint">
          hook score
        </p>
        <p className="mt-1 font-display text-xl font-extrabold tabular-nums text-ember">
          {value}
          <span className="text-xs font-semibold text-paper-faint">/100</span>
        </p>
      </div>
    </div>
  );
}

/* --------------------------- script card --------------------------- */

/**
 * ScriptCard — the Idea Engine writing a video script live: the hook
 * types itself, beats land one by one, the hook dial sweeps. With
 * `loop`, it cycles sample ideas while visible.
 */
export function ScriptCard({
  loop = true,
  startDelay = 0.5,
  onIdeaChange,
  className,
}: {
  loop?: boolean;
  startDelay?: number;
  onIdeaChange?: (idea: Idea) => void;
  className?: string;
}) {
  const reduced = useMotionPref();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [index, setIndex] = React.useState(0);
  const [started, setStarted] = React.useState(!!reduced);

  const idea = SAMPLE_IDEAS[index];
  const { shown, done } = useTypewriter(idea.hook, started && inView);

  // delayed kick-off so the card writes after the hero settles
  React.useEffect(() => {
    if (reduced) {
      setStarted(true);
      return;
    }
    const id = window.setTimeout(() => setStarted(true), startDelay * 1000);
    return () => window.clearTimeout(id);
  }, [startDelay, reduced]);

  // idea carousel — only while visible, never under reduced motion
  React.useEffect(() => {
    if (!loop || reduced || !inView || !done) return;
    const id = window.setTimeout(() => {
      const next = (index + 1) % SAMPLE_IDEAS.length;
      setIndex(next);
      onIdeaChange?.(SAMPLE_IDEAS[next]);
    }, 6500);
    return () => window.clearTimeout(id);
  }, [loop, reduced, inView, done, index, onIdeaChange]);

  return (
    <div
      ref={ref}
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-line bg-ink-900/90 shadow-lift backdrop-blur-sm",
        className,
      )}
    >
      {/* chrome */}
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Sparkles size={13} className="text-ember" />
          <span className="text-[13px] font-medium text-paper">Idea Engine</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper-faint">
          specimen 00{index + 1} · sample
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-full border border-ember/30 bg-ember/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ember">
                {idea.format}
              </span>
              <span className="rounded-full border border-line bg-ink-850 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-paper-dim">
                {idea.length}
              </span>
            </div>

            {/* the hook writes itself — an invisible copy of the full
                hook reserves the exact final height, so typing never
                shifts the layout at any viewport width */}
            <p className="relative mt-3 font-display text-lg font-semibold leading-snug text-paper sm:text-xl">
              <span className="invisible" aria-hidden>
                “{idea.hook}”
              </span>
              <span className="absolute inset-0">
                “{shown}
                {!done && !reduced && (
                  <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-ember" />
                )}
                {done && "”"}
              </span>
            </p>

            {/* beats land one by one once the hook is written */}
            <div className="mt-3 rounded-xl border border-line bg-ink-925/80 p-1.5">
              {idea.beats.map((b, i) => (
                <motion.div
                  key={b.t}
                  initial={reduced ? false : { opacity: 0, x: -10 }}
                  animate={
                    done || reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                  }
                  transition={{ delay: reduced ? 0 : 0.12 * i, duration: 0.4 }}
                  className={cn(
                    "flex gap-3 rounded-lg px-3 py-2",
                    i % 2 === 0 && "bg-ink-850/50",
                  )}
                >
                  <span className="mt-0.5 w-8 shrink-0 font-mono text-[11px] text-paper-faint">
                    {b.t}
                  </span>
                  <p className="text-[13px] leading-relaxed text-paper-soft">
                    <span className="mr-2 font-mono text-[10px] uppercase tracking-wider text-ember">
                      {b.label}
                    </span>
                    {b.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
              <HookDial score={idea.score} play={done} />
              <span className="inline-flex items-center gap-2 pb-1 text-xs text-paper-dim">
                <Music2 size={13} className="text-paper-faint" />
                {idea.sound}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------------------- hook board --------------------------- */

const HOOK_BOARD = [
  { hook: "Watch me clear 47 tabs in 9 seconds.", format: "speedrun", score: 92 },
  { hook: "“Does it work offline?” — answering the comment section.", format: "reply demo", score: 89 },
  { hook: "POV: you found the app that finally killed your 47 open tabs.", format: "pov", score: 87 },
  { hook: "I built an app because I kept losing every article I saved.", format: "founder story", score: 81 },
  { hook: "3 features nobody asked for. Everyone uses #2 daily.", format: "listicle", score: 74 },
];

/**
 * HookBoard — the Idea Engine's breadth: one app, five angles, each
 * hook scored. Rows land staggered; the winner is lit and links to the
 * full script (which the hero demos).
 */
export function HookBoard({ className }: { className?: string }) {
  const reduced = useMotionPref();

  return (
    <div className={className}>
      <div className="space-y-1.5">
        {HOOK_BOARD.map((h, i) => (
          <motion.div
            key={h.hook}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: reduced ? 0 : 0.1 * i, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "flex items-center gap-3 rounded-xl border px-3.5 py-2.5",
              i === 0
                ? "border-ember/40 bg-ember/[0.07]"
                : "border-line bg-ink-850/50",
            )}
          >
            <span
              className={cn(
                "w-8 shrink-0 text-right font-display text-base font-extrabold tabular-nums",
                i === 0 ? "text-ember" : "text-paper-faint",
              )}
            >
              {h.score}
            </span>
            <div className="min-w-0 flex-1">
              <p className={cn("truncate text-sm", i === 0 ? "text-paper" : "text-paper-soft")}>
                {h.hook}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-paper-faint">
                {h.format}
              </p>
            </div>
            {i === 0 && (
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-ember">
                → full script
              </span>
            )}
          </motion.div>
        ))}
      </div>
      <p className="mt-2.5 font-mono text-[10px] uppercase tracking-wider text-paper-faint">
        hook score = stop-the-scroll odds · sample output
      </p>
    </div>
  );
}

/* ---------------------------- phone reel --------------------------- */

function formatViews(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

/**
 * PhoneReel — a dark phone whose screen powers ON (flicker) when the
 * hero vine reaches it, then plays the post the script became: caption,
 * progress bar, and a view counter that keeps climbing.
 */
export function PhoneReel({
  on,
  hook,
  className,
}: {
  on: boolean;
  hook: string;
  className?: string;
}) {
  const reduced = useMotionPref();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const lit = on || !!reduced;
  const [views, setViews] = React.useState(9_840);

  // climb only while actually on screen — never for the whole session
  React.useEffect(() => {
    if (!lit || reduced || !inView) return;
    const id = window.setInterval(() => {
      setViews((v) => v + 47 + Math.round(Math.random() * 260));
    }, 700);
    return () => window.clearInterval(id);
  }, [lit, reduced, inView]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "relative aspect-[9/19] w-full overflow-hidden rounded-[1.8rem] border border-line-strong bg-[#02030a] p-1 shadow-lift",
        className,
      )}
    >
      <div className="absolute left-1/2 top-2 z-20 h-1 w-10 -translate-x-1/2 rounded-full bg-white/10" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
        {/* screen OFF: faint glass reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />

        {/* screen ON */}
        {lit && (
          <div className={cn("absolute inset-0", !reduced && "animate-power-on")}>
            <div className="absolute inset-0 bg-gradient-to-br from-ember-deep via-[#0c4a28] to-[#03150b]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* progress bar — only animates while visible */}
            <div className="absolute inset-x-2 top-2 h-[2px] overflow-hidden rounded-full bg-white/15">
              {!reduced && inView && (
                <motion.div
                  className="h-full bg-white/80"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  style={{ originX: 0 }}
                  transition={{ duration: 18, ease: "linear", repeat: Infinity }}
                />
              )}
            </div>

            {/* climbing views */}
            <div className="absolute right-2 top-4">
              <span className="rounded-full bg-black/35 px-2 py-0.5 font-mono text-[9px] font-semibold tabular-nums text-white backdrop-blur">
                ▶ {formatViews(views)}
              </span>
            </div>

            {/* caption = the hook the script card wrote */}
            <div className="absolute bottom-3 left-3 right-3">
              <p className="font-display text-[11px] font-bold leading-tight text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
                {hook}
              </p>
              <p className="mt-1.5 flex items-center gap-1 font-mono text-[7.5px] text-white/80">
                <span className="inline-block h-1.5 w-1.5 animate-spin rounded-full border border-white/70 border-t-transparent [animation-duration:3s]" />
                original audio
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------- radar scope -------------------------- */

const BLIPS = [
  { angle: 40, r: 0.62, handle: "@focusflow", note: "1.2M views · POV format" },
  { angle: 140, r: 0.8, handle: "@notion.nerd", note: "840K · setup tours" },
  { angle: 230, r: 0.5, handle: "@deepworkdaily", note: "402K · talking head" },
  { angle: 320, r: 0.72, handle: "@tab.zero", note: "118K · screen demos" },
];

/**
 * RadarScope — concentric rings, a conic sweep arm, and blips that
 * flare exactly when the arm passes them (delay derived from angle).
 */
export function RadarScope({ className }: { className?: string }) {
  const reduced = useMotionPref();
  const size = 200;
  const c = size / 2;

  return (
    <div className={cn("relative", className)}>
      <div className="relative mx-auto aspect-square w-full max-w-[230px]">
        {/* rings */}
        <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 h-full w-full" aria-hidden>
          {[0.33, 0.62, 0.92].map((f) => (
            <circle
              key={f}
              cx={c}
              cy={c}
              r={(c - 4) * f}
              fill="none"
              stroke="var(--line-strong)"
              strokeWidth={1}
              strokeDasharray="2 5"
            />
          ))}
          <line x1={c} y1={6} x2={c} y2={size - 6} stroke="var(--line)" strokeWidth={1} />
          <line x1={6} y1={c} x2={size - 6} y2={c} stroke="var(--line)" strokeWidth={1} />
        </svg>

        {/* sweep arm */}
        {!reduced && (
          <div
            aria-hidden
            className="animate-radar-sweep absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(76,224,129,0.28) 0deg, rgba(76,224,129,0.05) 48deg, transparent 70deg)",
              maskImage:
                "radial-gradient(circle closest-side, black 0 93%, transparent 94%)",
              WebkitMaskImage:
                "radial-gradient(circle closest-side, black 0 93%, transparent 94%)",
            }}
          />
        )}

        {/* blips — flare as the arm passes (delay = angle/360 * 4s) */}
        {BLIPS.map((b) => {
          const rad = ((b.angle - 90) * Math.PI) / 180;
          const x = c + Math.cos(rad) * (c - 4) * b.r;
          const y = c + Math.sin(rad) * (c - 4) * b.r;
          return (
            <span
              key={b.handle}
              aria-hidden
              className={cn(
                "absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember",
                !reduced && "animate-radar-blip",
              )}
              style={{
                left: `${(x / size) * 100}%`,
                top: `${(y / size) * 100}%`,
                // negative delay starts each blip mid-cycle, so none sit
                // fully lit waiting for the arm's first pass
                ["--d" as string]: `${(b.angle / 360) * 4 - 4}s`,
                boxShadow: "0 0 8px rgba(76,224,129,0.7)",
              }}
            />
          );
        })}
      </div>

      <div className="mt-4 space-y-1.5">
        {BLIPS.slice(0, 3).map((b) => (
          <div
            key={b.handle}
            className="flex items-center justify-between gap-2 rounded-lg border border-line bg-ink-850/60 px-3 py-1.5"
          >
            <span className="truncate font-mono text-xs text-paper-soft">{b.handle}</span>
            <span className="shrink-0 font-mono text-[10px] text-paper-faint">{b.note}</span>
          </div>
        ))}
      </div>
      <p className="mt-2.5 font-mono text-[10px] uppercase tracking-wider text-paper-faint">
        sample data · goes live with a connector
      </p>
    </div>
  );
}

/* --------------------------- sprout chart -------------------------- */

/**
 * SproutChart — the 30/60/90 curve growing out of the ground: the line
 * draws on scroll-into-view, the area fades in beneath it, milestone
 * nodes pulse at day 30 / 60 / 90.
 */
export function SproutChart({ className }: { className?: string }) {
  const reduced = useMotionPref();
  const line = "M4 92 C 40 90, 72 88, 100 80 C 132 71, 152 56, 178 38 C 198 25, 216 14, 236 8";

  const milestones = [
    { x: 100, y: 80, day: "30", label: "find your hook" },
    { x: 178, y: 38, day: "60", label: "first breakout" },
    { x: 236, y: 8, day: "90", label: "compound" },
  ];

  return (
    <div className={className}>
      <svg viewBox="0 0 240 100" className="w-full" aria-hidden>
        {/* ground line */}
        <line x1={0} y1={94} x2={240} y2={94} stroke="var(--line-strong)" strokeWidth={1} />
        {[60, 120, 180].map((x) => (
          <line key={x} x1={x} y1={92} x2={x} y2={96} stroke="var(--line-strong)" strokeWidth={1} />
        ))}

        {/* area under the curve */}
        <motion.path
          d={`${line} L 236 94 L 4 94 Z`}
          fill="url(#sprout-fill)"
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        />
        <defs>
          <linearGradient id="sprout-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(76,224,129,0.22)" />
            <stop offset="100%" stopColor="rgba(76,224,129,0)" />
          </linearGradient>
        </defs>

        {/* the growth line */}
        <motion.path
          d={line}
          fill="none"
          stroke="var(--ember)"
          strokeWidth={2}
          strokeLinecap="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* milestones */}
        {milestones.map((m, i) => (
          <motion.g
            key={m.day}
            initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.5 + i * 0.45, type: "spring", stiffness: 200, damping: 16 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <circle cx={m.x} cy={m.y} r={4.5} fill="var(--ink-900)" stroke="var(--ember)" strokeWidth={1.6} />
            <circle cx={m.x} cy={m.y} r={1.8} fill="var(--ember)" />
          </motion.g>
        ))}
      </svg>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {milestones.map((m) => (
          <div key={m.day} className="rounded-lg border border-line bg-ink-850/60 px-2.5 py-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-ember">day {m.day}</p>
            <p className="mt-0.5 text-xs text-paper-soft">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------- live checklist ------------------------- */

const PLAYBOOK_STEPS = [
  { text: "Set up bio + link funnel", done: true },
  { text: "Warm the algorithm — 5 days", done: true },
  { text: "Post your origin story", done: true },
  { text: "Reply-storm the first comments", done: false },
  { text: "Double down on what moved", done: false },
];

/** ChecklistLive — playbook steps that tick themselves as you arrive. */
export function ChecklistLive({ className }: { className?: string }) {
  const reduced = useMotionPref();
  const doneCount = PLAYBOOK_STEPS.filter((s) => s.done).length;

  return (
    <div className={className}>
      {/* progress track */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-800">
          <motion.div
            className="h-full rounded-full bg-ember"
            initial={reduced ? { scaleX: doneCount / PLAYBOOK_STEPS.length } : { scaleX: 0 }}
            whileInView={{ scaleX: doneCount / PLAYBOOK_STEPS.length }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ originX: 0 }}
          />
        </div>
        <span className="font-mono text-[11px] tabular-nums text-paper-faint">
          {doneCount}/{PLAYBOOK_STEPS.length}
        </span>
      </div>

      <div className="space-y-1.5">
        {PLAYBOOK_STEPS.map((s, i) => (
          <motion.div
            key={s.text}
            initial={reduced ? false : { opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: reduced ? 0 : 0.15 * i, duration: 0.4 }}
            className="flex items-center gap-2.5 text-sm"
          >
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                s.done
                  ? "border-ember/50 bg-ember/10 text-ember"
                  : "border-line-strong text-transparent",
              )}
            >
              {s.done && <Check size={11} strokeWidth={3} />}
            </span>
            <span className={s.done ? "text-paper-dim" : "text-paper-soft"}>
              {s.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
