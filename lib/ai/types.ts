import type { ContentPillar, SocialVideo } from "@/lib/types";

export interface AiProfileInput {
  appName: string;
  category: string;
  oneLiner: string;
  audience: string;
  problem: string;
  positioning?: string;
  pillars?: ContentPillar[];
}

export interface IdeaGenOptions {
  count?: number;
  offset?: number; // rotate templates / AI seed for "generate more"
  pillar?: string; // bias toward a content pillar
  trendingVideos?: SocialVideo[]; // real, currently-trending videos to ground ideas on
}

export interface VideoAnalysis {
  whyItWorked: string[];
  howToAdapt: string;
  suggestedHook: string;
}

export interface LaunchPost {
  community: string; // e.g. "r/SideProject"
  title: string;
  body: string;
  note: string; // posting tip
}

export type { SocialVideo };
