import "server-only";
import type { SocialCreator, SocialVideo } from "@/lib/types";
import { DEMO_CREATORS, DEMO_VIDEOS } from "./demo-data";

export interface SocialProvider {
  readonly name: string;
  readonly isDemo: boolean;
  searchCreators(query?: string): Promise<SocialCreator[]>;
  getViralVideos(query?: string): Promise<SocialVideo[]>;
}

function tokens(q?: string): string[] {
  return (
    (q ?? "")
      .toLowerCase()
      .match(/[a-z]+/g)
      ?.filter((t) => t.length > 2) ?? []
  );
}

function scoreByTags(tags: string[], ts: string[]): number {
  return ts.filter((t) => tags.some((tag) => tag.includes(t) || t.includes(tag)))
    .length;
}

class DemoSocialProvider implements SocialProvider {
  readonly name = "demo";
  readonly isDemo = true;

  async searchCreators(query?: string): Promise<SocialCreator[]> {
    const ts = tokens(query);
    const ranked = DEMO_CREATORS.map((c) => ({
      c,
      score: scoreByTags(c.tags, ts),
    })).sort((a, b) => b.score - a.score || b.c.avgViews - a.c.avgViews);
    const list = ranked.some((r) => r.score > 0)
      ? ranked.filter((r) => r.score > 0)
      : ranked;
    return list.map(({ c }) => {
      const { tags: _tags, ...rest } = c;
      void _tags;
      return rest;
    });
  }

  async getViralVideos(query?: string): Promise<SocialVideo[]> {
    const ts = tokens(query);
    const ranked = DEMO_VIDEOS.map((v) => ({
      v,
      score: scoreByTags(v.tags, ts),
    })).sort((a, b) => b.score - a.score || b.v.views - a.v.views);
    const list = ranked.some((r) => r.score > 0)
      ? ranked.filter((r) => r.score > 0)
      : ranked;
    return list.map(({ v }) => {
      const { tags: _tags, ...rest } = v;
      void _tags;
      return rest;
    });
  }
}

// ---- EnsembleData (live TikTok signals) -----------------------------------
// A real provider. Set SOCIAL_PROVIDER=ensemble and ENSEMBLE_TOKEN to pull
// live niche/viral videos with real URLs (which then play in-app via the
// official embed). Field mapping is best-effort against EnsembleData's TikTok
// keyword-search API — adjust if their response shape changes.

interface EnsembleItem {
  aweme_id?: string | number;
  id?: string | number;
  desc?: string;
  title?: string;
  create_time?: number;
  share_url?: string;
  share_info?: { share_url?: string };
  statistics?: { play_count?: number; digg_count?: number; comment_count?: number };
  stats?: { play_count?: number; digg_count?: number; comment_count?: number };
  author?: { unique_id?: string; nickname?: string; follower_count?: number };
  aweme_info?: EnsembleItem;
}

function pickItem(it: EnsembleItem): EnsembleItem {
  // Some EnsembleData responses wrap the post under `aweme_info`.
  return it.aweme_info ?? it;
}

function keywordsOf(query: string): string {
  return (query.match(/[a-z0-9]+/gi) ?? ["app"]).slice(0, 2).join(" ");
}

class EnsembleSocialProvider implements SocialProvider {
  readonly name = "ensemble";
  readonly isDemo = false;
  private token = process.env.ENSEMBLE_TOKEN ?? "";
  private cache = new Map<string, Promise<SocialVideo[]>>();

  private fetchVideos(query?: string): Promise<SocialVideo[]> {
    const kw = keywordsOf(query ?? "app");
    let pending = this.cache.get(kw);
    if (!pending) {
      // Don't let a transient failure poison this keyword for the life of the
      // process: on error, evict the entry so a later request can retry, and
      // degrade to an empty list (the page renders an explicit empty state).
      pending = this.load(kw).catch((e) => {
        console.error("[social] EnsembleData fetch failed:", e);
        this.cache.delete(kw);
        return [] as SocialVideo[];
      });
      this.cache.set(kw, pending);
    }
    return pending;
  }

  private async load(kw: string): Promise<SocialVideo[]> {
    if (!this.token) return [];
    const url =
      `https://ensembledata.com/apis/tt/keyword/search` +
      `?name=${encodeURIComponent(kw)}&period=180&sorting=1&country=us&token=${this.token}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`EnsembleData ${res.status}`);
    const json = (await res.json()) as {
      data?: { data?: EnsembleItem[] } | EnsembleItem[];
    };
    const nested = Array.isArray(json.data) ? json.data : json.data?.data;
    const raw = Array.isArray(nested) ? nested : [];
    return raw.slice(0, 12).map((row, i) => {
      const it = pickItem(row);
      const handle = it.author?.unique_id ?? "creator";
      const id = String(it.aweme_id ?? it.id ?? i);
      const stats = it.statistics ?? it.stats ?? {};
      const desc = it.desc ?? it.title ?? "";
      const created = it.create_time ?? 0;
      // Canonical URL embeds cleanly (the m.tiktok share_url does not).
      const url = `https://www.tiktok.com/@${handle}/video/${id}`;
      return {
        id,
        creator: `@${handle}`,
        platform: "tiktok" as const,
        caption: desc,
        hook: (desc.split("\n")[0] || desc).slice(0, 120) || "Top video in your niche",
        views: stats.play_count ?? 0,
        likes: stats.digg_count ?? 0,
        comments: stats.comment_count ?? 0,
        postedDaysAgo: created
          ? Math.max(0, Math.round((Date.now() / 1000 - created) / 86400))
          : 0,
        format: "Short video",
        url,
      };
    });
  }

  async getViralVideos(query?: string): Promise<SocialVideo[]> {
    const vids = await this.fetchVideos(query);
    return [...vids].sort((a, b) => b.views - a.views);
  }

  async searchCreators(query?: string): Promise<SocialCreator[]> {
    const vids = await this.fetchVideos(query);
    const groups = new Map<string, SocialVideo[]>();
    for (const v of vids) {
      const arr = groups.get(v.creator);
      if (arr) arr.push(v);
      else groups.set(v.creator, [v]);
    }
    // Follower counts aren't in keyword-search results, so we leave them at 0
    // and hide that stat in the UI rather than show a fabricated number.
    // avgViews is a real average across this creator's videos in the result set.
    return [...groups.entries()]
      .map(([handle, vs]) => ({
        handle,
        niche: query ?? "your niche",
        followers: 0,
        avgViews: Math.round(vs.reduce((s, v) => s + v.views, 0) / vs.length),
        angle: vs[0].hook,
      }))
      .sort((a, b) => b.avgViews - a.avgViews)
      .slice(0, 8);
  }
}

let provider: SocialProvider | null = null;

export function getSocialProvider(): SocialProvider {
  if (provider) return provider;
  const name = (process.env.SOCIAL_PROVIDER ?? "demo").toLowerCase();
  switch (name) {
    case "ensemble":
      provider = process.env.ENSEMBLE_TOKEN
        ? new EnsembleSocialProvider()
        : new DemoSocialProvider();
      break;
    // case "apify": provider = new ApifyProvider(); break;  // future
    default:
      provider = new DemoSocialProvider();
  }
  return provider;
}
