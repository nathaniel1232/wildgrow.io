import "server-only";
import type { GeneratedIdea, GrowthPlan, GrowthProfile } from "@/lib/types";
import type {
  AiProfileInput,
  IdeaGenOptions,
  LaunchPost,
  SocialVideo,
  VideoAnalysis,
} from "./types";
import { hasApiKey, structuredCall } from "./anthropic";
import * as P from "./prompts";
import * as S from "./schemas";
import {
  analyzeVideoFallback,
  deriveGrowthProfileFallback,
  generateIdeasFallback,
  generateLaunchPostsFallback,
  generatePlanFallback,
} from "./fallback";

export { hasApiKey, aiProvider, aiProviderLabel } from "./anthropic";
export type {
  AiProfileInput,
  IdeaGenOptions,
  LaunchPost,
  VideoAnalysis,
} from "./types";

export async function deriveGrowthProfile(
  input: AiProfileInput,
): Promise<GrowthProfile> {
  if (!hasApiKey()) return deriveGrowthProfileFallback(input);
  try {
    const out = await structuredCall({
      system: P.SYSTEM_CORE,
      user: P.profilePrompt(input),
      toolName: "save_growth_profile",
      toolDescription: "Save the founder's derived organic growth profile.",
      schema: S.growthProfileSchema,
      maxTokens: 1600,
    });
    return S.growthProfileSchema.parse(out) as GrowthProfile;
  } catch (e) {
    console.error("[ai] deriveGrowthProfile fell back to template:", e);
    return deriveGrowthProfileFallback(input);
  }
}

export async function generateIdeas(
  input: AiProfileInput,
  opts: IdeaGenOptions = {},
): Promise<GeneratedIdea[]> {
  if (!hasApiKey()) return generateIdeasFallback(input, opts);
  try {
    const out = await structuredCall({
      system: P.SYSTEM_CORE,
      user: P.ideasPrompt(input, opts),
      toolName: "save_ideas",
      toolDescription: "Save the generated short-form video ideas.",
      schema: S.ideasSchema,
      maxTokens: 4096,
    });
    return S.ideasSchema.parse(out).ideas as GeneratedIdea[];
  } catch (e) {
    console.error("[ai] generateIdeas fell back to template:", e);
    return generateIdeasFallback(input, opts);
  }
}

export async function generatePlan(
  input: AiProfileInput,
): Promise<GrowthPlan> {
  if (!hasApiKey()) return generatePlanFallback(input);
  try {
    const out = await structuredCall({
      system: P.SYSTEM_CORE,
      user: P.planPrompt(input),
      toolName: "save_plan",
      toolDescription: "Save the 30/60/90-day organic growth plan.",
      schema: S.planSchema,
      maxTokens: 2600,
    });
    return S.planSchema.parse(out) as GrowthPlan;
  } catch (e) {
    console.error("[ai] generatePlan fell back to template:", e);
    return generatePlanFallback(input);
  }
}

export async function analyzeVideo(
  video: SocialVideo,
  input: AiProfileInput,
): Promise<VideoAnalysis> {
  if (!hasApiKey()) return analyzeVideoFallback(video, input);
  try {
    const out = await structuredCall({
      system: P.SYSTEM_CORE,
      user: P.analysisPrompt(video, input),
      toolName: "save_analysis",
      toolDescription: "Save the breakdown of why this video worked.",
      schema: S.analysisSchema,
      maxTokens: 1200,
    });
    return S.analysisSchema.parse(out) as VideoAnalysis;
  } catch (e) {
    console.error("[ai] analyzeVideo fell back to template:", e);
    return analyzeVideoFallback(video, input);
  }
}

export async function generateLaunchPosts(
  input: AiProfileInput,
): Promise<LaunchPost[]> {
  if (!hasApiKey()) return generateLaunchPostsFallback(input);
  try {
    const out = await structuredCall({
      system: P.SYSTEM_CORE,
      user: P.launchPostsPrompt(input),
      toolName: "save_launch_posts",
      toolDescription: "Save the tailored community launch posts.",
      schema: S.launchPostsSchema,
      maxTokens: 2200,
    });
    return S.launchPostsSchema.parse(out).posts as LaunchPost[];
  } catch (e) {
    console.error("[ai] generateLaunchPosts fell back to template:", e);
    return generateLaunchPostsFallback(input);
  }
}
