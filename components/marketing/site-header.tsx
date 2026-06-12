"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#how", label: "How it grows" },
  { href: "/#engine", label: "The engine" },
  { href: "/#evidence", label: "Evidence" },
  { href: "/#pricing", label: "Pricing" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLElement>(null);
  const toggleRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll lock while the menu is open — and never leak the lock: close
  // when the viewport crosses into desktop, and on Escape. The focus
  // trap spans the whole header so the close toggle stays reachable;
  // focus moves into the panel on open and back to the toggle on close.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;

    const toggle = toggleRef.current;
    const raf = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    });

    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && headerRef.current) {
        const focusables = [
          ...headerRef.current.querySelectorAll<HTMLElement>("a, button"),
        ].filter((el) => el.offsetParent !== null || el === document.activeElement);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", onChange);
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-ink-950/70 shadow-[0_8px_30px_-22px_rgba(0,0,0,0.8)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between px-6 md:px-8">
        <Link href="/" aria-label="Wildgrow home" className="relative z-50">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative text-sm text-paper-dim transition-colors hover:text-paper"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-ember transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Log in
          </Link>
          <Link href="/onboarding" className={buttonVariants({ variant: "primary", size: "sm" })}>
            Start growing
          </Link>
        </div>

        <button
          ref={toggleRef}
          className="relative z-50 inline-flex h-10 w-10 items-center justify-center rounded-lg text-paper md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 top-16 z-40 border-t border-line bg-ink-950/95 px-6 pt-6 backdrop-blur-2xl md:hidden"
          >
            <motion.nav
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            >
              {links.map((l) => (
                <motion.div
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-lg text-paper-soft hover:bg-ink-850"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
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
                Start growing
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
