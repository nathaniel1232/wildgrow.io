"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";
import { Input, Field } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  loginAction,
  signupAction,
  type AuthState,
} from "@/lib/auth-actions";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const action = mode === "signup" ? signupAction : loginAction;
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    action,
    undefined,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state?.error && (
        <div className="flex items-start gap-2.5 rounded-lg border border-down/30 bg-down/10 px-3.5 py-3 text-sm text-down">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {mode === "signup" && (
        <Field label="Name" htmlFor="name" hint="Optional — what should we call you?">
          <Input id="name" name="name" placeholder="Alex" autoComplete="name" />
        </Field>
      )}

      <Field label="Email" htmlFor="email">
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
        />
      </Field>

      <Field
        label="Password"
        htmlFor="password"
        hint={mode === "signup" ? "At least 8 characters." : undefined}
      >
        <Input
          id="password"
          name="password"
          type="password"
          required
          placeholder="••••••••"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
        />
      </Field>

      <button
        type="submit"
        disabled={pending}
        className={cn(buttonVariants({ size: "lg" }), "mt-2 w-full")}
      >
        {pending && <Loader2 size={16} className="animate-spin" />}
        {mode === "signup" ? "Create account" : "Log in"}
      </button>

      <p className="mt-1 text-center text-sm text-paper-dim">
        {mode === "signup" ? (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-ember hover:underline">
              Log in
            </Link>
          </>
        ) : (
          <>
            New to Wildgrow?{" "}
            <Link href="/onboarding" className="text-ember hover:underline">
              Start free trial
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
