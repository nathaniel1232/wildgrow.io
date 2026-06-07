import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export function WildfireMark({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[28%] shadow-[0_4px_20px_-6px_var(--ember)]",
        className,
      )}
      style={{
        width: size,
        height: size,
        background: "linear-gradient(145deg, var(--ember-soft), var(--ember-deep))",
      }}
    >
      <Flame
        strokeWidth={2.4}
        className="text-ink-950"
        style={{ width: size * 0.56, height: size * 0.56 }}
        fill="currentColor"
      />
    </span>
  );
}

export function Logo({
  withWordmark = true,
  size = 30,
  className,
}: {
  withWordmark?: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <WildfireMark size={size} />
      {withWordmark && (
        <span className="font-display text-[1.35rem] font-extrabold leading-none tracking-[-0.03em] text-paper">
          Wildfire
        </span>
      )}
    </span>
  );
}
