"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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

function CountdownTimer({ endDate }: { endDate: Date }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function update() {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("Contest ended");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m remaining`);
      } else {
        setTimeLeft(`${hours}h ${minutes}m remaining`);
      }
    }

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [endDate]);

  return <span>{timeLeft}</span>;
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
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10">
            <svg className="h-8 w-8 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-5.54 0" />
            </svg>
          </div>
          <h1 className="gold-gradient mb-3 font-[family-name:var(--font-heading)] text-4xl font-bold sm:text-5xl">
            The Book Creed Quiz Challenge
          </h1>
          <p className="mx-auto mb-2 max-w-2xl text-lg text-stone-300">
            Test your knowledge. Compete for the top score. Win real prizes.
          </p>
          <p className="mx-auto max-w-xl text-sm text-stone-500">
            This is a <span className="text-stone-400 font-medium">skill-based contest</span> — not a raffle or lottery. The reader with the highest score wins.
          </p>
        </motion.div>

        {/* Prize Banner */}
        {activeCohort && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-10 glass-card border-gold-500/20 bg-gold-500/5 overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 p-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold-500/20">
                <svg className="h-7 w-7 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <div className="text-center sm:text-left flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-gold-500">
                  🏆 Active Contest — {activeCohort.name}
                </p>
                <p className="mt-1 font-[family-name:var(--font-heading)] text-xl font-bold text-stone-100">
                  {activeCohort.prizeDesc}
                </p>
                <p className="mt-1 text-sm text-stone-400">
                  Highest score wins · Skill determines the winner · <CountdownTimer endDate={activeCohort.endDate} />
                </p>
              </div>
              <Link
                href="/contest/rules"
                className="shrink-0 rounded-lg border border-stone-700 px-4 py-2 text-xs text-stone-400 transition hover:bg-stone-800 hover:text-stone-300"
              >
                Contest Rules →
              </Link>
            </div>
          </motion.div>
        )}

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="mb-6 text-center font-[family-name:var(--font-heading)] text-xl font-bold text-stone-200">
            How It Works
          </h2>
          <div className="grid gap-4 sm:grid-cols-4">
            {[
              {
                step: "1",
                title: "Buy the Book",
                desc: "Get your copy of The Kingdom of Valdrath series",
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                ),
              },
              {
                step: "2",
                title: "Find Your Code",
                desc: "Your unique access code is at the end of the book",
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                  </svg>
                ),
              },
              {
                step: "3",
                title: "Take the Quiz",
                desc: "100 questions across every chapter — prove your knowledge",
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                  </svg>
                ),
              },
              {
                step: "4",
                title: "Win Prizes",
                desc: "Highest score wins a gift card — skill, not luck",
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-5.54 0" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                className="glass-card relative p-5 text-center"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400">
                  {item.icon}
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-2 py-0.5 text-xs font-bold text-stone-950">
                  {item.step}
                </div>
                <h3 className="mb-1 font-[family-name:var(--font-heading)] text-sm font-bold text-stone-200">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Try Demo CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-12 text-center"
        >
          <Link
            href="/quiz/demo"
            className="inline-flex items-center gap-2 rounded-lg border border-gold-500/40 bg-gold-500/10 px-6 py-3 text-sm font-medium text-gold-400 transition hover:bg-gold-500/20"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
            Try a Free 5-Question Demo
          </Link>
          <p className="mt-2 text-xs text-stone-500">No account or access code needed</p>
        </motion.div>

        {/* Series list */}
        {series.map((s, si) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + si * 0.1, duration: 0.5 }}
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
                      delay: 0.7 + si * 0.1 + bi * 0.05,
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="py-20 text-center"
          >
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-stone-700 bg-stone-800/50">
              <svg className="h-10 w-10 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <h3 className="mb-2 font-[family-name:var(--font-heading)] text-lg font-bold text-stone-300">
              No Quizzes Available Yet
            </h3>
            <p className="mx-auto max-w-sm text-sm text-stone-500">
              Quizzes are coming soon! In the meantime, try our{" "}
              <Link href="/quiz/demo" className="text-gold-400 hover:text-gold-300">
                free demo quiz
              </Link>{" "}
              to see what the challenge is like.
            </p>
          </motion.div>
        )}

        {/* Social Proof / Testimonials Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mb-10 glass-card p-6 text-center"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500 mb-4">
            What Readers Are Saying
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { quote: "The quiz really tested how closely I was reading. I thought I knew everything — I was wrong!", name: "Reader" },
              { quote: "Love that it's a skill contest. My score actually means something, and I can compete to win.", name: "Quiz Taker" },
              { quote: "I retook the quiz after re-reading certain chapters. Went from 72% to 91%. So satisfying.", name: "Competitor" },
            ].map((t, i) => (
              <div key={i} className="rounded-lg bg-stone-900/50 p-4 text-left">
                <p className="text-sm text-stone-300 italic">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-2 text-xs text-stone-500">— {t.name}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Login prompt */}
        {!isLoggedIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
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
