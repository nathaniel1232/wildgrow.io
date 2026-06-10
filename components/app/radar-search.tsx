"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RadarSearch({
  current,
  suggestions,
}: {
  current: string;
  suggestions: string[];
}) {
  const router = useRouter();
  const [value, setValue] = React.useState(current);

  React.useEffect(() => setValue(current), [current]);

  function go(term: string) {
    const t = term.trim();
    if (!t) return;
    router.push(`/app/radar?q=${encodeURIComponent(t)}`);
  }

  return (
    <div className="space-y-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go(value);
        }}
        className="flex gap-2"
      >
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-paper-faint"
          />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search a niche, topic, or hashtag…"
            className="h-11 w-full rounded-lg border border-line bg-ink-850 pl-9 pr-3 text-sm text-paper placeholder:text-paper-faint focus:border-ember/70 focus:outline-none focus:ring-2 focus:ring-ember/25"
          />
        </div>
        <button className={buttonVariants({})}>Search</button>
      </form>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-paper-faint">Try:</span>
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => {
                setValue(s);
                go(s);
              }}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                s.toLowerCase() === current.toLowerCase()
                  ? "border-ember/40 bg-ember/10 text-ember"
                  : "border-line bg-ink-850 text-paper-dim hover:border-line-strong hover:text-paper",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
