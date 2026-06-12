"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { useMotionPref } from "@/components/motion/pref";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Undergrowth motion toolkit                                         */
/* ------------------------------------------------------------------ */

/**
 * An SVG path that draws itself. Without `progress`, it draws once when
 * scrolled into view; with `progress` (a MotionValue from useScroll on a
 * parent section), drawing is bound to scroll position.
 */
export function DrawnPath({
  d,
  progress,
  delay = 0,
  duration = 1.8,
  className,
  strokeWidth = 1.6,
  glow = false,
}: {
  d: string;
  progress?: MotionValue<number>;
  delay?: number;
  duration?: number;
  className?: string;
  strokeWidth?: number;
  glow?: boolean;
}) {
  const reduced = useMotionPref();

  const shared = {
    d,
    fill: "none" as const,
    stroke: "currentColor",
    strokeLinecap: "round" as const,
  };

  return (
    <>
      {/* faked glow: a fat low-alpha duplicate stroke under the live one
          (cheaper than an SVG blur filter) */}
      {glow && (
        <path
          {...shared}
          strokeWidth={strokeWidth * 4}
          className={cn(className, "opacity-[0.12]")}
        />
      )}
      {progress && !reduced ? (
        <motion.path
          {...shared}
          strokeWidth={strokeWidth}
          className={className}
          style={{ pathLength: progress }}
        />
      ) : (
        <motion.path
          {...shared}
          strokeWidth={strokeWidth}
          className={className}
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </>
  );
}

/** Adds an `in-view` class once visible — drives CSS set pieces. */
export function InViewClass({
  children,
  className,
  amount = 0.4,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
  as?: React.ElementType;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });
  return (
    <Tag ref={ref} className={cn(className, inView && "in-view")}>
      {children}
    </Tag>
  );
}

/** Magnetic hover: the child leans toward the pointer (max ~6px). */
export function Magnetic({
  children,
  className,
  strength = 6,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduced = useMotionPref();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  if (reduced) {
    return <div className={cn("inline-block", className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * strength * 2);
        y.set(((e.clientY - r.top) / r.height - 0.5) * strength * 2);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Thin phosphor scroll-progress line pinned to the viewport top. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-ember-deep via-ember to-ember-soft"
      style={{ scaleX }}
    />
  );
}

