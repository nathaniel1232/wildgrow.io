# Supabase migration — Prisma → Supabase Postgres

Status: **PREPARED, NOT EXECUTED.** The app still runs on SQLite. Do not run
any of the steps below until the Supabase Postgres connection string is in
hand. These steps are written so the coordinator can execute the flip in one
pass once `DATABASE_URL` is available.

## Decision recap

- Supabase is adopted as the **database layer only** (Prisma talks to Supabase
  Postgres). Supabase Auth is **not** replacing the existing hand-rolled auth
  (bcrypt + jose `wf_session` cookie); the Supabase client scaffolding under
  `utils/supabase/` and the root `middleware.ts` are in place but inert until
  wired up later.
- Until the flip, everything keeps running on the local SQLite file
  (`prisma/dev.db`) via the `@prisma/adapter-better-sqlite3` adapter.

## What is already scaffolded (no action needed)

- `@supabase/supabase-js` + `@supabase/ssr` installed.
- `utils/supabase/{server,client,middleware}.ts` — Supabase clients.
- Root `middleware.ts` — refreshes Supabase sessions; **no-op when Supabase env
  is unset**, only touches Supabase cookies, never the `wf_session` jose cookie.
- `.env.local` — `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- `.env.example` — same keys as placeholders + a commented Postgres `DATABASE_URL`.

## Prerequisite

Get the Supabase Postgres connection string from the dashboard
(Project → Settings → Database → Connection string). You typically want the
**pooled** (PgBouncer, port 6543) string for the app runtime, plus the
**direct** (port 5432) string for running migrations:

```
# App runtime (pooled, transaction mode):
DATABASE_URL="postgresql://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres?pgbouncer=true"
# Migrations / introspection (direct connection):
DIRECT_URL="postgresql://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres"
```

URL-encode any special characters in the password.

## Step-by-step flip

### 1. Install the Postgres driver adapter

```bash
npm install @prisma/adapter-pg pg
npm install -D @types/pg
```

(`@prisma/adapter-better-sqlite3` and `better-sqlite3` can be removed afterward,
once SQLite is fully retired — leave them for now in case of rollback.)

### 2. Change the Prisma datasource provider — `prisma/schema.prisma`

Replace the `datasource db` block:

```prisma
datasource db {
  provider = "sqlite"
}
```

with:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

Note: the schema currently has no `url` on the datasource (the SQLite URL is
passed via the adapter in `lib/db.ts`). Postgres + Prisma migrate needs `url`
(and `directUrl` for pooled setups) declared here.

### 3. Update the runtime adapter — `lib/db.ts`

Current (SQLite):

```ts
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "./generated/prisma/client";

const url = process.env.DATABASE_URL ?? "file:./prisma/dev.db";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const adapter = new PrismaBetterSqlite3({ url });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

Replace with (Postgres):

```ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set (Supabase Postgres connection string).");
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

(`PrismaPg` takes a `connectionString`; the pooled `?pgbouncer=true` URL is fine
for the runtime adapter. Verify the exact import/option name against the
installed `@prisma/adapter-pg` version — Prisma 7 uses `new PrismaPg({ connectionString })`.)

### 4. Set the connection string

Put the real values in `.env` (and `.env.local` if you keep Supabase keys there):

```
DATABASE_URL="postgresql://...:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://...:5432/postgres"
```

### 5. Reset the migration provider lock and regenerate migrations

The existing migrations in `prisma/migrations/` are **SQLite** SQL and
`prisma/migrations/migration_lock.toml` pins `provider = "sqlite"`. Postgres
cannot replay SQLite migration SQL. Two options:

**Option A (recommended — fresh migration history for Postgres):**

```bash
# Remove the SQLite migration history (back it up first if you want it).
rm -rf prisma/migrations
# Generate the client for the new provider.
npx prisma generate
# Create the initial Postgres migration and apply it to Supabase.
npx prisma migrate dev --name init
```

`migrate dev` will recreate `migration_lock.toml` with `provider = "postgresql"`.

**Option B (keep history, change provider lock):** Prisma does not support
cross-provider migration replay, so you would still need to regenerate the SQL.
Prefer Option A unless there is a reason to preserve migration filenames.

For deploying to an already-migrated Supabase DB later, use:

```bash
npx prisma migrate deploy
```

### 6. Regenerate the Prisma client

```bash
npx prisma generate
```

(Already covered by step 5, but re-run if you change the schema again.)

### 7. Seed the demo data into Postgres

`prisma/seed.ts` is already updated for the rebrand (`DEMO_EMAIL =
demo@wildgrow.io`). It is provider-agnostic (uses the `prisma` client), so:

```bash
npm run db:seed
```

Or the one-shot: `npm run setup` (= `prisma migrate deploy && prisma generate &&
tsx prisma/seed.ts`). Note `setup` uses `migrate deploy`, which needs migrations
to already exist — run step 5 (`migrate dev`) first on a fresh Postgres DB.

### 8. Verify

```bash
npx tsc --noEmit          # type-check (adapter import must resolve)
npm run build             # production build
# Boot the app, log in as demo@wildgrow.io, confirm data loads from Postgres.
```

## Schema notes for Postgres

- The schema stores AI-derived data as JSON-encoded **strings** (`pillarsJson`,
  `personaJson`, `planJson`, `scriptJson`, etc.) because "SQLite has no JSON
  type" (see comments in `schema.prisma`). These are plain `String` columns and
  port to Postgres `text` cleanly — **no change required**. (Optional future
  cleanup: migrate them to Postgres `Json` columns, but that is a separate,
  larger change and not part of this flip.)
- Enum-like values stored as strings stay as-is. In particular the `plan`
  values (`"wildfire"`, `"studio"`) and cookie names (`wf_session`,
  `wf_onboarding`) are **internal** and intentionally NOT renamed by the
  rebrand — keep them stable to avoid breaking sessions/billing.
- `@default(cuid())`, `@default(now())`, `@updatedAt`, `@unique`, `@@index`,
  `@@unique`, and `onDelete: Cascade` are all supported on Postgres unchanged.

## Rollback

To revert to SQLite: restore the original `datasource` block (`provider =
"sqlite"`, no `url`), restore `lib/db.ts` to the `PrismaBetterSqlite3` adapter,
restore `prisma/migrations/` + `migration_lock.toml` (`provider = "sqlite"`),
unset `DATABASE_URL`/`DIRECT_URL` (or set back to `file:./prisma/dev.db`), and
`npx prisma generate`. The SQLite `prisma/dev.db` file is untouched by this flip.
