"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { toggleProgress } from "@/lib/app-actions";

export function LessonComplete({
  slug,
  initialDone,
}: {
  slug: string;
  initialDone: boolean;
}) {
  const router = useRouter();
  const [done, setDone] = React.useState(initialDone);
  const [pending, startTransition] = React.useTransition();

  function toggle() {
    setDone((d) => !d);
    startTransition(async () => {
      await toggleProgress("lesson", slug);
      router.refresh();
    });
  }

  return (
    <button
      onClick={toggle}
      disabled={pending}
      className={buttonVariants({ variant: done ? "subtle" : "primary" })}
    >
      {pending ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Check size={16} className={done ? "text-up" : ""} />
      )}
      {done ? "Completed" : "Mark as complete"}
    </button>
  );
}
