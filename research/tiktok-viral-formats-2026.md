# TikTok / Short-Form Viral Formats — 2026

The short-form formats that are **actually working for app growth right now**, pulled from
indie founders and creators on X in 2026. This is the citable backing doc for the Academy
module **"Formats that work right now (2026)"** and the `VIRAL_FORMATS` array in
[`lib/content/formats.ts`](../lib/content/formats.ts).

---

## Honesty rules (read first)

- Every reach / revenue figure below is the **creator's OWN reported claim**, captured from
  their post. It is **[self-reported]** and **not independently verified**.
- We attribute these as **claims**, never as established fact, and **never** as Wildgrow's
  own results. A format that worked for one founder in their niche is a *starting
  hypothesis* for yours — to test, not to treat as a promise.
- The step-by-step in the product is a **faithful, practical reconstruction** of each
  named, public format. The full detail for several lives inside the creators' videos; we
  reconstruct the publicly described skeleton.
- Captured / verified: **2026-06-10**. Source-of-truth array: `VIRAL_FORMATS`.

---

## The 9 sourced posts

| # | Creator (X) | Post URL | Format extracted | Reported claim **[self-reported]** |
|---|---|---|---|---|
| 1 | **@adriamatz** | https://x.com/adriamatz/status/2063702613225279822 | Hook + screenshot slideshow | Format reportedly pulls **40M-view slideshows**; says one indie hacker hit **700K users solo** doing only this. |
| 2 | **@_aaronpaul25** | https://x.com/_aaronpaul25/status/2059258328199418126 | AI UGC ads | Credits a UGC playbook for **Glam Up ~$1.8M ARR in 8 months** and **Sprout ~$3M ARR in 7 months**. |
| 3 | **@adriansolarzz** | https://x.com/adriansolarzz/status/2059405294078251094 | AI UGC ads (production economics) | Reports an AI UGC production system at roughly **$0.01 per second** of generated video, avoiding SaaS markups. |
| 4 | **@athcanft** | https://x.com/athcanft/status/2051595256244912331 | AI react videos | Describes AI react videos as **cheaper than hiring real people**, **~5 mins per video**, a proven app-promo format. |
| 5 | **@onlinedopamine** | https://x.com/onlinedopamine/status/2060688925669101980 | Faceless AI influencer | Tip for going viral with AI slideshows/personas: **hide the face** of the AI influencer. |
| 6 | **@mdnlabs** | https://x.com/mdnlabs/status/2057007274527195527 | Problem-identifier positioning | Reports a plant-scanner app at **$9M/mo**, attributed to positioning as a **"Plant Problem Identifier"** with immediate, emotional solutions. |
| 7 | **@jacobrodri_** | https://x.com/jacobrodri_/status/2055742070934094183 | Clone a proven format | Reports a tanning-helper app at **$50,000/month** and points to the specific TikTok format it goes viral with. |
| 8 | **@adriamatz** | https://x.com/adriamatz/status/2058611285017665975 | Clone a proven format ("manifestation app") | Notes the **manifestation-app video format** is going crazy viral and is **dead simple / low-effort** to replicate. |
| 9 | **@onlinedopamine** *(see note)* | — | — | — |

> **Note on counts:** the swipe file has **8 distinct posts across 7 handles** (@adriamatz appears twice — rows 1 and 8 — with different posts). The brief refers to "9 sourced posts"; the table maps the 8 distinct posts that back the six `VIRAL_FORMATS`. Row 9 is left as a placeholder marker only — there is no 9th source URL in `formats.ts`. If the coordinator adds one, append it here. (Handles cited, in order of appearance: @adriamatz, @_aaronpaul25, @adriansolarzz, @athcanft, @onlinedopamine, @mdnlabs, @jacobrodri_.)

---

## Format-by-format breakdown

### 1. Hook + screenshot slideshow  `id: slideshow`
**Source:** @adriamatz — https://x.com/adriamatz/status/2063702613225279822
Slide 1 = a text hook (the painful problem or a bold claim). Slide 2 = a clean screenshot
or 2s clip of the app solving exactly that. Optional slides 3–5 = proof / how / before-after.
Trending sound + 1–2 plain captions. Post 2–4 variants/day with different slide-1 hooks.
**Why:** photo carousels are the lowest-effort, highest-reach format the feed is pushing
right now; a single sharp hook does the work. **Claim [self-reported]:** 40M-view
slideshows; one indie hacker to 700K users solo. **Cadence:** daily.

### 2. AI UGC ads  `id: ai-ugc`
**Sources:** @_aaronpaul25 — https://x.com/_aaronpaul25/status/2059258328199418126 ·
@adriansolarzz — https://x.com/adriansolarzz/status/2059405294078251094
AI-generated, creator-style testimonial/demo videos produced at scale for pennies. Write
10+ pain-point hooks → generate an AI "creator" delivering the hook → hard-cut to a screen
recording payoff → soft CTA → ship many variants, scale winners.
**Why:** UGC-style ads look native to the feed and outperform polished ones; AI makes each
video cost cents, so hook-testing becomes the only constraint. **Claims [self-reported]:**
Glam Up ~$1.8M ARR/8mo, Sprout ~$3M ARR/7mo; production at ~$0.01/sec of video.
**Cadence:** 3–5/week, scale the winners.

### 3. AI react videos  `id: ai-react`
**Source:** @athcanft — https://x.com/athcanft/status/2051595256244912331
An AI persona reacting to a wild stat / relatable problem / competitor clip, then cutting to
the app as the "answer." Keep under ~20s: reaction first, app second, CTA last.
**Why:** "react" is an already-proven attention pattern; AI removes hiring/scheduling and
takes ~5 min/video. **Claim [self-reported]:** cheaper than hiring real people, ~5 min per
video, proven app-promo format. **Cadence:** 2–4/week.

### 4. Faceless AI influencer  `id: faceless-ai-influencer`
**Source:** @onlinedopamine — https://x.com/onlinedopamine/status/2060688925669101980
A recurring AI persona (voice, vibe, niche) that posts consistently with the **face hidden**
— hands, over-the-shoulder, B-roll, text-over-screen. Every video ties back to the app's one
core use-case. **Why:** hiding the face sidesteps the uncanny valley that tanks AI-avatar
videos, while a consistent character compounds recognition. **Claim [self-reported]:** go
viral with AI slideshows/personas by hiding the face. **Cadence:** daily to every-other-day.

### 5. Problem-identifier positioning  `id: positioning-angle`
**Source:** @mdnlabs — https://x.com/mdnlabs/status/2057007274527195527
Frame the app as an instant identifier + immediate fix for one acute, emotional problem.
Name the problem in ~3 words ("Plant Problem Identifier"); open every video with that
problem + the immediate solution; tie to the emotional payoff; repeat until it sticks.
**Why:** people act on acute, specific problems, not feature lists — naming the exact
problem IS the hook. **Claim [self-reported]:** plant-scanner app at $9M/mo via this
positioning. **Cadence:** bake into every video, every format.

### 6. Clone a proven format  `id: proven-format-clone`
**Sources:** @jacobrodri_ — https://x.com/jacobrodri_/status/2055742070934094183 ·
@adriamatz — https://x.com/adriamatz/status/2058611285017665975
Find a video format already going viral in/near your niche (save 10–20), reverse-engineer
the repeatable pattern (hook line, shot order, pacing, sound), rebuild with your app as the
subject, post at volume. **Why:** creative is the riskiest variable; a proven format is
pre-validated, so you only swap in your app. **Claims [self-reported]:** tanning-helper app
at $50,000/mo using a specific TikTok format; the "manifestation app" format is going crazy
viral and is dead-simple to replicate. **Cadence:** weekly — refresh swipe file, clone the
best 1–2.

---

## Supporting guidance (not per-account analytics)

From `POSTING_WINDOWS` / `WEEKLY_CADENCE` in `formats.ts` — general short-form best-practice,
**not** a read of the user's real data:

- **Posting windows.** TikTok: 7–9am, 12–1pm, 7–10pm. Instagram: 11am–1pm, 7–9pm.
- **Weekly cadence (planner default).** Mon: slideshow · Tue: AI UGC · Wed: clone a format ·
  Thu: slideshow · Fri: AI react · Sat: positioning · Sun: faceless persona / rest + plan.
- **Week-one "first 7 posts" mix** (Launch Playbook step `first-7-posts`):
  **3 slideshows / 2 AI UGC / 1 clone / 1 react**, with the one-line problem-identifier
  positioning baked into all seven.

---

## Where this is used in the product

- **Academy module** `formats-2026` ("Formats that work right now (2026)") in
  [`lib/content/lessons.ts`](../lib/content/lessons.ts) — one lesson per format, plus an
  intro lesson that sets these honesty rules.
- **Launch Playbook** step `first-7-posts` in
  [`lib/content/playbook.ts`](../lib/content/playbook.ts) — turns the formats + posting
  windows into a concrete week-one schedule; the `swipe-file` and `double-down` steps point
  at the slideshow/clone plays.
- **Source array** `VIRAL_FORMATS` (read-only, coordinator-owned) in
  [`lib/content/formats.ts`](../lib/content/formats.ts).
