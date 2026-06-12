import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1180px] px-6 md:px-8", className)}
      {...props}
    />
  );
}

export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-paper-dim",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-ember" />
      {children}
    </span>
  );
}

