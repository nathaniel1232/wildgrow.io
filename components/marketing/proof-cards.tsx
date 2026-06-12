import { ArrowUpRight } from "lucide-react";
import { DrawnPath } from "@/components/motion/fx";

/**
 * Honest social proof — VERIFIED, externally-cited case studies.
 *
 * Critical guardrail: every number below belongs to ANOTHER company and proves
 * the *methods* Wildgrow teaches — none of these are Wildgrow's own results.
 * Each card carries a superscript citation resolved in the numbered sources
 * block below, so a skeptical founder can click through and fact-check.
 * Figures + sources come straight from research/proof-case-studies.md
 * (verified 2026-06-09). Do not fabricate Wildgrow metrics or testimonials.
 */
type ProofCard = {
  stat: string;
  company: string;
  method: string;
  body: string;
  source: string;
  href: string;
  /** tiny sparkline path drawn under the stat (240x48 viewBox) */
  spark: string;
};

const cards: ProofCard[] = [
  {
    stat: "Followers ≠ ranking",
    company: "TikTok",
    method: "Every post gets a fresh test audience",
    body:
      "In its own words: “neither follower count nor whether the account has had previous high-performing videos are direct factors in the recommendation system.” A brand-new account gets the same shot.",
    source: "TikTok Newsroom",
    href: "https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you",
    spark: "M2 24 H 60 M 70 24 H 128 M 138 24 H 196 M 206 24 H 238",
  },
  {
    stat: "~1M signups",
    company: "Robinhood",
    method: "Skip-the-line waitlist · ~$0 pre-launch ads",
    body:
      "A referral waitlist where you moved up by inviting friends drove roughly a million signups before launch — on near-zero ad spend — with the copy hitting #1 on Hacker News.",
    source: "Prefinery",
    href: "https://www.prefinery.com/blog/referral-programs/prelaunch-campaign/robinhood/",
    spark: "M2 44 C 60 42, 110 38, 150 26 S 215 6, 238 4",
  },
  {
    stat: "100K → 4M",
    company: "Dropbox",
    method: "Two-sided referral · no paid marketing",
    body:
      "A give-and-get-storage referral grew users ~3,900% in about 15 months — with no paid marketing and no full-time marketer on the team.",
    source: "Referral Rock",
    href: "https://www.referralrock.com/blog/dropbox-referral-program/",
    spark: "M2 44 C 70 43, 120 40, 160 30 S 220 8, 238 3",
  },
  {
    stat: "~$100M ARR",
    company: "Ahrefs",
    method: "Product-led content · zero salespeople",
    body:
      "By teaching instead of selling, Ahrefs grew its blog from 15K to 250K+ monthly Google visits and reached ~$100M ARR with ~69 people and no sales team. Content compounds; ads don’t.",
    source: "Ahrefs / Tim Soulo",
    href: "https://medium.com/ahrefs-marketing/how-we-grew-traffic-to-ahrefs-blog-by-1136-and-got-thousands-of-paying-customers-1fbd7e6b145a",
    spark: "M2 40 C 50 38, 90 34, 130 26 S 200 10, 238 6",
  },
  {
    stat: "~$132K MRR",
    company: "Pieter Levels · Photo AI",
    method: "Build-in-public · audience compounds",
    body:
      "Launched to $5.4K in week one, then ~$132K MRR by month 18 — built on an audience compounded in public over a decade. Distribution you own keeps paying off.",
    source: "SoftwareSeni",
    href: "https://www.softwareseni.com/building-in-public-the-10-year-distribution-strategy-behind-solo-founder-revenue/",
    spark: "M2 42 C 40 40, 80 38, 120 32 S 200 14, 238 4",
  },
];

export function ProofCards() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-6">
        {cards.map((c, i) => (
          <ProofCardItem
            key={c.company}
            card={c}
            index={i}
            className={i === 0 ? "md:col-span-6" : "md:col-span-3"}
            wide={i === 0}
          />
        ))}
      </div>

      {/* numbered sources — the receipts, in one ruled block */}
      <div className="mt-6 rounded-2xl border border-line bg-ink-925/60 px-5 py-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-faint">
          sources
        </p>
        <ol className="mt-2 space-y-1">
          {cards.map((c, i) => (
            <li key={c.href} className="flex gap-2 font-mono text-[11px] leading-relaxed">
              <span className="shrink-0 text-ember">[{i + 1}]</span>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-paper-faint underline-offset-2 transition-colors hover:text-paper hover:underline"
              >
                {c.source} — {c.company.toLowerCase()}
              </a>
            </li>
          ))}
        </ol>
        <p className="mt-3 font-mono text-[11px] text-paper-dim">
          their numbers, not ours. no fake numbers on this page — including ours.
        </p>
      </div>
    </>
  );
}

function ProofCardItem({
  card,
  index,
  className,
  wide,
}: {
  card: ProofCard;
  index: number;
  className?: string;
  wide?: boolean;
}) {
  return (
    <a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex h-full flex-col rounded-2xl border border-line bg-ink-900/80 p-6 transition-colors hover:border-ember/30 md:p-7 ${
        wide ? "md:flex-row md:items-center md:gap-10" : ""
      } ${className ?? ""}`}
    >
      <div className={wide ? "md:w-[36%] md:shrink-0" : ""}>
        <p className="font-display text-3xl font-extrabold leading-none text-gradient-ember md:text-4xl">
          {card.stat}
          <sup className="ml-1 font-mono text-xs font-medium text-paper-faint">
            [{index + 1}]
          </sup>
        </p>
        {/* drawn sparkline */}
        <svg viewBox="0 0 240 48" className="mt-3 h-7 w-36 text-ember" aria-hidden>
          <DrawnPath d={card.spark} strokeWidth={2} duration={1.4} delay={0.15 * index} />
        </svg>
        <p className="mt-2 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-paper-faint">
          {card.company}
          <ArrowUpRight
            size={12}
            className="text-paper-faint transition-colors group-hover:text-ember"
          />
        </p>
      </div>

      <div className={wide ? "mt-5 md:mt-0 md:flex-1" : "mt-5 flex flex-1 flex-col"}>
        <p className="text-sm font-medium text-paper-soft">{card.method}</p>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-paper-dim">
          {card.body}
        </p>
      </div>
    </a>
  );
}
