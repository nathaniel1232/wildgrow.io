import { z } from "zod";

export const pillarSchema = z.object({
  title: z.string(),
  why: z.string(),
  formats: z.array(z.string()),
});

export const personaSchema = z.object({
  name: z.string(),
  bio: z.string(),
  painPoints: z.array(z.string()),
  desires: z.array(z.string()),
  wateringHoles: z.array(z.string()),
});

export const growthProfileSchema = z.object({
  positioning: z.string(),
  pillars: z.array(pillarSchema).min(3).max(5),
  persona: personaSchema,
});

export const beatSchema = z.object({
  t: z.string(),
  label: z.string(),
  text: z.string(),
});

export const ideaSchema = z.object({
  title: z.string(),
  hook: z.string(),
  format: z.string(),
  lengthSec: z.number(),
  script: z.array(beatSchema).min(2),
  onScreen: z.array(z.string()),
  caption: z.string(),
  hashtags: z.array(z.string()),
  sound: z.string(),
  rationale: z.string(),
  hookScore: z.number(),
  pillar: z.string(),
  basedOn: z.string().optional(),
});

export const ideasSchema = z.object({ ideas: z.array(ideaSchema) });

export const planItemSchema = z.object({
  id: z.string(),
  kind: z.enum(["post", "action", "milestone"]),
  title: z.string(),
  detail: z.string(),
});

export const planPhaseSchema = z.object({
  id: z.string(),
  label: z.string(),
  range: z.string(),
  focus: z.string(),
  items: z.array(planItemSchema),
});

export const planSchema = z.object({ phases: z.array(planPhaseSchema) });

export const analysisSchema = z.object({
  whyItWorked: z.array(z.string()),
  howToAdapt: z.string(),
  suggestedHook: z.string(),
});

export const launchPostSchema = z.object({
  community: z.string(),
  title: z.string(),
  body: z.string(),
  note: z.string(),
});

export const launchPostsSchema = z.object({
  posts: z.array(launchPostSchema),
});

export function jsonSchemaOf(schema: z.ZodType): Record<string, unknown> {
  return z.toJSONSchema(schema) as Record<string, unknown>;
}
