import * as React from "react";

/* ------------------------------------------------------------------ */
/*  Marketing visuals — clean and purposeful. No abstract filler.      */
/* ------------------------------------------------------------------ */

/** A small unfurling-leaf glyph — the brand sprout language. */
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
      <path d="M12 21C12 12 16 6 21 4c0.8 7-2.5 12-9 13Z" fill="currentColor" opacity="0.9" />
      <path d="M12 21C12 14 9 9.5 4 8c-0.7 5.5 2 10 8 11Z" fill="currentColor" opacity="0.55" />
      <path d="M12 21V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

/** A vertical short-form video device frame. Renders `children` as the screen. */
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
        "relative aspect-[9/19] w-full overflow-hidden rounded-[1.6rem] border-[3px] border-ink-900/90 bg-ink-925 p-1 shadow-lift " +
        (className ?? "")
      }
    >
      {/* notch */}
      <div className="absolute left-1/2 top-1.5 z-20 h-1 w-10 -translate-x-1/2 rounded-full bg-black/25" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.3rem]">
        {children}
      </div>
    </div>
  );
}

/**
 * ReelScreen — a vivid, minimal short-form video frame, readable even at
 * small (corner-of-the-hero) sizes. A confident green gradient so it pops
 * against the white page, a play button, a view count, and a short hook.
 * Deliberately sparse so nothing overlaps when the phone is small.
 */
export function ReelScreen() {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-ember-deep via-ember to-ember-soft">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15"
      />

      {/* view count */}
      <div className="absolute right-1.5 top-1.5">
        <span className="rounded-full bg-white/20 px-1.5 py-0.5 font-mono text-[7px] font-semibold text-white backdrop-blur">
          1.2M
        </span>
      </div>

      {/* play button */}
      <div className="absolute left-1/2 top-[44%] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/40 backdrop-blur">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="white" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>

      {/* hook + sound */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5">
        <p className="font-display text-[11px] font-extrabold leading-tight text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.55)]">
          POV: your 47 tabs, gone
        </p>
        <p className="mt-1 flex items-center gap-1 font-mono text-[7px] text-white/85">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/80" />
          original audio
        </p>
      </div>
    </div>
  );
}
