/**
 * Substack Newsletter Archive Integration
 *
 * Eva Noir's Substack: https://evanoir.substack.com
 *
 * This module fetches posts from the Substack RSS feed and transforms them
 * into a display-ready format for the /archive page on bookcreed.com.
 *
 * HOW IT WORKS:
 * ─────────────
 * Substack exposes a public RSS feed at:
 *   https://<publication>.substack.com/feed
 *
 * We parse the XML feed to extract post metadata (title, date, excerpt, URL).
 * Full post content is NOT fetched here — we link back to Substack for reads.
 *
 * WHEN POSTS GO LIVE:
 * ───────────────────
 * Once Eva Noir's first Substack post is published, this feed will
 * automatically populate the archive. No code changes needed.
 *
 * FUTURE IMPROVEMENTS (if needed):
 * ──────────────────────────────────
 * 1. Cache with `next/cache` or ISR (revalidate every 1h) to avoid hammering
 *    the feed on every request.
 * 2. Use Substack's unofficial API (/api/v1/posts) for richer metadata if
 *    the publication upgrades to a paid plan.
 * 3. Mirror full post bodies into a local DB for SEO indexing.
 */

export interface SubstackPost {
  title: string;
  url: string;
  excerpt: string;
  date: string;       // ISO 8601
  coverImage: string | null;
  isPaywalled: boolean;
}

// ─── Configuration ────────────────────────────────────────────────────────────

/** Change this to Eva Noir's actual Substack subdomain once created. */
const SUBSTACK_SUBDOMAIN = "evanoir"; // → https://evanoir.substack.com
const SUBSTACK_FEED_URL = `https://${SUBSTACK_SUBDOMAIN}.substack.com/feed`;

// Revalidation interval (seconds) — refresh archive data every hour on Vercel.
export const ARCHIVE_REVALIDATE = 3600;

// ─── Fetch & Parse ────────────────────────────────────────────────────────────

/**
 * Fetches the Substack RSS feed and returns parsed posts.
 * Returns an empty array (gracefully) if the feed is unavailable or empty.
 */
export async function getSubstackPosts(): Promise<SubstackPost[]> {
  try {
    const res = await fetch(SUBSTACK_FEED_URL, {
      next: { revalidate: ARCHIVE_REVALIDATE },
      headers: {
        "User-Agent": "bookcreed.com/newsletter-archive (+https://bookcreed.com)",
      },
    });

    if (!res.ok) {
      console.warn(`[substack] Feed fetch failed: ${res.status} ${res.statusText}`);
      return [];
    }

    const xml = await res.text();
    return parseRSSFeed(xml);
  } catch (err) {
    console.warn("[substack] Error fetching feed:", err);
    return [];
  }
}

/**
 * Minimal RSS/Atom parser — no external deps needed.
 * Extracts <item> blocks and maps them to SubstackPost objects.
 */
function parseRSSFeed(xml: string): SubstackPost[] {
  const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

  return items.map((item): SubstackPost => {
    const title     = extractTag(item, "title");
    const link      = extractTag(item, "link");
    const pubDate   = extractTag(item, "pubDate");
    const desc      = extractTag(item, "description");
    const enclosure = item.match(/<enclosure[^>]+url="([^"]+)"/)?.[1] ?? null;
    const mediaCover = item.match(/<media:content[^>]+url="([^"]+)"/)?.[1] ?? null;

    // Substack wraps paywalled posts with a subscription CTA in the description
    const isPaywalled = desc.includes("Subscribe now") && desc.length < 600;

    const excerpt = stripHtml(desc).slice(0, 280).trim() + (desc.length > 280 ? "…" : "");

    return {
      title: decodeEntities(title),
      url: link,
      excerpt,
      date: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      coverImage: mediaCover ?? enclosure,
      isPaywalled,
    };
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, "i"));
  return match?.[1]?.trim() ?? "";
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g,  "&")
    .replace(/&lt;/g,   "<")
    .replace(/&gt;/g,   ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g,  "'")
    .replace(/&nbsp;/g, " ");
}
