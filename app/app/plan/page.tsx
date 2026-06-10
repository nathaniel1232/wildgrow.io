import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { progressSet } from "@/lib/app-data";
import { parseJSON } from "@/lib/parse";
import type { GrowthPlan } from "@/lib/types";
import { PageHeader, PageBody } from "@/components/app/page-header";
import { PlanBoard } from "@/components/app/plan-board";

export const metadata: Metadata = { title: "30 / 60 / 90 Plan" };

export default async function PlanPage() {
  const user = await requireUser();
  const profile = user.profile!;

  const progress = await prisma.progress.findMany({
    where: { userId: user.id, kind: "plan" },
  });
  const doneKeys = [...progressSet(progress, "plan")];
  const plan = parseJSON<GrowthPlan>(profile.planJson, { phases: [] });

  return (
    <>
      <PageHeader
        eyebrow="30 / 60 / 90 Plan"
        title="Your roadmap to a breakout"
        description="A realistic, phase-by-phase plan from a cold account to your first viral hit. Check things off as you go — momentum compounds."
      />
      <PageBody>
        <PlanBoard plan={plan} doneKeys={doneKeys} />
      </PageBody>
    </>
  );
}
