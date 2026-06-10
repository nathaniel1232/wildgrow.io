import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { progressSet } from "@/lib/app-data";
import { PLAYBOOK_STEPS, PLAYBOOK_PHASES } from "@/lib/content/playbook";
import { hasApiKey } from "@/lib/ai";
import { PageHeader, PageBody } from "@/components/app/page-header";
import { PlaybookList } from "@/components/app/playbook-list";
import { LaunchPostDrafts } from "@/components/app/launch-posts";

export const metadata: Metadata = { title: "Launch Playbook" };

export default async function PlaybookPage() {
  const user = await requireUser();
  const progress = await prisma.progress.findMany({
    where: { userId: user.id, kind: "playbook" },
  });
  const doneKeys = [...progressSet(progress, "playbook")];

  return (
    <>
      <PageHeader
        eyebrow="Launch Playbook"
        title="From cold account to first viral hit"
        description="Work it in order: set the account up, warm up the algorithm, launch, and compound. These are the moves indie founders actually used to break through — not generic advice."
      />
      <PageBody className="space-y-8">
        <PlaybookList
          steps={PLAYBOOK_STEPS}
          phases={PLAYBOOK_PHASES}
          doneKeys={doneKeys}
        />
        <LaunchPostDrafts live={hasApiKey()} />
      </PageBody>
    </>
  );
}
