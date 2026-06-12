"use client";

import * as React from "react";
import { MotionConfig } from "framer-motion";

/**
 * Motion preference with an explicit override.
 *
 * The site honors prefers-reduced-motion by default (every set piece
 * has a designed static end-state). `?motion=on` forces animations
 * anyway — for demos and machines where OS animations are globally
 * off; `?motion=off` forces the static version. The override also
 * toggles a body class so the CSS keyframe set pieces follow suit.
 */

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

/**
 * Hydration-safe system preference: false on the server AND on the
 * hydration render — server HTML always matches the first client
 * render — then flips immediately after mount for reduced-motion
 * users (components snap to their static end-states via effects).
 */
function useSystemReducedMotion(): boolean {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const Ctx = React.createContext<boolean | null>(null);

export function MotionRoot({ children }: { children: React.ReactNode }) {
  const sysReduced = useSystemReducedMotion();
  const [override, setOverride] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("motion");
    if (p === "on") {
      setOverride(false);
      document.body.classList.add("force-motion");
    } else if (p === "off") {
      setOverride(true);
      document.body.classList.add("reduce-motion");
    }
    return () => document.body.classList.remove("force-motion", "reduce-motion");
  }, []);

  const reduced = override ?? sysReduced;

  return (
    <Ctx.Provider value={reduced}>
      <MotionConfig reducedMotion={reduced ? "always" : "never"}>
        {children}
      </MotionConfig>
    </Ctx.Provider>
  );
}

/** True when motion should be reduced (system preference or override). */
export function useMotionPref(): boolean {
  const ctx = React.useContext(Ctx);
  const sys = useSystemReducedMotion();
  return ctx ?? sys;
}
