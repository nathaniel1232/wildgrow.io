"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({
  text,
  label = "Copy",
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-line bg-ink-850 px-2.5 py-1.5 text-xs text-paper-dim transition-colors hover:border-line-strong hover:text-paper",
        className,
      )}
    >
      {copied ? (
        <>
          <Check size={13} className="text-up" /> Copied
        </>
      ) : (
        <>
          <Copy size={13} /> {label}
        </>
      )}
    </button>
  );
}
