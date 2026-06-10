import type {
  ContentPillar,
  GeneratedIdea,
  GrowthPlan,
  GrowthProfile,
  Persona,
} from "@/lib/types";
import type {
  AiProfileInput,
  IdeaGenOptions,
  LaunchPost,
  SocialVideo,
  VideoAnalysis,
} from "./types";

// ---------------------------------------------------------------------------
// Text helpers — keep raw user strings grammatical by only ever dropping them
// in as standalone clauses (after a colon/dash), never mid-sentence.
// ---------------------------------------------------------------------------

function clean(s: string): string {
  return s.trim().replace(/\s+/g, " ").replace(/[.!]+$/, "");
}
function lower(s: string): string {
  return clean(s).charAt(0).toLowerCase() + clean(s).slice(1);
}
function firstWords(s: string, n: number): string {
  return clean(s).split(" ").slice(0, n).join(" ").replace(/[,;:]$/, "");
}
interface Ctx {
  app: string;
  category: string;
  oneLiner: string;
  problem: string;
  audience: string;
  audienceShort: string;
  benefit: string; // a grammatical noun phrase, safe after "you finally found ___"
  painShort: string;
}

function ctxOf(p: AiProfileInput): Ctx {
  const app = p.appName.trim() || "your app";
  const category = (p.category.trim() || "app").toLowerCase();
  const oneLiner =
    clean(p.oneLiner) || `the app for ${clean(p.audience) || "you"}`;
  const audienceShort =
    lower(firstWords(p.audience || "people", 4))
      .replace(/\s+(and|or|&|,)$/i, "")
      .trim() || "people";
  const startsWithArticle = /^(the|a|an|your)\s/i.test(oneLiner);
  const benefit = startsWithArticle
    ? lower(oneLiner)
    : `the ${category} app you'll actually keep`;
  return {
    app,
    category,
    oneLiner,
    problem:
      clean(p.problem) || "a problem people quietly struggle with every day",
    audience: clean(p.audience) || "people who want to get more done",
    audienceShort,
    benefit,
    painShort: lower(firstWords(p.problem || "the daily frustration", 7)),
  };
}

// ---------------------------------------------------------------------------
// Hashtags + sounds
// ---------------------------------------------------------------------------

const CATEGORY_TAGS: Record<string, string[]> = {
  productivity: ["#productivity", "#productivitytok", "#secondbrain"],
  health: ["#fitnesstok", "#wellness", "#healthtok"],
  fitness: ["#fitnesstok", "#gymtok", "#workout"],
  finance: ["#fintok", "#moneytok", "#personalfinance"],
  education: ["#studytok", "#learnontiktok", "#studywithme"],
  games: ["#gaming", "#mobilegaming", "#gametok"],
  social: ["#socialapp", "#newapp", "#appsoftiktok"],
  ai: ["#aitools", "#ai", "#artificialintelligence"],
  photo: ["#photography", "#editingtutorial", "#creatortools"],
  food: ["#foodtok", "#recipe", "#whatieat"],
  dating: ["#datingtips", "#dating", "#relationships"],
};

function tagsFor(category: string, build = false): string[] {
  const key = category.toLowerCase();
  const matched =
    Object.entries(CATEGORY_TAGS).find(([k]) => key.includes(k))?.[1] ?? [
      "#appsoftiktok",
      "#newapp",
      "#startup",
    ];
  const base = build
    ? ["#buildinpublic", "#indiehacker", "#startup"]
    : matched;
  return Array.from(new Set([...base, "#fyp", "#appsoftiktok"])).slice(0, 5);
}

const SOUNDS = [
  "trending original audio (low competition)",
  "calm aesthetic lo-fi (trending)",
  "“oh no” comedic original audio",
  "satisfying transition sound (trending)",
  "anxious-to-calm flip audio (trending)",
  "upbeat motivational beat (rising)",
];

// ---------------------------------------------------------------------------
// Idea blueprints — fixed, high-quality structures with safe inserts.
// ---------------------------------------------------------------------------

type Blueprint = (c: Ctx) => Omit<GeneratedIdea, "pillar" | "sound" | "hashtags">;

const BLUEPRINTS: Blueprint[] = [
  // 1. Curiosity / teardown
  (c) => ({
    title: `“Everyone just accepts this”`,
    hook: `It's kind of wild that everyone just accepts this as normal.`,
    format: "Reaction",
    lengthSec: 15,
    hookScore: 90,
    script: [
      { t: "0:00", label: "Hook", text: `Straight to camera, a little annoyed: “It's wild that everyone just… accepts this as normal.”` },
      { t: "0:03", label: "Name it", text: `Cut to the pain on screen — ${c.problem}.` },
      { t: "0:08", label: "Reveal", text: `“Turns out you don't have to.” Quick cut into ${c.app}; show the fix land.` },
      { t: "0:13", label: "CTA", text: `“It's free — link in bio.”` },
    ],
    onScreen: ["why do we accept this?", "you don't have to", c.app],
    caption: `genuinely thought it was just me 😭`,
    rationale:
      "Opens an irresistible curiosity loop ('accept what?') and pays it off with the app as the obvious fix.",
  }),
  // 2. POV relief
  (c) => ({
    title: `POV: the search is over`,
    hook: `POV: you finally found ${c.benefit}.`,
    format: "POV",
    lengthSec: 14,
    hookScore: 92,
    script: [
      { t: "0:00", label: "Hook", text: `Deadpan to camera: “POV: you finally found ${c.benefit}.”` },
      { t: "0:03", label: "Contrast", text: `Fast montage of the old, painful way — ${c.problem}.` },
      { t: "0:08", label: "Payoff", text: `Exhale, then cut to the calm version inside ${c.app}.` },
      { t: "0:12", label: "CTA", text: `“Free. Bio.”` },
    ],
    onScreen: ["the search is over", "finally", c.app],
    caption: `the relief is genuinely real 😮‍💨`,
    rationale:
      "POV makes viewers self-identify in the first second; the before→after contrast drives completion.",
  }),
  // 3. Founder confession / build-in-public
  (c) => ({
    title: `Why I built ${c.app}`,
    hook: `I built an entire app over one tiny thing that drove me insane.`,
    format: "Build in public",
    lengthSec: 24,
    hookScore: 87,
    script: [
      { t: "0:00", label: "Hook", text: `Walking, candid: “I built an entire app over one tiny thing that drove me insane.”` },
      { t: "0:05", label: "The thing", text: `The thing → ${c.problem}.` },
      { t: "0:12", label: "Build", text: `“So I made ${c.app}.” Over-the-shoulder of it actually working.` },
      { t: "0:20", label: "CTA", text: `“It's free if that's been driving you crazy too. Bio.”` },
    ],
    onScreen: ["one tiny thing", "so I built this", c.app],
    caption: `months of my life, fixed in 20 seconds for you 🛠️`,
    rationale:
      "Founder origin stories earn rooting interest and trust — the best-performing first video for app accounts.",
  }),
  // 4. "Feels illegal" listicle
  (c) => ({
    title: `3 things that feel illegal`,
    hook: `3 things this app does that honestly feel illegal to know.`,
    format: "Listicle",
    lengthSec: 19,
    hookScore: 85,
    script: [
      { t: "0:00", label: "Hook", text: `“3 things ${c.app} does that feel kind of illegal — #3 got me.”` },
      { t: "0:04", label: "1", text: `Show the first thing fast, one line of narration.` },
      { t: "0:09", label: "2", text: `Second thing — the unexpected one.` },
      { t: "0:14", label: "3", text: `Third thing — the “wait, what?” moment. (This is what they came for.)` },
      { t: "0:17", label: "CTA", text: `“Free, link in bio.”` },
    ],
    onScreen: ["#1", "#2", "#3 🤯"],
    caption: `#3 shouldn't be free but here we are`,
    rationale:
      "The list tease plus a strong #3 keeps an open loop running all the way to the payoff.",
  }),
  // 5. Relatable rant
  (c) => ({
    title: `am I the only one?`,
    hook: `Please tell me I'm not the only one who deals with this.`,
    format: "Talking head",
    lengthSec: 16,
    hookScore: 82,
    script: [
      { t: "0:00", label: "Hook", text: `Half-laughing to camera: “Please tell me I'm not the only one.”` },
      { t: "0:03", label: "Relate", text: `Spell the pain out loud → ${c.problem}.` },
      { t: "0:10", label: "Turn", text: `“Okay — I finally found a fix.” Cut to ${c.app}.` },
      { t: "0:14", label: "CTA", text: `“Bio if this is you too.”` },
    ],
    onScreen: ["it's not just me right??", "the fix:", c.app],
    caption: `comment if this is painfully you 🙃`,
    rationale:
      "Relatable rants bait 'same!' comments, and early comment velocity is the strongest first-hour push signal.",
  }),
  // 6. Reply to objection
  (c) => ({
    title: `“no way this works”`,
    hook: `Replying to “there's no way this actually works.”`,
    format: "Reply to comment",
    lengthSec: 14,
    hookScore: 84,
    script: [
      { t: "0:00", label: "Hook", text: `Comment sticker on screen: “there's no way this actually works.” → “bet.”` },
      { t: "0:03", label: "Proof", text: `Demonstrate that exact doubt live, inside ${c.app}. No cuts.` },
      { t: "0:11", label: "CTA", text: `“Yeah. It works. Free, bio.”` },
    ],
    onScreen: ["“no way”", "watch 👀", "yeah."],
    caption: `always happy to prove it 🤝`,
    rationale:
      "Comment replies ride the original video's engaged audience and feel authentic — perfect for objections.",
  }),
  // 7. Before / after
  (c) => ({
    title: `before vs after`,
    hook: `My ${c.category} setup before vs after. A little embarrassing.`,
    format: "Before/after",
    lengthSec: 15,
    hookScore: 83,
    script: [
      { t: "0:00", label: "Hook", text: `Show the messy “before” — ${c.problem}. “This was my whole life.”` },
      { t: "0:05", label: "Flip", text: `Hard transition on the beat into the clean version inside ${c.app}.` },
      { t: "0:11", label: "CTA", text: `“Took ten minutes. Free in bio.”` },
    ],
    onScreen: ["before 😭", "after ✨"],
    caption: `the glow-up I didn't know I needed`,
    rationale:
      "Before/after is a proven satisfying format — the messy before is the hook, the clean after sells itself.",
  }),
  // 8. 30-day transformation story
  (c) => ({
    title: `30 days later`,
    hook: `Nobody believes how much changed in 30 days.`,
    format: "Story",
    lengthSec: 22,
    hookScore: 80,
    script: [
      { t: "0:00", label: "Hook", text: `“30 days ago this was a disaster. Watch what changed.”` },
      { t: "0:05", label: "Before", text: `Set the old normal → ${c.problem}.` },
      { t: "0:11", label: "Arc", text: `Show the change over time — concrete, visual, satisfying.` },
      { t: "0:18", label: "CTA", text: `“One app did it: ${c.app}. Free, bio.”` },
    ],
    onScreen: ["day 1", "day 30", "the difference"],
    caption: `give it 30 days, I'm serious`,
    rationale:
      "A time-based transformation arc holds attention and makes the result feel earned, not advertised.",
  }),
];

// ---------------------------------------------------------------------------
// Generators
// ---------------------------------------------------------------------------

export function generateIdeasFallback(
  input: AiProfileInput,
  opts: IdeaGenOptions = {},
): GeneratedIdea[] {
  const c = ctxOf(input);
  const count = Math.min(Math.max(opts.count ?? 6, 1), 12);
  const offset = opts.offset ?? 0;
  const pillars =
    input.pillars && input.pillars.length
      ? input.pillars.map((p) => p.title)
      : ["Relatable pain", "Satisfying demos", "Build in public", "Useful tips"];

  const ideas: GeneratedIdea[] = [];
  for (let i = 0; i < count; i++) {
    const bpIndex = (offset + i) % BLUEPRINTS.length;
    const base = BLUEPRINTS[bpIndex](c);
    const build = base.format === "Build in public";
    ideas.push({
      ...base,
      pillar: pillars[(offset + i) % pillars.length],
      sound: SOUNDS[(offset + i) % SOUNDS.length],
      hashtags: tagsFor(input.category, build),
      // small deterministic variation so regenerated batches feel fresh
      hookScore: Math.max(70, Math.min(96, base.hookScore + ((offset + i) % 3) - 1)),
    });
  }
  return ideas;
}

export function deriveGrowthProfileFallback(
  input: AiProfileInput,
): GrowthProfile {
  const c = ctxOf(input);

  const positioning =
    `Lead with one sharp pain and own it. ${c.app} is the fastest relief for: ${c.problem}. ` +
    `Open every video on that pain as ${c.audienceShort} actually feel it, then cut to ${c.app} as the obvious fix. ` +
    `The promise viewers should remember: ${c.oneLiner}.`;

  const pillars: ContentPillar[] = [
    {
      title: "Relatable pain",
      why: `Naming the exact frustration (${c.problem}) builds instant recognition and 'that's me' comments.`,
      formats: ["POV", "Relatable rant", "Skit"],
    },
    {
      title: "Satisfying demos",
      why: `Showing the calm 'after' inside ${c.app} is the product selling itself — high completion and saves.`,
      formats: ["Screen demo", "Before/after", "Tutorial"],
    },
    {
      title: "Build in public",
      why: `Founder story and progress earn trust and rooting interest, and overperform for new app accounts.`,
      formats: ["Talking head", "Day in the life", "Update"],
    },
    {
      title: "Save-worthy tips",
      why: `Genuinely useful tips for ${c.audienceShort} position ${c.app} as the obvious tool, even when the tip isn't about it.`,
      formats: ["Listicle", "Tutorial", "Reply to comment"],
    },
  ];

  const persona: Persona = {
    name: "Your core viewer",
    bio: `Part of your audience — ${c.audience}. Smart and busy, scrolling for relief from a problem they half-accept as normal.`,
    painPoints: [
      c.problem,
      "Has tried other tools but nothing stuck",
      "Wants to feel on top of it without extra effort",
    ],
    desires: [
      "A fast, calm fix that just works",
      "To feel competent and in control",
      "Something worth recommending to a friend",
    ],
    wateringHoles: [
      `${input.category || "niche"} creators on TikTok & Reels`,
      "'day in the life' and 'romanticize your routine' content",
      "honest product reviews and 'apps I actually use' videos",
    ],
  };

  return { positioning, pillars, persona };
}

export function generatePlanFallback(input: AiProfileInput): GrowthPlan {
  const c = ctxOf(input);
  const topPillar =
    input.pillars?.[0]?.title ?? "your strongest relatable-pain angle";

  return {
    phases: [
      {
        id: "30",
        label: "Days 1–30 · Foundation",
        range: "Weeks 1–4",
        focus: `Warm the account, find your voice, and learn what your niche rewards for ${c.app}.`,
        items: [
          { id: "p1-1", kind: "action", title: "Finish the warm-up playbook", detail: "Bio, link funnel, and 3 days of niche warming before posting." },
          { id: "p1-2", kind: "post", title: "Post your origin story", detail: `Why you built ${c.app} — the pain that started it.` },
          { id: "p1-3", kind: "post", title: "Ship 1 video/day for week one", detail: "Mix relatable pain + a satisfying demo. Reply to every comment in hour one." },
          { id: "p1-4", kind: "milestone", title: "First 1,000-view video", detail: "Note which format did it — that's your lane." },
        ],
      },
      {
        id: "60",
        label: "Days 31–60 · Traction",
        range: "Weeks 5–8",
        focus: `Double down on ${topPillar} and turn winners into a series.`,
        items: [
          { id: "p2-1", kind: "action", title: "Identify your top format", detail: "Make three more in the lane that popped." },
          { id: "p2-2", kind: "post", title: "Launch a series", detail: "Part 1–5 of your best-performing angle." },
          { id: "p2-3", kind: "action", title: "Repurpose everything to Reels", detail: "Watermark-free exports, same week." },
          { id: "p2-4", kind: "milestone", title: "First 10k-view video", detail: `Pin your clearest ${c.app} explainer once you cross it.` },
        ],
      },
      {
        id: "90",
        label: "Days 61–90 · Momentum",
        range: "Weeks 9–12",
        focus: "Make consistency mechanical, seed UGC, and convert views into installs.",
        items: [
          { id: "p3-1", kind: "action", title: "Batch a week in one sitting", detail: "Separate writing, filming, and editing." },
          { id: "p3-2", kind: "action", title: "Seed 5 user videos", detail: `Ask power users to post how they use ${c.app}.` },
          { id: "p3-3", kind: "post", title: "Run an install-driving demo", detail: "Show the magic moment; one clean 'free, link in bio' CTA." },
          { id: "p3-4", kind: "milestone", title: "1,000 organic installs from content", detail: "Track via your bio-link UTM." },
        ],
      },
    ],
  };
}

export function analyzeVideoFallback(
  video: SocialVideo,
  input: AiProfileInput,
): VideoAnalysis {
  const c = ctxOf(input);
  const engagementRate = video.views
    ? (video.comments + video.likes) / video.views
    : 0;

  const why: string[] = [];
  if (/pov|relatable/i.test(video.format)) {
    why.push("The POV framing makes viewers self-identify in the first second — they're watching themselves, not an ad.");
  } else if (/demo|tutorial/i.test(video.format)) {
    why.push("It front-loads a concrete, visual payoff, so the value is obvious before anyone can swipe away.");
  } else if (/reply|comment/i.test(video.format)) {
    why.push("Built as a comment reply, it rides the original video's engaged audience and reads as authentic.");
  } else {
    why.push("A strong, specific hook sets a clear promise the video then pays off — the core of high completion.");
  }
  if (engagementRate > 0.06) {
    why.push("Unusually high comment + like rate signals it sparked replies, which the algorithm reads as 'push this further'.");
  } else {
    why.push("Tight pacing and a clean loop keep watch-time high, the single biggest driver of reach.");
  }
  why.push(`The subject is narrow and repeatable — easy for ${video.creator} to turn into a series the audience returns for.`);

  const howToAdapt =
    `Rebuild it for ${c.app}: keep the ${video.format.toLowerCase()} structure and the energy of “${video.hook}”, ` +
    `but make the subject your pain — ${c.problem}. Open on the moment ${c.audienceShort} know too well, then cut to ${c.app} as the relief.`;

  const suggestedHook = /^pov/i.test(video.hook)
    ? `POV: you finally found ${c.benefit}.`
    : `The ${c.category.toLowerCase()} app ${c.audienceShort} keep recommending — here's why.`;

  return { whyItWorked: why, howToAdapt, suggestedHook };
}

export function generateLaunchPostsFallback(
  input: AiProfileInput,
): LaunchPost[] {
  const c = ctxOf(input);
  return [
    {
      community: "r/SideProject",
      title: `I built ${c.app} — ${c.oneLiner}`,
      body:
        `I'm a solo founder, and I kept hitting the same wall: ${c.problem}.\n\n` +
        `Nothing out there fixed it the way I wanted, so I built ${c.app}. The idea in one line: ${c.oneLiner}.\n\n` +
        `Who it's for: ${c.audience}.\n\n` +
        `It's early and I'd genuinely love brutally honest feedback — what would make you actually keep using something like this? Happy to answer anything in the comments.`,
      note: "Lead with the story, not a link. Drop your link in a comment once the post gets traction, and reply to everyone fast — early engagement is everything.",
    },
    {
      community: "r/SaaS",
      title: `What I learned launching ${c.app} (and what I'd do differently)`,
      body:
        `Just launched ${c.app} — ${c.oneLiner}. Here's the honest rundown for anyone in the same boat.\n\n` +
        `The problem I went after: ${c.problem}.\n\n` +
        `What's working: short, daily demo videos that show the "after", not a feature list.\n` +
        `What flopped: a landing page that listed features nobody read.\n` +
        `Biggest surprise: naming the pain out loud resonated far more than anything clever.\n\n` +
        `Ask me anything — happy to share what I'm testing next.`,
      note: "Value-first posts outperform 'check out my app'. Give real insight first; the curiosity drives the profile clicks.",
    },
    {
      community: "Indie Hackers / your niche community",
      title: `Launched: ${c.app} (${c.oneLiner})`,
      body:
        `Quick intro — I built ${c.app} for ${c.audienceShort}.\n\n` +
        `The problem it kills: ${c.problem}.\n\n` +
        `Would love feedback from this community, especially on the onboarding and whether the core promise lands. What's the first thing you'd want to try?`,
      note: "Tailor this to each community's rules and vibe before posting — and never paste the identical post in multiple places on the same day.",
    },
  ];
}
