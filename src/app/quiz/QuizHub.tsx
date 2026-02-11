"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Book {
  id: string;
  slug: string;
  title: string;
  number: number;
  coverImage: string;
}

interface Series {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  books: Book[];
}

interface UserScore {
  percentage: number;
  score: number;
  total: number;
}

interface QuizHubProps {
  series: Series[];
  userScores: Record<string, UserScore>;
  activeCohort: {
    name: string;
    prizeDesc: string;
    endDate: Date;
  } | null;
  isLoggedIn: boolean;
}

function getTierLabel(percentage: number) {
  if (percentage >= 90) return { label: "Master", color: "text-gold-400" };
  if (percentage >= 75) return { label: "Expert", color: "text-purple-400" };
  if (percentage >= 50) return { label: "Adept", color: "text-blue-400" };
  return { label: "Novice", color: "text-stone-400" };
}

export function QuizHub({
  series,
  userScores,
  activeCohort,
  isLoggedIn,
}: QuizHubProps) {
  return (
    <div className="px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="gold-gradient mb-3 font-[family-name:var(--font-heading)] text-4xl font-bold sm:text-5xl">
            Book Quizzes
          </h1>
          <p className="mx-auto max-w-xl text-stone-400">
            Test your knowledge of the series. Each quiz contains 100 questions
            spanning every chapter. Unlock a quiz with the access code found at
            the end of each book.
          </p>
        </motion.div>

        {/* Active contest banner */}
        {activeCohort && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 glass-card border-gold-500/20 bg-gold-500/5 p-4 text-center sm:p-6"
          >
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gold-500">
              Active Contest
            </p>
            <p className="font-[family-name:var(--font-heading)] text-lg font-bold text-stone-100">
              {activeCohort.name}
            </p>
            <p className="mt-1 text-sm text-stone-400">
              {activeCohort.prizeDesc}
            </p>
            <p className="mt-2 text-xs text-stone-500">
              Complete any quiz to be automatically entered
            </p>
          </motion.div>
        )}

        {/* Series list */}
        {series.map((s, si) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + si * 0.1, duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="mb-1 font-[family-name:var(--font-heading)] text-2xl font-bold text-stone-100">
              {s.title}
            </h2>
            <p className="mb-4 text-sm text-stone-400">{s.tagline}</p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {s.books.map((book, bi) => {
                const score = userScores[book.id];
                const isCompleted = !!score;
                const tier = score ? getTierLabel(score.percentage) : null;

                return (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.4 + si * 0.1 + bi * 0.05,
                      duration: 0.4,
                    }}
                  >
                    <Link href={isLoggedIn ? `/quiz/${book.slug}` : "/account/login?callbackUrl=/quiz"}>
                      <div className="glass-card group relative overflow-hidden p-4 transition-all hover:border-gold-500/30">
                        {/* Book cover */}
                        <div className="relative mb-3 aspect-[2/3] overflow-hidden rounded-lg bg-stone-800">
                          <Image
                            src={book.coverImage}
                            alt={book.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                          />

                          {/* Overlay */}
                          {!isCompleted && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                              <svg
                                className="h-10 w-10 text-stone-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                                />
                              </svg>
                            </div>
                          )}

                          {/* Score badge */}
                          {isCompleted && score && (
                            <div className="absolute right-2 top-2 rounded-full bg-stone-950/80 px-2 py-1 text-xs font-bold text-gold-400 backdrop-blur-sm">
                              {score.percentage}%
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <p className="text-xs text-stone-500">
                          Book {book.number}
                        </p>
                        <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-stone-200">
                          {book.title}
                        </h3>

                        {isCompleted && score && tier ? (
                          <p className={`mt-1 text-xs font-medium ${tier.color}`}>
                            {tier.label} &middot; {score.score}/{score.total}
                          </p>
                        ) : (
                          <p className="mt-1 text-xs text-stone-500">
                            Locked &middot; 100 questions
                          </p>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Empty state */}
        {series.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-stone-400">
              No quizzes available yet. Check back soon!
            </p>
          </div>
        )}

        {/* Login prompt */}
        {!isLoggedIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-stone-400">
              <Link
                href="/account/login?callbackUrl=/quiz"
                className="text-gold-400 hover:text-gold-300"
              >
                Sign in
              </Link>{" "}
              or{" "}
              <Link
                href="/account/register"
                className="text-gold-400 hover:text-gold-300"
              >
                create an account
              </Link>{" "}
              to take quizzes and compete in contests.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
