import type { MetadataRoute } from "next";
import { blogPosts } from "./blog/_data/posts";

/**
 * Next.js App Router auto-generates /sitemap.xml from this file.
 * Includes all static pages, dynamic blog posts, and book pages.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://bookcreed.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date("2026-02-20"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/series/kingdom-of-valdrath`,
      lastModified: new Date("2026-02-20"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: new Date("2026-02-20"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/leaderboard`,
      lastModified: new Date("2026-02-20"),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/companion`,
      lastModified: new Date("2026-02-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contest/rules`,
      lastModified: new Date("2026-02-20"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/sample`,
      lastModified: new Date("2026-02-20"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/read/book-1`,
      lastModified: new Date("2026-02-20"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date("2026-02-20"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/lore`,
      lastModified: new Date("2026-02-20"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/lore/characters`,
      lastModified: new Date("2026-02-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/lore/timeline`,
      lastModified: new Date("2026-02-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/lore/world`,
      lastModified: new Date("2026-02-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/lore/seven-scars`,
      lastModified: new Date("2026-02-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2026-02-01"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-02-01"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Dynamic blog post pages
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic book pages — try DB, fall back to hardcoded list
  let bookPages: MetadataRoute.Sitemap = [];
  try {
    const { prisma } = await import("@/lib/prisma");
    const books = await prisma.book.findMany({
      where: { published: true },
      include: { series: { select: { slug: true } } },
      orderBy: { number: "asc" },
    });

    bookPages = books.map((book) => ({
      url: `${baseUrl}/series/${book.series.slug}/${book.number}`,
      lastModified: new Date("2026-02-20"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    // Fallback: known published books
    bookPages = [1, 2].map((num) => ({
      url: `${baseUrl}/series/kingdom-of-valdrath/${num}`,
      lastModified: new Date("2026-02-20"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  }

  return [...staticPages, ...blogPages, ...bookPages];
}
