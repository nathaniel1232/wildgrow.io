import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { hasAccess } from "@/lib/billing";
import { AppShell } from "@/components/app/app-shell";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  if (!user.profile?.onboarded) redirect("/onboarding");
  // Gate on real subscription status. With Stripe unconfigured this falls back
  // to the chosen plan (demo mode), so the no-keys path still works.
  if (!hasAccess(user)) redirect("/welcome");

  return (
    <AppShell
      appName={user.profile.appName}
      userLabel={user.name || user.email}
    >
      {children}
    </AppShell>
  );
}
