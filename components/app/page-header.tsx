import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-line px-6 py-6 md:flex-row md:items-end md:justify-between md:px-8">
      <div>
        {eyebrow && (
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-paper-faint">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-2xl font-bold leading-tight text-paper md:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-paper-dim">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex shrink-0 items-center gap-2">{children}</div>
      )}
    </div>
  );
}

export function PageBody({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("px-6 py-6 md:px-8 md:py-8", className)}>{children}</div>
  );
}
