import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Public — onboarding runs before signup. Only bounce fully set-up users.
  const user = await getCurrentUser();
  if (user?.profile?.onboarded && user.plan) redirect("/app");

  return (
    <div
      data-theme="night"
      className="relative min-h-screen overflow-hidden bg-ink-950 text-paper"
    >
      <div
        aria-hidden
        className="glow-ember pointer-events-none absolute left-1/2 top-[-160px] h-[480px] w-[760px] -translate-x-1/2 opacity-40 blur-[30px]"
      />
      <div className="relative mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-16">
        {children}
      </div>
    </div>
  );
}
