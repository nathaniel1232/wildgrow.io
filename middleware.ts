import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

/**
 * Root middleware — refreshes the Supabase auth session on each request.
 *
 * SAFETY (rebrand scaffolding):
 *  - `updateSession` is a no-op pass-through when the Supabase env vars are
 *    unset, so this never depends on Supabase being configured.
 *  - It only touches Supabase's own auth cookies; the app's hand-rolled
 *    `wf_session` / `wf_onboarding` (jose) cookies are never read or written
 *    here, so existing auth is unaffected.
 *  - The whole thing is wrapped in try/catch: any unexpected failure falls
 *    back to passing the request through untouched, so a Supabase hiccup can
 *    never break a route.
 */
export async function middleware(request: NextRequest) {
  try {
    return await updateSession(request);
  } catch {
    return NextResponse.next({ request });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - common static asset file extensions
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
