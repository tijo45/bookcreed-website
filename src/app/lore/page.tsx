import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "World Lore — The Kingdom of Valdrath",
  description:
    "Explore the world of Valdrath: characters, timeline, geography, religion, and the legendary Seven Scars of Cassian Stormborn. Dive deep into Eva Noir's epic fantasy universe.",
  openGraph: {
    title: "World Lore — The Kingdom of Valdrath",
    description:
      "Explore the world of Valdrath: characters, timeline, geography, religion, and the legendary Seven Scars of Cassian Stormborn.",
    url: "https://bookcreed.com/lore",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "World Lore — The Kingdom of Valdrath",
    description:
      "Explore the world of Valdrath: characters, timeline, geography, and the Seven Scars of Cassian.",
  },
};

const lorePages = [
  {
    href: "/lore/characters",
    title: "Characters",
    icon: "⚔️",
    description:
      "The Stormborn brothers, their allies, and their enemies. Discover the warriors, kings, and schemers who shape the fate of Valdrath.",
    accent: "from-gold-500/20 to-gold-700/5",
  },
  {
    href: "/lore/timeline",
    title: "Timeline",
    icon: "📜",
    description:
      "Five thousand years of history — from the Founding to the Reformed Code. Trace every war, coronation, betrayal, and triumph.",
    accent: "from-amber-500/20 to-amber-700/5",
  },
  {
    href: "/lore/world",
    title: "The World",
    icon: "🏰",
    description:
      "Geography, politics, religion, and culture. The Kingdom of Valdrath is a world where scars are scripture and combat is prayer.",
    accent: "from-stone-500/20 to-stone-700/5",
  },
  {
    href: "/lore/seven-scars",
    title: "The Seven Scars",
    icon: "🩸",
    description:
      "Each scar tells a story. Each story changed a kingdom. The prophecy of the Scarred King, written in flesh across eight books.",
    accent: "from-red-500/20 to-red-700/5",
  },
];

export default function LorePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-stone-900)_0%,_var(--color-stone-950)_70%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
            The Archives of Valdrath
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-stone-100 sm:text-5xl lg:text-6xl">
            <span className="gold-gradient">World Lore</span>
          </h1>
          <div className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-400">
            Five thousand years of history. Seven brothers. One kingdom on the
            edge of transformation. Step into the world Eva Noir has built across
            eight books — a place where <em>scars are scripture</em> and{" "}
            <em>combat is prayer</em>.
          </p>
        </div>

        {/* Lore cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {lorePages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className={`group glass-card relative overflow-hidden p-8 transition-all duration-300 hover:border-gold-500/30 hover:shadow-[0_0_40px_rgba(245,158,11,0.08)]`}
            >
              {/* Gradient overlay */}
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${page.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />

              <div className="relative">
                <span className="text-3xl">{page.icon}</span>
                <h2 className="mt-4 font-[family-name:var(--font-heading)] text-2xl font-bold text-stone-100 transition-colors group-hover:text-gold-400">
                  {page.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-stone-400">
                  {page.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold-500 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Explore
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-stone-700 to-transparent" />
          <p className="mt-8 font-[family-name:var(--font-heading)] text-lg text-stone-400">
            Begin the journey where it all starts
          </p>
          <a
            href="https://www.amazon.com/dp/B0DZSB8MBH"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-4 inline-block"
          >
            Read Book 1 — The Exile&apos;s Return
          </a>
        </div>
      </div>
    </div>
  );
}
