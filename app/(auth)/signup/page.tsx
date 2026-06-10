import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = { title: "Start free" };

export default function SignupPage() {
  return (
    <>
      <h1 className="font-display text-2xl font-bold text-paper">
        Create your account
      </h1>
      <p className="mt-1.5 text-sm text-paper-dim">
        Start your free trial — full access while we’re in beta, no card
        required.
      </p>

      <div className="mt-7">
        <AuthForm mode="signup" />
      </div>
    </>
  );
}
