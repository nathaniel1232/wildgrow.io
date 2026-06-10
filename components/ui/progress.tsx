import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  max,
  className,
  tone = "ember",
}: {
  value: number;
  max: number;
  className?: string;
  tone?: "ember" | "up";
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-ink-800",
        className,
      )}
    >
      <div
        className={cn(
          "h-full rounded-full transition-all duration-500",
          tone === "up" ? "bg-up" : "bg-ember",
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
