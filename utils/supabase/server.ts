import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client, bound to the Next.js request cookie store.
 *
 * NOTE (rebrand scaffolding): Supabase is being adopted as the database layer
 * (Prisma → Supabase Postgres). This auth client is scaffolded ahead of the
 * connection string arriving and is NOT yet wired into the app — the existing
 * hand-rolled `wf_session` (jose JWT) auth remains the source of truth.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component. This can
            // be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    },
  );
}
