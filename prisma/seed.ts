import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/db";
import type {
  ContentPillar,
  GeneratedIdea,
  GrowthPlan,
  Persona,
} from "../lib/types";

const DEMO_EMAIL = "demo@wildgrow.io";
const DEMO_PASSWORD = "wildfire123";

const pillars: ContentPillar[] = [
  {
    title: "Relatable digital chaos",
    why: "Your audience feels the pain of lost links and 47 open tabs daily. Naming it builds instant recognition.",
    formats: ["POV", "Relatable rant", "Skit"],
  },
  {
    title: "Satisfying demos",
    why: "Showing the calm 'after' inside Stash is the product selling itself — high completion, high saves.",
    formats: ["Screen demo", "Before/after", "Tutorial"],
  },
  {
    title: "Build in public",
    why: "Founder story content earns trust and rooting interest, and performs unusually well for app accounts.",
    formats: ["Talking head", "Day in the life", "Update"],
  },
  {
    title: "Second-brain tips",
    why: "Useful, save-worthy tips position Stash as the obvious tool, even when the tip isn't about Stash.",
    formats: ["Listicle", "Tutorial", "Reply to comment"],
  },
];

const persona: Persona = {
  name: "Tab-hoarder Tasha",
  bio: "27, marketing manager, takes 30 screenshots a day and saves links she never opens again. Smart, busy, mildly ashamed of her browser.",
  painPoints: [
    "Saves things everywhere and finds them nowhere",
    "47 tabs open 'just in case'",
    "Loses the one link she actually needed",
  ],
  desires: [
    "Feel on top of her inputs",
    "A calm, single home for ideas",
    "Look organized without the effort",
  ],
  wateringHoles: [
    "#productivity & #notion TikTok",
    "study-with-me and 'romanticize your life' content",
    "ADHD-friendly tools creators",
  ],
};

const plan: GrowthPlan = {
  phases: [
    {
      id: "30",
      label: "Days 1–30 · Foundation",
      range: "Weeks 1–4",
      focus: "Warm the account, find your voice, and learn what your niche rewards.",
      items: [
        { id: "p1-1", kind: "action", title: "Complete the warm-up playbook", detail: "Bio, link funnel, and 3 days of niche warming before your first post." },
        { id: "p1-2", kind: "post", title: "Post your origin story", detail: "“I built Stash because my browser had 47 tabs and I was losing my mind.”" },
        { id: "p1-3", kind: "post", title: "Ship 1 video/day, week one", detail: "Mix POV pain + a satisfying demo. Reply to every comment in hour one." },
        { id: "p1-4", kind: "milestone", title: "First 1,000 views on a single video", detail: "Your signal that a format is working. Note which one." },
      ],
    },
    {
      id: "60",
      label: "Days 31–60 · Traction",
      range: "Weeks 5–8",
      focus: "Double down on what worked and turn winners into series.",
      items: [
        { id: "p2-1", kind: "action", title: "Identify your top format", detail: "Make three more videos in the lane that popped." },
        { id: "p2-2", kind: "post", title: "Launch a 'taming my digital chaos' series", detail: "Part 1–5. Series create a reason to follow." },
        { id: "p2-3", kind: "action", title: "Repurpose every post to Reels", detail: "Watermark-free exports, same week." },
        { id: "p2-4", kind: "milestone", title: "First 10k-view video", detail: "Pin your best explainer once you cross it." },
      ],
    },
    {
      id: "90",
      label: "Days 61–90 · Momentum",
      range: "Weeks 9–12",
      focus: "Build a system, seed UGC, and convert views into installs.",
      items: [
        { id: "p3-1", kind: "action", title: "Batch a week of content in one sitting", detail: "Write, film, edit in separate blocks." },
        { id: "p3-2", kind: "action", title: "Seed 5 user videos", detail: "Ask power users to post how they use Stash." },
        { id: "p3-3", kind: "post", title: "Run an install-driving demo", detail: "Show the magic moment; one clean 'free, link in bio' CTA." },
        { id: "p3-4", kind: "milestone", title: "1,000 organic installs from content", detail: "Track via your bio link UTM." },
      ],
    },
  ],
};

const ideas: (GeneratedIdea & { status: string })[] = [
  {
    title: "POV: the app that killed your 47 tabs",
    hook: "POV: you found the app that finally killed your 47 open browser tabs.",
    format: "POV",
    lengthSec: 18,
    script: [
      { t: "0:00", label: "Hook", text: "Hold phone to face, dead serious: “I had 47 tabs open.”" },
      { t: "0:03", label: "Turn", text: "Hard cut to the app — tabs collapsing into one clean list." },
      { t: "0:09", label: "Payoff", text: "Speedrun saving 3 articles + a video. “It just… remembers.”" },
      { t: "0:15", label: "CTA", text: "“Link in bio. Your future self says thanks.”" },
    ],
    onScreen: ["47 tabs open 💀", "→ one calm list", "it just remembers"],
    caption: "my browser is finally at peace 🧘 #productivity #tabhoarder #appsthatslap",
    hashtags: ["#productivity", "#tabhoarder", "#secondbrain", "#notion", "#appsthatslap"],
    sound: "“oh no” — original audio (41.2K videos)",
    rationale:
      "Leads with a universally felt pain stated like a confession, then pays it off with a satisfying visual. High completion + save potential.",
    hookScore: 92,
    pillar: "Relatable digital chaos",
    status: "saved",
  },
  {
    title: "Why I built Stash (origin story)",
    hook: "I got so embarrassed by my browser that I quit my job to fix it.",
    format: "Talking head",
    lengthSec: 27,
    script: [
      { t: "0:00", label: "Hook", text: "Walking, mid-sentence: “I had 47 tabs and lost the ONE link I needed.”" },
      { t: "0:05", label: "Build", text: "“So I started building the app I wished existed.”" },
      { t: "0:14", label: "Demo", text: "Quick over-the-shoulder of saving + instant recall." },
      { t: "0:22", label: "CTA", text: "“It's called Stash. Free in my bio if your browser looks like mine.”" },
    ],
    onScreen: ["the link I needed: gone", "so I built this", "Stash"],
    caption: "building in public, tab chaos edition 🛠️ #buildinpublic #indiehacker #startup",
    hashtags: ["#buildinpublic", "#indiehacker", "#startup", "#productivity"],
    sound: "calm lo-fi (trending, low competition)",
    rationale:
      "Founder origin stories earn rooting interest and trust — the single best-performing first video for app accounts.",
    hookScore: 86,
    pillar: "Build in public",
    status: "new",
  },
  {
    title: "3 things I save every day",
    hook: "3 things I save to my second brain every single day.",
    format: "Listicle",
    lengthSec: 21,
    script: [
      { t: "0:00", label: "Hook", text: "“3 things I save to my second brain daily — #3 changed my work.”" },
      { t: "0:04", label: "1", text: "Screenshots of good UI → tagged 'inspo'." },
      { t: "0:10", label: "2", text: "Voice memos of shower ideas." },
      { t: "0:15", label: "3", text: "Links I'd normally lose — found in 2 seconds later." },
      { t: "0:19", label: "CTA", text: "“This is Stash. Free, link in bio.”" },
    ],
    onScreen: ["#1 UI inspo", "#2 voice memos", "#3 the lost links"],
    caption: "save-worthy or your money back 😌 #secondbrain #productivitytok #notion",
    hashtags: ["#secondbrain", "#productivitytok", "#notion", "#studywithme"],
    sound: "upbeat aesthetic (trending)",
    rationale:
      "List teases create open loops that drive completion; the value is real even for non-users, which earns saves and shares.",
    hookScore: 79,
    pillar: "Second-brain tips",
    status: "new",
  },
  {
    title: "Reply: “does it work offline?”",
    hook: "Replying to “does this actually work offline?” — watch.",
    format: "Reply to comment",
    lengthSec: 15,
    script: [
      { t: "0:00", label: "Hook", text: "Comment sticker on screen: “does it work offline?” → “let me show you.”" },
      { t: "0:03", label: "Proof", text: "Turn on airplane mode, save + open items instantly." },
      { t: "0:11", label: "CTA", text: "“Yes. Even on the subway. Link in bio.”" },
    ],
    onScreen: ["airplane mode ✈️", "still instant", "yep, offline"],
    caption: "answering the most-asked question 🫡 #productivity #appdemo",
    hashtags: ["#productivity", "#appdemo", "#offline", "#secondbrain"],
    sound: "original audio",
    rationale:
      "Comment replies get distributed to people who engaged with the original and feel authentic — strong trust + objection-handling.",
    hookScore: 83,
    pillar: "Satisfying demos",
    status: "new",
  },
  {
    title: "My screen: before vs after",
    hook: "My phone before Stash vs after. I'm a little embarrassed.",
    format: "Before/after",
    lengthSec: 16,
    script: [
      { t: "0:00", label: "Hook", text: "Show chaotic screenshots folder (2,000 items). “This was me.”" },
      { t: "0:05", label: "After", text: "Cut to one calm, searchable Stash. Satisfying scroll." },
      { t: "0:12", label: "CTA", text: "“Took 10 minutes. Free in bio.”" },
    ],
    onScreen: ["2,143 screenshots 😭", "→ searchable in seconds"],
    caption: "the glow-up my camera roll needed ✨ #digitaldeclutter #productivity",
    hashtags: ["#digitaldeclutter", "#productivity", "#secondbrain", "#aesthetic"],
    sound: "“glow up” transition sound (trending)",
    rationale:
      "Before/after is a proven satisfying format; the messy 'before' is the hook and the calm 'after' is the product.",
    hookScore: 81,
    pillar: "Satisfying demos",
    status: "new",
  },
  {
    title: "POV: your brain has 100 tabs too",
    hook: "POV: your brain has as many tabs open as your browser.",
    format: "POV",
    lengthSec: 14,
    script: [
      { t: "0:00", label: "Hook", text: "Overwhelmed look, fast whip-pan. “Everyone said just use notes.”" },
      { t: "0:04", label: "Agitate", text: "Flash through 6 half-used apps. “None of them stuck.”" },
      { t: "0:09", label: "Payoff", text: "Land on Stash, one breath, one home. Relief." },
      { t: "0:12", label: "CTA", text: "“Free. Bio.”" },
    ],
    onScreen: ["100 mental tabs", "none of them stuck", "finally"],
    caption: "if your brain needs a close-all-tabs button 🧠 #adhd #productivity",
    hashtags: ["#adhd", "#productivity", "#secondbrain", "#overwhelmed"],
    sound: "anxious-to-calm audio (trending)",
    rationale:
      "Speaks directly to the ADHD-adjacent watering hole in the persona; emotional arc from overwhelm to relief drives shares.",
    hookScore: 84,
    pillar: "Relatable digital chaos",
    status: "saved",
  },
];

const playbookDone = [
  "handle-pfp",
  "bio",
  "link-funnel",
  "swipe-file",
  "pinned",
];
const lessonsDone = ["what-the-algorithm-optimizes-for", "the-cold-start"];
const planDone = ["p1-1", "p1-2"];

async function main() {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

  const user = await prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    update: { plan: "wildfire" },
    create: { email: DEMO_EMAIL, name: "Demo Founder", passwordHash, plan: "wildfire" },
  });

  await prisma.appProfile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      appName: "Stash",
      category: "Productivity",
      oneLiner: "The second brain that actually remembers.",
      audience:
        "Overwhelmed knowledge workers and students drowning in tabs, links, and screenshots.",
      problem:
        "People save dozens of links and screenshots a day and can never find them again.",
      appStoreUrl: "https://apps.apple.com/app/stash",
      tiktokHandle: "@getstash",
      igHandle: "@getstash",
      stage: "launched",
      positioning:
        "Stash is the calm, fast home for everything you save — so your best ideas stop dying in 47 open tabs.",
      pillarsJson: JSON.stringify(pillars),
      personaJson: JSON.stringify(persona),
      planJson: JSON.stringify(plan),
      onboarded: true,
    },
  });

  // Reset demo content so the seed is idempotent.
  await prisma.idea.deleteMany({ where: { userId: user.id } });
  await prisma.progress.deleteMany({ where: { userId: user.id } });

  for (const idea of ideas) {
    const { status, script, onScreen, hashtags, ...rest } = idea;
    await prisma.idea.create({
      data: {
        userId: user.id,
        title: rest.title,
        hook: rest.hook,
        format: rest.format,
        lengthSec: rest.lengthSec,
        scriptJson: JSON.stringify(script),
        onScreenJson: JSON.stringify(onScreen),
        caption: rest.caption,
        hashtagsJson: JSON.stringify(hashtags),
        sound: rest.sound,
        rationale: rest.rationale,
        hookScore: rest.hookScore,
        pillar: rest.pillar,
        status,
      },
    });
  }

  const progressRows = [
    ...playbookDone.map((key) => ({ kind: "playbook", key })),
    ...lessonsDone.map((key) => ({ kind: "lesson", key })),
    ...planDone.map((key) => ({ kind: "plan", key })),
  ];
  for (const row of progressRows) {
    await prisma.progress.create({
      data: { userId: user.id, kind: row.kind, key: row.key },
    });
  }

  console.log(
    `Seeded demo account → ${DEMO_EMAIL} / ${DEMO_PASSWORD} (app: Stash, ${ideas.length} ideas)`,
  );
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
