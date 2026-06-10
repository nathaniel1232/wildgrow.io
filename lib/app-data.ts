import "server-only";
import type { AppProfile, Idea } from "./generated/prisma/client";
import type { AiProfileInput } from "./ai/types";
import type { ContentPillar } from "./types";
import { parseJSON } from "./parse";
import {
  cadenceForDay,
  formatById,
  POSTING_WINDOWS,
  WEEKLY_CADENCE,
  type ViralFormat,
} from "./content/formats";

export function toAiInput(p: AppProfile): AiProfileInput {
  return {
    appName: p.appName,
    category: p.category,
    oneLiner: p.oneLiner,
    audience: p.audience,
    problem: p.problem,
    positioning: p.positioning ?? undefined,
    pillars: parseJSON<ContentPillar[]>(p.pillarsJson, []),
  };
}

export function progressSet(
  rows: { kind: string; key: string }[],
  kind: string,
): Set<string> {
  return new Set(rows.filter((r) => r.kind === kind).map((r) => r.key));
}

// ---- "What to post today" planner ------------------------------------------
// Pure presentation data computed server-side from the local request-time date
// and the user's own ideas. No external calls, no fake "scheduled" claims.

export type PostingWindowView = { platform: string; windows: string[] };

export type WeekDayView = {
  dayOfWeek: number; // 0 = Sun … 6 = Sat
  label: string; // "Mon"
  formatName: string;
  note: string;
  isToday: boolean;
};

export type TodayPlan = {
  /** Long day label, e.g. "Tuesday". */
  dayLabel: string;
  /** Today's recommended format (undefined only if cadence ever lacks a day). */
  format: ViralFormat | undefined;
  /** The one-line cadence note for today. */
  note: string;
  /** First 2–3 actionable steps for today's format. */
  steps: string[];
  /** A concrete idea of the user's to film today, if they have one. */
  ideaToFilm: Idea | null;
  /** Recommended posting windows — general guidance, NOT user analytics. */
  postingWindows: PostingWindowView[];
  /** The full 7-day cadence strip, today flagged. */
  week: WeekDayView[];
};

const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Cadence order to render the strip Mon → Sun (a content week starts Monday).
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];

/**
 * Build the dashboard's "post today" plan from the local request-time date and
 * the user's ideas. Prefers a `saved` idea, then a `new` one, to film today.
 */
export function getTodayPlan(now: Date, ideas: Idea[]): TodayPlan {
  const dayOfWeek = now.getDay();
  const today = cadenceForDay(dayOfWeek);

  const ideaToFilm =
    ideas.find((i) => i.status === "saved") ??
    ideas.find((i) => i.status === "new") ??
    null;

  const week: WeekDayView[] = WEEK_ORDER.map((d) => {
    const entry = WEEKLY_CADENCE.find((c) => c.day === d);
    const fmt = entry ? formatById(entry.formatId) : undefined;
    return {
      dayOfWeek: d,
      label: DAY_SHORT[d],
      formatName: fmt?.name ?? "—",
      note: entry?.note ?? "",
      isToday: d === dayOfWeek,
    };
  });

  return {
    dayLabel: DAY_LONG[dayOfWeek],
    format: today?.format,
    note: today?.note ?? "",
    steps: today?.format.steps.slice(0, 3) ?? [],
    ideaToFilm,
    postingWindows: POSTING_WINDOWS.map((w) => ({
      platform: w.platform,
      windows: w.windows,
    })),
    week,
  };
}
