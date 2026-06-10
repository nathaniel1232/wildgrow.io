import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prisma 7 driver-adapter client + native sqlite must not be bundled.
  // `stripe` ships Node-only deps and reads the raw request body in the
  // webhook, so keep it external too (Turbopack-safe).
  serverExternalPackages: [
    "@prisma/client",
    "@prisma/adapter-better-sqlite3",
    "better-sqlite3",
    "stripe",
  ],

  // CSRF / origin safety for Server Actions:
  // Next.js 15 enforces this out of the box — it compares the request's
  // `Origin` header against the `Host` and rejects cross-origin POSTs to
  // Server Actions (HTTP 403). That covers loginAction / signupAction /
  // choosePlan with no extra code. If you deploy behind a proxy whose public
  // host differs from the internal one, uncomment and list the trusted hosts:
  //
  // experimental: {
  //   serverActions: { allowedOrigins: ["your-domain.com", "*.your-domain.com"] },
  // },
};

export default nextConfig;
