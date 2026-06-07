import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "subtle";
type Size = "sm" | "md" | "lg" | "icon";

const variants: Record<Variant, string> = {
  primary:
    "bg-ember text-ink-950 font-semibold hover:bg-ember-soft shadow-[0_8px_30px_-12px_var(--ember)]",
  secondary: "bg-paper text-ink-950 font-semibold hover:bg-white",
  outline:
    "border border-line-strong text-paper hover:bg-ink-850 hover:border-paper-faint",
  ghost: "text-paper-dim hover:text-paper hover:bg-ink-850",
  subtle: "bg-ink-800 text-paper hover:bg-ink-750 border border-line",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full whitespace-nowrap transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none",
    variants[variant],
    sizes[size],
    className,
  );
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
