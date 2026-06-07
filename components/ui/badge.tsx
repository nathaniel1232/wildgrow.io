import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "ember" | "up" | "down" | "outline" | "amber";

const tones: Record<Tone, string> = {
  default: "bg-ink-800 text-paper-soft border border-line",
  ember: "bg-ember/12 text-ember border border-ember/25",
  amber: "bg-amber/12 text-amber border border-amber/25",
  up: "bg-up/12 text-up border border-up/25",
  down: "bg-down/12 text-down border border-down/25",
  outline: "text-paper-dim border border-line-strong",
};

export function Badge({
  className,
  tone = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
