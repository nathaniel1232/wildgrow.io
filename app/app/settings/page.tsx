import type { Metadata } from "next";
import { Sparkles, Radar, Check, AlertCircle, LogOut } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { hasApiKey, aiProviderLabel } from "@/lib/ai";
import { getSocialProvider } from "@/lib/social";
import { logoutAction } from "@/lib/auth-actions";
import { PageHeader, PageBody } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = { title: "Settings" };

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-line py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-paper-dim">{label}</span>
      <span className="text-sm font-medium text-paper">{value}</span>
    </div>
  );
}

export default async function SettingsPage() {
  const user = await requireUser();
  const profile = user.profile!;
  const live = hasApiKey();
  const aiLabel = aiProviderLabel();
  const social = getSocialProvider();

  return (
    <>
      <PageHeader
        eyebrow="Settings"
        title="Settings"
        description="Your account, your app profile, and the engines powering Wildgrow."
      />
      <PageBody className="max-w-3xl space-y-6">
        {/* Account */}
        <section className="rounded-2xl border border-line bg-ink-900 p-6">
          <h2 className="font-display text-lg font-semibold text-paper">
            Account
          </h2>
          <div className="mt-3">
            <Row label="Name" value={user.name || "—"} />
            <Row label="Email" value={user.email} />
          </div>
        </section>

        {/* App profile */}
        <section className="rounded-2xl border border-line bg-ink-900 p-6">
          <h2 className="font-display text-lg font-semibold text-paper">
            App profile
          </h2>
          <p className="mt-1 text-sm text-paper-dim">
            What the engine uses to tailor everything it generates.
          </p>
          <div className="mt-4">
            <Row label="App name" value={profile.appName} />
            <Row label="Category" value={profile.category} />
            <Row label="One-liner" value={profile.oneLiner} />
            <Row label="Stage" value={profile.stage || "—"} />
            {profile.tiktokHandle && (
              <Row label="TikTok" value={profile.tiktokHandle} />
            )}
            {profile.igHandle && (
              <Row label="Instagram" value={profile.igHandle} />
            )}
          </div>
        </section>

        {/* Integrations */}
        <section className="rounded-2xl border border-line bg-ink-900 p-6">
          <h2 className="font-display text-lg font-semibold text-paper">
            Engines
          </h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-3 rounded-xl border border-line bg-ink-925 p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-ink-850 text-ember">
                <Sparkles size={16} />
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-paper">AI generation</p>
                  <Badge tone={live ? "up" : "ember"}>{aiLabel}</Badge>
                </div>
                <p className="mt-1 text-sm text-paper-dim">
                  {live
                    ? "Ideas, scripts, plans, and analysis are generated live."
                    : "Running on Wildgrow's built-in engine. Add an ANTHROPIC_API_KEY (Claude) or OPENAI_API_KEY + OPENAI_BASE_URL (OpenAI, Minimax, DeepSeek…) to switch to live generation."}
                </p>
              </div>
              {live ? (
                <Check size={18} className="mt-1 shrink-0 text-up" />
              ) : (
                <AlertCircle size={18} className="mt-1 shrink-0 text-paper-faint" />
              )}
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-line bg-ink-925 p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-ink-850 text-ember">
                <Radar size={16} />
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-paper">Niche Radar data</p>
                  <Badge tone={social.isDemo ? "amber" : "up"}>
                    {social.isDemo ? "Sample data" : `Live · ${social.name}`}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-paper-dim">
                  {social.isDemo
                    ? "Showing clearly-labeled sample data so it’s never mistaken for real. Set SOCIAL_PROVIDER=ensemble and ENSEMBLE_TOKEN to pull live TikTok videos that play in-app."
                    : `Live niche videos via ${social.name}, refreshed hourly and playable in-app.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sign out */}
        <section className="rounded-2xl border border-line bg-ink-900 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-paper">
                Sign out
              </h2>
              <p className="mt-1 text-sm text-paper-dim">
                You can log back in any time — your data stays put.
              </p>
            </div>
            <form action={logoutAction}>
              <button className={buttonVariants({ variant: "outline" })}>
                <LogOut size={16} /> Log out
              </button>
            </form>
          </div>
        </section>
      </PageBody>
    </>
  );
}
