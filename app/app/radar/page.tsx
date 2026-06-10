import type { Metadata } from "next";
import { Info, Users, Eye } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { getSocialProvider } from "@/lib/social";
import { formatCompact } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PageHeader, PageBody } from "@/components/app/page-header";
import { RadarVideos } from "@/components/app/radar-videos";
import { RadarSearch } from "@/components/app/radar-search";

export const metadata: Metadata = { title: "Niche Radar" };

/** Specific niche search terms derived from the app — not the broad category. */
function nicheTerms(p: { category: string; oneLiner: string }): string[] {
  const cat = p.category.trim();
  const core = p.oneLiner
    .replace(/^(the|a|an|your)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .join(" ")
    .replace(/[.,!?:;]+$/, "")
    .trim();
  const terms = [core, cat, `${cat} app`].map((t) => t.trim()).filter(Boolean);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of terms) {
    const k = t.toLowerCase();
    if (!seen.has(k)) {
      seen.add(k);
      out.push(t);
    }
  }
  return out.slice(0, 4);
}

export default async function RadarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const user = await requireUser();
  const profile = user.profile!;

  const suggestions = nicheTerms(profile);
  const { q } = await searchParams;
  const query = (q?.trim() || suggestions[0] || profile.category).slice(0, 80);

  const provider = getSocialProvider();
  const [creators, videos] = await Promise.all([
    provider.searchCreators(query),
    provider.getViralVideos(query),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Niche Radar"
        title="What’s working in your niche"
        description="Reverse-engineer the creators and videos already winning in your space, then turn any of them into your version with one tap."
      >
        <Badge tone={provider.isDemo ? "amber" : "up"}>
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              provider.isDemo ? "bg-amber" : "bg-up"
            }`}
          />
          {provider.isDemo ? "Sample data" : `Live · ${provider.name}`}
        </Badge>
      </PageHeader>

      <PageBody className="space-y-8">
        <RadarSearch current={query} suggestions={suggestions} />

        {provider.isDemo && (
          <div className="rounded-xl border border-amber/25 bg-amber/[0.06] p-4 text-sm text-paper-soft">
            <div className="flex items-start gap-3">
              <Info size={16} className="mt-0.5 shrink-0 text-amber" />
              <p>
                <span className="font-medium text-amber">Sample data.</span>{" "}
                These are realistic examples. Open any video to watch real ones
                in your niche on TikTok — or connect live data to play the exact
                videos right here, in-app.
              </p>
            </div>
            <details className="group mt-3 pl-8">
              <summary className="cursor-pointer list-none text-xs font-medium text-amber hover:underline">
                How to connect live videos →
              </summary>
              <ol className="mt-2 space-y-1.5 text-xs leading-relaxed text-paper-dim">
                <li>
                  1. Get a key from a data provider (we recommend{" "}
                  <a
                    href="https://ensembledata.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ember hover:underline"
                  >
                    EnsembleData
                  </a>
                  ).
                </li>
                <li>
                  2. Add to your <span className="font-mono">.env</span>:{" "}
                  <span className="font-mono text-paper-soft">
                    SOCIAL_PROVIDER=ensemble
                  </span>{" "}
                  and{" "}
                  <span className="font-mono text-paper-soft">
                    ENSEMBLE_TOKEN=your_key
                  </span>
                  .
                </li>
                <li>3. Restart the app. Real niche videos will play in-app.</li>
              </ol>
            </details>
          </div>
        )}

        {/* Creators */}
        {creators.length > 0 && (
          <section>
            <h2 className="mb-4 font-display text-lg font-semibold text-paper">
              Creators winning in “{query}”
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {creators.slice(0, 6).map((c) => (
                <div
                  key={c.handle}
                  className="rounded-2xl border border-line bg-ink-900 p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-paper">{c.handle}</span>
                  </div>
                  <p className="mt-1 text-xs text-paper-faint">{c.niche}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-paper-dim">
                    {c.followers > 0 && (
                      <span className="inline-flex items-center gap-1.5">
                        <Users size={12} className="text-paper-faint" />
                        {formatCompact(c.followers)}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5">
                      <Eye size={12} className="text-paper-faint" />
                      {formatCompact(c.avgViews)} avg
                    </span>
                  </div>
                  <p className="mt-4 border-t border-line pt-3 text-sm leading-relaxed text-paper-soft">
                    {c.angle}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Videos */}
        <section>
          <h2 className="mb-4 font-display text-lg font-semibold text-paper">
            Videos blowing up right now
          </h2>
          {videos.length > 0 ? (
            <RadarVideos
              videos={videos.slice(0, 9)}
              appName={profile.appName}
              query={query}
              isDemo={provider.isDemo}
            />
          ) : (
            <p className="rounded-xl border border-line bg-ink-900 p-6 text-sm text-paper-dim">
              {provider.isDemo
                ? `No videos found for “${query}”. Try a broader or different search term above.`
                : `No live videos found for “${query}” — try another keyword above. We never fall back to sample data here.`}
            </p>
          )}
        </section>
      </PageBody>
    </>
  );
}
