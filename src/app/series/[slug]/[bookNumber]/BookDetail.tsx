"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
          <div className="flex flex-wrap gap-4 mb-10">
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
                Buy on Amazon
              </a>
            )}
            <Link
              href={`/quiz/${book.slug}`}
              className="inline-flex items-center gap-2 border border-gold-400/30 text-gold-400 font-semibold px-6 py-3 rounded-lg hover:bg-gold-400/10 transition-colors"
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
    </section>
  );
}
