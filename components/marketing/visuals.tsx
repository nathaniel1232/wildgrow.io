import * as React from "react";

/* ------------------------------------------------------------------ */
/*  Marketing visuals — original SVG/CSS graphics, all token-driven.   */
/*  Botanical / growth theme on the light + natural-green palette.     */
/*  No stock photos: every illustration here is hand-built SVG so it   */
/*  stays crisp and on-brand at any size.                              */
/* ------------------------------------------------------------------ */

/**
 * GrowthField — ambient hero backdrop.
 * Soft contour lines + a few drifting "leaf" specks suggest organic,
 * compounding growth. Sits behind the hero, masked so it fades out.
 */
export function GrowthField({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="gf-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--ember-soft)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--ember)" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      {/* layered topographic growth contours */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M-50 ${560 - i * 78} C 250 ${500 - i * 78}, 470 ${
            640 - i * 78
          }, 740 ${540 - i * 78} S 1150 ${440 - i * 78}, 1260 ${500 - i * 78}`}
          stroke="url(#gf-line)"
          strokeWidth="1.25"
          opacity={0.9 - i * 0.12}
        />
      ))}
    </svg>
  );
}

/**
 * Leaf — a single unfurling leaf glyph (the brand sprout language),
 * tinted with currentColor. Used as a decorative bullet / accent.
 */
export function Leaf({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M12 21C12 12 16 6 21 4c0.8 7-2.5 12-9 13Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M12 21C12 14 9 9.5 4 8c-0.7 5.5 2 10 8 11Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M12 21V11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

/**
 * PhoneMock — a vertical short-form video device frame.
 * Renders whatever `children` you pass as the "screen". Premium glassy
 * bezel, soft lift shadow, a notch and a faux UI rail so it reads
 * instantly as a phone running a feed.
 */
export function PhoneMock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "relative aspect-[9/19] w-full overflow-hidden rounded-[2rem] border border-line-strong bg-ink-925 p-1.5 shadow-lift " +
        (className ?? "")
      }
    >
      {/* notch */}
      <div className="absolute left-1/2 top-2 z-20 h-1.5 w-16 -translate-x-1/2 rounded-full bg-paper/15" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-ink-900">
        {children}
      </div>
    </div>
  );
}

/**
 * ReelScreen — a stylised short-form video feed for inside PhoneMock.
 * Pure CSS/SVG: a soft botanical "scene", caption, and a right-rail of
 * engagement glyphs. Carries the on-screen-text + view count so the
 * value ("this turns into a real post") lands without any reading.
 */
export function ReelScreen() {
  return (
    <div className="relative h-full w-full">
      {/* video "scene" — layered green gradient + leaf silhouettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-ember-soft/30 via-ink-900 to-ink-850" />
      <svg
        aria-hidden
        viewBox="0 0 180 380"
        className="absolute inset-0 h-full w-full opacity-70"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="135" cy="60" r="46" fill="var(--ember-soft)" opacity="0.25" />
        <circle cx="40" cy="150" r="70" fill="var(--ember)" opacity="0.12" />
        <path
          d="M30 300C30 250 55 215 95 205c5 38-14 70-65 95Z"
          fill="var(--ember)"
          opacity="0.18"
        />
        <path
          d="M150 320C150 270 130 235 92 222c-4 38 15 73 58 98Z"
          fill="var(--ember-soft)"
          opacity="0.22"
        />
      </svg>

      {/* top meta */}
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-3 pt-3">
        <span className="rounded-full bg-ink-950/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-paper-soft backdrop-blur">
          For You
        </span>
        <span className="rounded-full bg-up/15 px-2 py-0.5 font-mono text-[9px] font-semibold text-up backdrop-blur">
          1.2M views
        </span>
      </div>

      {/* on-screen text overlay (the hook) */}
      <div className="absolute left-3 right-12 top-1/2 -translate-y-1/2">
        <p className="font-display text-[15px] font-extrabold leading-tight text-paper drop-shadow-sm">
          POV: the app that killed your 47 tabs
        </p>
      </div>

      {/* right engagement rail */}
      <div className="absolute bottom-16 right-2.5 flex flex-col items-center gap-3.5">
        {[
          { d: "M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z", n: "84K" },
          { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z", n: "2.1K" },
          { d: "M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13", n: "Share" },
        ].map((g, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-950/70 backdrop-blur">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d={g.d}
                  stroke="var(--paper)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="font-mono text-[8px] text-paper-soft">{g.n}</span>
          </div>
        ))}
      </div>

      {/* caption + sound */}
      <div className="absolute bottom-3 left-3 right-12">
        <p className="text-[10px] leading-snug text-paper-soft">
          @yourapp · It just remembers ✨
        </p>
        <p className="mt-1 flex items-center gap-1 font-mono text-[9px] text-paper-dim">
          <span className="inline-block h-2 w-2 rounded-full bg-ember" />
          oh no — original audio
        </p>
      </div>
    </div>
  );
}

/**
 * GrowthCurve — a compounding line chart with an area fill and a glowing
 * endpoint dot. The visual shorthand for "organic growth compounds".
 */
export function GrowthCurve({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 140"
      className={className}
      fill="none"
      aria-hidden
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="gc-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--ember)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--ember)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gc-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--ember-deep)" />
          <stop offset="100%" stopColor="var(--ember-soft)" />
        </linearGradient>
      </defs>
      <path
        d="M4 128 C 70 124, 110 116, 150 96 S 230 44, 316 12 L316 140 L4 140 Z"
        fill="url(#gc-area)"
      />
      <path
        d="M4 128 C 70 124, 110 116, 150 96 S 230 44, 316 12"
        stroke="url(#gc-line)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="316" cy="12" r="9" fill="var(--ember)" opacity="0.18" />
      <circle cx="316" cy="12" r="4" fill="var(--ember)" />
    </svg>
  );
}

/**
 * FlowConnector — the dotted, leaf-tipped path that threads the three
 * how-it-works steps together on desktop. Suggests a growing vine.
 */
export function FlowConnector({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 40"
      className={className}
      fill="none"
      aria-hidden
      preserveAspectRatio="none"
    >
      <path
        d="M40 20 C 280 -10, 380 50, 500 20 S 760 -10, 960 20"
        stroke="var(--ember)"
        strokeWidth="1.5"
        strokeDasharray="2 8"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
