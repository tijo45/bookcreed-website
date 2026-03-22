"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SocialShareButtons } from "@/components/ui/SocialShareButtons";
import { AUTHOR_NAME, AUTHOR_BIO_MEDIUM, AMAZON_AUTHOR_URL, AUTHOR_SOCIALS, COMP_AUTHORS } from "@/data/books";

interface Book {
  id: string;
  number: number;
  title: string;
  slug: string;
  blurb: string;
  coverImage: string;
  published: boolean;
  kdpUrl: string | null;
}

interface SeriesInfo {
  title: string;
  slug: string;
  books: { number: number; title: string; slug: string }[];
}

interface Props {
  book: Book;
  series: SeriesInfo;
}

export function BookDetail({ book, series }: Props) {
  const prevBook =
    book.number > 1
      ? series.books.find((b) => b.number === book.number - 1)
      : null;
  const nextBook =
    book.number < series.books.length
      ? series.books.find((b) => b.number === book.number + 1)
      : null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-20">
      {/* Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <ol className="flex items-center gap-2 text-sm text-stone-500">
          <li>
            <Link href="/" className="hover:text-gold-400 transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href={`/series/${series.slug}`}
              className="hover:text-gold-400 transition-colors"
            >
              {series.title}
            </Link>
          </li>
          <li>/</li>
          <li className="text-stone-300">Book {book.number}</li>
        </ol>
      </motion.nav>

      <div className="grid md:grid-cols-[340px_1fr] lg:grid-cols-[400px_1fr] gap-10 lg:gap-16">
        {/* Cover with 3D perspective */}
        <motion.div
          initial={{ opacity: 0, rotateY: -8, x: -30 }}
          animate={{ opacity: 1, rotateY: 0, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto md:mx-0"
          style={{ perspective: "1000px" }}
        >
          <div
            className="relative aspect-[2/3] w-[280px] md:w-full rounded-lg overflow-hidden shadow-2xl shadow-stone-950/60 transition-transform duration-500 hover:scale-[1.02]"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateY(-3deg)",
            }}
          >
            <Image
              src={book.coverImage}
              alt={`${book.title} cover`}
              fill
              sizes="(max-width: 768px) 280px, 400px"
              className="object-cover"
              priority
            />
          </div>
          {/* Spine shadow */}
          <div
            className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-stone-950/50 to-transparent pointer-events-none"
            style={{ transform: "translateX(-2px)" }}
          />
        </motion.div>

        {/* Book details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Series & number */}
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-wider mb-2">
            {series.title} &middot; Book {book.number}
          </p>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-5xl text-stone-100 mb-6">
            {book.title}
          </h1>

          {/* Status badge */}
          {book.published ? (
            <span className="inline-block bg-gold-500/10 text-gold-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-gold-400/20 mb-6">
              Available Now
            </span>
          ) : (
            <span className="inline-block bg-stone-800 text-stone-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-stone-700 mb-6">
              Coming Soon
            </span>
          )}

          {/* Blurb */}
          <div className="glass-card p-6 md:p-8 mb-8">
            <p className="text-stone-300 leading-relaxed text-base md:text-lg">
              {book.blurb}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Read Book 1 Free CTA — always shown */}
            <Link
              href="/read/book-1"
              className="inline-flex items-center gap-2 border border-gold-400/50 bg-gold-500/10 text-gold-300 font-semibold px-6 py-3 rounded-lg hover:bg-gold-400/20 hover:text-gold-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Read Book 1 Free
            </Link>
            {book.published && book.kdpUrl && (
              <a
                href={book.kdpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                  />
                </svg>
                Continue Reading on Amazon
              </a>
            )}
            <Link
              href={`/quiz/${book.slug}`}
              className="inline-flex items-center gap-2 border border-stone-600 text-stone-300 font-semibold px-6 py-3 rounded-lg hover:border-gold-400/30 hover:text-gold-400 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              Take the Quiz
            </Link>
          </div>

          {/* Series info badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-lg bg-stone-800/60 border border-stone-700/50 px-4 py-2 text-sm">
            <span className="text-gold-400">⚔️</span>
            <span className="text-stone-400">Kingdom of Valdrath — 8-book series, complete</span>
          </div>

          {/* Social Sharing */}
          <div className="mb-8">
            <SocialShareButtons
              title={book.title}
              url={`https://bookcreed.com/series/${series.slug}/${book.number}`}
              description={`"${book.title}" — Book ${book.number} of ${series.title} by Eva Noir. ${book.published ? "Available now!" : "Coming soon!"}`}
            />
          </div>

          {/* Prev / Next navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-stone-800">
            {prevBook ? (
              <Link
                href={`/series/${series.slug}/${prevBook.number}`}
                className="group flex items-center gap-2 text-stone-400 hover:text-gold-400 transition-colors"
              >
                <svg
                  className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="text-sm">
                  Book {prevBook.number}: {prevBook.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextBook ? (
              <Link
                href={`/series/${series.slug}/${nextBook.number}`}
                className="group flex items-center gap-2 text-stone-400 hover:text-gold-400 transition-colors"
              >
                <span className="text-sm">
                  Book {nextBook.number}: {nextBook.title}
                </span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </motion.div>
      </div>

      {/* Author Bio */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-16 glass-card overflow-hidden"
      >
        <div className="flex flex-col md:flex-row gap-0">
          {/* Monogram */}
          <div className="relative w-full md:w-64 shrink-0 bg-gradient-to-br from-gold-500/10 via-stone-900 to-stone-950 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full bg-stone-950/60 border-2 border-gold-500/30 flex items-center justify-center mb-4">
              <span className="font-[family-name:var(--font-heading)] text-3xl font-bold gold-gradient">EN</span>
            </div>
            <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-stone-100">{AUTHOR_NAME}</h3>
            <p className="text-sm text-gold-500 mt-1 uppercase tracking-wider font-semibold">Author</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <a href={AUTHOR_SOCIALS.twitter.url} target="_blank" rel="noopener noreferrer"
                className="rounded-lg border border-stone-700 px-3 py-1.5 text-xs font-semibold text-stone-300 transition-all hover:border-gold-500/50 hover:text-gold-400 flex items-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                {AUTHOR_SOCIALS.twitter.handle}
              </a>
              <a href={AUTHOR_SOCIALS.instagram.url} target="_blank" rel="noopener noreferrer"
                className="rounded-lg border border-stone-700 px-3 py-1.5 text-xs font-semibold text-stone-300 transition-all hover:border-gold-500/50 hover:text-gold-400 flex items-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                {AUTHOR_SOCIALS.instagram.handle}
              </a>
              <a href={AMAZON_AUTHOR_URL} target="_blank" rel="noopener noreferrer"
                className="rounded-lg border border-stone-700 px-3 py-1.5 text-xs font-semibold text-stone-300 transition-all hover:border-gold-500/50 hover:text-gold-400">
                Amazon
              </a>
            </div>
          </div>

          {/* Bio text */}
          <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gold-500 mb-3">About the Author</p>
            {AUTHOR_BIO_MEDIUM.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-stone-400 leading-relaxed mb-4 last:mb-0">{paragraph}</p>
            ))}
            <div className="mt-6 pt-6 border-t border-stone-800">
              <p className="text-xs uppercase tracking-wider text-stone-500 mb-2">Perfect for fans of</p>
              <div className="flex flex-wrap gap-2">
                {COMP_AUTHORS.map((author) => (
                  <span key={author} className="rounded-full bg-stone-800/60 px-3 py-1 text-xs font-medium text-stone-300 border border-stone-700/50">{author}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
