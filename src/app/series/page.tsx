import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuizPromoBanner } from "@/components/ui/QuizPromoBanner";

export const metadata: Metadata = {
  title:
    "Kingdom of Valdrath Reading Order & Complete Series Guide — Eva Noir Books",
  description:
    "The complete reading order for The Kingdom of Valdrath, an 8-book epic fantasy series by Eva Noir. 7 brothers, a dying king, a murdered heir, and a kingdom on the brink. Start reading today.",
  keywords: [
    "Kingdom of Valdrath series",
    "Kingdom of Valdrath reading order",
    "Eva Noir books",
    "Valdrath book series order",
    "Kingdom of Valdrath books",
    "epic fantasy series",
    "Valdrath series guide",
    "Eva Noir fantasy",
  ],
  openGraph: {
    title: "The Kingdom of Valdrath: Complete Series Guide",
    description:
      "8 books. 7 brothers. One kingdom on the brink. Discover the complete reading order for Eva Noir's epic fantasy series.",
    url: "https://bookcreed.com/series",
    type: "website",
    siteName: "Book Creed",
    images: [
      {
        url: "/covers/valdrath/book1.jpg",
        width: 800,
        height: 1200,
        alt: "The Kingdom of Valdrath — Book 1: The Exile's Return",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Kingdom of Valdrath: Complete Series Guide",
    description:
      "8 books. 7 brothers. One kingdom on the brink. The complete reading order for Eva Noir's epic fantasy series.",
    images: ["/covers/valdrath/book1.jpg"],
  },
  alternates: {
    canonical: "https://bookcreed.com/series",
  },
};

const books = [
  {
    number: 1,
    title: "The Exile's Return",
    blurb:
      "Cassian Stormborn returns from exile to investigate his brother's murder, only to find the kingdom fracturing around him. Old alliances crumble and new enemies emerge from the shadows of the court.",
    available: true,
    asin: "B0GKXNCCXD",
    cover: "/covers/valdrath/book1.jpg",
  },
  {
    number: 2,
    title: "The Shadow's Reach",
    blurb:
      "As Cassian uncovers deeper conspiracies, the shadows threatening Valdrath extend further than anyone imagined. Loyalties are tested and the price of truth may be higher than any brother is willing to pay.",
    available: true,
    asin: "B0GL3YQFKS",
    cover: "/covers/valdrath/book2.jpg",
  },
  {
    number: 3,
    title: "The Crimson Throne",
    blurb:
      "The throne room runs red with betrayal. As factions clash and brothers choose sides, the fight for the crown takes a devastating turn no one predicted.",
    available: false,
    cover: "/covers/valdrath/book3.jpg",
  },
  {
    number: 4,
    title: "The Iron Heir",
    blurb:
      "A new claimant emerges with an iron will and a dangerous secret. The balance of power shifts as old wounds reopen and new blood is spilled.",
    available: false,
    cover: "/covers/valdrath/book4.jpg",
  },
  {
    number: 5,
    title: "The Shattered Alliance",
    blurb:
      "The fragile alliance holding the kingdom together fractures beyond repair. War looms on every border as brothers turn against brothers.",
    available: false,
    cover: "/covers/valdrath/book5.jpg",
  },
  {
    number: 6,
    title: "The Last Siege",
    blurb:
      "The final siege begins. With enemies closing in from every direction, Cassian must make impossible choices to save what remains of Valdrath.",
    available: false,
    cover: "/covers/valdrath/book6.jpg",
  },
  {
    number: 7,
    title: "The Crown of Ashes",
    blurb:
      "From the ashes of a ruined kingdom, one brother rises to claim what's left. But the crown carries a curse older than the Stormborn bloodline itself.",
    available: false,
    cover: "/covers/valdrath/book7.jpg",
  },
  {
    number: 8,
    title: "The Kingdom Reborn",
    blurb:
      "The saga reaches its epic conclusion. Every scar, every betrayal, every sacrifice has led to this moment — the rebirth of a kingdom or its final destruction.",
    available: false,
    cover: "/covers/valdrath/book8.jpg",
  },
];

const sellingPoints = [
  {
    icon: "⚔️",
    title: "A Morally Complex Protagonist",
    description:
      "Cassian Stormborn isn't your typical hero. He's a prince who killed innocents, carries seven scars as penance, and must decide whether redemption is even possible for a man like him.",
  },
  {
    icon: "👑",
    title: "Political Intrigue That Rivals Game of Thrones",
    description:
      "Shifting alliances, court conspiracies, assassination plots, and a succession crisis that puts every brother against every brother. No one is safe. No one is innocent.",
  },
  {
    icon: "🗡️",
    title: "7 Brothers, Each With Their Own Agenda",
    description:
      "Every Stormborn prince has a unique motivation — vengeance, duty, ambition, love, faith. You'll root for all of them. You'll hate some of them. You'll never forget any of them.",
  },
  {
    icon: "📚",
    title: "A Complete Series — No Waiting Years Between Books",
    description:
      "The full 8-book saga is planned and in production. No decade-long waits, no abandoned storylines. Just a massive, complete epic fantasy experience.",
  },
  {
    icon: "🧩",
    title: "Interactive Companion Experience",
    description:
      "Go beyond the books with interactive character quizzes, a detailed companion guide, world lore, and deep dives into the history of Valdrath — all free at bookcreed.com.",
  },
];

export default function SeriesPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-stone-900)_0%,_var(--color-stone-950)_70%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* ── Hero / Series Overview ── */}
        <section className="mb-20 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
            The Complete Series Guide
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-stone-100 sm:text-5xl lg:text-6xl">
            <span className="gold-gradient">The Kingdom of Valdrath</span>
          </h1>
          <div className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-stone-300">
            A dying king. A murdered heir. Seven brothers tearing a kingdom
            apart. When Prince Cassian Stormborn returns from exile to
            investigate his brother&apos;s assassination, he walks into a court
            seething with conspiracy, a succession crisis that could ignite civil
            war, and a darkness older than the Stormborn dynasty itself. The
            Kingdom of Valdrath is an 8-book epic fantasy saga where every
            alliance has a price and every scar tells a story.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-stone-400">
            Spanning political intrigue, brutal combat, forbidden alliances, and
            the bonds between brothers pushed to their breaking point, this is a
            series for readers who love morally grey characters, layered
            world-building, and twists that rewrite everything you thought you
            knew. If{" "}
            <em>Game of Thrones</em> met{" "}
            <em>The Lies of Locke Lamora</em>, you&apos;d get the Kingdom of
            Valdrath.
          </p>
        </section>

        {/* ── Reading Order ── */}
        <section className="mb-24">
          <div className="mb-12 text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-stone-100 sm:text-4xl">
              Reading Order
            </h2>
            <p className="mt-3 text-stone-400">
              8 books. Read them in order for the full experience.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((book) => (
              <div
                key={book.number}
                className="glass-card group relative overflow-hidden transition-all duration-300 hover:border-gold-500/30 hover:shadow-[0_0_40px_rgba(245,158,11,0.08)]"
              >
                {/* Cover image */}
                <div className="relative aspect-[2/3] w-full overflow-hidden">
                  <Image
                    src={book.cover}
                    alt={`Book ${book.number}: ${book.title}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Book number badge */}
                  <div className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-stone-900/80 text-sm font-bold text-gold-500 ring-1 ring-gold-500/40 backdrop-blur-sm">
                    {book.number}
                  </div>
                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    {book.available ? (
                      <span className="rounded-full bg-emerald-900/80 px-2.5 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-500/40 backdrop-blur-sm">
                        Available Now
                      </span>
                    ) : (
                      <span className="rounded-full bg-stone-800/80 px-2.5 py-1 text-xs font-semibold text-stone-400 ring-1 ring-stone-600/40 backdrop-blur-sm">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-stone-100 transition-colors group-hover:text-gold-400">
                    {book.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">
                    {book.blurb}
                  </p>
                  {book.available && book.asin && (
                    <a
                      href={`https://www.amazon.com/dp/${book.asin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-500 transition-colors hover:text-gold-400"
                    >
                      Get on Amazon
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why Read This Series? ── */}
        <section className="mb-24">
          <div className="mb-12 text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-stone-100 sm:text-4xl">
              Why Read This Series?
            </h2>
            <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sellingPoints.map((point) => (
              <div
                key={point.title}
                className="glass-card p-7 transition-all duration-300 hover:border-gold-500/20"
              >
                <span className="text-3xl">{point.icon}</span>
                <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-bold text-stone-100">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-400">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Quiz Promo ── */}
        <section className="mb-24">
          <QuizPromoBanner />
        </section>

        {/* ── CTA Section ── */}
        <section className="text-center">
          <div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-stone-700 to-transparent" />
          <div className="mt-12">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-stone-100 sm:text-3xl">
              Ready to Enter Valdrath?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-stone-400">
              Start with Book 1 and discover why readers are calling this
              &ldquo;the next great fantasy epic.&rdquo;
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://www.amazon.com/dp/B0GKXNCCXD"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Start with Book 1
                <svg
                  className="h-4 w-4"
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
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
              <Link
                href="/sample"
                className="text-stone-400 underline decoration-stone-600 underline-offset-4 transition-colors hover:text-gold-400 hover:decoration-gold-500/40"
              >
                Read a Free Sample
              </Link>
              <Link
                href="/companion"
                className="text-stone-400 underline decoration-stone-600 underline-offset-4 transition-colors hover:text-gold-400 hover:decoration-gold-500/40"
              >
                Companion Guide
              </Link>
              <Link
                href="/quiz"
                className="text-stone-400 underline decoration-stone-600 underline-offset-4 transition-colors hover:text-gold-400 hover:decoration-gold-500/40"
              >
                Which Brother Are You?
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
