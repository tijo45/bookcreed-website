import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/quizzes",
        destination: "/quiz",
        permanent: true,
      },
      {
        source: "/contest",
        destination: "/contest/rules",
        permanent: true,
      },
      {
        source: "/world-lore",
        destination: "/lore",
        permanent: true,
      },
      // Legacy /books/<slug> URLs → series detail pages
      {
        source: "/books/the-exiles-return",
        destination: "/series/kingdom-of-valdrath/1",
        permanent: true,
      },
      {
        source: "/books/the-shadows-reach",
        destination: "/series/kingdom-of-valdrath/2",
        permanent: true,
      },
      {
        source: "/books/the-fractured-peace",
        destination: "/series/kingdom-of-valdrath/3",
        permanent: true,
      },
      {
        source: "/books/the-fractured-crown",
        destination: "/series/kingdom-of-valdrath/4",
        permanent: true,
      },
      {
        source: "/books/the-gathering-storm",
        destination: "/series/kingdom-of-valdrath/5",
        permanent: true,
      },
      {
        source: "/books/the-final-scar",
        destination: "/series/kingdom-of-valdrath/6",
        permanent: true,
      },
      {
        source: "/books/the-quiet-throne",
        destination: "/series/kingdom-of-valdrath/7",
        permanent: true,
      },
      {
        source: "/books/the-scarred-crown",
        destination: "/series/kingdom-of-valdrath/8",
        permanent: true,
      },
      // Catch-all: any other /books/<slug> → /books
      {
        source: "/books/:slug",
        destination: "/books",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
