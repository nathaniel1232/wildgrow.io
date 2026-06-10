import type { AiProfileInput, IdeaGenOptions, SocialVideo } from "./types";

export const SYSTEM_CORE = `You are Wildfire's organic growth strategist — a world-class short-form content expert who has engineered thousands of viral TikToks and Reels specifically for app and software founders.

You think in mechanics, never platitudes.

ATTENTION & RETENTION
- The For You Page is an attention market. Reach is earned per-video through completion rate, rewatches/loops, shares, and comments — not followers.
- The first 3 seconds decide everything. A hook fires on three channels at once: a moving visual, a spoken line, and on-screen text that makes a promise.
- Retention is craft: open mid-motion, change the frame every 1.5–3 seconds, and loop the ending into the start.

MESSAGE
- Sell the transformation, not the features. Nobody cares about the app; they care what it does for their life. Open on the after-state or the pain — never a feature list.
- Native, not an ad. The instant a video feels like an ad, viewers leave. Make it feel like a real person showing a friend something — reveal the actual product for only a beat or two.
- One job per video: make the viewer curious enough to tap the profile / App Store. Don't explain everything or try to close the sale in the video — the store listing and onboarding do that.

FORMAT (defaults unless the idea clearly demands otherwise)
- Vertical 9:16, full-screen, sound-on (voiceover or a trending sound), high resolution.
- Target 15–34 seconds. Keep on-screen text out of the bottom/right "safe zone" where the platform UI sits.

DISTRIBUTION
- Consistency wins: founders break through by posting daily and pushing past the zero-traction phase.
- Trend-jack tastefully: ride trending sounds/formats and slot the product in at the end — never bolt it on.
- Find a format that works and double down; turn winners into a series.

ETHOS
- Organic only. Never suggest paid ads, follow-for-follow, engagement pods, fake engagement, or anything that risks the account.
- Output is always concrete, specific to the exact app described, immediately filmable, and never generic filler. Never invent fake statistics. Ground every rationale in the mechanics above.`;

export function profileBlock(p: AiProfileInput): string {
  const lines = [
    `App: ${p.appName}`,
    `Category: ${p.category}`,
    `One-liner: ${p.oneLiner}`,
    `Audience: ${p.audience}`,
    `Problem it solves: ${p.problem}`,
  ];
  if (p.positioning) lines.push(`Positioning: ${p.positioning}`);
  if (p.pillars?.length)
    lines.push(`Content pillars: ${p.pillars.map((x) => x.title).join(", ")}`);
  return lines.join("\n");
}

export function profilePrompt(p: AiProfileInput): string {
  return `${profileBlock(p)}

Derive this founder's organic growth profile:
- positioning: 2–3 sentences of sharp strategic guidance on the single pain to own and how to frame every video.
- pillars: exactly 4 content pillars. Each has a title, a "why" explaining why it works for THIS specific app, and 3 suggested formats.
- persona: one vivid target-viewer persona (name, a 1–2 sentence bio, painPoints, desires, wateringHoles).
Be specific to the app. No generic marketing-speak.`;
}

export function trendingBlock(videos: SocialVideo[]): string {
  const items = videos
    .map((v, i) => {
      const lines = [
        `${i + 1}. ${v.creator} · ${v.platform} · ${v.format}`,
        `   Hook: "${v.hook}"`,
      ];
      if (v.caption) lines.push(`   Caption: "${v.caption}"`);
      lines.push(
        `   Stats: ${v.views} views, ${v.likes} likes, ${v.comments} comments, posted ${v.postedDaysAgo} days ago`,
      );
      return lines.join("\n");
    })
    .join("\n");
  const ex = videos[0];
  const exampleBasedOn = ex
    ? `${ex.creator} — ${ex.hook.slice(0, 40)}`
    : "@creator — their hook";
  return `WHAT'S WORKING IN THIS NICHE RIGHT NOW
These are real videos currently going viral in this niche — proven, working patterns. (They are other creators' posts, NOT this app's content.)
${items}

Study why each of these is working — the hook structure, the format, the angle — then build ideas on those proven patterns. Adapt the mechanics to THIS app; borrow the angle/hook/format, never copy the wording or restage the same video. At least half the batch should clearly riff on one of the videos above. For any idea that does, set "basedOn" to that creator plus the trend it adapts (e.g. "${exampleBasedOn}…"). Use only the real stats shown above — never invent numbers, creators, or videos.`;
}

export function ideasPrompt(p: AiProfileInput, opts: IdeaGenOptions): string {
  const count = opts.count ?? 6;
  const videos = opts.trendingVideos ?? [];
  const trending = videos.length ? `\n\n${trendingBlock(videos)}` : "";
  return `${profileBlock(p)}${trending}

Generate ${count} short-form video ideas for TikTok/Reels, tailored to this app${
    opts.pillar ? `, biased toward the "${opts.pillar}" pillar` : ""
  }.
Each idea must be fully filmable:
- title (short internal label)
- hook (the exact spoken/written first line — bold and specific)
- format (POV, Talking head, Screen demo, Before/after, Listicle, Reply to comment, Skit, Story...)
- lengthSec (realistic, usually 12–30)
- script (beat-by-beat: each beat has a timestamp "t", a "label", and "text" describing the shot + line)
- onScreen (the on-screen text overlays, as short strings)
- caption (the posting caption, with natural voice)
- hashtags (4–5, relevant to the niche)
- sound (a sound/audio suggestion)
- hookScore (0–100, your honest estimate of scroll-stopping power)
- pillar (which content pillar it serves)
- rationale (one sentence grounded in retention/algorithm mechanics)${
    videos.length
      ? `\n- basedOn (if this idea adapts one of the trending videos above, set it to that creator + the trend it riffs on; leave unset for fully original ideas)`
      : ""
  }
Vary the formats across the batch. Make every hook specific and impossible to scroll past.${
    opts.offset
      ? `\nThis is a follow-up batch — make these distinct from earlier ideas (variation seed ${opts.offset}).`
      : ""
  }`;
}

export function planPrompt(p: AiProfileInput): string {
  return `${profileBlock(p)}

Build a concrete 30/60/90-day organic growth plan with exactly three phases.
Each phase has: id ("30" | "60" | "90"), label, range (e.g. "Weeks 1–4"), a one-sentence focus, and 4 items.
Each item has: a stable id (like "p1-1", "p2-3"), a kind ("post" | "action" | "milestone"), a title, and a concrete detail.
Make it specific to this app and realistic for a solo founder posting organically.`;
}

export function analysisPrompt(v: SocialVideo, p: AiProfileInput): string {
  return `${profileBlock(p)}

Here is a video performing well in this niche:
Creator: ${v.creator}
Platform: ${v.platform}
Format: ${v.format}
Hook: "${v.hook}"
Caption: "${v.caption}"
Stats: ${v.views} views, ${v.likes} likes, ${v.comments} comments, posted ${v.postedDaysAgo} days ago.

Analyze it:
- whyItWorked: 3 concrete bullets grounded in short-form mechanics (not generic praise).
- howToAdapt: one paragraph on how to rebuild this specifically for ${p.appName}.
- suggestedHook: one ready-to-film hook line adapting this video's angle to ${p.appName}.`;
}

export function launchPostsPrompt(p: AiProfileInput): string {
  return `${profileBlock(p)}

Write 3 ready-to-post launch posts for the founder communities where this app's users and peers gather (e.g. r/SideProject, r/SaaS, a relevant niche subreddit, or Indie Hackers).
Each post must be value-first and authentic — the kind that gets upvoted, not removed as spam. Never write a naked "check out my app" ad.
For each post provide:
- community: the specific community it's written for.
- title: a scroll-stopping but honest title that fits that community's norms.
- body: the full post (a few short paragraphs; tell the founder story / share a real insight, then mention the app; end by inviting feedback). Use plain text, no markdown headers.
- note: one short posting tip specific to that community (rules, timing, link placement).
Tailor everything to this exact app. Vary the angle across the three posts (build story, lessons-learned, feedback request).`;
}
