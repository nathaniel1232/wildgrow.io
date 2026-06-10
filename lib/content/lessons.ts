import type { AcademyModule, Lesson } from "@/lib/types";

// The Wildgrow Academy is organized around the FIRE framework:
//   F — Frame    (positioning: who it's for, why this app now)
//   I — Ideate   (engineer content for the signal that drives reach)
//   R — Run      (warm up → launch → compound the broadcast sequence)
//   E — Endure   (retention + owned assets that make the next shot bigger)
// Module 01 teaches the framework itself; every later module is tagged with the
// FIRE phase it belongs to, so the curriculum has one clear throughline.

export const ACADEMY_MODULES: AcademyModule[] = [
  {
    id: "fire",
    order: 1,
    title: "The FIRE framework",
    blurb: "Frame, Ideate, Run, Endure — the whole system on one page.",
  },
  {
    id: "algorithm",
    order: 2,
    title: "Frame: how the For You Page actually works",
    blurb: "The signals that decide whether a video gets 200 views or 200,000.",
  },
  {
    id: "hooks",
    order: 3,
    title: "Ideate: hooks that stop the scroll",
    blurb: "Win or lose the first three seconds — on purpose, every time.",
  },
  {
    id: "retention",
    order: 4,
    title: "Ideate: keeping the thumb still",
    blurb: "The craft of making people watch to the end (and again).",
  },
  {
    id: "production",
    order: 5,
    title: "Ideate: make videos the algorithm rewards",
    blurb: "The unglamorous format rules that quietly multiply your reach.",
  },
  {
    id: "funnel",
    order: 6,
    title: "Run: from views to installs",
    blurb: "Turn a viral moment into users who actually download your app.",
  },
  {
    id: "distribution",
    order: 7,
    title: "Run: distribution and the launch sequence",
    blurb: "Fire broadcasts in an order that compounds, daily.",
  },
  {
    id: "endure",
    order: 8,
    title: "Endure: retain, amplify, compound",
    blurb: "Keep the people each shot brings, and bank an asset for the next.",
  },
  {
    id: "system",
    order: 9,
    title: "Endure: building a content system",
    blurb: "Stop relying on motivation. Make consistency mechanical.",
  },
  {
    id: "formats-2026",
    order: 10,
    title: "Formats that work right now (2026)",
    blurb: "The exact short-form formats indie founders are using to grow apps this year — what each one is, why it works, and how to make it.",
  },
];

export const LESSONS: Lesson[] = [
  // ---- fire (the framework) ----------------------------------------------
  {
    slug: "what-going-viral-actually-means",
    moduleId: "fire",
    title: "What “going viral” actually means",
    minutes: 6,
    summary:
      "The honest shape of viral growth: engineered broadcasts, not magic chains. Start here.",
    sections: [
      {
        heading: "Most “viral” is a broadcast, not a chain",
        body: "The fantasy is a self-replicating loop where every user brings more than one new user, forever. The data says that almost never happens. Studying Twitter diffusion, researchers found that more than 90% of messages didn't spread at all, and around 95% of what people saw came straight from the original source — one big broadcast, not a chain (lennysnewsletter.com). So the real job isn't praying for a loop. It's manufacturing repeated shots at a broadcast.",
      },
      {
        heading: "The one broadcast a solo founder controls",
        body: "PR hits, influencers, a Hacker News front page — those are broadcasts you mostly can't summon on demand. Short-form video is the one you can. TikTok states plainly that “neither follower count nor whether the account has had previous high-performing videos are direct factors in the recommendation system” (newsroom.tiktok.com). Translation: the platform hands a brand-new account a fresh free test audience for every single post. That's a broadcast machine you can fire daily, for free.",
      },
      {
        heading: "K > 1 is a myth; loops amplify, they don't replace",
        body: "The viral coefficient K = invites per user × conversion per invite. Sustained K > 1 is extremely rare; for B2B SaaS, a K above 0.2 is already “quite good” (command.ai). So referrals, waitlists, and launches aren't the engine — they're amplifiers that make each broadcast land bigger. The engine is volume of broadcasts plus a product worth keeping people on.",
      },
      {
        heading: "Why we teach it this way",
        body: "Every lesson in this Academy ladders up to that thesis: take the free shot short-form gives you, again and again, and keep what each shot brings in. That's it. No promised loop, no guaranteed virality — a repeatable system for the one part of growth a founder actually controls.",
      },
    ],
  },
  {
    slug: "the-fire-framework",
    moduleId: "fire",
    title: "FIRE: Frame, Ideate, Run, Endure",
    minutes: 7,
    summary:
      "The four-part loop you run every week. Each turn fires a broadcast and banks an asset.",
    sections: [
      {
        heading: "F — Frame (positioning)",
        body: "Decide who the video is for and why this app, now. The algorithm rewards relevance plus retention, so a sharp niche beats a broad one. Figma won by being unmissable to designers first; Notion's breakout wasn't “Notion for everyone,” it was “Notion for Students.” Before you make anything, know your viewer and your angle. Wildgrow's onboarding derives your positioning, content pillars, and target viewer so you're not guessing.",
      },
      {
        heading: "I — Ideate (engineer for the signal)",
        body: "Build content for the one metric that drives reach: watch-time and completion (roughly 40–50% of TikTok's weight), with shares as the highest-value engagement (sproutsocial.com). That means a hook in the first two seconds, a tight loop, and a reason to send it to a friend — not high production value. The Idea Engine turns your positioning into hook → beats → on-screen text → caption → hashtags → sound, and Niche Radar shows what's already winning and why.",
      },
      {
        heading: "R — Run the sequence (warm up → launch → compound)",
        body: "Fire broadcasts in an order that compounds. Robinhood's textbook run: waitlist + referral → #1 on Hacker News → ~1M pre-launch signups → launch broadcast to that list (prefinery.com). Top Product Hunt #1s spent months warming an audience before launch day (growthmentor.com). And volume is the engine — Duolingo posted relentlessly to 143 videos at 1M+ views (startupspells.com). The Launch Playbook walks you set up → warm up → launch → compound.",
      },
      {
        heading: "E — Endure (retention + amplifiers)",
        body: "A broadcast that brings users you can't keep is Clubhouse: ~10M, then collapse once it opened up with no retention underneath (Wikipedia). Virality is acquisition; network effects and retention are a separate, defensive property (nfx.com). So each loop should keep the people it brought and leave behind an owned asset — an email list, a referral loop, a community, a backlink — that makes the next broadcast bigger. Pieter Levels' Photo AI did $5.4K in week one and rode an audience he'd compounded over a decade (softwareseni.com).",
      },
      {
        heading: "It's a loop, not a checklist",
        body: "You run F→I→R→E every week. Each pass sharpens your Frame (what's resonating tells you who you're really for), refills your Ideate backlog, gives you another Run, and grows the assets that make you Endure. The modules below are tagged with the phase they serve so you always know which part of the loop you're working on.",
      },
    ],
  },
  // ---- algorithm (FRAME) -------------------------------------------------
  {
    slug: "what-the-algorithm-optimizes-for",
    moduleId: "algorithm",
    title: "What the algorithm optimizes for",
    minutes: 5,
    summary:
      "TikTok and Reels are watch-time machines. Understand the four signals they actually reward.",
    sections: [
      {
        heading: "It's an attention market, not a follower market",
        body: "Unlike older platforms, the For You Page shows your video to strangers first and your followers second. TikTok says it directly: “neither follower count nor whether the account has had previous high-performing videos are direct factors in the recommendation system” (newsroom.tiktok.com). That's the great equalizer — a brand-new account can outperform someone with a million followers if the video holds attention. You're not building an audience so much as repeatedly winning an auction for attention.",
      },
      {
        heading: "The four signals that matter",
        body: "Analyses converge: watch time and completion rate are the dominant signal (around 40–50% of the weight), then rewatches and loops, then shares — especially sends to a friend, the highest-value engagement — then comments (sproutsocial.com). Likes barely move the needle. Every creative decision you make should ladder up to one of these, and usually it's completion.",
      },
      {
        heading: "What this means for you",
        body: "Make shorter videos that get watched fully rather than long ones people abandon. A 12-second video watched twice beats a 45-second video watched 40%. When in doubt, cut it down. This is the “I” in FIRE in one habit: engineer for completion.",
      },
    ],
  },
  {
    slug: "the-cold-start",
    moduleId: "algorithm",
    title: "The cold start: your first 200 viewers",
    minutes: 4,
    summary:
      "Every video gets a small test audience. Here's how to pass the test.",
    sections: [
      {
        heading: "The test batch",
        body: "When you post, the platform shows your video to a few hundred people who seem relevant — this is the broadcast machine in action, a fresh free test for every post. How they respond decides whether it gets pushed to thousands, then tens of thousands. Each tier is a gate you clear with retention and engagement.",
      },
      {
        heading: "Why warming up matters",
        body: "If your account has been watching and engaging in your niche, that first test batch is full of the right people — who are far more likely to finish and share. A cold account gets a random batch and usually stalls. This is why the warm-up playbook isn't optional; it's how you Frame the account before you ever post.",
      },
    ],
  },
  {
    slug: "frame-before-you-film",
    moduleId: "algorithm",
    title: "Frame before you film: niche, persona, pillars",
    minutes: 6,
    summary:
      "Positioning is the F in FIRE. A sharp niche beats a broad one — here's why and how.",
    sections: [
      {
        heading: "Relevance is half the algorithm's job",
        body: "The For You Page is a matching engine: it's trying to put your video in front of the people most likely to finish it. A broad, “for everyone” message matches no one strongly, so it gets a lukewarm test batch and stalls. A sharp niche gives the algorithm an obvious audience to test against. Counter-intuitively, narrowing your target widens your reach.",
      },
      {
        heading: "The proof: narrow won",
        body: "Notion's real inflection (2020–2022) didn't come from “Notion for everyone” — it came from creators making “Notion for Students” content that hit millions of views (review.firstround.com). Figma grew by being unmissable to one group first — designers — then spreading team-by-team (review.firstround.com). Both picked a sharp who and a sharp why before they scaled.",
      },
      {
        heading: "Three things to lock before you post",
        body: "Persona: one specific viewer (their pain, their desires, where they already hang out). Positioning: the outcome you deliver, for that person, in one line. Pillars: three or four repeatable content themes so you're not reinventing the topic every day. Wildgrow's onboarding generates a first draft of all three from a few answers — treat it as a starting point you sharpen as the data comes in.",
      },
      {
        heading: "Frame is a loop, not a setup step",
        body: "You don't Frame once. Every week, what resonates tells you who you're actually for — sometimes it's not who you guessed. Let the comments and the completion data re-aim your positioning. That feedback is the F restarting the FIRE loop.",
      },
    ],
  },
  // ---- hooks (IDEATE) ----------------------------------------------------
  {
    slug: "anatomy-of-a-hook",
    moduleId: "hooks",
    title: "Anatomy of a 3-second hook",
    minutes: 6,
    summary: "A hook is a visual, a line, and a promise — working together.",
    sections: [
      {
        heading: "Three layers, all at once",
        body: "Great hooks fire on three channels simultaneously: the visual (something moving or surprising in frame), the spoken line (a claim, question, or confession), and the on-screen text (which makes a promise about what's coming). If even one is boring, the thumb moves. The hook exists to win the single signal that matters most — getting past the first two seconds toward completion.",
      },
      {
        heading: "Open mid-motion",
        body: "Never start static or with a greeting. Start already doing something — pouring, deleting, reacting, walking. Motion in the first frame buys you the next two seconds.",
      },
      {
        heading: "Make a promise you pay off",
        body: "“The setting I wish I knew sooner” promises a payoff. If the rest of the video delivers it, you get completion and a rewatch. If you bait and don't deliver, retention craters and the algorithm stops trusting you.",
      },
    ],
  },
  {
    slug: "hook-formulas",
    moduleId: "hooks",
    title: "12 hook formulas you can steal",
    minutes: 7,
    summary: "Proven openers, adapted for app founders.",
    sections: [
      {
        heading: "The big six",
        body: "POV (“POV: you finally found an app that…”). The confession (“I built this because I was embarrassed by how many tabs I had.”). The bold claim (“This deletes your need for three other apps.”). The question (“Why does no one talk about…?”). The list tease (“3 features I'd never give up.”). The mistake (“You're using your to-do app wrong.”).",
      },
      {
        heading: "Six more for demos",
        body: "Before/after (“My week before vs after.”). The objection (“‘But does it work offline?' Watch.”). The result-first (“This is how I hit a 30-day streak.”). The relatable rant (“I'm so tired of apps that…”). The reply (stitch/reply to a real comment). The numbers (“10,000 people did this in a week.”).",
      },
      {
        heading: "Engineer the share, not just the open",
        body: "Shares are the highest-value engagement signal — the “send this to a friend” move. The best hooks don't just stop the scroll; they imply a specific person who needs to see this (“send this to the friend who has 47 tabs open”). When you write a hook, ask who the viewer will tag.",
      },
    ],
  },
  {
    slug: "trend-jacking",
    moduleId: "hooks",
    title: "Trend-jacking without being cringe",
    minutes: 5,
    summary:
      "Trending sounds and formats are free distribution — if you slot in instead of hijack.",
    sections: [
      {
        heading: "Borrow the sound, keep your message",
        body: "Every day a sound or format is trending, and the algorithm is already pushing videos that use it. Riding one is low-hanging reach: you inherit a distribution boost instead of fighting for it from zero. Check what's trending in your niche daily and slot your point into the format rather than inventing one from scratch.",
      },
      {
        heading: "Mine the comments for your next video",
        body: "Duolingo turned its comment section into its creative brief — they literally call it “our social brief” — and rode it to ~850M organic views and 143 videos over 1M views (startupspells.com). The mechanic transfers to any founder: every question or hot take in your comments is the seed of the next post. Jump on trends fast, mine comments, post relentlessly.",
      },
      {
        heading: "Integrate, don't interrupt",
        body: "The trend has to land on its own first; reveal how it connects to your app in the last beat. Founders who blow up do this slyly — the video works even if you ignore the product, and the product is the satisfying button at the end. If the trend feels bolted on, it reads as an ad and dies.",
      },
    ],
  },
  // ---- retention (IDEATE) ------------------------------------------------
  {
    slug: "reading-the-retention-curve",
    moduleId: "retention",
    title: "Reading the retention curve",
    minutes: 5,
    summary: "Your analytics tab is a map of exactly where you're losing people.",
    sections: [
      {
        heading: "Two numbers to watch",
        body: "The 3-second hold (what % made it past your hook) and the dropoff cliffs (where the line falls off a ledge). A weak 3-second hold means your opener is the problem. A mid-video cliff means your pacing died right there — find that moment and cut it. Completion is the dominant ranking signal, so this graph is the closest thing to a scoreboard you get.",
      },
      {
        heading: "The flat-then-up dream",
        body: "The best videos show a line that flattens and even ticks up at the end — that's rewatches and loops. You engineer this with a tight edit and a final frame that connects back to the opening, making the loop seamless.",
      },
    ],
  },
  {
    slug: "pacing-and-pattern-interrupts",
    moduleId: "retention",
    title: "Pacing, pattern interrupts, and loops",
    minutes: 6,
    summary: "Keep the thumb still by never letting the frame get boring.",
    sections: [
      {
        heading: "Cut on the beat of attention",
        body: "Change something every 1.5–3 seconds: a cut, a zoom, a new caption, a B-roll insert. You're not making a film; you're preventing boredom. Dead air is where people leave.",
      },
      {
        heading: "Loop the ending into the start",
        body: "Write your last line so it flows back into your first. When the video loops, viewers watch the seam twice before realizing it repeated — free completion and rewatch signal.",
      },
    ],
  },
  // ---- production (IDEATE) -----------------------------------------------
  {
    slug: "technical-checklist",
    moduleId: "production",
    title: "The technical checklist that quietly doubles your views",
    minutes: 6,
    summary:
      "Boring format rules, backed by platform data. Get these wrong and the best hook can't save you.",
    sections: [
      {
        heading: "Fill the screen, vertically",
        body: "Shoot 9:16 and fill the whole frame — no black bars, no letterboxing. TikTok's own creative research shows full-screen vertical video gets dramatically more views than square or landscape (we're talking tens of percent, not a rounding error). Never turn your phone sideways.",
      },
      {
        heading: "Sound on, always",
        body: "Short-form is a sound-on medium — the overwhelming majority of top-performing videos use audio. Add a voiceover, talk to the camera, or ride a trending sound. Posting silent video is leaving reach on the table.",
      },
      {
        heading: "Keep it 21–34 seconds",
        body: "Long enough to deliver a real payoff, short enough that people finish. The sweet spot for videos that actually convert (not just rack up empty views) sits around 20–35 seconds. When in doubt, cut.",
      },
      {
        heading: "Mind the safe zone + resolution",
        body: "Keep captions and key text out of the bottom and right edges, where the platform's buttons and your description sit — covered text gets ignored and can quietly cap your reach. And export in high resolution; crisp footage gets a small but real boost.",
      },
    ],
  },
  {
    slug: "native-not-an-ad",
    moduleId: "production",
    title: "Native, not an ad",
    minutes: 5,
    summary:
      "The moment a video feels like an ad, you've lost. Make it feel like a person.",
    sections: [
      {
        heading: "Over-produced content dies here",
        body: "Logo-stamped, color-graded, corporate-looking content gets scrolled past. People are on the For You Page to be entertained by other humans, not marketed to. The most-shared product videos look like a friend casually showing you something they're obsessed with.",
      },
      {
        heading: "Show the product for two seconds",
        body: "Your runtime belongs to the relatable problem and the satisfying result — flash the actual app for a beat, not a feature tour. Counter-intuitively, showing less of the product sells more of it, because the video stays watchable instead of turning into a commercial.",
      },
    ],
  },
  // ---- funnel (RUN) ------------------------------------------------------
  {
    slug: "sell-the-transformation",
    moduleId: "funnel",
    title: "Sell the transformation, not the features",
    minutes: 5,
    summary: "Nobody cares about your features. They care what your app does for them.",
    sections: [
      {
        heading: "Lead with the after-state",
        body: "“Logs your macros by talking to it” is a feature. “Track everything you eat without the awkward photo-taking” is a transformation. People don't buy the tool; they buy the version of their life with the problem gone. Open every video on that after-state.",
      },
      {
        heading: "A view's only job is the next tap",
        body: "Marketing is a funnel. A video's single job is to make someone curious enough to tap your profile and then the App Store — not to explain everything or close the sale. Let your store listing and onboarding do their jobs. Trying to do it all in one video is exactly what makes it feel like an ad.",
      },
    ],
  },
  {
    slug: "profile-is-the-landing-page",
    moduleId: "funnel",
    title: "Your profile is the real landing page",
    minutes: 4,
    summary: "A viral video sends a flood to your profile. Don't waste it.",
    sections: [
      {
        heading: "The 1-second audition",
        body: "When a video pops, thousands tap your profile. In one second they decide to follow and/or tap your link. Your bio, pinned video, and grid have to instantly answer “what is this and is it for me?”",
      },
      {
        heading: "Pin the explainer, not the viral one",
        body: "Counter-intuitively, pin the clearest explainer of your app — not your most-viewed video. The viral video did its job (it brought them here); the pin's job is to convert the curious into installers.",
      },
    ],
  },
  {
    slug: "ctas-that-convert",
    moduleId: "funnel",
    title: "CTAs that drive installs without begging",
    minutes: 5,
    summary: "Asking for the install is an art. Here's the tasteful version.",
    sections: [
      {
        heading: "Earn the click, then ask once",
        body: "Deliver real value for the whole video, then make a single, low-friction ask at the end: “it's free, link in bio.” Begging early or often reads as an ad and tanks both retention and trust.",
      },
      {
        heading: "Make curiosity do the work",
        body: "The best install driver isn't “download now” — it's showing something so useful or delightful that people go looking for the link on their own. Show the magic moment; let the product sell itself.",
      },
    ],
  },
  // ---- distribution (RUN) ------------------------------------------------
  {
    slug: "consistency-is-the-game",
    moduleId: "distribution",
    title: "Consistency is the whole game",
    minutes: 5,
    summary:
      "In 2026, building the app is table stakes. Getting it seen — every day — is the work.",
    sections: [
      {
        heading: "Distribution is part of the job now",
        body: "Ads and app-store keywords aren't the growth lever anymore — distribution is, and it's free. The indie devs breaking through post one to two short videos every single day to promote their app. Not occasionally. Daily. Each post is another shot at the free broadcast the platform hands you. If you're not showing up, someone else in your niche is.",
      },
      {
        heading: "Volume is the engine",
        body: "Duolingo's TikTok dominance wasn't one perfect video — it was relentless output: 143 videos over 1M views, jumping on trends fast and posting through the misses (startupspells.com). Pieter Levels shipped 40+ products over a decade before one hit (softwareseni.com). The pattern is always volume plus speed, not a single jackpot.",
      },
      {
        heading: "Push through the zero-traction phase",
        body: "The first few weeks are brutal: a handful of views, a few likes, no momentum. This is exactly where almost everyone quits. The ones who win treat it like building a muscle, not chasing a jackpot — they keep posting, test what lands, and both the account and their own skill compound. On the days they post, downloads move; on the days they don't, they flatten. Not breaking the streak is most of the strategy.",
      },
    ],
  },
  {
    slug: "the-launch-sequence",
    moduleId: "distribution",
    title: "The launch sequence: warm up, launch, compound",
    minutes: 7,
    summary:
      "The R in FIRE. Fire broadcasts in an order where each one makes the next bigger.",
    sections: [
      {
        heading: "Sequence beats one big day",
        body: "Growth is a series of broadcasts, and the trick is ordering them so each leaves behind an owned asset that powers the next. Robinhood is the textbook run: a referral-powered waitlist → the copy hit #1 on Hacker News → ~1M signups before launch on roughly $0 pre-launch ad spend → a launch broadcast to that list (prefinery.com). Each step fed the next.",
      },
      {
        heading: "Warm the audience before launch day",
        body: "The single biggest predictor of a good launch is having people ready to show up. Top Product Hunt #1 finishers spent months in communities and outreach before launch day — the launch converted an audience they'd already built, and the best ones shipped a 30–60s launch video (growthmentor.com). Build the owned asset (waitlist, email list, a small content presence) first.",
      },
      {
        heading: "Set honest expectations for the spike",
        body: "A launch is one broadcast, not a growth strategy. Plausible Analytics finished #2 Product of the Day with 850+ upvotes — and got 2,560 visitors and 36 trials from it, while their Google organic traffic out-converted Product Hunt (plausible.io). Treat a launch as a spike that hands you an asset; the durable growth comes from the ongoing broadcasts (short-form) and the assets you compound.",
      },
      {
        heading: "Waitlists and scarcity: a fuse, not an engine",
        body: "A referral-powered waitlist (“you're #X in line, move up by sharing”) concentrates demand into a single launch-day broadcast — the Robinhood mechanic, and a weekend build. But have a real reason for the gate and a retention plan for after you open it. Clubhouse rode scarcity to ~10M, then deflated when it opened to everyone with no retention engine underneath (Wikipedia). Scarcity is a fuse; the product is the engine.",
      },
    ],
  },
  {
    slug: "reddit-and-communities",
    moduleId: "distribution",
    title: "Reddit and the rooms your users already live in",
    minutes: 5,
    summary:
      "Short-form isn't the only channel. Your first users are already gathered somewhere.",
    sections: [
      {
        heading: "Go where they already are",
        body: "Your users hang out somewhere today — subreddits, Discords, niche forums. r/SideProject, r/SaaS, and your niche's communities are full of people who'll happily try a relevant product and tell you exactly what's broken. It's one of the fastest ways to get your first real users and feedback.",
      },
      {
        heading: "Provide value, don't drop links",
        body: "Share your story, your learnings, or a genuinely useful post — then mention what you built. Naked self-promotion gets removed; a real, helpful post can hit the front page and send a wave of users. On Hacker News and Reddit especially, lead with value and let the product be the supporting actor. Tailor each post to its community and reply to every comment.",
      },
      {
        heading: "The Google bump",
        body: "People who discover you on social often search your brand before they commit. Being active and credible across a couple of channels lifts the searches, the site visits, and the installs together — the channels compound each other.",
      },
    ],
  },
  // ---- endure (ENDURE) ---------------------------------------------------
  {
    slug: "retention-vs-virality",
    moduleId: "endure",
    title: "Virality gets users; retention keeps them",
    minutes: 6,
    summary:
      "The E in FIRE. Acquisition and defensibility are different jobs — don't confuse them.",
    sections: [
      {
        heading: "Two different properties",
        body: "These get conflated constantly. Viral effects are when existing users bring you new users, ideally for free — that's growth and acquisition. Network effects are when every user adds value for the others, making it hard to leave — that's defensibility (nfx.com). They're independent. Short-form gives you the first. It does nothing for the second.",
      },
      {
        heading: "The cautionary tale",
        body: "Clubhouse hit ~10M downloads on invite-only scarcity — pure acquisition. When it opened to everyone with no retention engine underneath, momentum collapsed (Wikipedia). “Viral, no network effect” products — the NFX list names JibJab, PhotoBooth, QuizUp — are “flashy but short-lived.” A broadcast that brings users you can't keep is a leak, not growth.",
      },
      {
        heading: "What endurance looks like for you",
        body: "Each loop should do two things: keep the people it just brought (a real activation and habit moment in the product), and leave behind an owned asset — an email list, a referral loop, a community, a backlink — that makes the next broadcast bigger. Wildgrow is honest about its lane: it's a distribution engine, not a substitute for a product people stick with. The retention is your job; we make the broadcasts repeatable.",
      },
    ],
  },
  {
    slug: "referral-loops-that-amplify",
    moduleId: "endure",
    title: "Referral loops: the amplifier, not the plan",
    minutes: 6,
    summary:
      "Put the loop where the product already touches another person — and don't expect K > 1.",
    sections: [
      {
        heading: "Find the natural exposure moment",
        body: "A referral loop works when it sits where using the app already touches someone else — a shared file, an invite, an exported result, an outbound email. Hotmail's entire loop was a one-line footer: “PS I Love You. Get your free email at Hotmail,” which helped take it from 0 to 12M users in about 18 months (themarketingmillennials.com). Put the loop in the natural moment, not buried in a settings page.",
      },
      {
        heading: "Reward both sides, with something cheap",
        body: "The high-performing programs were all two-sided. Dropbox gave free storage to both referrer and referee and grew from 100K to ~4M users in about 15 months — no paid marketing (referralrock.com). PayPal paid cash and found referral was its lowest-CAC channel (growsurf.com). For an app, make the reward something users want that costs you near nothing: extra credits, a premium feature, more usage.",
      },
      {
        heading: "Instrument K and keep it in its place",
        body: "Track invites-sent-per-user and invite→signup conversion. K = invites × conversion. If K is under 0.2, stop polishing the referral — that energy belongs in content. Almost no one sustains K > 1; for SaaS, above 0.2 is already good (command.ai). Use referrals to stretch every cohort your broadcasts bring in, not to replace the broadcasts.",
      },
    ],
  },
  {
    slug: "build-in-public-and-honesty",
    moduleId: "endure",
    title: "Build-in-public (and never fake your numbers)",
    minutes: 6,
    summary:
      "Compounding an owned audience is the durable asset — and honesty is now a growth strategy.",
    sections: [
      {
        heading: "Transparency compounds an audience you own",
        body: "Sharing your real journey — revenue, decisions, what broke — earns trust and attention before you have anything to sell, and turns into an owned audience that becomes your launch channel. Buffer started publishing revenue around $12K/mo; Baremetrics made its full dashboard public at ~$3K/mo and sparked the whole “open startup” movement (baremetrics.com). Post specifics, not platitudes: “MRR went $0→$340 this week, here's what worked” beats motivational fluff.",
      },
      {
        heading: "The decade-long version",
        body: "Pieter Levels is the canonical case: ~10 years building an audience across 40+ products, so when Photo AI launched it did $5.4K in week one and compounded from there (softwareseni.com). You don't need a decade — but you do need to start banking the audience now, and convert it to an email list so your eventual launch is a broadcast you own.",
      },
      {
        heading: "Honesty is non-negotiable — and it's strategic",
        body: "The indie community now punishes fabricated numbers. Pieter Levels' callout of fake MRR screenshots led Marc Lou to build TrustMRR, which verifies revenue via read-only Stripe keys (startupseries.io). Fake metrics are a liability. Wildgrow embodies the same rule: we use real external proof and honest early-access framing, and we never invent our own results or testimonials. Your honest small numbers out-perform anyone's fake big ones.",
      },
    ],
  },
  {
    slug: "creator-seeding-organic-vs-paid",
    moduleId: "endure",
    title: "Creator seeding: borrowed reach, labeled honestly",
    minutes: 5,
    summary:
      "Many small creators = many shots on goal — but call it what it is, and disclose it.",
    sections: [
      {
        heading: "Why it works",
        body: "A creator's audience already trusts them, and each creator's post is its own algorithmic broadcast attempt. Many micro-creators means many shots on goal across many audiences — the engineered-broadcast principle, bought at volume. Notion's 2020–2022 inflection was driven heavily by TikTok/YouTube creators making template content (review.firstround.com); Figma seeded its launch by personally engaging top designers (review.firstround.com).",
      },
      {
        heading: "Run it like Cal AI — but label it honestly",
        body: "Cal AI is the clearest modern example: ~150 creators on retainer (around 4 posts/mo each) plus paid ads drove ~5M downloads in 8 months (its revenue figures are self-reported and TechCrunch couldn't verify them). Crucially, reporting is explicit that this was a paid creator/influencer engine, not organic word-of-mouth (techcrunch.com). Use it as proof of creator seeding at scale — never as proof of free organic virality.",
      },
      {
        heading: "How to seed without a budget",
        body: "List 20 micro-creators (5K–100K, engagement over size) in your exact niche. Offer free lifetime access plus a clear affiliate cut — low cost, aligned incentives. Give them a hook or angle, not a script, so they speak in their own voice. Seed many, double down on the few that hit. And always disclose: audiences and platforms punish stealth ads.",
      },
    ],
  },
  // ---- system (ENDURE) ---------------------------------------------------
  {
    slug: "batch-a-week-in-two-hours",
    moduleId: "system",
    title: "Batch a week of content in 2 hours",
    minutes: 6,
    summary: "Separate writing, filming, and editing so you stop staring at a blank camera.",
    sections: [
      {
        heading: "Don't film and decide at the same time",
        body: "The reason posting feels hard is that you're inventing, performing, and editing all at once. Split them: pick a writing block (use the Idea Engine), a filming block (knock out 5 in one outfit/setup), and an editing block. Each is easy alone.",
      },
      {
        heading: "Keep a 10-idea backlog",
        body: "Never sit down to “think of something.” Keep a running list of saved ideas so filming day starts with a plan. A founder who never runs out of ideas is a founder who keeps posting — and consistency is what makes the whole FIRE loop compound.",
      },
    ],
  },
  {
    slug: "one-idea-ten-posts",
    moduleId: "system",
    title: "One idea, ten posts",
    minutes: 5,
    summary: "Repurposing is how small teams look prolific.",
    sections: [
      {
        heading: "Angles, not duplicates",
        body: "Take one core message and shoot it as a POV, a tutorial, a talking-head, and a reply-to-comment. Same point, four formats — the algorithm and your audience treat them as distinct videos.",
      },
      {
        heading: "Cross-post to triple your shots",
        body: "Export without a watermark and post the same video to Instagram Reels and YouTube Shorts. Different audiences, three times the shots on goal, for almost zero extra work. (Reels and Shorts suppress TikTok-watermarked clips, so use a clean export.)",
      },
      {
        heading: "Mine your comments",
        body: "Every question in your comments is a video. Replying with a video both creates content and rewards the commenter — which trains your audience to keep asking. This is how Duolingo turned its comment section into an endless content engine.",
      },
    ],
  },
  // ---- formats-2026 (the formats working right now) ----------------------
  {
    slug: "formats-that-work-right-now",
    moduleId: "formats-2026",
    title: "The 2026 formats — and how to read these claims",
    minutes: 5,
    summary:
      "Six short-form formats indie founders are using to grow apps right now, pulled straight from creators on X. Read this first — it sets the honesty rules for the whole module.",
    sections: [
      {
        heading: "These are real, current, and sourced",
        body: "Everything in this module comes from a swipe file of posts indie founders and creators published on X in 2026 — the formats that are actually getting reach today, not last year's playbook. There's one lesson per format: the hook+screenshot slideshow, AI UGC ads, AI react videos, the faceless AI influencer, problem-identifier positioning, and cloning a proven format. Each lesson teaches what it is, why it works, and the exact steps to make one.",
      },
      {
        heading: "Every number is a claim, not a guarantee",
        body: "You'll see big figures in these lessons — 40M-view slideshows, $9M/mo apps, $50K/mo apps. Read every one of them as the creator's OWN reported claim, with a link so you can judge it yourself. We attribute; we don't endorse. None of these are independently verified, none are Wildgrow's results, and none are promises about what you'll get. A format that worked for someone in their niche is a starting hypothesis for yours — test it, don't worship it.",
      },
      {
        heading: "Why formats matter more than inspiration",
        body: "Creative is the riskiest variable in short-form. Staring at a blank camera roll is where most founders stall. A known format removes that risk: the hook structure, shot order, and pacing are pre-decided, so you only have to swap in your app. That's the whole point of this module — give you a menu of proven skeletons so you can post at volume without reinventing the wheel every day.",
      },
      {
        heading: "How to use the module",
        body: "Start with the slideshow lesson — it's the lowest-effort, highest-reach format and the best place to begin. Then layer in AI UGC and react videos as you get comfortable. Bake the positioning lesson into everything. And keep a swipe file running (the clone lesson shows you how). The Launch Playbook's “your first 7 posts” step turns all of this into a concrete week-one schedule.",
      },
    ],
  },
  {
    slug: "hook-screenshot-slideshow",
    moduleId: "formats-2026",
    title: "The hook + screenshot slideshow",
    minutes: 6,
    summary:
      "Slide 1 is a text hook. Slide 2 is a screenshot of your app. That's the whole format — and it's the lowest-effort, highest-reach play on the feed right now.",
    sections: [
      {
        heading: "What it is",
        body: "A photo carousel, not a video. Slide 1 is one scroll-stopping line — the painful problem or a bold claim (e.g. “POV: you have 47 tabs open and still can't find anything”). Slide 2 is a clean screenshot or a 2-second screen clip of your app solving exactly that. Slides 3–5 are optional: proof, the “how”, or a mini before/after. Add a trending sound and one or two plain on-screen captions, and you're done. No filming, no editing.",
      },
      {
        heading: "Why it works",
        body: "Photo carousels are the format the TikTok/IG feed is pushing hardest right now, and they take minutes to make. A single sharp hook does all the work — the screenshot just pays it off. Because each one is so cheap, you can post 2–4 variants a day with different slide-1 hooks, keep the winners' hook style, and kill the rest. It's a volume machine, which is exactly what the algorithm rewards.",
      },
      {
        heading: "How to make one",
        body: "1) Write slide 1 as one painful problem or bold claim. 2) Drop a clean screenshot (or 2s clip) of your app nailing that exact problem on slide 2. 3) Optionally add proof or a before/after on slides 3–5. 4) Add a trending sound plus one or two plain captions. 5) Ship 2–4 variants a day, each with a different slide-1 hook, and double down on whichever hook style lands. Best for any app with a visible before-vs-after or a satisfying UI moment.",
      },
      {
        heading: "The claim behind it",
        body: "Per @adriamatz on X (x.com/adriamatz/status/2063702613225279822), this hook+screenshot format reportedly pulls 40M-view slideshows, and they say one indie hacker hit 700K users solo doing only this. That's their reported claim, not independently verified and not Wildgrow's result — treat it as evidence the format can scale, not a promise that it will for you. Cadence: daily. It's your highest-volume, lowest-cost format.",
      },
    ],
  },
  {
    slug: "ai-ugc-ads",
    moduleId: "formats-2026",
    title: "AI UGC ads",
    minutes: 6,
    summary:
      "AI-generated, creator-style testimonial and demo videos — produced at scale for pennies, so you can test dozens of hooks a week.",
    sections: [
      {
        heading: "What it is",
        body: "UGC (user-generated-content) style ads are the casual, creator-shot videos that look native to the feed — a person talking to camera about a problem, then showing the thing that fixed it. The 2026 twist is generating them with AI avatars and voiceovers instead of paying a real creator, so each video costs cents. That lets you produce many variants and let the data pick winners.",
      },
      {
        heading: "Why it works",
        body: "UGC-style ads outperform polished, corporate-looking ones because they don't read as ads — they look like a friend showing you something. Generating them with AI makes each video nearly free, so the constraint stops being budget and starts being how many hooks you can write. You test dozens a week, then pour effort into the few that hold attention.",
      },
      {
        heading: "How to make one",
        body: "1) Write 10+ different pain-point hooks for the first two seconds. 2) Generate an AI “creator” (avatar + voiceover) delivering the hook to camera. 3) Hard-cut to a screen recording of the app delivering the payoff. 4) End on a soft CTA (“link in bio”, your app name) — never a hard sell. 5) Ship many variants; let watch-time and saves pick the winners, then iterate only on those. Best for apps with a clear pain → relief story (utility, health, productivity, finance). Cadence: 3–5 a week, scaling the winning hooks.",
      },
      {
        heading: "The claims behind it",
        body: "Per @_aaronpaul25 on X (x.com/_aaronpaul25/status/2059258328199418126), a UGC playbook is credited with Glam Up reaching a reported $1.8M ARR in 8 months and Sprout a reported $3M ARR in 7 months. And per @adriansolarzz (x.com/adriansolarzz/status/2059405294078251094), an AI UGC production system runs at roughly $0.01 per second of generated video, avoiding SaaS markups. Both are the creators' own reported claims — not verified, not Wildgrow's numbers. The takeaway isn't the dollar figures; it's that AI makes UGC testing cheap enough to run like a science experiment.",
      },
    ],
  },
  {
    slug: "ai-react-videos",
    moduleId: "formats-2026",
    title: "AI react videos",
    minutes: 5,
    summary:
      "An AI persona reacting to or demoing your app — a proven attention pattern you can make in about five minutes.",
    sections: [
      {
        heading: "What it is",
        body: "The “react” video is an already-proven attention pattern: someone reacts to a wild stat, a relatable problem, or a competitor's clip — then the thing they're reacting to becomes the story. Doing it with an AI presenter means no hiring, no scheduling, and roughly five minutes per video. It pairs a relatable reaction with a live look at your product.",
      },
      {
        heading: "Why it works",
        body: "You're borrowing a format the audience already engages with, so you inherit its attention instead of building it from scratch. The reaction creates the emotional hook; your app shows up as the “answer” to whatever's being reacted to. Keeping it under ~20 seconds — reaction first, app second, CTA last — keeps completion high, which is the signal that drives reach.",
      },
      {
        heading: "How to make one",
        body: "1) Pick a reaction trigger: a wild stat, a relatable problem, or a competitor's clip. 2) Generate an AI presenter reacting to it on camera. 3) Cut to your app as the answer to whatever they're reacting to. 4) Keep it under ~20s: reaction first, app second, CTA last. Best for apps that solve a problem people already complain about online — go read those complaints and react to them. Cadence: 2–4 a week.",
      },
      {
        heading: "The claim behind it",
        body: "Per @athcanft on X (x.com/athcanft/status/2051595256244912331), AI react videos are described as cheaper than hiring real people, about five minutes per video, and a proven format for promoting apps. That's their reported framing — we cite it as the source of this format, not as a guarantee of results. The honest read: react is a low-risk format because the pattern is already validated; AI just makes it fast.",
      },
    ],
  },
  {
    slug: "faceless-ai-influencer",
    moduleId: "formats-2026",
    title: "The faceless AI influencer",
    minutes: 5,
    summary:
      "A recurring AI persona that posts consistently — with the face hidden to sidestep the uncanny valley that tanks AI-avatar videos.",
    sections: [
      {
        heading: "What it is",
        body: "A single recurring character — a defined voice, vibe, and niche — that runs your account at volume, but with the face deliberately hidden. You frame shots around hands, over-the-shoulder angles, B-roll, and text-over-screen instead of a talking AI face. One founder can run a whole “creator account” without ever being on camera.",
      },
      {
        heading: "Why it works",
        body: "Hiding the face sidesteps the uncanny-valley problem that quietly tanks AI-avatar videos — viewers bounce when a generated face feels “off”. Meanwhile a consistent character builds familiarity over time, so the account compounds recognition the way a real creator would. It's how a camera-shy founder gets a consistent brand voice at posting volume.",
      },
      {
        heading: "How to make one",
        body: "1) Design one recurring persona — voice, vibe, niche — for the account. 2) Frame every shot to avoid the face: hands, over-the-shoulder, B-roll, text-over-screen. 3) Post on a fixed cadence so the character compounds recognition. 4) Keep every video tied back to your app's one core use-case. Best for founders who don't want to be on camera but want a consistent brand voice. Cadence: daily to every-other-day for the persona account.",
      },
      {
        heading: "The claim behind it",
        body: "Per @onlinedopamine on X (x.com/onlinedopamine/status/2060688925669101980), a tip for going viral with AI slideshows and personas is simply to hide the face of the AI influencer. We cite this as the origin of the format, not as a results claim. It pairs naturally with the slideshow lesson — a faceless persona is a great “narrator” for your carousels.",
      },
    ],
  },
  {
    slug: "problem-identifier-positioning",
    moduleId: "formats-2026",
    title: "Problem-identifier positioning",
    minutes: 6,
    summary:
      "Frame the app as an instant identifier and immediate fix for one acute, emotional problem. The positioning does the heavy lifting, not the feature list.",
    sections: [
      {
        heading: "What it is",
        body: "This is less a video format than a positioning angle you bake into every video. You name the exact problem your app solves in about three words — “Plant Problem Identifier” — and open every video with that problem stated plainly, followed by the immediate solution. The product can be simple; the framing is what converts.",
      },
      {
        heading: "Why it works",
        body: "People act on acute, specific problems — not on feature lists. Naming the exact problem IS the hook, and promising an immediate fix is what drives the tap. Tie it to the emotional payoff underneath — relief, status, care, control — and you give people a reason to act now. Repeating the same positioning across every video is what makes it stick in memory.",
      },
      {
        heading: "How to do it",
        body: "1) Name the exact problem your app solves in ~3 words (“Plant Problem Identifier”). 2) Open every video with that problem stated plainly plus the immediate solution. 3) Tie it to the emotional payoff (relief, status, care, control). 4) Repeat the same positioning across every video until it sticks. Best for simple/utility apps — scanners, identifiers, fixers, trackers. Cadence: bake it into every video, regardless of format.",
      },
      {
        heading: "The claim behind it",
        body: "Per @mdnlabs on X (x.com/mdnlabs/status/2057007274527195527), a plant-scanner app is reported at $9M/mo, which they attribute to positioning it as a “Plant Problem Identifier” with immediate, emotional solutions. That revenue figure is their own reported claim — not verified and not Wildgrow's. The durable lesson isn't the number; it's that sharp, narrow positioning around one acute problem can carry a simple product. This maps directly onto the “Frame” phase of FIRE.",
      },
    ],
  },
  {
    slug: "clone-a-proven-format",
    moduleId: "formats-2026",
    title: "Clone a proven format",
    minutes: 6,
    summary:
      "Find a video format already going viral in an adjacent niche and adapt it to your app. Borrow a pre-validated skeleton instead of inventing one.",
    sections: [
      {
        heading: "What it is",
        body: "Instead of inventing creative, you find videos already blowing up in or near your niche, reverse-engineer the repeatable pattern — hook line, shot order, pacing, sound — and rebuild it with your app as the subject. Same skeleton, your story. It's the fastest way off a blank camera roll.",
      },
      {
        heading: "Why it works",
        body: "Creative is the riskiest variable in short-form, and a proven format removes that risk. The hook structure and visual pattern are pre-validated by someone else's views, so you're not gambling on whether the concept lands — only on whether your subject fits it. You post at volume and let the proven format do the heavy lifting.",
      },
      {
        heading: "How to do it",
        body: "1) Find apps/accounts blowing up in or near your niche and save 10–20 winning videos (this is your swipe file — the Niche Radar feeds it too). 2) Reverse-engineer the repeatable pattern: hook line, shot order, pacing, sound. 3) Rebuild it with your app as the subject — same skeleton, your story. 4) Post at volume and let the proven format work. Best for any founder staring at a blank camera roll. Cadence: weekly — refresh your swipe file, clone the best one or two.",
      },
      {
        heading: "The claims behind it",
        body: "Per @jacobrodri_ on X (x.com/jacobrodri_/status/2055742070934094183), a tanning-helper app is reported at $50,000/month, and they point to the specific TikTok format it goes viral with. And per @adriamatz (x.com/adriamatz/status/2058611285017665975), the “manifestation app” video format is noted as going crazy viral and being dead simple, low-effort to replicate. Both are the creators' own reported claims — cited as proof the clone approach works, not as verified figures or Wildgrow's results. The honest framing: don't copy their app, copy the format that's already winning attention.",
      },
    ],
  },
];

export function lessonsByModule(moduleId: string): Lesson[] {
  return LESSONS.filter((l) => l.moduleId === moduleId);
}
