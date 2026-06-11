"use client";

import { useActionState } from "react";
import { redeemCode, type RedeemState } from "@/lib/app-actions";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RedeemCode() {
  const [state, action, pending] = useActionState<RedeemState, FormData>(
    redeemCode,
    undefined,
  );

  return (
    <form
      action={action}
      className="mx-auto flex w-full max-w-sm flex-col items-center gap-2"
    >
      <div className="flex w-full items-center gap-2">
        <input
          name="code"
          required
          autoComplete="off"
          autoCapitalize="characters"
          placeholder="Enter a free-access code"
          className="h-11 flex-1 rounded-lg border border-line bg-ink-925 px-3.5 text-sm text-paper placeholder:text-paper-faint focus:border-ember focus:outline-none focus:ring-2 focus:ring-ember/20"
        />
        <button
          type="submit"
          disabled={pending}
          className={cn(buttonVariants({ variant: "outline" }), "h-11 shrink-0")}
        >
          {pending ? "Redeeming…" : "Redeem"}
        </button>
      </div>
      {state?.error && <p className="text-sm text-down">{state.error}</p>}
    </form>
  );
}
