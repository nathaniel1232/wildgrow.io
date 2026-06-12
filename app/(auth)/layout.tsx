import Link from "next/link";
import { redirect } from "next/navigation";
import { Sparkles, ListChecks, CalendarRange } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { getCurrentUser } from "@/lib/auth";

const perks = [
  { icon: Sparkles, text: "AI video ideas + full scripts for your exact app" },
  { icon: ListChecks, text: "A launch playbook from setup to your first viral hit" },
  { icon: CalendarRange, text: "A 30/60/90 plan from cold start to compounding growth" },
];

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (user) redirect("/app");

  return (
    <div
      data-theme="night"
      className="relative min-h-screen bg-ink-950 text-paper lg:grid lg:grid-cols-2"
    >
      <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-line bg-ink-925 p-12 lg:flex">
        <div
          aria-hidden
          className="glow-ember pointer-events-none absolute -left-20 top-1/4 h-[420px] w-[420px] opacity-40 blur-[20px]"
        />
        <Link href="/" className="relative">
          <Logo />
        </Link>
        <div className="relative">
          <h2 className="max-w-sm font-display text-4xl font-extrabold leading-[1.05] text-paper">
            Your app deserves to be seen.
          </h2>
          <ul className="mt-8 space-y-4">
            {perks.map((p) => (
              <li key={p.text} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-ink-850 text-ember">
                  <p.icon size={16} />
                </span>
                <span className="text-sm leading-relaxed text-paper-soft">
                  {p.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="relative font-mono text-xs uppercase tracking-[0.18em] text-paper-faint">
          Organic growth engine for app founders
        </p>
      </aside>

      <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-8 inline-flex lg:hidden">
            <Logo />
          </Link>
          {children}
        </div>
      </main>
    </div>
  );
}
