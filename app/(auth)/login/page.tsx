import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <>
      <h1 className="font-display text-2xl font-bold text-paper">Welcome back</h1>
      <p className="mt-1.5 text-sm text-paper-dim">
        Log in to your growth engine.
      </p>

      <div className="mt-7">
        <AuthForm mode="login" />
      </div>

      <div className="mt-6 rounded-lg border border-line bg-ink-900 px-4 py-3 text-xs text-paper-dim">
        <span className="font-medium text-paper-soft">Just exploring?</span> Use
        the demo account —{" "}
        <span className="font-mono text-ember">demo@wildgrow.io</span> /{" "}
        <span className="font-mono text-ember">wildfire123</span>
      </div>
    </>
  );
}
