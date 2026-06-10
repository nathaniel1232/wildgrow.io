import { cn } from "@/lib/utils";

/**
 * WildgrowMark — original geometric "growth" mark.
 *
 * A central shoot rising from a seed point, splitting into two unfurling
 * leaves (a sprout). Drawn with clean geometric arcs — not clipart — so it
 * stays crisp at 24px and reads at hero size. Sits in a rounded tile filled
 * with the natural-green gradient; the sprout is rendered in the warm-white
 * canvas color for strong contrast on the light bg.
 */
export function WildgrowMark({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[28%] shadow-[0_4px_18px_-6px_var(--ember)]",
        className,
      )}
      style={{
        width: size,
        height: size,
        background: "linear-gradient(150deg, var(--ember-soft), var(--ember-deep))",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 32 32"
        width={size}
        height={size}
        fill="none"
        style={{ display: "block" }}
      >
        {/* central shoot — the stem rising from the seed */}
        <path
          d="M16 26V14.5"
          stroke="var(--ink-950)"
          strokeWidth={2.6}
          strokeLinecap="round"
        />
        {/* left leaf — an unfurling curve cradling the stem */}
        <path
          d="M16 17.5C16 12.6 13.4 9.1 8 8.2c-0.6 5.3 2 9 8 9.3Z"
          fill="var(--ink-950)"
        />
        {/* right leaf — taller, the new growth reaching up */}
        <path
          d="M16 15C16 8.8 19 4.9 24.5 4c0.7 6.2-2.4 10.4-8.5 11Z"
          fill="var(--ink-950)"
        />
        {/* growth spark — a small seed/spark dot at the base */}
        <circle cx="16" cy="26" r="1.7" fill="var(--ember-soft)" />
      </svg>
    </span>
  );
}

/**
 * Back-compat alias. Older imports may reference `WildfireMark`; keep this
 * re-export so nothing outside components/ui breaks during the rebrand.
 */
export const WildfireMark = WildgrowMark;

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
    <span
      className={cn("inline-flex items-center gap-2.5", className)}
      role="img"
      aria-label="Wildgrow"
    >
      <WildgrowMark size={size} />
      {withWordmark && (
        <span className="font-display text-[1.35rem] font-extrabold leading-none tracking-[-0.03em] text-paper">
          Wildgrow
        </span>
      )}
    </span>
  );
}
