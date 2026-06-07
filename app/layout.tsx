import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wildfire.app"),
  title: {
    default: "Wildfire — The organic growth engine for app founders",
    template: "%s · Wildfire",
  },
  description:
    "Wildfire turns app founders into organic growth machines on TikTok & Instagram. AI-built content ideas, scripts, a viral playbook, and a step-by-step plan from zero to your first viral hit.",
  keywords: [
    "organic marketing",
    "tiktok growth",
    "instagram reels",
    "app marketing",
    "indie hacker",
    "viral content",
  ],
  openGraph: {
    title: "Wildfire — The organic growth engine for app founders",
    description:
      "AI-built content ideas, scripts, a viral playbook, and a step-by-step plan to grow your app organically on TikTok & Instagram.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} grain antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
