// lib/content/formats.ts
// -----------------------------------------------------------------------------
// The short-form formats that are ACTUALLY working for app growth right now
// (TikTok / Instagram), sourced from indie founders & creators on X in 2026.
//
// HONESTY: revenue / reach figures below are the creators' OWN reported claims
// (each links to its source post). They are not independently verified, so we
// attribute them as claims — never present them as established fact. The full
// step-by-step for several of these lives in the creators' videos; the steps
// here are a faithful, practical reconstruction of the named, public formats.
// -----------------------------------------------------------------------------

export type Platform = "tiktok" | "instagram";

export type FormatSource = {
  /** Creator handle on X. */
  handle: string;
  /** Direct link to the source post so a founder can verify / go deeper. */
  url: string;
  /** The creator's own reported claim (attributed, not verified). */
  claim: string;
};

export type ViralFormat = {
  id: string;
  /** Short display name. */
  name: string;
  /** One line: what it is. */
  tagline: string;
  /** Why it works — the mechanism. */
  why: string;
  /** How to actually make one, in order. */
  steps: string[];
  /** Which apps / niches it fits best. */
  bestFor: string;
  effort: "low" | "medium";
  /** How often to post this format. */
  cadence: string;
  sources: FormatSource[];
};

export const VIRAL_FORMATS: ViralFormat[] = [
  {
    id: "slideshow",
    name: "Hook + screenshot slideshow",
    tagline: "Slide 1 is a text hook. Slide 2 is a screenshot of your app. That's it.",
    why: "Photo carousels are the lowest-effort, highest-reach format on TikTok/IG right now — the feed pushes them hard, they take minutes to make, and a single sharp hook does all the work. No filming, no editing.",
    steps: [
      "Slide 1: one scroll-stopping line — the painful problem or a bold claim (e.g. \"POV: you have 47 tabs open and still can't find anything\").",
      "Slide 2: a clean screenshot (or 2s screen clip) of your app solving exactly that.",
      "Slides 3–5 (optional): proof, the 'how', or a mini before/after.",
      "Add a trending sound and 1–2 plain on-screen captions.",
      "Post 2–4 variants a day with different slide-1 hooks; keep the winners' hook style, kill the rest.",
    ],
    bestFor: "Any app with a visible 'before vs after' or a satisfying UI moment.",
    effort: "low",
    cadence: "Daily — it's your highest-volume, lowest-cost format.",
    sources: [
      {
        handle: "@adriamatz",
        url: "https://x.com/adriamatz/status/2063702613225279822",
        claim: "Reports this hook+screenshot format pulls 40M-view slideshows, and that one indie hacker hit 700K users solo doing only this.",
      },
    ],
  },
  {
    id: "ai-ugc",
    name: "AI UGC ads",
    tagline: "AI-generated, creator-style testimonial/demo videos — produced at scale for pennies.",
    why: "UGC-style ads outperform polished ones because they look native to the feed. Generating them with AI avatars/voiceovers makes each video cost cents instead of paying a creator, so you can test dozens of hooks a week and pour budget into the winners.",
    steps: [
      "Write 10+ different pain-point hooks for the first 2 seconds.",
      "Generate an AI 'creator' (avatar + voiceover) delivering the hook to camera.",
      "Hard-cut to a screen recording of the app delivering the payoff.",
      "End on a soft CTA ('link in bio' / app name), not a hard sell.",
      "Ship many variants; let watch-time/saves pick the winners, then iterate only on those.",
    ],
    bestFor: "Apps with a clear pain → relief story (utility, health, productivity, finance).",
    effort: "medium",
    cadence: "3–5 a week; scale the winning hooks.",
    sources: [
      {
        handle: "@_aaronpaul25",
        url: "https://x.com/_aaronpaul25/status/2059258328199418126",
        claim: "Credits a UGC playbook for Glam Up reaching a reported $1.8M ARR in 8 months and Sprout a reported $3M ARR in 7 months.",
      },
      {
        handle: "@adriansolarzz",
        url: "https://x.com/adriansolarzz/status/2059405294078251094",
        claim: "Reports an AI UGC production system at roughly $0.01 per second of generated video, avoiding SaaS markups.",
      },
    ],
  },
  {
    id: "ai-react",
    name: "AI react videos",
    tagline: "An AI persona reacting to / demoing your app — proven format, ~5 min to make.",
    why: "The 'react' format is already a proven attention pattern, and doing it with AI means no hiring, no scheduling, ~5 minutes per video. It pairs a relatable reaction with a live look at the product.",
    steps: [
      "Pick a reaction trigger: a wild stat, a relatable problem, or a competitor's clip.",
      "Generate an AI presenter reacting to it on camera.",
      "Cut to your app as the 'answer' to whatever they're reacting to.",
      "Keep it under ~20s; reaction first, app second, CTA last.",
    ],
    bestFor: "Apps that solve a problem people already complain about online.",
    effort: "low",
    cadence: "2–4 a week.",
    sources: [
      {
        handle: "@athcanft",
        url: "https://x.com/athcanft/status/2051595256244912331",
        claim: "Describes AI react videos as cheaper than hiring real people, ~5 mins per video, and a proven format for promoting apps.",
      },
    ],
  },
  {
    id: "faceless-ai-influencer",
    name: "Faceless AI influencer",
    tagline: "A recurring AI persona that posts consistently — with the face hidden.",
    why: "Hiding the face sidesteps the uncanny-valley problem that tanks AI-avatar videos, while a consistent character builds familiarity. It lets one founder run a 'creator account' at volume without ever being on camera.",
    steps: [
      "Design one recurring persona (voice, vibe, niche) for the account.",
      "Frame shots to avoid the face — hands, over-the-shoulder, b-roll, text-over-screen.",
      "Post on a fixed cadence so the character compounds recognition.",
      "Keep every video tied back to the app's one core use-case.",
    ],
    bestFor: "Founders who don't want to be on camera but want a consistent brand voice.",
    effort: "medium",
    cadence: "Daily-to-every-other-day for the persona account.",
    sources: [
      {
        handle: "@onlinedopamine",
        url: "https://x.com/onlinedopamine/status/2060688925669101980",
        claim: "Tip for going viral with AI slideshows/personas: hide the face of the AI influencer.",
      },
    ],
  },
  {
    id: "positioning-angle",
    name: "Problem-identifier positioning",
    tagline: "Frame the app as an instant identifier + immediate fix for one acute, emotional problem.",
    why: "People act on acute, specific problems — not on feature lists. Naming the exact problem IS the hook, and promising an immediate solution converts. The product can be simple; the positioning does the heavy lifting.",
    steps: [
      "Name the exact problem your app solves in ~3 words ('Plant Problem Identifier').",
      "Open every video with that problem stated plainly + the immediate solution.",
      "Tie it to the emotional payoff (relief, status, care, control).",
      "Repeat the same positioning across every video until it sticks.",
    ],
    bestFor: "Simple/utility apps (scanners, identifiers, fixers, trackers).",
    effort: "low",
    cadence: "Bake into every video, regardless of format.",
    sources: [
      {
        handle: "@mdnlabs",
        url: "https://x.com/mdnlabs/status/2057007274527195527",
        claim: "Reports a plant-scanner app at $9M/mo, attributing it to positioning as a 'Plant Problem Identifier' with immediate, emotional solutions.",
      },
    ],
  },
  {
    id: "proven-format-clone",
    name: "Clone a proven format",
    tagline: "Find a video format already going viral in an adjacent niche and adapt it to your app.",
    why: "Creative is the riskiest variable. Borrowing a format that's already proven removes that risk — the hook structure and visual pattern are pre-validated; you only swap in your app.",
    steps: [
      "Find apps/accounts blowing up in or near your niche (save 10–20 winning videos).",
      "Reverse-engineer the repeatable pattern: hook line, shot order, pacing, sound.",
      "Rebuild it with your app as the subject — same skeleton, your story.",
      "Post at volume and let the proven format do the work.",
    ],
    bestFor: "Any founder staring at a blank camera roll — start from what already works.",
    effort: "low",
    cadence: "Weekly: refresh your swipe file, clone the best 1–2.",
    sources: [
      {
        handle: "@jacobrodri_",
        url: "https://x.com/jacobrodri_/status/2055742070934094183",
        claim: "Reports a tanning-helper app at $50,000/month and points to the specific TikTok format it goes viral with.",
      },
      {
        handle: "@adriamatz",
        url: "https://x.com/adriamatz/status/2058611285017665975",
        claim: "Notes the 'manifestation app' video format is going crazy viral and is dead simple / low-effort to replicate.",
      },
    ],
  },
];

// -----------------------------------------------------------------------------
// Posting windows — general short-form best-practice guidance (NOT per-account
// analytics; we don't claim to read the user's real data). The planner surfaces
// these as recommended windows, honestly framed as guidance.
// -----------------------------------------------------------------------------
export type PostingWindow = { platform: Platform; windows: string[] };

export const POSTING_WINDOWS: PostingWindow[] = [
  { platform: "tiktok", windows: ["7–9am", "12–1pm", "7–10pm"] },
  { platform: "instagram", windows: ["11am–1pm", "7–9pm"] },
];

// A simple weekly cadence the "what to post today" planner assigns to days.
// Mixes the highest-leverage formats; Sunday is a lighter/rest slot.
export type CadenceDay = { day: number; formatId: string; note: string };

export const WEEKLY_CADENCE: CadenceDay[] = [
  { day: 1, formatId: "slideshow", note: "Start the week with your cheapest, highest-reach format." },
  { day: 2, formatId: "ai-ugc", note: "Test 2–3 new hooks as AI UGC ads." },
  { day: 3, formatId: "proven-format-clone", note: "Clone a winner from your swipe file." },
  { day: 4, formatId: "slideshow", note: "Double down — new hook, same screenshot pattern." },
  { day: 5, formatId: "ai-react", note: "React to a problem your niche complains about." },
  { day: 6, formatId: "positioning-angle", note: "Sharpen the one-line problem you own." },
  { day: 0, formatId: "faceless-ai-influencer", note: "Light day: one persona post, or rest + plan." },
];

export function formatById(id: string): ViralFormat | undefined {
  return VIRAL_FORMATS.find((f) => f.id === id);
}

/** The recommended format for a given day-of-week (0 = Sunday … 6 = Saturday). */
export function cadenceForDay(dayOfWeek: number): { format: ViralFormat; note: string } | undefined {
  const entry = WEEKLY_CADENCE.find((c) => c.day === dayOfWeek);
  if (!entry) return undefined;
  const format = formatById(entry.formatId);
  return format ? { format, note: entry.note } : undefined;
}
