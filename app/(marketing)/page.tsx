import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Wand2,
  Wallet,
  Sparkles,
  Radar,
  ListChecks,
  CalendarRange,
  GraduationCap,
  Check,
  Play,
} from "lucide-react";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProductPreview } from "@/components/marketing/product-preview";
import { ProofCards } from "@/components/marketing/proof-cards";
import { Faq } from "@/components/marketing/faq";
import {
  GrowthField,
  PhoneMock,
  ReelScreen,
  GrowthCurve,
  FlowConnector,
  Leaf,
} from "@/components/marketing/visuals";
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

const problems = [
  {
    icon: Eye,
    title: "Posts that flop",
    body: "Three views — two of them you.",
  },
  {
    icon: Wand2,
    title: "Nothing to film",
    body: "Blank camera roll, blinking cursor.",
  },
  {
    icon: Wallet,
    title: "Ads burn runway",
    body: "Paid growth stops when the money does.",
  },
];

const steps = [
  {
    n: "01",
    title: "Tell us your app",
    body: "Two minutes. No account needed.",
  },
  {
    n: "02",
    title: "Get your playbook",
    body: "A daily feed of fully-scripted video ideas.",
  },
  {
    n: "03",
    title: "Post & compound",
    body: "Follow the 30/60/90 plan. Momentum builds.",
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
    cta: "Start free trial",
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
    cta: "Start free trial",
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
      <section className="relative overflow-hidden pb-24 pt-36 md:pt-44">
        {/* soft growth glow */}
        <div
          aria-hidden
          className="glow-ember pointer-events-none absolute left-1/2 top-[-140px] h-[660px] w-[min(960px,96vw)] -translate-x-1/2 opacity-70 blur-[26px]"
        />
        {/* botanical contour field */}
        <GrowthField className="pointer-events-none absolute inset-x-0 top-0 h-[760px] w-full opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_28%,black,transparent)]" />
        {/* fine dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-dotgrid opacity-[0.28] [mask-image:radial-gradient(58%_46%_at_50%_26%,black,transparent)]"
        />

        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
            {/* ---- copy column (tight) ---- */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <Reveal>
                <Eyebrow>Organic growth engine for app founders</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-6 text-balance text-5xl font-extrabold leading-[0.98] text-paper md:text-7xl">
                  Silent launch to{" "}
                  <span className="text-gradient-ember">for-you page</span>.
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-paper-dim">
                  The ideas, scripts, and plan to grow your app on TikTok &amp;
                  Instagram — no ads, no agency.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
                  {["No ad budget", "No agency", "No guessing"].map((p) => (
                    <span
                      key={p}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-ink-925/70 px-3 py-1 text-sm text-paper-soft"
                    >
                      <Check size={13} className="text-ember" />
                      {p}
                    </span>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
                  <Link
                    href="/onboarding"
                    className={buttonVariants({ size: "lg" })}
                  >
                    Start free trial <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/#how"
                    className={buttonVariants({ variant: "outline", size: "lg" })}
                  >
                    <Play size={16} /> See how it works
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={0.25}>
                <p className="mt-5 text-sm text-paper-faint">
                  7-day free trial · No credit card · Cancel anytime
                </p>
              </Reveal>
            </div>

            {/* ---- visual column: phone mock + product card ---- */}
            <Reveal delay={0.2}>
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                {/* phone running a reel */}
                <div className="animate-float mx-auto w-[210px] sm:w-[240px]">
                  <PhoneMock>
                    <ReelScreen />
                  </PhoneMock>
                </div>
                {/* the generated script card, overlapping for depth */}
                <div className="relative z-10 mx-auto -mt-24 w-[min(420px,92%)] sm:-mt-28">
                  <ProductPreview />
                </div>
                {/* floating "fresh ideas" chip — accent, not a duplicate stat */}
                <div className="absolute -left-2 top-6 z-20 hidden rounded-xl border border-line bg-ink-925 px-3 py-2 shadow-lift lg:flex lg:items-center lg:gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ember/12 text-ember">
                    <Leaf size={14} />
                  </span>
                  <div className="leading-tight">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-paper-faint">
                      New ideas
                    </p>
                    <p className="font-display text-base font-bold text-paper">Daily</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------- NICHES */}
      <section className="border-y border-line bg-ink-925 py-7">
        <Container className="flex flex-col items-center gap-5 md:flex-row md:gap-8">
          <span className="shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-paper-faint">
            Tuned for every niche
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
            <div className="flex w-max animate-marquee gap-3">
              {[...niches, ...niches].map((n, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-ink-850 px-4 py-1.5 text-sm text-paper-dim"
                >
                  <Leaf size={12} className="text-ember-soft" />
                  {n}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ PROBLEM */}
      <section id="why" className="scroll-mt-24 py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The founder’s dilemma"
              title="Shipping is easy. Getting seen is where apps die."
              description="You can build a feature in a weekend. Distribution is the wall — and it’s exactly the wall Wildgrow is built to break."
            />
          </Reveal>
          <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {problems.map((p) => (
              <StaggerItem key={p.title}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-ink-900 p-7">
                  {/* faint wilting-leaf motif = the problem state */}
                  <Leaf
                    size={120}
                    className="pointer-events-none absolute -right-6 -top-6 rotate-180 text-paper-faint/10"
                  />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-ink-850 text-down">
                    <p.icon size={22} />
                  </div>
                  <h3 className="relative mt-5 font-display text-xl font-semibold text-paper">
                    {p.title}
                  </h3>
                  <p className="relative mt-2 text-[15px] leading-relaxed text-paper-dim">
                    {p.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ---------------------------------------------------------- HOW IT WORKS */}
      <section
        id="how"
        className="scroll-mt-24 border-t border-line bg-ink-925 py-24 md:py-32"
      >
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="Invisible to inevitable, in three steps."
              align="center"
              className="mx-auto items-center"
            />
          </Reveal>
          <Stagger className="relative mt-16 grid gap-6 md:grid-cols-3">
            {/* growing-vine connector behind the cards (desktop) */}
            <FlowConnector className="pointer-events-none absolute left-[14%] right-[14%] top-[2rem] hidden h-10 md:block" />
            {steps.map((s) => (
              <StaggerItem key={s.n}>
                <div className="relative h-full rounded-2xl border border-line bg-ink-900 p-7 text-center md:text-left">
                  <span className="glow-ember relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-ember/30 bg-ink-925 font-mono text-lg font-bold text-ember shadow-[0_8px_30px_-12px_var(--ember)] md:mx-0">
                    {s.n}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-paper">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-paper-dim">
                    {s.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ----------------------------------------------------------- FEATURES */}
      <section id="features" className="scroll-mt-24 py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The engine"
              title="Five tools. One growth system."
              description="Find the angle, write the video, prime the account, follow the plan, learn the craft."
            />
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {/* Idea Engine — large */}
            <Reveal className="md:col-span-2">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-line bg-ink-900 p-7">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ember/12 text-ember">
                      <Sparkles size={18} />
                    </span>
                    <h3 className="font-display text-xl font-semibold text-paper">
                      Idea Engine
                    </h3>
                  </div>
                  <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-paper-dim">
                    Endless video ideas built around your app — each a full
                    shot-by-shot script.
                  </p>
                </div>
                <div className="mt-6 space-y-2.5">
                  {[
                    "POV: the app that killed your 47 browser tabs",
                    "3 settings that doubled my deep-work hours",
                    "“Does this work offline?” → demo",
                  ].map((h) => (
                    <div
                      key={h}
                      className="flex items-center gap-3 rounded-lg border border-line bg-ink-850 px-3.5 py-2.5"
                    >
                      <Badge tone="ember" className="shrink-0">
                        Hook
                      </Badge>
                      <span className="truncate text-sm text-paper-soft">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Radar */}
            <Reveal delay={0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-ink-900 p-7">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ember/12 text-ember">
                    <Radar size={18} />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-paper">
                    Niche Radar
                  </h3>
                </div>
                <p className="mt-2.5 text-[15px] leading-relaxed text-paper-dim">
                  See who’s already winning in your space.
                </p>
                <div className="mt-6 space-y-2.5">
                  {[
                    { h: "@focusflow", v: "1.2M" },
                    { h: "@notion.nerd", v: "840K" },
                    { h: "@deepworkdaily", v: "402K" },
                  ].map((c) => (
                    <div
                      key={c.h}
                      className="flex items-center justify-between rounded-lg border border-line bg-ink-850 px-3 py-2"
                    >
                      <span className="text-sm text-paper-soft">{c.h}</span>
                      <span className="font-mono text-xs text-up">{c.v}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-paper-faint">
                  Sample data · live with a connector
                </p>
              </div>
            </Reveal>

            {/* Playbook */}
            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-ink-900 p-7">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ember/12 text-ember">
                    <ListChecks size={18} />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-paper">
                    Launch Playbook
                  </h3>
                </div>
                <p className="mt-2.5 text-[15px] leading-relaxed text-paper-dim">
                  The exact sequence: set up, warm the algorithm, launch.
                </p>
                <div className="mt-6 space-y-2">
                  {[
                    "Set up bio + link funnel",
                    "Train your FYP for 5 days",
                    "Post your origin story",
                  ].map((t, i) => (
                    <div key={t} className="flex items-center gap-2.5 text-sm">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          i < 2
                            ? "border-up/40 bg-up/10 text-up"
                            : "border-line text-paper-faint"
                        }`}
                      >
                        {i < 2 ? <Check size={12} /> : ""}
                      </span>
                      <span
                        className={
                          i < 2
                            ? "text-paper-dim line-through"
                            : "text-paper-soft"
                        }
                      >
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Plan — now with a real growth curve */}
            <Reveal delay={0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-ink-900 p-7">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ember/12 text-ember">
                    <CalendarRange size={18} />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-paper">
                    30 / 60 / 90 Plan
                  </h3>
                </div>
                <p className="mt-2.5 text-[15px] leading-relaxed text-paper-dim">
                  A day-by-day roadmap to your first breakout.
                </p>
                <div className="mt-auto pt-6">
                  <GrowthCurve className="h-24 w-full" />
                  <span className="mt-2 block font-mono text-[10px] uppercase tracking-wider text-paper-faint">
                    Projected reach · weeks 1–8
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Academy */}
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-ink-900 p-7">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ember/12 text-ember">
                    <GraduationCap size={18} />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-paper">
                    Viral Academy
                  </h3>
                </div>
                <p className="mt-2.5 text-[15px] leading-relaxed text-paper-dim">
                  Learn short-form like a creator who’s done it 10,000 times.
                </p>
                <div className="mt-6 space-y-2">
                  {[
                    "Hooks that stop the scroll",
                    "The retention curve",
                    "Views into installs",
                  ].map((t) => (
                    <div
                      key={t}
                      className="flex items-center gap-2.5 rounded-lg border border-line bg-ink-850 px-3 py-2 text-sm text-paper-soft"
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
        className="scroll-mt-24 border-y border-line bg-ink-925 py-24 md:py-32"
      >
        <Container className="grid items-start gap-14 md:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="md:sticky md:top-28">
              <SectionHeading
                eyebrow="Viral Academy"
                title="Stop posting on vibes."
                description="Short, founder-friendly lessons on the real mechanics of the for-you page."
              />
              <div className="mt-7 flex flex-wrap items-center gap-2">
                <Badge tone="ember">{LESSONS.length} lessons</Badge>
                <Badge tone="outline">{academyModules.length} modules</Badge>
                <Badge tone="outline">
                  ~{Math.round(academyTotalMinutes / 5) * 5} min total
                </Badge>
              </div>
              <Link
                href="/onboarding"
                className={buttonVariants({ className: "mt-8" })}
              >
                Open the Academy <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-2.5">
              {academyModules.map((mod) => (
                <div
                  key={mod.id}
                  className="group flex items-center gap-4 rounded-xl border border-line bg-ink-900 p-4 transition-colors hover:border-ember/40 md:p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-ink-850 font-mono text-sm text-ember transition-colors group-hover:bg-ember/10">
                    {String(mod.order).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-base font-medium leading-snug text-paper">
                      {mod.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-paper-dim">
                      {mod.blurb}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-paper-faint">
                    {mod.lessonCount}{" "}
                    {mod.lessonCount === 1 ? "lesson" : "lessons"}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* -------------------------------------------------- WHY IT WORKS / PROOF */}
      <section className="py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Why this works"
              title="We didn’t invent the playbook. We made it usable."
              description="Wildgrow is new — so instead of stock-photo testimonials, here’s the honest case: real, sourced results from the companies whose methods this is built on. Their numbers, not ours — click any card to verify."
              align="center"
              className="mx-auto items-center"
            />
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-14">
              <ProofCards />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-5 flex flex-col items-center justify-between gap-4 rounded-2xl border border-dashed border-line-strong bg-ink-900/70 px-6 py-5 text-center sm:flex-row sm:text-left">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ember/12 text-ember">
                  <Sparkles size={16} />
                </span>
                <p className="text-sm leading-relaxed text-paper-dim">
                  <span className="font-medium text-paper">Early access.</span>{" "}
                  Those are other teams’ results — proof the methods work, not
                  Wildgrow’s own numbers. We’re building in public, so real
                  founder stories will land here as they happen. No fake reviews,
                  ever.
                </p>
              </div>
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

      {/* ------------------------------------------------------------ PRICING */}
      <section
        id="pricing"
        className="scroll-mt-24 border-t border-line bg-ink-925 py-24 md:py-32"
      >
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Pricing"
              title="One simple plan. Cancel anytime."
              description="Start free — no card required. Everything unlocked while we’re in beta."
              align="center"
              className="mx-auto items-center"
            />
          </Reveal>
          <div className="mx-auto mt-14 grid max-w-3xl gap-5 md:grid-cols-2">
            {plans.map((plan) => (
              <Reveal key={plan.name} delay={plan.featured ? 0.05 : 0}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                    plan.featured
                      ? "border-ember/40 bg-ink-900 shadow-[0_24px_60px_-30px_var(--ember)]"
                      : "border-line bg-ink-900"
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ember px-3 py-1 text-xs font-semibold text-ink-950">
                      Most popular
                    </span>
                  )}
                  <h3 className="font-display text-lg font-semibold text-paper">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-paper-dim">{plan.tagline}</p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-extrabold text-paper">
                      {plan.price}
                    </span>
                    <span className="text-sm text-paper-faint">
                      {plan.cadence}
                    </span>
                  </div>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check size={16} className="mt-0.5 shrink-0 text-ember" />
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
          <p className="mt-6 text-center text-xs text-paper-faint">
            Billing isn’t wired up during the beta — every plan is unlocked when
            you sign up.
          </p>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- FAQ */}
      <section id="faq" className="scroll-mt-24 py-24 md:py-32">
        <Container className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Questions"
              title="The honest answers."
              description="Including the one everyone asks about TikTok & Instagram access."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Faq />
          </Reveal>
        </Container>
      </section>

      {/* ----------------------------------------------------------- FINAL CTA */}
      <section className="relative overflow-hidden border-t border-line py-28">
        <div
          aria-hidden
          className="glow-ember pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[820px] -translate-x-1/2 -translate-y-1/2 opacity-60 blur-[18px]"
        />
        <GrowthField className="pointer-events-none absolute inset-0 h-full w-full opacity-50 [mask-image:radial-gradient(60%_70%_at_50%_50%,black,transparent)]" />
        <Container className="relative flex flex-col items-center text-center">
          <Reveal>
            <h2 className="max-w-2xl text-balance font-display text-4xl font-extrabold leading-[1.05] text-paper md:text-6xl">
              Your next 10,000 users are scrolling right now.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-lg text-paper-dim">
              Give them something worth stopping for. Your first ideas are ready
              in minutes.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href="/onboarding"
              className={buttonVariants({ size: "lg", className: "mt-9" })}
            >
              Start free trial <ArrowRight size={18} />
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
