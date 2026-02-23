"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  books,
  SERIES_NAME,
  AUTHOR_NAME,
  AUTHOR_BIO_MEDIUM,
  AMAZON_AUTHOR_URL,
  COMP_AUTHORS,
} from "@/data/books";
import type { BookData } from "@/data/books";

/* ------------------------------------------------------------------ */
/* Animated section wrapper                                            */
/* ------------------------------------------------------------------ */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Amazon icon SVG                                                     */
/* ------------------------------------------------------------------ */
function AmazonIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.493.126.12.19.065.398-.16.558-.836.582-1.798 1.09-2.886 1.526-1.088.435-2.126.763-3.116.982a18.09 18.09 0 0 1-3.665.33c-1.926 0-3.78-.303-5.56-.91a16.38 16.38 0 0 1-4.762-2.584c-.49-.39-.725-.7-.704-.93.017-.178.095-.304.217-.432zm6.03-4.4c0-.63.168-1.2.503-1.71.336-.51.774-.88 1.316-1.107-.26-.34-.44-.73-.54-1.174a3.14 3.14 0 0 1 .053-1.49c.123-.472.34-.88.65-1.22.31-.34.69-.58 1.14-.72a.73.73 0 0 1 .12-.03c.02 0 .04-.01.05-.02l.08-.02c.34-.07.61-.1.81-.08.36.02.67.12.9.28.23.16.44.38.62.66.05.08.1.16.14.24l.04.08c.02.06.05.12.08.19.03.06.05.12.07.18l.05.16c.03.12.06.24.07.36.02.12.03.22.04.31.02.15.02.29.01.42 0 .13-.02.26-.04.39-.03.13-.05.24-.08.35-.03.1-.07.21-.11.32-.05.11-.08.2-.12.28-.03.08-.08.17-.13.25-.05.1-.09.16-.12.21-.03.04-.08.11-.15.2-.07.1-.11.16-.14.2l-.34.37a.94.94 0 0 0 .58.36c.24.06.54.08.92.08h1.64c.58 0 1.09.14 1.54.42.45.28.79.67 1.03 1.17.23.5.35 1.04.35 1.62 0 .9-.27 1.67-.82 2.3-.55.64-1.27.96-2.17.96h-.68c-.24 0-.42.03-.54.1-.12.06-.22.16-.28.3-.07.13-.1.26-.11.38-.01.11-.01.27.02.48l.56 2.85c.06.36.07.6.01.74-.06.14-.24.22-.54.22h-2.14c-.2 0-.34-.05-.44-.16-.1-.11-.18-.28-.22-.52l-.88-5.4c-.04-.24-.12-.4-.22-.48a.63.63 0 0 0-.42-.12h-.38c-.66 0-1.24-.18-1.73-.54a2.87 2.87 0 0 1-1.07-1.4 4.1 4.1 0 0 1-.28-1.56zM21.72 16.3c.12-.14.29-.28.52-.4.23-.13.38-.16.47-.07.34.32.62.6.83.84.21.23.43.52.65.88.23.36.38.72.47 1.07.09.36.06.67-.07.95a.64.64 0 0 1-.14.18c-.03.03-.06.06-.1.1a1.7 1.7 0 0 1-.2.17c-.07.05-.17.12-.31.2-.14.1-.26.17-.37.22-.11.05-.26.12-.45.2-.2.1-.37.17-.52.22-.15.05-.33.11-.56.17-.23.07-.42.12-.58.16-.16.03-.35.07-.58.1-.23.04-.42.06-.58.07l-.63.02c-.19 0-.42-.02-.67-.05-.26-.03-.45-.07-.58-.1-.13-.03-.3-.1-.5-.18-.2-.09-.35-.17-.43-.24-.09-.08-.19-.18-.3-.32-.11-.13-.18-.25-.2-.35l-.02-.09-.02-.08a.84.84 0 0 1 .28-.66c.2-.2.5-.3.88-.3h.18c.64 0 1.23-.13 1.76-.38.52-.25.86-.56 1-93z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Format button                                                       */
/* ------------------------------------------------------------------ */
function FormatButton({
  format,
  price,
  url,
}: {
  format: string;
  price: string;
  url: string;
}) {
  const icons: Record<string, string> = {
    Kindle: "📱",
    Paperback: "📖",
    Hardcover: "📕",
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-lg border border-stone-700/60 bg-stone-900/50 px-4 py-3 transition-all hover:border-gold-500/40 hover:bg-stone-800/60 hover:shadow-[0_0_15px_rgba(245,158,11,0.08)]"
    >
      <span className="text-lg">{icons[format] || "📖"}</span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-stone-200 group-hover:text-gold-400 transition-colors">
          {format}
        </p>
      </div>
      <span className="font-[family-name:var(--font-heading)] text-sm font-bold text-gold-400">
        {price}
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Single book card (storefront style)                                 */
/* ------------------------------------------------------------------ */
function StorefrontBook({ book, index }: { book: BookData; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <Reveal delay={0.05}>
      <div
        id={`book-${book.number}`}
        className={`glass-card overflow-hidden ${
          book.published
            ? "border-gold-500/10"
            : ""
        }`}
      >
        <div
          className={`flex flex-col ${
            isEven ? "lg:flex-row" : "lg:flex-row-reverse"
          } gap-0`}
        >
          {/* Cover */}
          <div className="relative w-full lg:w-[320px] xl:w-[360px] shrink-0">
            <div className="relative aspect-[2/3] lg:aspect-auto lg:h-full w-full overflow-hidden">
              <Image
                src={book.coverUrl}
                alt={`${book.title} — Book ${book.number} of ${SERIES_NAME}`}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 360px"
              />
              {/* Gradient fade into content area */}
              <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-transparent to-stone-950/80 lg:to-[rgba(28,25,23,0.95)]" />
              {/* Book number badge */}
              <div className="absolute left-4 top-4 rounded-lg bg-stone-950/80 px-3 py-1.5 backdrop-blur-sm">
                <span className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wider text-gold-400">
                  Book {book.number}
                </span>
              </div>
              {/* Status badge */}
              {book.published ? (
                <div className="absolute right-4 top-4 rounded-lg bg-gold-500/20 px-3 py-1.5 backdrop-blur-sm border border-gold-400/20">
                  <span className="text-xs font-semibold text-gold-400">
                    Available Now
                  </span>
                </div>
              ) : (
                <div className="absolute right-4 top-4 rounded-lg bg-stone-800/80 px-3 py-1.5 backdrop-blur-sm border border-stone-600/30">
                  <span className="text-xs font-semibold text-stone-400">
                    Coming Soon
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10">
            {/* Tagline */}
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gold-500 mb-2">
              {book.tagline}
            </p>

            {/* Title */}
            <h3 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-stone-100 mb-4">
              {book.title}
            </h3>

            {/* Blurb */}
            <p className="text-stone-400 leading-relaxed mb-6 max-w-xl">
              {book.blurb}
            </p>

            {/* Buy buttons or Coming Soon */}
            {book.published && book.formats.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {book.formats.map((f) => (
                    <FormatButton key={f.format} {...f} />
                  ))}
                </div>
                <div className="flex gap-3 pt-1">
                  <Link
                    href={`/series/kingdom-of-valdrath/${book.number}`}
                    className="text-sm font-medium text-stone-500 hover:text-gold-400 transition-colors underline decoration-stone-700 underline-offset-4 hover:decoration-gold-500/50"
                  >
                    More details →
                  </Link>
                  <Link
                    href={`/quiz/valdrath-book-${book.number}`}
                    className="text-sm font-medium text-stone-500 hover:text-gold-400 transition-colors underline decoration-stone-700 underline-offset-4 hover:decoration-gold-500/50"
                  >
                    Take the quiz →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-stone-800 max-w-[120px]" />
                <p className="text-sm italic text-stone-500">
                  Coming soon — join our{" "}
                  <Link
                    href="/newsletter"
                    className="text-gold-500 hover:text-gold-400 underline underline-offset-2"
                  >
                    newsletter
                  </Link>{" "}
                  for release updates
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Reading order sidebar                                               */
/* ------------------------------------------------------------------ */
function ReadingOrder() {
  return (
    <Reveal>
      <div className="glass-card p-6 sm:p-8">
        <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-stone-100 mb-6 flex items-center gap-2">
          <span className="text-gold-400">⚔️</span> Reading Order
        </h3>
        <ol className="space-y-3">
          {books.map((book) => (
            <li key={book.number} className="flex items-start gap-3 group">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-500/10 font-[family-name:var(--font-heading)] text-xs font-bold text-gold-400 border border-gold-500/20">
                {book.number}
              </span>
              <div className="flex-1 min-w-0">
                <a
                  href={`#book-${book.number}`}
                  className="text-sm font-medium text-stone-300 group-hover:text-gold-400 transition-colors"
                >
                  {book.title}
                </a>
                {book.published ? (
                  <span className="ml-2 inline-block rounded bg-gold-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-400">
                    Out Now
                  </span>
                ) : (
                  <span className="ml-2 inline-block rounded bg-stone-800 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                    Soon
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 pt-6 border-t border-stone-800">
          <a
            href={AMAZON_AUTHOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm w-full"
          >
            <span>View on Amazon</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Author bio section                                                  */
/* ------------------------------------------------------------------ */
function AuthorBio() {
  return (
    <Reveal>
      <section className="glass-card overflow-hidden">
        <div className="flex flex-col md:flex-row gap-0">
          {/* Decorative side */}
          <div className="relative w-full md:w-72 shrink-0 bg-gradient-to-br from-gold-500/10 via-stone-900 to-stone-950 p-8 flex flex-col items-center justify-center text-center">
            {/* Author monogram */}
            <div className="w-28 h-28 rounded-full bg-stone-950/60 border-2 border-gold-500/30 flex items-center justify-center mb-4">
              <span className="font-[family-name:var(--font-heading)] text-4xl font-bold gold-gradient">
                EN
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-stone-100">
              {AUTHOR_NAME}
            </h3>
            <p className="text-sm text-gold-500 mt-1 uppercase tracking-wider font-semibold">
              Author
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href={AMAZON_AUTHOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-stone-700 px-4 py-2 text-xs font-semibold text-stone-300 transition-all hover:border-gold-500/50 hover:text-gold-400"
              >
                Amazon
              </a>
              <Link
                href="/newsletter"
                className="rounded-lg border border-stone-700 px-4 py-2 text-xs font-semibold text-stone-300 transition-all hover:border-gold-500/50 hover:text-gold-400"
              >
                Newsletter
              </Link>
            </div>
          </div>

          {/* Bio text */}
          <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gold-500 mb-3">
              About the Author
            </p>
            {AUTHOR_BIO_MEDIUM.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-stone-400 leading-relaxed mb-4 last:mb-0"
              >
                {paragraph}
              </p>
            ))}

            <div className="mt-6 pt-6 border-t border-stone-800">
              <p className="text-xs uppercase tracking-wider text-stone-500 mb-2">
                Perfect for fans of
              </p>
              <div className="flex flex-wrap gap-2">
                {COMP_AUTHORS.map((author) => (
                  <span
                    key={author}
                    className="rounded-full bg-stone-800/60 px-3 py-1 text-xs font-medium text-stone-300 border border-stone-700/50"
                  >
                    {author}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Main storefront page                                                */
/* ------------------------------------------------------------------ */
export default function BooksPage() {
  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(245,158,11,0.10),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(180,83,9,0.06),transparent)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-500"
          >
            {AUTHOR_NAME} presents
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="mt-4 font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="gold-gradient">{SERIES_NAME}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-5 max-w-2xl text-lg text-stone-400"
          >
            Eight books. One epic saga of family, betrayal, and the price of
            power. An epic fantasy series for fans of George R.R. Martin, Joe
            Abercrombie, and Robin Hobb.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#book-1"
              className="btn-primary rounded-lg px-8 py-3 text-base"
            >
              Start Reading
            </a>
            <a
              href={AMAZON_AUTHOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-stone-700 px-8 py-3 text-base font-semibold text-stone-300 transition-all hover:border-gold-500/50 hover:text-gold-400 flex items-center gap-2"
            >
              <span>View on Amazon</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </motion.div>

          {/* Series stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex items-center justify-center gap-8 text-center"
          >
            <div>
              <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-gold-400">
                8
              </p>
              <p className="text-xs uppercase tracking-wider text-stone-500">
                Books
              </p>
            </div>
            <div className="h-8 w-px bg-stone-800" />
            <div>
              <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-gold-400">
                630K+
              </p>
              <p className="text-xs uppercase tracking-wider text-stone-500">
                Words
              </p>
            </div>
            <div className="h-8 w-px bg-stone-800" />
            <div>
              <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-gold-400">
                2
              </p>
              <p className="text-xs uppercase tracking-wider text-stone-500">
                Available
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-950 to-transparent" />
      </section>

      {/* ==================== BOOKS + SIDEBAR ==================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Book list */}
          <div className="flex-1 space-y-8">
            <Reveal>
              <div className="text-center lg:text-left mb-4">
                <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold">
                  The <span className="gold-gradient">Complete Saga</span>
                </h2>
                <p className="mt-2 text-stone-400">
                  Seven brothers. One throne. A kingdom built on blood.
                </p>
              </div>
            </Reveal>
            {books.map((book, i) => (
              <StorefrontBook key={book.number} book={book} index={i} />
            ))}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 xl:w-96 shrink-0 space-y-8 lg:sticky lg:top-24 lg:self-start">
            <ReadingOrder />

            {/* Quick series pitch */}
            <Reveal delay={0.1}>
              <div className="glass-card p-6">
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-stone-100 mb-3">
                  Why Read This Series?
                </h3>
                <ul className="space-y-3 text-sm text-stone-400">
                  <li className="flex items-start gap-2">
                    <span className="text-gold-400 mt-0.5">⚔️</span>
                    <span>
                      Epic political intrigue with morally grey characters
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-400 mt-0.5">👑</span>
                    <span>
                      Seven brothers fighting for one throne — each with
                      compelling motivations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-400 mt-0.5">🗡️</span>
                    <span>
                      A warrior culture explored with nuance — strength vs.
                      mercy
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-400 mt-0.5">💔</span>
                    <span>
                      Redemption arcs that earn every moment — no shortcuts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-400 mt-0.5">🌍</span>
                    <span>
                      Deep worldbuilding with 5,000 years of history
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* ==================== AUTHOR BIO ==================== */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
        <AuthorBio />
      </section>

      {/* ==================== SERIES CTA ==================== */}
      <Reveal>
        <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16 text-center">
          <div className="glass-card relative overflow-hidden p-8 sm:p-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gold-600/5 blur-3xl" />

            <div className="relative z-10">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold mb-4">
                Begin Your Journey Into{" "}
                <span className="gold-gradient">Valdrath</span>
              </h2>
              <p className="text-stone-400 max-w-lg mx-auto mb-8">
                Start with <em>The Exile&apos;s Return</em> — available now on
                Kindle, paperback, and hardcover. Join Prince Cassian as he
                returns to a kingdom drowning in blood.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://www.amazon.com/dp/B0GKXNCCXD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary rounded-lg px-8 py-3 text-base flex items-center gap-2"
                >
                  Get Book 1 on Amazon
                </a>
                <Link
                  href="/read/book-1"
                  className="rounded-lg border border-stone-700 px-8 py-3 text-base font-semibold text-stone-300 transition-all hover:border-gold-500/50 hover:text-gold-400"
                >
                  Read a Free Sample
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <div className="h-8" />
    </>
  );
}
