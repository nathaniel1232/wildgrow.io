// Shared domain contracts used across the AI layer, persistence, and UI.

export type Stage = "idea" | "prelaunch" | "launched" | "growing";

export interface ContentPillar {
  title: string;
  why: string;
  formats: string[];
}

export interface Persona {
  name: string;
  bio: string;
  painPoints: string[];
  desires: string[];
  wateringHoles: string[];
}

export interface GrowthProfile {
  positioning: string;
  pillars: ContentPillar[];
  persona: Persona;
}

export interface ScriptBeat {
  t: string; // timestamp, e.g. "0:00"
  label: string; // Hook | Build | Payoff | CTA ...
  text: string;
}

export interface GeneratedIdea {
  title: string;
  hook: string;
  format: string; // POV, Tutorial, Talking head, Skit, Listicle...
  lengthSec: number;
  script: ScriptBeat[];
  onScreen: string[];
  caption: string;
  hashtags: string[];
  sound: string;
  rationale: string;
  hookScore: number; // 0-100
  pillar: string;
  basedOn?: string; // the real trending video this idea adapts (live data only)
}

export type PlanItemKind = "post" | "action" | "milestone";

export interface PlanItem {
  id: string;
  kind: PlanItemKind;
  title: string;
  detail: string;
}

export interface PlanPhase {
  id: string; // "30" | "60" | "90"
  label: string;
  range: string; // "Days 1–30"
  focus: string;
  items: PlanItem[];
}

export interface GrowthPlan {
  phases: PlanPhase[];
}

// ---- Static content -------------------------------------------------------

export interface PlaybookStep {
  key: string;
  phase: string; // "Foundation" | "Warm-up" | "Launch" | "Momentum"
  title: string;
  detail: string;
  tip?: string;
}

export interface LessonSection {
  heading: string;
  body: string;
}

export interface Lesson {
  slug: string;
  moduleId: string;
  title: string;
  minutes: number;
  summary: string;
  sections: LessonSection[];
}

export interface AcademyModule {
  id: string;
  order: number;
  title: string;
  blurb: string;
}

// ---- Social radar ---------------------------------------------------------

export interface SocialCreator {
  handle: string;
  niche: string;
  followers: number;
  avgViews: number;
  angle: string;
}

export interface SocialVideo {
  id: string;
  creator: string;
  platform: "tiktok" | "instagram";
  caption: string;
  views: number;
  likes: number;
  comments: number;
  postedDaysAgo: number;
  format: string;
  hook: string;
  url?: string; // real post URL (present with a live provider; enables in-app playback)
}
