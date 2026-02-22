"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BookCard } from "@/components/ui/BookCard";
import { CompanionCTA } from "@/components/ui/CompanionCTA";
import { QuizPromoBanner } from "@/components/ui/QuizPromoBanner";

/* ------------------------------------------------------------------ */
/* Placeholder book data - will be replaced with DB queries later      */
/* ------------------------------------------------------------------ */
const books = [
  { id: "1", title: "The Exile's Return", bookNumber: 1, coverUrl: "/covers/valdrath/book1.jpg", published: true },
  { id: "2", title: "The Shadow's Reach", bookNumber: 2, coverUrl: "/covers/valdrath/book2.jpg", published: true },
  { id: "3", title: "The Fractured Peace", bookNumber: 3, coverUrl: "/covers/valdrath/book3.jpg", published: false },
  { id: "4", title: "The Fractured Crown", bookNumber: 4, coverUrl: "/covers/valdrath/book4.jpg", published: false },
  { id: "5", title: "The Gathering Storm", bookNumber: 5, coverUrl: "/covers/valdrath/book5.jpg", published: false },
  { id: "6", title: "The Final Scar", bookNumber: 6, coverUrl: "/covers/valdrath/book6.jpg", published: false },
  { id: "7", title: "The Quiet Throne", bookNumber: 7, coverUrl: "/covers/valdrath/book7.jpg", published: false },
  { id: "8", title: "The Scarred Crown", bookNumber: 8, coverUrl: "/covers/valdrath/book8.jpg", published: false },
];

const steps = [
  {
    num: 1,
    title: "Buy the Book",
    desc: "Grab your copy of any book in The Kingdom of Valdrath series.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    num: 2,
    title: "Get Your Code",
    desc: "Find the access code on the Quiz Challenge page at the end of your book.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
  },
  {
    num: 3,
    title: "Take the Quiz",
    desc: "Test your knowledge with timed, skill-based questions.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    num: 4,
    title: "Win Prizes",
    desc: "Top scorers each cohort win cash prizes and exclusive rewards.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-3.77 1.522m3.77-1.522a48.454 48.454 0 00-7.54 0" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Floating particles for the hero                                     */
/* ------------------------------------------------------------------ */
function Particles() {
  const count = 40;
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
    }))
  ).current;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold-400/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -10, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Countdown timer                                                     */
/* ------------------------------------------------------------------ */
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(targetDate.getTime() - Date.now(), 0);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

/* ------------------------------------------------------------------ */
/* Animated section wrapper                                            */
/* ------------------------------------------------------------------ */
function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/* Homepage                                                            */
/* ------------------------------------------------------------------ */
export default function HomePage() {
  // Cohort end: 1 year from now (placeholder)
  const cohortEnd = useRef(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)).current;
  const countdown = useCountdown(cohortEnd);

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(245,158,11,0.12),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(180,83,9,0.08),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_60%,rgba(251,191,36,0.06),transparent)]" />
        </div>

        <Particles />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-semibold uppercase tracking-[0.25em] text-gold-500"
          >
            An Epic Fantasy Series
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 font-[family-name:var(--font-heading)] text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          >
            The Kingdom of{" "}
            <span className="gold-gradient">Valdrath</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-stone-400 sm:text-xl"
          >
            A world of family, betrayal, and the price of power. Read the books,
            prove your knowledge, and compete for real prizes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/series/kingdom-of-valdrath" className="btn-primary rounded-lg px-8 py-3 text-base">
              Explore the Series
            </Link>
            <Link
              href="/quiz"
              className="rounded-lg border border-stone-700 px-8 py-3 text-base font-semibold text-stone-300 transition-all hover:border-gold-500/50 hover:text-gold-400"
            >
              Take a Quiz
            </Link>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-950 to-transparent" />
      </section>

      {/* ==================== BOOK GRID ==================== */}
      <RevealSection className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl">
            The <span className="gold-gradient">Series</span>
          </h2>
          <p className="mt-3 text-stone-400">
            Eight books. One epic saga. Dive into the world of Valdrath.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {books.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <BookCard {...book} />
            </motion.div>
          ))}
        </div>
      </RevealSection>

      {/* ==================== QUIZ PROMO BANNER ==================== */}
      <RevealSection className="mx-auto max-w-7xl px-6 py-12">
        <QuizPromoBanner />
      </RevealSection>

      {/* ==================== COMPANION GUIDE CTA ==================== */}
      <CompanionCTA variant="banner" />

      {/* ==================== CONTEST HIGHLIGHT ==================== */}
      <RevealSection className="mx-auto max-w-7xl px-6 py-24">
        <div className="glass-card relative overflow-hidden p-8 sm:p-12">
          {/* Background glow */}
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gold-600/5 blur-3xl" />

          <div className="relative z-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-500">
              Active Contest
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl">
              Current Cohort Ends In
            </h2>

            <div className="mt-8 flex items-center justify-center gap-4 sm:gap-6">
              {[
                { label: "Days", value: countdown.days },
                { label: "Hours", value: countdown.hours },
                { label: "Minutes", value: countdown.minutes },
                { label: "Seconds", value: countdown.seconds },
              ].map((unit) => (
                <div key={unit.label} className="flex flex-col items-center">
                  <span className="font-[family-name:var(--font-heading)] text-4xl font-bold text-gold-400 sm:text-5xl">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                  <span className="mt-1 text-xs uppercase tracking-wider text-stone-500">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-8 max-w-lg text-stone-400">
              Complete quizzes during the contest period. Top scorers on the
              leaderboard win cash prizes and exclusive rewards.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/leaderboard" className="btn-primary rounded-lg px-8 py-3">
                View Leaderboard
              </Link>
              <Link
                href="/contest/rules"
                className="text-sm font-medium text-stone-400 underline decoration-stone-700 underline-offset-4 transition-colors hover:text-gold-400 hover:decoration-gold-500/50"
              >
                Contest Rules
              </Link>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ==================== HOW IT WORKS ==================== */}
      <RevealSection className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl">
            How It <span className="gold-gradient">Works</span>
          </h2>
          <p className="mt-3 text-stone-400">
            Four simple steps to enter the contest and compete for prizes.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card flex flex-col items-center p-6 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/10 text-gold-400">
                {step.icon}
              </div>
              <div className="mt-2 font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-wider text-gold-500">
                Step {step.num}
              </div>
              <h3 className="mt-3 font-[family-name:var(--font-heading)] text-lg font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-stone-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </RevealSection>

      {/* Bottom spacer */}
      <div className="h-12" />
    </>
  );
}
