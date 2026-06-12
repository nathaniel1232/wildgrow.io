import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SporeField } from "@/components/marketing/undergrowth";
import { ScrollProgress } from "@/components/motion/fx";
import { MotionRoot } from "@/components/motion/pref";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionRoot>
      <div
        data-theme="night"
        className="relative min-h-screen bg-ink-950 text-paper"
      >
        <SporeField />
        <ScrollProgress />
        <SiteHeader />
        <main className="relative">{children}</main>
        <SiteFooter />
      </div>
    </MotionRoot>
  );
}
