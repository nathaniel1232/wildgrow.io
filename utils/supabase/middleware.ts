import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes the Supabase auth session on each request and rewrites the
 * Supabase auth cookies onto the response.
 *
 * Robustness: if the Supabase env vars are not configured, this is a no-op and
 * simply passes the request through untouched. It only ever touches Supabase's
 * own cookies and never the app's `wf_session` / `wf_onboarding` jose cookies.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // No Supabase configured → pass through untouched. (Scaffolding guard so the
  // app keeps booting on SQLite without Supabase env present.)
  if (!url || !key) {
    return supabaseResponse;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  // IMPORTANT: refresh the auth token if present. Do NOT add code between
  // createServerClient and this call. We intentionally do not gate any routes
  // here — the app's own jose auth handles redirects.
  await supabase.auth.getUser();

  return supabaseResponse;
}
