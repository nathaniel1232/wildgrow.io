import { ArrowUpRight } from "lucide-react";

/**
 * Honest social proof — VERIFIED, externally-cited case studies.
 *
 * Critical guardrail: every number below belongs to ANOTHER company and proves
 * the *methods* Wildgrow teaches — none of these are Wildgrow's own results.
 * Each card links to its primary/sourced reference so a skeptical founder can
 * click through and fact-check. Figures + sources come straight from
 * research/proof-case-studies.md (verified 2026-06-09). Do not fabricate
 * Wildgrow metrics or testimonials.
 */
type ProofCard = {
  stat: string;
  company: string;
  /** What they did — the transferable method, in one short phrase. */
  method: string;
  /** The result, low reading load. */
  body: string;
  source: string;
  href: string;
};

const cards: ProofCard[] = [
  {
    stat: "Followers ≠ ranking",
    company: "TikTok",
    method: "Every post gets a fresh test audience",
    body:
      "In its own words: “neither follower count nor whether the account has had previous high-performing videos are direct factors in the recommendation system.” A brand-new account gets the same shot.",
    source: "TikTok Newsroom",
    href:
      "https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you",
  },
  {
    stat: "~1M signups",
    company: "Robinhood",
    method: "Skip-the-line waitlist · ~$0 pre-launch ads",
    body:
      "A referral waitlist where you moved up by inviting friends drove roughly a million signups before launch — on near-zero ad spend — with the copy hitting #1 on Hacker News.",
    source: "Prefinery",
    href:
      "https://www.prefinery.com/blog/referral-programs/prelaunch-campaign/robinhood/",
  },
  {
    stat: "100K → 4M",
    company: "Dropbox",
    method: "Two-sided referral · no paid marketing",
    body:
      "A give-and-get-storage referral grew users ~3,900% in about 15 months — with no paid marketing and no full-time marketer on the team.",
    source: "Referral Rock",
    href: "https://www.referralrock.com/blog/dropbox-referral-program/",
  },
  {
    stat: "~$100M ARR",
    company: "Ahrefs",
    method: "Product-led content · zero salespeople",
    body:
      "By teaching instead of selling, Ahrefs grew its blog from 15K to 250K+ monthly Google visits and reached ~$100M ARR with ~69 people and no sales team. Content compounds; ads don’t.",
    source: "Ahrefs / Tim Soulo",
    href:
      "https://medium.com/ahrefs-marketing/how-we-grew-traffic-to-ahrefs-blog-by-1136-and-got-thousands-of-paying-customers-1fbd7e6b145a",
  },
  {
    stat: "→ ~$132K MRR",
    company: "Pieter Levels · Photo AI",
    method: "Build-in-public · audience compounds",
    body:
      "Launched to $5.4K in week one, then ~$132K MRR by month 18 — built on an audience compounded in public over a decade. Distribution you own keeps paying off.",
    source: "SoftwareSeni",
    href:
      "https://www.softwareseni.com/building-in-public-the-10-year-distribution-strategy-behind-solo-founder-revenue/",
  },
];

export function ProofCards() {
  return (
    <div className="grid gap-5 md:grid-cols-6">
      {cards.map((c, i) => (
        <ProofCardItem
          key={c.company}
          card={c}
          /* First card spans full width on desktop as the anchor fact;
             the rest fill a clean 2 + 2 grid below it. */
          className={i === 0 ? "md:col-span-6" : "md:col-span-3"}
          wide={i === 0}
        />
      ))}
    </div>
  );
}

function ProofCardItem({
  card,
  className,
  wide,
}: {
  card: ProofCard;
  className?: string;
  wide?: boolean;
}) {
  return (
    <a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex h-full flex-col rounded-2xl border border-line bg-ink-900 p-7 transition-colors hover:border-line-strong ${
        wide ? "md:flex-row md:items-center md:gap-10" : ""
      } ${className ?? ""}`}
    >
      <div className={wide ? "md:w-[34%] md:shrink-0" : ""}>
        <p className="font-display text-3xl font-extrabold leading-none text-gradient-ember md:text-4xl">
          {card.stat}
        </p>
        <p className="mt-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-paper-faint">
          <span
            aria-hidden
            className="flex h-5 w-5 items-center justify-center rounded-md bg-ember/12 font-display text-[11px] font-bold not-italic text-ember"
          >
            {card.company.replace(/[^A-Za-z]/, "").charAt(0)}
          </span>
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
        <p className="mt-4 font-mono text-[11px] tracking-wide text-paper-faint">
          Source: {card.source} ↗
        </p>
      </div>
    </a>
  );
}
