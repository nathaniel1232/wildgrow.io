"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#how", label: "How it works" },
  { href: "/#features", label: "Features" },
  { href: "/#academy", label: "Academy" },
  { href: "/#pricing", label: "Pricing" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-ink-925/75 shadow-[0_1px_0_rgba(20,39,27,0.04),0_8px_30px_-22px_rgba(20,39,27,0.45)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-ink-925/65"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between px-6 md:px-8">
        <Link href="/" aria-label="Wildgrow home" className="relative z-50">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-paper-dim transition-colors hover:text-paper"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Log in
          </Link>
          <Link href="/onboarding" className={buttonVariants({ variant: "primary", size: "sm" })}>
            Start free trial
          </Link>
        </div>

        <button
          className="relative z-50 inline-flex h-10 w-10 items-center justify-center rounded-lg text-paper md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-16 z-40 border-t border-line bg-ink-950/95 px-6 pt-6 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-lg text-paper-soft hover:bg-ink-850"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Log in
            </Link>
            <Link
              href="/onboarding"
              onClick={() => setOpen(false)}
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Start free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
