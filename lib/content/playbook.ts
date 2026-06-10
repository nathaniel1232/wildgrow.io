import type { PlaybookStep } from "@/lib/types";

export const PLAYBOOK_PHASES = [
  "Set up the account",
  "Warm up the algorithm",
  "Launch",
  "Compound",
] as const;

export const PLAYBOOK_STEPS: PlaybookStep[] = [
  // ---- Set up the account ------------------------------------------------
  {
    key: "handle-pfp",
    phase: "Set up the account",
    title: "Pick a brand handle + a clear profile photo",
    detail:
      "Use your app name (or close) as the handle, and a clean logo or a founder face as the photo. It needs to look like an intentional brand, not a throwaway account the algorithm has no reason to trust.",
  },
  {
    key: "bio",
    phase: "Set up the account",
    title: "Write a bio that says what it does + who it's for",
    detail:
      "This is your Frame, made public. A visitor decides to follow in about a second. Format: [the outcome] for [who]. Then one line of personality. Lead with the result — “get your focus back”, not “a productivity app”. A sharp niche outperforms a broad one: Notion's breakout was “Notion for Students”, not “Notion for everyone.”",
    tip: "Narrowing your “who” widens your reach — the algorithm matches a sharp niche to an audience faster than a vague “for everyone.”",
  },
  {
    key: "link-funnel",
    phase: "Set up the account",
    title: "Point your one bio link straight to the store",
    detail:
      "Link to the App Store / Play Store (or a one-tap landing page that detects the device), and add UTM tags so you can later see which videos actually drove installs. Keep it to a single link — every extra choice loses installs.",
  },
  {
    key: "swipe-file",
    phase: "Set up the account",
    title: "Build a swipe file of what's already winning",
    detail:
      "Open the Niche Radar (or search your niche on TikTok and sort by most-liked) and save 10–20 videos whose hooks, formats, and sounds are crushing. This is your menu of proven concepts — copy the structure, make the subject your app. Watch the first two seconds especially: completion rate is the dominant ranking signal, so the openers that win are the ones to study. This file directly feeds the “clone a proven format” play in the Academy's 2026 formats module.",
    tip: "You're not stealing content, you're reverse-engineering formats. The format is what's working; your app is the new subject.",
  },
  {
    key: "pinned",
    phase: "Set up the account",
    title: "Script your pinned “what is this” video",
    detail:
      "New followers binge your profile, so plan one crisp ~20-second video that states the problem and shows the app solving it. You'll pin this once it's live — it's the explainer that converts curious visitors into installs.",
  },

  // ---- Warm up the algorithm ---------------------------------------------
  {
    key: "warm-week",
    phase: "Warm up the algorithm",
    title: "Warm up for a full week — just scroll, don't post",
    detail:
      "This is what warming up actually means, and it takes a week minimum. Once your profile is set up, don't post and don't touch the account — just open the app each day and behave like a normal user in your niche: scroll, watch to the end, like, and follow. You're training the For You Page to learn exactly who this account is for, so your very first test batch is full of the right people instead of a random crowd.",
    tip: "Give it 7+ days. You're ready to start posting when your For You / Explore page is almost entirely your niche.",
  },
  {
    key: "no-edits",
    phase: "Warm up the algorithm",
    title: "Don't edit the account while it warms up",
    detail:
      "Resist tweaking your bio, posting, or changing anything during the warm-up week. You already did the setup — now any early edits or posts just muddy the niche signal the algorithm is building. Be patient and let it categorize you.",
  },
  {
    key: "engage-natural",
    phase: "Warm up the algorithm",
    title: "Behave like a real fan, not a marketer",
    detail:
      "Like, follow, and occasionally comment the way a genuine enthusiast would — never promotionally. Natural, human behavior is the signal the algorithm trusts; anything automated or salesy sets the warm-up back.",
  },

  // ---- Launch ------------------------------------------------------------
  {
    key: "consistency",
    phase: "Launch",
    title: "Commit to 1–2 posts a day — every single day",
    detail:
      "This is the one non-negotiable. Each post is another free shot at the broadcast the platform hands you, so volume is the engine: Duolingo rode relentless output to 143 videos over 1M views (startupspells.com). The indie founders who break through post one to two short videos a day and push through the brutal zero-traction phase where nothing seems to happen. Treat it like building a muscle, not a slot machine. The days you post, downloads move; the days you don't, they don't.",
    tip: "Block the first hour of your day for content. Keep links in your bio only at first — pasting external links too early can suppress reach.",
  },
  {
    key: "first-7-posts",
    phase: "Launch",
    title: "Plan your first 7 posts: 3 slideshows / 2 AI UGC / 1 clone / 1 react",
    detail:
      "Don't agonize over what to post — run the formats that are actually working for indie founders right now (see the Academy's “Formats that work right now (2026)” module). A proven week-one mix: 3 hook+screenshot slideshows (slide 1 = a painful one-liner, slide 2 = your app solving it — your cheapest, highest-reach format), 2 AI UGC ads (a pain-point hook to camera, hard-cut to a screen recording), 1 clone of a winner from your swipe file, and 1 AI react video reacting to a problem your niche already complains about. Bake your one-line problem-identifier positioning into all seven. Each is its own free shot at the broadcast — ship variants and let completion pick the winners.",
    tip: "Post in the recommended windows: TikTok 7–9am, 12–1pm, or 7–10pm; Instagram Reels 11am–1pm or 7–9pm. These are general best-practice guidance, not your account's analytics.",
  },
  {
    key: "origin",
    phase: "Launch",
    title: "Open with your build / origin story",
    detail:
      "“I was so annoyed by X that I built an app to fix it.” Founder origin stories are the highest-performing first video for app accounts — they give people a reason to root for you, the same build-in-public trust that turned Pieter Levels' audience into a launch channel (softwareseni.com). Open mid-action; skip “Hey guys, so I've been working on…”.",
  },
  {
    key: "problem-demo",
    phase: "Launch",
    title: "Film the problem → the satisfying after",
    detail:
      "Hook with the pain in a real person's words, then cut to the calm “after” inside your app. Sell the transformation, not the features — and only flash the actual product for a second or two, so it never feels like an ad.",
  },
  {
    key: "first-hour",
    phase: "Launch",
    title: "Reply to every comment in the first hour",
    detail:
      "Early engagement velocity tells the algorithm a video is worth pushing to the next batch. Reply fast — and reply with a question — to drive more comments and keep the post alive longer.",
  },
  {
    key: "cross-post",
    phase: "Launch",
    title: "Repurpose every video to Reels & Shorts",
    detail:
      "Export without the watermark and post the same video to Instagram Reels and YouTube Shorts. Different audiences, three times the shots on goal, for almost zero extra work.",
    tip: "Use a watermark-free export — Reels and Shorts suppress TikTok-watermarked clips.",
  },
  {
    key: "waitlist",
    phase: "Launch",
    title: "Stand up a referral-powered waitlist",
    detail:
      "Sequence your broadcasts so each one makes the next bigger. A single email field → a “you're #X in line, move up by sharing” page concentrates demand into one launch-day broadcast. This is the Robinhood mechanic: a referral waitlist drove ~1M signups before launch on roughly $0 pre-launch ad spend (prefinery.com). Have a real reason for the gate — limited onboarding slots, a founder-led setup — because a fake gate gets sniffed out.",
    tip: "Scarcity is a fuse, not an engine. Clubhouse rode it to ~10M then deflated when it opened with no retention underneath — have a plan for after the velvet rope.",
  },
  {
    key: "reddit",
    phase: "Launch",
    title: "Seed your launch in communities too",
    detail:
      "Short-form isn't the only channel. Post where your users already gather — relevant subreddits (r/SideProject, r/SaaS, your niche subs), Discords, forums. Lead with your story and real value, not a naked link. One helpful post can drive your first users and priceless feedback. Set honest expectations though: a launch is one broadcast — Plausible finished #2 on Product Hunt and got 36 trials from it, with Google organic out-converting the launch (plausible.io).",
    tip: "Use the Launch Posts drafter in this playbook to generate tailored, value-first posts.",
  },

  // ---- Compound ----------------------------------------------------------
  {
    key: "cooldown",
    phase: "Compound",
    title: "Keep the account warm — 5–10 min a day, forever",
    detail:
      "Warming up isn't a one-time thing. Once you're posting, keep engaging with your niche for 5–10 minutes every day — watch, like, comment. It keeps the account looking active and real, and creators consistently report stronger reach when they keep this “cooldown” going between posts.",
    tip: "Never miss a day. The signal of a consistently active account compounds quietly.",
  },
  {
    key: "double-down",
    phase: "Compound",
    title: "Find your winning format and double down",
    detail:
      "When a video pops, make three more like it before chasing a new idea. The accounts that blow up find one format that works — a slideshow, a react, a comparison — and repeat it relentlessly. From your week-one mix (3 slideshows / 2 AI UGC / 1 clone / 1 react), whichever format and hook style lands is the one to clone again and again. The algorithm rewards a recognizable lane, and your audience came for a specific thing.",
  },
  {
    key: "series",
    phase: "Compound",
    title: "Turn your winners into a series",
    detail:
      "Add “Part 2”, “Day 3”, or “Building X #4” to your best performer. Series create a reason to follow and train viewers to come back for the next one.",
  },
  {
    key: "ugc",
    phase: "Compound",
    title: "Seed user-generated content + micro-creators",
    detail:
      "Ask five happy users to post how they actually use the app. Authentic third-party videos convert better than anything you make and expand your reach into their networks. To buy reach at volume, seed micro-creators (5K–100K, engagement over size) with free access plus an affiliate cut — Cal AI scaled this way with ~150 creators on retainer (techcrunch.com). Always disclose sponsored posts.",
    tip: "Give creators a hook or angle, not a script — they perform better in their own voice. And label paid posts; that was a paid creator engine, not organic word-of-mouth.",
  },
  {
    key: "owned-asset",
    phase: "Compound",
    title: "Bank an owned asset every loop",
    detail:
      "This is the Endure half of FIRE: a broadcast that brings users you can't keep is a leak. Each loop should leave behind something you own that makes the next broadcast bigger — an email list, a referral loop, a community, a backlink. Put any referral loop in the moment the app already touches another person (Hotmail's one-line footer took it to 12M users); reward both sides with something cheap, like Dropbox's free storage (100K → ~4M users, no paid marketing).",
    tip: "Track your viral coefficient K = invites × conversion. If it's under 0.2, stop polishing referrals and put that energy back into content — almost no one sustains K > 1.",
  },
  {
    key: "retention",
    phase: "Compound",
    title: "Optimize off retention, not vanity views",
    detail:
      "Open analytics and read the retention graph: the 3-second hold (did the hook land?) and the mid-video cliff (where pacing died). Completion is the dominant ranking signal, so fixing those two spots is how a good account compounds into a great one — and never fake your numbers when you share progress: the indie community now verifies revenue (TrustMRR) and punishes fabricated screenshots.",
  },
];
