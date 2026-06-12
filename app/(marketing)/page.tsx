import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Radar,
  ListChecks,
  CalendarRange,
  GraduationCap,
  Play,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { InViewClass, Magnetic } from "@/components/motion/fx";
import {
  HeroVines,
  GrowthThread,
  FieldNote,
} from "@/components/marketing/undergrowth";
import { HeroVisual } from "@/components/marketing/hero-visual";
import {
  HookBoard,
  RadarScope,
  SproutChart,
  ChecklistLive,
} from "@/components/marketing/dioramas";
import { ProofCards } from "@/components/marketing/proof-cards";
import { Faq } from "@/components/marketing/faq";
import { Leaf } from "@/components/marketing/visuals";
import { ACADEMY_MODULES, LESSONS, lessonsByModule } from "@/lib/content/lessons";

const niches = [
  "AI tools",
  "Productivity",
  "Fitness & health",
  "Finance",
  "Mobile games",
  "Social apps",
  "Education",
  "Photo & video",
  "Mental health",
  "Developer tools",
  "Food & recipes",
  "Dating",
];

const graveyard = [
  {
    file: "draft_014.mp4",
    note: "filmed, re-watched, never posted",
    verdict: "0 views",
  },
  {
    file: "boosted_post",
    note: "$400 to the ads machine for a weekend of reach",
    verdict: "6 installs",
  },
  {
    file: "launch_tweet",
    note: "the big announcement",
    verdict: "2 likes — one was your cofounder",
  },
  {
    file: "agency_retainer",
    note: "$2.5K a month for “brand awareness”",
    verdict: "unmeasurable",
  },
];

const phases = [
  {
    n: "01",
    name: "Seed",
    title: "Tell us your app",
    body: "Two minutes, no account needed. The engine derives your positioning, your content pillars, and the exact viewer you're for.",
  },
  {
    n: "02",
    name: "Sprout",
    title: "Get your daily scripts",
    body: "Fully-written video ideas — hook, shot-by-shot beats, caption, sound — engineered around what already works in your niche.",
  },
  {
    n: "03",
    name: "Spread",
    title: "Post and compound",
    body: "The 30/60/90 plan turns posting into momentum. Every video teaches the algorithm — and you — what to make next.",
  },
];

const plans = [
  {
    name: "Wildgrow",
    price: "$29",
    cadence: "/ month",
    tagline: "Everything you need to go from posting to spreading.",
    features: [
      "Unlimited AI ideas & full scripts",
      "Niche & Competitor Radar",
      "The full launch playbook",
      "Full 30 / 60 / 90 growth plan",
      "Complete Viral Academy",
      "Hook & retention scoring",
    ],
    cta: "Start growing",
    featured: true,
  },
  {
    name: "Studio",
    price: "$79",
    cadence: "/ month",
    tagline: "For founders running a portfolio of apps.",
    features: [
      "Everything in Wildgrow",
      "Up to 5 apps / brands",
      "Priority AI generation",
      "Export to CSV & Notion",
      "Early access to scheduling",
    ],
    cta: "Start growing",
    featured: false,
  },
];

const academyModules = ACADEMY_MODULES.map((m) => {
  const lessons = lessonsByModule(m.id);
  return {
    ...m,
    lessonCount: lessons.length,
    minutes: lessons.reduce((sum, l) => sum + l.minutes, 0),
  };
}).sort((a, b) => a.order - b.order);

const academyTotalMinutes = LESSONS.reduce((sum, l) => sum + l.minutes, 0);

export default function LandingPage() {
  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden pb-32 pt-32 md:pt-40 lg:min-h-[100svh]">
        {/* nocturnal vignette */}
        <div
          aria-hidden
          className="glow-ember pointer-events-none absolute left-1/2 top-[-180px] h-[640px] w-[min(980px,98vw)] -translate-x-1/2"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-dotgrid opacity-[0.16] [mask-image:radial-gradient(56%_44%_at_50%_22%,black,transparent)]"
        />
        <HeroVines />

        <Container className="relative">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
            {/* ---- copy ---- */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="hero-fade" style={{ ["--d" as string]: "0.05s" }}>
                <FieldNote n="01" label="organic growth" />
              </div>

              <h1 className="mt-6 font-display text-[clamp(3.2rem,9vw,6.4rem)] font-extrabold leading-[0.96] tracking-[-0.03em] text-paper">
                <span className="hero-mask">
                  <span className="hero-line" style={{ ["--d" as string]: "0.12s" }}>
                    Your app,
                  </span>
                </span>
                <span className="hero-mask">
                  <span className="hero-line" style={{ ["--d" as string]: "0.24s" }}>
                    growing{" "}
                    <span className="text-gradient-ember">wild.</span>
                  </span>
                </span>
              </h1>

              <div className="hero-fade" style={{ ["--d" as string]: "0.55s" }}>
                <p className="mt-7 max-w-md text-pretty text-lg leading-relaxed text-paper-dim">
                  Wildgrow writes your scripts, reads your niche, and hands you
                  a day-by-day plan to grow on TikTok &amp; Instagram — while
                  your ad budget stays at zero. No agency. No dancing.
                </p>
              </div>

              <div className="hero-fade" style={{ ["--d" as string]: "0.75s" }}>
                <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
                  <Magnetic>
                    <Link href="/onboarding" className={buttonVariants({ size: "lg" })}>
                      Start growing <ArrowRight size={18} />
                    </Link>
                  </Magnetic>
                  <Link
                    href="/#how"
                    className={buttonVariants({ variant: "outline", size: "lg" })}
                  >
                    See how it grows
                  </Link>
                </div>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-faint">
                  free during beta · no credit card · 2-minute setup
                </p>
              </div>
            </div>

            {/* ---- the product, performing itself ---- */}
            <div className="hero-fade" style={{ ["--d" as string]: "0.5s" }}>
              <HeroVisual />
            </div>
          </div>

          {/* scroll cue — a breathing node, not a chevron */}
          <div className="mt-24 hidden flex-col items-center gap-2 lg:flex">
            <span className="animate-cue h-2 w-2 rounded-full bg-ember" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-faint">
              scroll
            </span>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------- NICHES */}
      <section className="border-y border-line bg-ink-925/60 py-7">
        <Container className="flex flex-col items-center gap-5 md:flex-row md:gap-8">
          <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-paper-faint">
            tuned for every niche
          </span>
          <div
            className="relative w-full overflow-hidden"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              maskImage:
                "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            }}
          >
            {/* two identical copies, each padded — the -50% loop lands exactly */}
            <div className="flex w-max animate-marquee">
              {[false, true].map((clone) => (
                <div
                  key={String(clone)}
                  aria-hidden={clone || undefined}
                  className="flex gap-3 pr-3"
                >
                  {niches.map((n) => (
                    <span
                      key={n}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-ink-850 px-4 py-1.5 text-sm text-paper-dim"
                    >
                      <Leaf size={12} className="text-ember" />
                      {n}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------- THE GRAVEYARD */}
      <section id="why" className="scroll-mt-24 py-24 md:py-32">
        <Container>
          <Reveal>
            <FieldNote n="02" label="where growth dies" />
            <h2 className="mt-5 max-w-2xl text-balance font-display text-3xl font-bold leading-[1.06] text-paper md:text-[2.7rem]">
              You shipped the app. Then you posted into the void.
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-paper-dim md:text-lg">
              Building was the part you&apos;re good at. Distribution is where
              great apps quietly die — a graveyard every founder recognizes.
            </p>
          </Reveal>

          {/* the ledger of dead drafts */}
          <InViewClass className="mt-12" amount={0.3}>
            <div className="overflow-hidden rounded-2xl border border-line bg-ink-925/60">
              {graveyard.map((g, i) => (
                <div
                  key={g.file}
                  className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:gap-6 md:px-7 ${
                    i > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <span className="w-40 shrink-0 font-mono text-xs text-paper-faint">
                    {g.file}
                  </span>
                  <span className="flex-1 text-[15px] text-paper-soft">
                    <span className="strike-draw">{g.note}</span>
                  </span>
                  <span className="shrink-0 font-mono text-xs text-down">
                    {g.verdict}
                  </span>
                </div>
              ))}
            </div>
          </InViewClass>

          {/* the turn */}
          <Reveal delay={0.15}>
            <div className="lit-line mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border bg-ember/[0.04] px-6 py-6 sm:flex-row sm:items-center md:px-8">
              <p className="font-display text-xl font-semibold text-paper md:text-2xl">
                It was never the app.{" "}
                <span className="text-ember">It&apos;s the distribution.</span>
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-paper-dim">
                Wildgrow exists to close exactly that gap — with scripts,
                signals, and a plan instead of luck.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <GrowthThread height={150} />

      {/* ------------------------------------------------------- HOW IT GROWS */}
      <section id="how" className="scroll-mt-24 py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <FieldNote n="03" label="germination" />
              <h2 className="mt-5 max-w-xl text-balance font-display text-3xl font-bold leading-[1.06] text-paper md:text-[2.7rem]">
                Invisible to inevitable, in three phases.
              </h2>
            </div>
          </Reveal>

          <div className="relative mx-auto mt-14 max-w-3xl">
            {/* the connecting stem */}
            <div
              aria-hidden
              className="absolute bottom-8 left-[27px] top-8 hidden w-px bg-gradient-to-b from-ember/50 via-ember/25 to-transparent sm:block"
            />
            <Stagger className="space-y-10" gap={0.14}>
              {phases.map((p) => (
                <StaggerItem key={p.n}>
                  <div className="relative flex flex-col gap-5 sm:flex-row sm:gap-8">
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-ember/30 bg-ink-900 font-mono text-sm font-semibold text-ember shadow-[0_0_30px_-8px_rgba(76,224,129,0.5)]">
                      {p.n}
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember">
                        {p.name}
                      </p>
                      <h3 className="mt-1.5 font-display text-2xl font-semibold text-paper">
                        {p.title}
                      </h3>
                      <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-paper-dim">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      <GrowthThread height={150} flip />

      {/* ----------------------------------------------------------- THE ENGINE */}
      <section id="engine" className="scroll-mt-24 py-20 md:py-28">
        <Container>
          <Reveal>
            <FieldNote n="04" label="the instruments" />
            <h2 className="mt-5 max-w-2xl text-balance font-display text-3xl font-bold leading-[1.06] text-paper md:text-[2.7rem]">
              Five instruments. One growth system.
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-paper-dim md:text-lg">
              Find the angle, write the video, prime the account, follow the
              plan, learn the craft. Watch them work:
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6">
            {/* Idea Engine — one app, five angles, scored */}
            <Reveal className="md:col-span-4">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-ink-900/60 p-6 transition-colors hover:border-ember/25 md:p-7">
                <CellHeader
                  icon={<Sparkles size={17} />}
                  title="Idea Engine"
                  blurb="Endless angles for the same app, each hook scored before you film a single frame. The winner becomes the full script you saw above."
                />
                <div className="mt-6">
                  <HookBoard />
                </div>
              </div>
            </Reveal>

            {/* Niche Radar */}
            <Reveal delay={0.06} className="md:col-span-2">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-ink-900/60 p-6 transition-colors hover:border-ember/25 md:p-7">
                <CellHeader
                  icon={<Radar size={17} />}
                  title="Niche Radar"
                  blurb="Who's already winning in your space — and why."
                />
                <div className="mt-6">
                  <RadarScope />
                </div>
              </div>
            </Reveal>

            {/* Launch Playbook */}
            <Reveal className="md:col-span-2">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-ink-900/60 p-6 transition-colors hover:border-ember/25 md:p-7">
                <CellHeader
                  icon={<ListChecks size={17} />}
                  title="Launch Playbook"
                  blurb="The exact sequence: set up, warm the algorithm, launch."
                />
                <div className="mt-6">
                  <ChecklistLive />
                </div>
              </div>
            </Reveal>

            {/* 30/60/90 */}
            <Reveal delay={0.06} className="md:col-span-2">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-ink-900/60 p-6 transition-colors hover:border-ember/25 md:p-7">
                <CellHeader
                  icon={<CalendarRange size={17} />}
                  title="30 / 60 / 90 Plan"
                  blurb="A day-by-day roadmap from cold account to first breakout."
                />
                <div className="mt-auto pt-6">
                  <SproutChart />
                </div>
              </div>
            </Reveal>

            {/* Academy */}
            <Reveal delay={0.12} className="md:col-span-2">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-ink-900/60 p-6 transition-colors hover:border-ember/25 md:p-7">
                <CellHeader
                  icon={<GraduationCap size={17} />}
                  title="Viral Academy"
                  blurb="The mechanics of short-form, taught founder-to-founder."
                />
                <div className="mt-6 space-y-2">
                  {[
                    "Hooks that stop the scroll",
                    "The retention curve",
                    "Views into installs",
                  ].map((t) => (
                    <div
                      key={t}
                      className="flex items-center gap-2.5 rounded-lg border border-line bg-ink-850/60 px-3 py-2 text-sm text-paper-soft"
                    >
                      <Play size={12} className="shrink-0 text-ember" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ ACADEMY */}
      <section
        id="academy"
        className="scroll-mt-24 border-y border-line bg-ink-925/50 py-24 md:py-32"
      >
        <Container className="grid grid-cols-1 items-start gap-14 md:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="md:sticky md:top-28">
              <FieldNote n="05" label="the craft" />
              <h2 className="mt-5 max-w-md text-balance font-display text-3xl font-bold leading-[1.06] text-paper md:text-[2.7rem]">
                Stop posting on vibes.
              </h2>
              <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-paper-dim md:text-lg">
                Short, founder-friendly lessons on the real mechanics of the
                for-you page — {LESSONS.length} lessons across{" "}
                {academyModules.length} modules, about{" "}
                {Math.round(academyTotalMinutes / 5) * 5} minutes end to end.
              </p>
              <Link href="/onboarding" className={buttonVariants({ className: "mt-8" })}>
                Open the Academy <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
          <Stagger className="space-y-2.5" gap={0.06}>
            {academyModules.map((mod) => (
              <StaggerItem key={mod.id}>
                <div className="group flex items-center gap-4 rounded-xl border border-line bg-ink-900/70 p-4 transition-colors hover:border-ember/35 md:p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-ink-850 font-mono text-sm text-ember transition-colors group-hover:bg-ember/10">
                    {String(mod.order).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-base font-medium leading-snug text-paper">
                      {mod.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-paper-dim">{mod.blurb}</p>
                  </div>
                  <span className="shrink-0 text-right font-mono text-xs text-paper-faint">
                    {mod.lessonCount} {mod.lessonCount === 1 ? "lesson" : "lessons"}
                    <span className="hidden sm:inline"> · {mod.minutes} min</span>
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <GrowthThread height={150} />

      {/* ----------------------------------------------------------- EVIDENCE */}
      <section id="evidence" className="scroll-mt-24 py-20 md:py-28">
        <Container>
          <Reveal>
            <FieldNote n="06" label="the evidence" className="justify-center text-center" />
            <h2 className="mx-auto mt-5 max-w-2xl text-balance text-center font-display text-3xl font-bold leading-[1.06] text-paper md:text-[2.7rem]">
              We didn&apos;t invent the playbook. We made it usable.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-pretty text-base leading-relaxed text-paper-dim md:text-lg">
              Wildgrow is new — so instead of stock-photo testimonials, here is
              the sourced record of the methods it&apos;s built on. Their
              numbers, not ours. Click anything to verify.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-14">
              <ProofCards />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-5 flex flex-col items-center justify-between gap-4 rounded-2xl border border-dashed border-line-strong bg-ink-900/50 px-6 py-5 text-center sm:flex-row sm:text-left">
              <p className="text-sm leading-relaxed text-paper-dim">
                <span className="font-medium text-paper">Early access.</span>{" "}
                We&apos;re building in public — real founder stories will land
                here as they happen. No fake reviews, ever.
              </p>
              <Link
                href="/onboarding"
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "shrink-0",
                })}
              >
                Be one of the first <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <GrowthThread height={150} flip />

      {/* ------------------------------------------------------------ PRICING */}
      <section id="pricing" className="scroll-mt-24 py-20 md:py-28">
        <Container>
          <Reveal>
            <FieldNote n="07" label="the exchange" className="justify-center text-center" />
            <h2 className="mx-auto mt-5 max-w-2xl text-balance text-center font-display text-3xl font-bold leading-[1.06] text-paper md:text-[2.7rem]">
              Two plans. Everything unlocked while we&apos;re in beta.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-pretty text-base leading-relaxed text-paper-dim md:text-lg">
              Sign up free — no card. When billing lands, you get a 7-day
              trial and can cancel in two clicks. Every script you generate
              stays yours.
            </p>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-3xl gap-5 md:grid-cols-2">
            {plans.map((plan) => (
              <Reveal key={plan.name} delay={plan.featured ? 0 : 0.07}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                    plan.featured
                      ? "border-ember/40 bg-ink-900 shadow-[0_0_70px_-18px_rgba(76,224,129,0.45)]"
                      : "border-line bg-ink-900/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-semibold text-paper">
                      {plan.name}
                    </h3>
                    {plan.featured ? (
                      <span className="rounded-full bg-ember px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-950">
                        most popular
                      </span>
                    ) : (
                      <span className="rounded-full border border-amber/30 bg-amber/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber">
                        for portfolios
                      </span>
                    )}
                  </div>
                  <p className="mt-1 min-h-10 text-sm text-paper-dim">{plan.tagline}</p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-extrabold text-paper">
                      {plan.price}
                    </span>
                    <span className="text-sm text-paper-faint">{plan.cadence}</span>
                  </div>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Leaf size={14} className="mt-0.5 shrink-0 text-ember" />
                        <span className="text-paper-soft">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/onboarding"
                    className={buttonVariants({
                      variant: plan.featured ? "primary" : "outline",
                      className: "mt-7 w-full",
                    })}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-paper-faint">
            billing isn&apos;t wired up during the beta — every plan is unlocked at signup
          </p>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- FAQ */}
      <section id="faq" className="scroll-mt-24 py-20 md:py-28">
        <Container className="grid grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <FieldNote n="08" label="straight answers" />
            <h2 className="mt-5 max-w-md text-balance font-display text-3xl font-bold leading-[1.06] text-paper md:text-[2.7rem]">
              The honest answers.
            </h2>
            <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-paper-dim md:text-lg">
              Including the one everyone asks about TikTok &amp; Instagram
              access.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Faq />
          </Reveal>
        </Container>
      </section>

      {/* ----------------------------------------------------------- FINAL CTA */}
      <section className="px-4 pb-24 pt-4 md:pb-32">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-ember/20 bg-ink-925 px-6 py-20 text-center md:py-28">
              {/* aurora — the forest at night, breathing */}
              <div
                aria-hidden
                className="aurora-a pointer-events-none absolute -left-1/4 -top-1/2 h-[120%] w-[90%] rounded-full opacity-60"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(27,122,67,0.5), transparent 70%)",
                }}
              />
              <div
                aria-hidden
                className="aurora-b pointer-events-none absolute -bottom-1/2 -right-1/4 h-[120%] w-[90%] rounded-full opacity-50"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(76,224,129,0.28), transparent 70%)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-dotgrid opacity-[0.1]"
              />

              <div className="relative">
                <h2 className="mx-auto max-w-2xl text-balance font-display text-4xl font-extrabold leading-[1.04] text-paper md:text-6xl">
                  Your next 10,000 users are scrolling right now.
                </h2>
                <p className="mx-auto mt-5 max-w-md text-lg text-paper-dim">
                  Give them a reason to stop. Your first scripts are ready in
                  minutes.
                </p>
                <div className="mt-9 flex justify-center">
                  <Magnetic strength={8}>
                    <Link
                      href="/onboarding"
                      className={buttonVariants({ size: "lg", className: "px-8" })}
                    >
                      Start growing <ArrowRight size={18} />
                    </Link>
                  </Magnetic>
                </div>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-faint">
                  free during beta · no credit card · cancel anytime
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function CellHeader({
  icon,
  title,
  blurb,
}: {
  icon: React.ReactNode;
  title: string;
  blurb: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-ember/25 bg-ember/10 text-ember">
          {icon}
        </span>
        <h3 className="font-display text-xl font-semibold text-paper">{title}</h3>
      </div>
      <p className="mt-2.5 text-[15px] leading-relaxed text-paper-dim">{blurb}</p>
    </div>
  );
}
