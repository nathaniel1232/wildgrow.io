import * as React from "react";

/** A small unfurling-leaf glyph — the brand sprout language. */
export function Leaf({
  size = 16,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path d="M12 21C12 12 16 6 21 4c0.8 7-2.5 12-9 13Z" fill="currentColor" opacity="0.9" />
      <path d="M12 21C12 14 9 9.5 4 8c-0.7 5.5 2 10 8 11Z" fill="currentColor" opacity="0.55" />
      <path d="M12 21V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}
