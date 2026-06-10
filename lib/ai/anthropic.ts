import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import type { z } from "zod";
import type { GoogleAuth } from "google-auth-library";
import { jsonSchemaOf } from "./schemas";

// ---------------------------------------------------------------------------
// Provider selection
// Wildfire works with no key (built-in engine). Add credentials for live generation.
// Supports Anthropic (Claude), ANY OpenAI-compatible API (OpenAI, Minimax, DeepSeek,
// Together, Groq…), and Gemini via Vertex AI (Google Cloud — auth via ADC, no key).
// ---------------------------------------------------------------------------

export type AiProvider = "anthropic" | "openai" | "gemini" | "none";

export function aiProvider(): AiProvider {
  const explicit = process.env.WILDFIRE_AI_PROVIDER?.toLowerCase();
  if (explicit === "gemini") return process.env.GOOGLE_VERTEX_PROJECT ? "gemini" : "none";
  if (explicit === "anthropic") return process.env.ANTHROPIC_API_KEY ? "anthropic" : "none";
  if (explicit === "openai") return process.env.OPENAI_API_KEY ? "openai" : "none";
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (process.env.OPENAI_API_KEY) return "openai";
  if (process.env.GOOGLE_VERTEX_PROJECT) return "gemini";
  return "none";
}

export function hasApiKey(): boolean {
  return aiProvider() !== "none";
}

function isMinimax(): boolean {
  return /minimax/i.test(process.env.ANTHROPIC_BASE_URL ?? "");
}
function isCustomAnthropicHost(): boolean {
  const base = process.env.ANTHROPIC_BASE_URL;
  return !!base && !/api\.anthropic\.com/i.test(base);
}

function anthropicModel(): string {
  if (process.env.WILDFIRE_AI_MODEL) return process.env.WILDFIRE_AI_MODEL;
  if (isMinimax()) return "MiniMax-M2.5";
  return "claude-sonnet-4-6";
}
function openaiModel(): string {
  return process.env.WILDFIRE_AI_MODEL || "gpt-4o-mini";
}
function geminiModel(): string {
  return (process.env.WILDFIRE_AI_MODEL || "gemini-2.5-flash").replace(/^google\//, "");
}

export function aiProviderLabel(): string {
  const p = aiProvider();
  if (p === "anthropic") {
    if (isMinimax()) return `Live · MiniMax (${anthropicModel()})`;
    if (isCustomAnthropicHost()) return `Live · ${anthropicModel()}`;
    return "Live · Claude";
  }
  if (p === "openai") return `Live · ${openaiModel()}`;
  if (p === "gemini") return `Live · Gemini (${geminiModel()})`;
  return "Built-in engine";
}

interface StructuredArgs<T> {
  system: string;
  user: string;
  toolName: string;
  toolDescription: string;
  schema: z.ZodType<T>;
  maxTokens?: number;
}

export async function structuredCall<T>(args: StructuredArgs<T>): Promise<T> {
  const provider = aiProvider();
  if (provider === "gemini") return geminiStructured(args);
  if (provider === "openai") return openAiStructured(args);
  return anthropicStructured(args);
}

// ---- Anthropic (tool-forced structured output) ----------------------------

let anthropicClient: Anthropic | null = null;
function getAnthropic(): Anthropic {
  // baseURL lets us point the Anthropic SDK at MiniMax's Anthropic-compatible
  // endpoint (or any compatible host). Falls back to api.anthropic.com.
  return (anthropicClient ??= new Anthropic({
    baseURL: process.env.ANTHROPIC_BASE_URL || undefined,
  }));
}

async function anthropicStructured<T>({
  system,
  user,
  toolName,
  toolDescription,
  schema,
  maxTokens = 2048,
}: StructuredArgs<T>): Promise<T> {
  const res = await getAnthropic().messages.create({
    model: anthropicModel(),
    max_tokens: maxTokens,
    // Prompt caching only on real Anthropic; other hosts (MiniMax) may reject it.
    system: isCustomAnthropicHost()
      ? system
      : [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
    tools: [
      {
        name: toolName,
        description: toolDescription,
        input_schema:
          jsonSchemaOf(schema) as unknown as Anthropic.Tool.InputSchema,
      },
    ],
    tool_choice: { type: "tool", name: toolName },
    messages: [{ role: "user", content: user }],
  });

  const block = res.content.find((b) => b.type === "tool_use");
  if (!block || block.type !== "tool_use") {
    throw new Error("AI response contained no tool_use block");
  }
  return block.input as T;
}

// ---- OpenAI-compatible (JSON mode) ----------------------------------------

function extractJson(text: string): string {
  // tolerate ```json fences or stray prose around the object
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) return fenced[1].trim();
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first !== -1 && last !== -1) return text.slice(first, last + 1);
  return text.trim();
}

async function openAiStructured<T>({
  system,
  user,
  schema,
  maxTokens = 2048,
}: StructuredArgs<T>): Promise<T> {
  const baseURL = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");

  const schemaJson = JSON.stringify(jsonSchemaOf(schema));
  const res = await fetch(`${baseURL}/chat/completions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: openaiModel(),
      max_tokens: maxTokens,
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `${system}\n\nYou are a function that returns ONLY a single JSON object — no prose, no markdown — matching this JSON Schema:\n${schemaJson}`,
        },
        { role: "user", content: user },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`OpenAI-compatible API error ${res.status}: ${body.slice(0, 300)}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("AI response had no content");
  return JSON.parse(extractJson(content)) as T;
}

// ---- Gemini via Vertex AI (OpenAI-compatible endpoint) --------------------
// Auth uses Application Default Credentials — `gcloud auth application-default
// login` locally, or an attached service account in production. No API key, so
// it also works where org policy blocks service-account keys (and from regions
// where the AI Studio / generativelanguage API is geo-blocked). Set
// GOOGLE_VERTEX_ACCESS_TOKEN to supply a token directly (handy for quick tests).

let vertexAuth: GoogleAuth | null = null;

async function vertexAccessToken(): Promise<string> {
  const override = process.env.GOOGLE_VERTEX_ACCESS_TOKEN;
  if (override) return override;
  if (!vertexAuth) {
    const { GoogleAuth: GoogleAuthCtor } = await import("google-auth-library");
    vertexAuth = new GoogleAuthCtor({
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });
  }
  const client = await vertexAuth.getClient();
  const { token } = await client.getAccessToken();
  if (!token) {
    throw new Error(
      "Vertex AI: could not obtain an access token. Run `gcloud auth application-default login` (or set GOOGLE_VERTEX_ACCESS_TOKEN / GOOGLE_APPLICATION_CREDENTIALS).",
    );
  }
  return token;
}

async function geminiStructured<T>({
  system,
  user,
  schema,
  maxTokens = 2048,
}: StructuredArgs<T>): Promise<T> {
  const project = process.env.GOOGLE_VERTEX_PROJECT;
  if (!project) throw new Error("GOOGLE_VERTEX_PROJECT is not set");
  const location = process.env.GOOGLE_VERTEX_LOCATION || "global";
  const host =
    location === "global"
      ? "aiplatform.googleapis.com"
      : `${location}-aiplatform.googleapis.com`;
  const url =
    `https://${host}/v1/projects/${project}/locations/${location}` +
    `/endpoints/openapi/chat/completions`;

  const token = await vertexAccessToken();
  const schemaJson = JSON.stringify(jsonSchemaOf(schema));
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      model: `google/${geminiModel()}`,
      // gemini-2.5-flash spends part of the budget on hidden "thinking" tokens,
      // so give a generous floor — otherwise large structured JSON (e.g. a full
      // idea batch) can truncate mid-object and fail to parse.
      max_tokens: Math.max(maxTokens, 8192),
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `${system}\n\nYou are a function that returns ONLY a single JSON object — no prose, no markdown — matching this JSON Schema:\n${schemaJson}`,
        },
        { role: "user", content: user },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Vertex AI error ${res.status}: ${body.slice(0, 300)}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Vertex AI response had no content");
  return JSON.parse(extractJson(content)) as T;
}
