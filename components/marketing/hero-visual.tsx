"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { ScriptCard, PhoneReel, SAMPLE_IDEAS } from "@/components/marketing/dioramas";
import { useMotionPref } from "@/components/motion/pref";

/**
 * HeroVisual — the product, performing its whole loop in one shot:
 * the Idea Engine writes a script live; a vine grows from the card to
 * a dark phone; the phone flickers ON and plays the post the script
 * became, views climbing. Script and reel stay in sync as ideas cycle.
 */
export function HeroVisual() {
  const reduced = useMotionPref();
  const [phoneOn, setPhoneOn] = React.useState(false);
  const [hook, setHook] = React.useState(SAMPLE_IDEAS[0].hook);

  // reduced flips on after hydration — light the screen immediately
  React.useEffect(() => {
    if (reduced) setPhoneOn(true);
  }, [reduced]);

  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      {/* the script — the deliverable, at full scale */}
      <div className="relative z-10 pr-8 sm:pr-24">
        <ScriptCard
          startDelay={0.7}
          onIdeaChange={(idea) => setHook(idea.hook)}
        />
      </div>

      {/* vine from card to phone: draws, then powers the screen on */}
      <svg
        aria-hidden
        viewBox="0 0 120 150"
        fill="none"
        className="pointer-events-none absolute -bottom-10 right-8 z-10 hidden w-[120px] text-ember sm:block"
      >
        <motion.path
          d="M6 6 C 50 18, 36 70, 64 96 S 104 120, 110 138"
          stroke="currentColor"
          strokeWidth={5}
          strokeLinecap="round"
          className="opacity-[0.12]"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M6 6 C 50 18, 36 70, 64 96 S 104 120, 110 138"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          className="opacity-70"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => setPhoneOn(true)}
        />
      </svg>

      {/* the post it becomes */}
      <motion.div
        className="absolute -bottom-16 -right-1 z-20 w-[108px] sm:-right-4 sm:w-[140px]"
        initial={reduced ? false : { opacity: 0, y: 14, rotate: 8 }}
        animate={{ opacity: 1, y: 0, rotate: 6 }}
        transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="animate-float">
          <PhoneReel on={phoneOn} hook={hook} />
        </div>
      </motion.div>

      {/* connective label */}
      <div
        className="hero-fade absolute -bottom-9 left-0 z-20 hidden items-center gap-1.5 rounded-full border border-line bg-ink-925/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-dim shadow-lift backdrop-blur sm:flex"
        style={{ ["--d" as string]: "2.4s" }}
      >
        the script <MoveRight size={12} className="text-ember" /> the post it becomes
      </div>

      {/* fallback: power on by timer (vine svg is hidden below sm) */}
      <PhonePowerTimer enabled={!phoneOn} onFire={() => setPhoneOn(true)} />
    </div>
  );
}

function PhonePowerTimer({
  enabled,
  onFire,
}: {
  enabled: boolean;
  onFire: () => void;
}) {
  // keep the callback in a ref so a parent re-render (fresh closure)
  // never tears down and restarts the one-shot backstop
  const fireRef = React.useRef(onFire);
  fireRef.current = onFire;

  React.useEffect(() => {
    if (!enabled) return;
    const id = window.setTimeout(() => fireRef.current(), 2800);
    return () => window.clearTimeout(id);
  }, [enabled]);
  return null;
}
