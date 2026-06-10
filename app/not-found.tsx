import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden
        className="glow-ember pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[620px] -translate-x-1/2 opacity-30 blur-[30px]"
      />
      <div className="relative">
        <Logo />
        <p className="mt-10 font-mono text-sm uppercase tracking-[0.2em] text-ember">
          404
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-paper">
          This one didn’t go viral.
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-paper-dim">
          The page you’re looking for slipped off the for-you page. Let’s get you
          back to something that converts.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/" className={buttonVariants({})}>
            Back home
          </Link>
          <Link href="/app" className={buttonVariants({ variant: "outline" })}>
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
