import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { parseJSON } from "@/lib/parse";
import { hasApiKey } from "@/lib/ai";
import type { ScriptBeat } from "@/lib/types";
import { PageHeader, PageBody } from "@/components/app/page-header";
import { IdeaStudio, type IdeaView } from "@/components/app/idea-studio";

export const metadata: Metadata = { title: "Idea Engine" };

export default async function IdeasPage() {
  const user = await requireUser();

  const rows = await prisma.idea.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const ideas: IdeaView[] = rows.map((r) => ({
    id: r.id,
    title: r.title,
    hook: r.hook,
    format: r.format,
    lengthSec: r.lengthSec,
    script: parseJSON<ScriptBeat[]>(r.scriptJson, []),
    onScreen: parseJSON<string[]>(r.onScreenJson, []),
    caption: r.caption,
    hashtags: parseJSON<string[]>(r.hashtagsJson, []),
    sound: r.sound,
    rationale: r.rationale,
    hookScore: r.hookScore,
    pillar: r.pillar,
    basedOn: r.basedOn,
    status: r.status,
  }));

  return (
    <>
      <PageHeader
        eyebrow="Idea Engine"
        title="Your idea studio"
        description="Fully-scripted video ideas, tuned to your app and niche. Tap any card for the full shot-by-shot script, caption, and hashtags."
      />
      <PageBody>
        <IdeaStudio ideas={ideas} live={hasApiKey()} />
      </PageBody>
    </>
  );
}
