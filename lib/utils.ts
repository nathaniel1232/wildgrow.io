import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCompact(n: number): string {
  if (n < 1000) return `${n}`;
  if (n < 1_000_000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function tiktokSearchUrl(query: string): string {
  return `https://www.tiktok.com/search?q=${encodeURIComponent(query)}`;
}

/** Official embed-player src for a real post URL, or null if not embeddable. */
export function embedSrc(video: {
  platform: string;
  url?: string;
}): string | null {
  if (!video.url) return null;
  if (video.platform === "tiktok") {
    // Handle canonical /video/{id}, m.tiktok /v/{id}.html, share_item_id=, etc.
    const m =
      video.url.match(/(?:\/video\/|\/v\/|item_id=|share_item_id=)(\d{6,})/) ??
      video.url.match(/(\d{15,})/);
    return m ? `https://www.tiktok.com/embed/v2/${m[1]}` : null;
  }
  if (video.platform === "instagram") {
    const m = video.url.match(/(reel|p)\/([A-Za-z0-9_-]+)/);
    return m ? `https://www.instagram.com/${m[1]}/${m[2]}/embed` : null;
  }
  return null;
}
