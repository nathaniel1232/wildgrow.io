"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMotionPref } from "@/components/motion/pref";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Undergrowth atmosphere — spores, vines, field notes                */
/* ------------------------------------------------------------------ */

/**
 * SporeField — a fixed full-viewport canvas of drifting bioluminescent
 * motes. ~55 particles, DPR-capped, paused when the tab is hidden.
 * Not mounted at all under reduced motion.
 */
export function SporeField() {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const reduced = useMotionPref();

  React.useEffect(() => {
    if (reduced) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;

    type Spore = {
      x: number;
      y: number;
      r: number;
      vy: number;
      vx: number;
      phase: number;
      speed: number;
    };
    let spores: Spore[] = [];

    const seed = () => {
      const count = w < 768 ? 28 : 55;
      spores = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.3,
        vy: -(0.06 + Math.random() * 0.18),
        vx: (Math.random() - 0.5) * 0.08,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.8,
      }));
    };

    const fit = () => {
      const ow = w || window.innerWidth;
      const oh = h || window.innerHeight;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (spores.length === 0) {
        seed();
      } else {
        // keep existing particles; rescale so nothing visibly pops
        for (const s of spores) {
          s.x = (s.x / ow) * w;
          s.y = (s.y / oh) * h;
        }
      }
    };

    // debounce resize — mobile URL-bar show/hide fires it during scroll
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(fit, 150);
    };

    let t = 0;
    let last = 0;
    const tick = (now: number) => {
      if (!running) return;
      // real frame delta so speed is identical on 60Hz and 120Hz panels
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
      last = now;
      t += dt;
      const step = dt * 60;
      ctx.clearRect(0, 0, w, h);
      for (const s of spores) {
        s.y += s.vy * step;
        s.x += (s.vx + Math.sin(t * s.speed + s.phase) * 0.05) * step;
        if (s.y < -4) {
          s.y = h + 4;
          s.x = Math.random() * w;
        }
        if (s.x < -4) s.x = w + 4;
        if (s.x > w + 4) s.x = -4;
        const tw = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t * s.speed * 2 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(118, 235, 160, ${tw})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) {
        cancelAnimationFrame(raf);
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    fit();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
    />
  );
}

/**
 * HeroVines — hand-drawn bezier vines that frame the hero headline and
 * dive below the fold. They draw themselves on load (pathLength), then
 * their nodes breathe. Hidden below lg to keep mobile clean.
 */
export function HeroVines() {
  const reduced = useMotionPref();

  const vines = [
    // frames the headline whitespace, top-left
    { d: "M-20 90 C 120 70, 190 160, 150 290 S 60 470, 130 560", delay: 0.35 },
    // curls under the CTA row
    { d: "M-30 470 C 90 450, 200 480, 270 440 S 380 380, 430 410", delay: 0.6 },
    // dives below the fold — becomes the page thread
    { d: "M150 560 C 180 660, 120 740, 160 860", delay: 1.4 },
  ];

  return (
    <svg
      aria-hidden
      viewBox="0 0 460 880"
      fill="none"
      className="pointer-events-none absolute -left-10 top-0 hidden h-[880px] w-[460px] text-ember lg:block"
    >
      {vines.map((v) => (
        <g key={v.d}>
          {/* faked glow understroke */}
          <motion.path
            d={v.d}
            stroke="currentColor"
            strokeWidth={6}
            strokeLinecap="round"
            fill="none"
            className="opacity-[0.10]"
            initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: v.delay, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d={v.d}
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            fill="none"
            className="opacity-60"
            initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              delay: v.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </g>
      ))}
      {/* breathing nodes along the vines */}
      {[
        { cx: 150, cy: 290, d: "0s" },
        { cx: 270, cy: 440, d: "1.3s" },
        { cx: 160, cy: 856, d: "2.6s" },
      ].map((n) => (
        <circle
          key={`${n.cx}-${n.cy}`}
          cx={n.cx}
          cy={n.cy}
          r={3}
          fill="currentColor"
          className="animate-node origin-center"
          style={{ ["--d" as string]: n.d, transformBox: "fill-box" }}
        />
      ))}
    </svg>
  );
}

/**
 * GrowthThread — the connective tissue between sections: a sinuous
 * vertical vine segment that draws itself in lockstep with scroll and
 * lights a node when fully grown. The page-wide "spine", built as
 * independent segments so it survives responsive reflow.
 */
export function GrowthThread({
  className,
  height = 180,
  flip = false,
}: {
  className?: string;
  height?: number;
  flip?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = useMotionPref();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 45%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const nodeOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const nodeScale = useTransform(scrollYProgress, [0.85, 1], [0.4, 1]);

  const d = flip
    ? "M30 0 C 14 40, 46 80, 28 120 S 22 160, 30 180"
    : "M30 0 C 46 40, 14 80, 32 120 S 38 160, 30 180";

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none mx-auto w-[60px]", className)}
      style={{ height }}
    >
      <svg
        viewBox="0 0 60 180"
        fill="none"
        preserveAspectRatio="none"
        className="h-full w-full text-ember"
      >
        <motion.path
          d={d}
          stroke="currentColor"
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
          className="opacity-[0.10]"
          style={reduced ? undefined : { pathLength }}
        />
        <motion.path
          d={d}
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
          fill="none"
          className="opacity-60"
          style={reduced ? undefined : { pathLength }}
        />
        <motion.circle
          cx={30}
          cy={176}
          r={3}
          fill="currentColor"
          style={reduced ? undefined : { opacity: nodeOpacity, scale: nodeScale }}
        />
      </svg>
    </div>
  );
}

/** FieldNote — the naturalist's mono section label: "01 / FIELD NOTE — SIGNAL" */
export function FieldNote({
  n,
  label,
  className,
}: {
  n: string;
  label: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.18em] text-paper-faint",
        className,
      )}
    >
      <span className="text-ember">{n}</span>
      <span className="mx-2 text-line-strong">/</span>
      field note
      <span className="mx-2 text-line-strong">—</span>
      {label}
    </p>
  );
}
