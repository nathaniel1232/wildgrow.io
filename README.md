# Wildfire 🔥

**The organic growth engine for app founders.**

Wildfire turns app founders into organic content machines on TikTok & Instagram.
It builds your positioning, generates fully-scripted video ideas, breaks down what's
already going viral in your niche, hands you a warm-up playbook and a 30/60/90-day
plan, and teaches you the craft — all tuned to your specific app.

> Built with Next.js 15, the Claude API, Prisma + SQLite, and Tailwind v4.

---

## ✨ What's inside

- **Marketing site** — a polished, dark-editorial landing page (hero, features, pricing, FAQ).
- **Onboarding** — a 2-minute wizard that derives your positioning, content pillars, and target viewer.
- **Idea Engine** — generates fully-scripted video ideas (hook → beats → on-screen text → caption → hashtags → sound → "why this works"), with hook scoring. Save & track each one.
- **Niche Radar** — discover the creators and videos winning in your niche, with an AI breakdown of _why_ each blew up and a ready-to-film "your version" hook.
- **Launch Playbook** — the full sequence as an interactive checklist: set up, warm up the algorithm (the real 5-day way), launch, and compound.
- **30 / 60 / 90 Plan** — a generated roadmap from cold account to first breakout.
- **Viral Academy** — short, founder-friendly lessons on the real mechanics of short-form.

## 🧠 The AI (bring your own model)

The Idea Engine, profile derivation, plan, launch posts, and radar analysis run on AI —
but the app ships with a high-quality built-in engine, so **everything works out of the
box with no API key**. To go live, add **one** key (auto-detected):

- **Anthropic / Claude** — best quality: `ANTHROPIC_API_KEY`
- **MiniMax** (cheap, great value) — via its Anthropic-compatible endpoint:
  `ANTHROPIC_API_KEY=<minimax-key>` + `ANTHROPIC_BASE_URL=https://api.minimax.io/anthropic`
  + `WILDFIRE_AI_MODEL=MiniMax-M2.5`
- **Any other OpenAI-compatible API** (OpenAI, DeepSeek, Together, Groq…):
  `OPENAI_API_KEY` + `OPENAI_BASE_URL` (+ optional `WILDFIRE_AI_MODEL`)

Settings shows which engine is active. See `lib/ai/`.

## 📡 TikTok / Instagram data

There is **no** easy, terms-compliant official API for _scanning_ competitor/niche
content (TikTok's Research API is approval-gated; Graph APIs only see accounts you own).
So the Niche Radar uses a pluggable `SocialProvider` (`lib/social`):

- **`demo`** (default) — realistic sample data; each card links out to real videos in your
  niche on TikTok.
- **`ensemble`** — set `SOCIAL_PROVIDER=ensemble` + `ENSEMBLE_TOKEN` to pull **live** niche
  videos with real URLs, which then **play in-app** via TikTok's official embed.

We never ask for your password or scrape against platform rules — paid providers
(EnsembleData, Apify) handle data access.

---

## 🚀 Getting started

Requires Node 20+ (built on Node 24).

```bash
# 1. Install dependencies (also generates the Prisma client)
npm install

# 2. Set up your environment
cp .env.example .env        # defaults work as-is for local dev

# 3. Create the database and seed a demo account
npm run db:migrate          # creates prisma/dev.db
npm run db:seed             # seeds the demo account + sample content

# 4. Run it
npm run dev                 # http://localhost:3000
```

### Demo account

```
email:    demo@wildfire.app
password: wildfire123
```

(The app "Stash" comes pre-onboarded with ideas, plan, and progress so you can explore
immediately. Or sign up fresh and run the onboarding wizard.)

---

## 🧩 Tech stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Styling | Tailwind CSS v4, Framer Motion, Bricolage Grotesque + Geist |
| Database | Prisma 7 + SQLite (better-sqlite3 driver adapter) |
| Auth | Hashed passwords (bcryptjs) + signed JWT session cookie (jose) |
| AI | Anthropic Claude (`@anthropic-ai/sdk`), with a built-in fallback engine |
| Validation | Zod |

## 📂 Structure

```
app/
  (marketing)/        landing page + marketing layout
  (auth)/             login + signup
  onboarding/         first-run wizard
  app/                authenticated product (dashboard, ideas, radar, playbook, plan, academy, settings)
components/
  ui/                 design-system primitives
  marketing/          landing-page sections
  app/                product feature components
lib/
  ai/                 Claude integration + structured output + fallback engine
  social/             SocialProvider interface + demo data
  content/            playbook steps + academy lessons
  auth.ts, db.ts, app-actions.ts, ...
prisma/
  schema.prisma, seed.ts
```

## 📜 Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed the demo account + content |
| `npm run db:reset` | Reset the database |
| `npm run db:studio` | Open Prisma Studio |

## ⚠️ Notes

- Auth is intentionally lightweight (great for local/dev). Add rate-limiting, email
  verification, and CSRF hardening before production.
- Billing is stubbed — pricing plans link to signup; wire up Stripe to charge.
- Not affiliated with TikTok or Instagram.
