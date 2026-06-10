import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";

const cols = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/#how", label: "How it works" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/onboarding", label: "Start free trial" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/#academy", label: "Viral Academy" },
      { href: "/#faq", label: "FAQ" },
      { href: "/login", label: "Log in" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/#why", label: "Manifesto" },
      { href: "/#faq", label: "How our data works" },
      { href: "mailto:hello@wildgrow.io", label: "Contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink-950">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-paper-dim">
              The organic growth engine for app founders. Turn your app into a
              feed-stopping machine on TikTok &amp; Instagram.
            </p>
            <p className="mt-4 font-mono text-xs tracking-wide text-paper-faint">
              wildgrow.io
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-paper-faint">
                {col.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-paper-dim transition-colors hover:text-paper"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-sm text-paper-faint md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Wildgrow Labs. Built for founders who ship.</p>
          <p className="max-w-md text-xs leading-relaxed">
            Not affiliated with TikTok or Instagram. Competitor &amp; trend data
            shown in-app is illustrative sample data unless a live provider is
            connected.
          </p>
        </div>
      </Container>
    </footer>
  );
}
