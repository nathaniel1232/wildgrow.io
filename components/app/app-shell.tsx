"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  Radar,
  ListChecks,
  CalendarRange,
  GraduationCap,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn, initials } from "@/lib/utils";
import { logoutAction } from "@/lib/auth-actions";

const nav = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/ideas", label: "Idea Engine", icon: Sparkles },
  { href: "/app/radar", label: "Niche Radar", icon: Radar },
  { href: "/app/playbook", label: "Launch Playbook", icon: ListChecks },
  { href: "/app/plan", label: "30 / 60 / 90 Plan", icon: CalendarRange },
  { href: "/app/academy", label: "Viral Academy", icon: GraduationCap },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

function isActive(pathname: string, href: string) {
  return href === "/app" ? pathname === "/app" : pathname.startsWith(href);
}

function SidebarContent({
  pathname,
  appName,
  userLabel,
  onNavigate,
}: {
  pathname: string;
  appName: string;
  userLabel: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 py-5">
        <Link
          href="/app"
          onClick={onNavigate}
          className="inline-flex rounded-lg focus-visible:outline-none"
        >
          <Logo />
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {nav.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-ember/10 text-ember"
                  : "text-paper-dim hover:bg-ink-850 hover:text-paper",
              )}
            >
              {active && (
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-ember"
                />
              )}
              <item.icon
                size={17}
                className={active ? "text-ember" : "text-paper-faint"}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-line p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ember/15 text-xs font-semibold text-ember">
            {initials(userLabel)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-paper">{appName}</p>
            <p className="truncate text-xs text-paper-faint">{userLabel}</p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              title="Log out"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-paper-faint transition-colors hover:bg-ink-850 hover:text-paper"
            >
              <LogOut size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function AppShell({
  appName,
  userLabel,
  children,
}: {
  appName: string;
  userLabel: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="lg:grid lg:grid-cols-[264px_1fr]">
      {/* Desktop sidebar — intentional light-tinted panel, not a flat slab */}
      <aside className="sticky top-0 hidden h-screen border-r border-line-strong bg-gradient-to-b from-ink-900 to-ink-950 lg:block">
        <SidebarContent
          pathname={pathname}
          appName={appName}
          userLabel={userLabel}
        />
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-ink-950/85 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Link href="/app">
          <Logo size={26} />
        </Link>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-paper"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-paper/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 border-r border-line-strong bg-gradient-to-b from-ink-900 to-ink-950 shadow-lift">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-paper-dim hover:text-paper"
            >
              <X size={18} />
            </button>
            <SidebarContent
              pathname={pathname}
              appName={appName}
              userLabel={userLabel}
              onNavigate={() => setOpen(false)}
            />
          </div>
        </div>
      )}

      <main className="min-w-0">{children}</main>
    </div>
  );
}
