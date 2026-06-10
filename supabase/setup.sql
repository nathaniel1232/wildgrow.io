-- ============================================================================
-- Wildgrow — Supabase Postgres setup
--
-- HOW TO RUN: Supabase Dashboard → SQL Editor → New query → paste all of this →
-- Run. Do it ONCE on a fresh project. It creates every table the app needs,
-- then enables Row-Level Security on each one.
--
-- WHY THE RLS PART MATTERS: your Supabase *publishable* key ships to the browser
-- (it's NEXT_PUBLIC_*). Supabase auto-exposes public tables over its REST API,
-- so WITHOUT RLS anyone with that key could read your "User" table — including
-- password hashes. Enabling RLS with no policies denies all anon/API access.
-- The app is UNAFFECTED: it connects through Prisma as the `postgres` role
-- (direct connection), which bypasses RLS, so every feature keeps working.
-- ============================================================================

-- ── Tables ──────────────────────────────────────────────────────────────────
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "plan" TEXT,
    "stripeCustomerId" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripeSubscriptionId" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "status" TEXT NOT NULL,
    "priceId" TEXT,
    "plan" TEXT NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3),
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AppProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "appName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "oneLiner" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "appStoreUrl" TEXT,
    "tiktokHandle" TEXT,
    "igHandle" TEXT,
    "stage" TEXT,
    "positioning" TEXT,
    "pillarsJson" TEXT,
    "personaJson" TEXT,
    "planJson" TEXT,
    "onboarded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppProfile_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Idea" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "hook" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "lengthSec" INTEGER,
    "scriptJson" TEXT NOT NULL,
    "onScreenJson" TEXT,
    "caption" TEXT NOT NULL,
    "hashtagsJson" TEXT NOT NULL,
    "sound" TEXT,
    "rationale" TEXT,
    "hookScore" INTEGER,
    "pillar" TEXT,
    "basedOn" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Idea_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- ── Indexes ───────────────────────────────────────────────────────────────
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");
CREATE UNIQUE INDEX "Subscription_stripeSubscriptionId_key" ON "Subscription"("stripeSubscriptionId");
CREATE UNIQUE INDEX "AppProfile_userId_key" ON "AppProfile"("userId");
CREATE INDEX "Idea_userId_idx" ON "Idea"("userId");
CREATE INDEX "Progress_userId_kind_idx" ON "Progress"("userId", "kind");
CREATE UNIQUE INDEX "Progress_userId_kind_key_key" ON "Progress"("userId", "kind", "key");

-- ── Foreign keys (cascade delete with the owning user) ──────────────────────
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AppProfile" ADD CONSTRAINT "AppProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Idea" ADD CONSTRAINT "Idea_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ── Row-Level Security: lock every table from the public API ────────────────
-- (No policies = deny all anon/authenticated access. Prisma's postgres role
--  bypasses RLS, so the app still has full access.)
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AppProfile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Idea" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Progress" ENABLE ROW LEVEL SECURITY;
