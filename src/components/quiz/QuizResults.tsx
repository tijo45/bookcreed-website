"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ScoreBreakdown {
  total: number;
  correct: number;
  percentage: number;
  byDifficulty: {
    easy: { correct: number; total: number };
    medium: { correct: number; total: number };
    hard: { correct: number; total: number };
  };
  byChapter: Record<string, { correct: number; total: number }>;
}

interface QuizResultsProps {
  breakdown: ScoreBreakdown;
  bookTitle: string;
  cohortEntered: boolean;
  cohortName: string | null;
}

function getTier(percentage: number) {
  if (percentage >= 90) return { label: "Master", color: "text-gold-400", bg: "bg-gold-500/10 border-gold-500/30" };
  if (percentage >= 75) return { label: "Expert", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30" };
  if (percentage >= 50) return { label: "Adept", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" };
  return { label: "Novice", color: "text-stone-400", bg: "bg-stone-700/30 border-stone-600/30" };
}

function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    function update() {
      const now = Date.now();
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (now < endTime) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }, [target, duration]);

  return <>{value}</>;
}

function CircularProgress({ percentage }: { percentage: number }) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const tier = getTier(percentage);

  return (
    <div className="relative mx-auto h-40 w-40">
      <svg className="h-40 w-40 -rotate-90" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-stone-800"
        />
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: circumference - (percentage / 100) * circumference,
          }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
          strokeDasharray={circumference}
        />
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-stone-100">
          <AnimatedCounter target={percentage} />
          <span className="text-lg">%</span>
        </span>
        <span className={`text-xs font-medium uppercase tracking-wider ${tier.color}`}>
          {tier.label}
        </span>
      </div>
    </div>
  );
}

const DIFFICULTY_LABELS: Record<string, { label: string; color: string }> = {
  easy: { label: "Easy", color: "bg-green-500" },
  medium: { label: "Medium", color: "bg-gold-500" },
  hard: { label: "Hard", color: "bg-red-500" },
};

export function QuizResults({
  breakdown,
  bookTitle,
  cohortEntered,
  cohortName,
}: QuizResultsProps) {
  const tier = getTier(breakdown.percentage);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Main score card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 text-center"
      >
        <h2 className="gold-gradient mb-1 font-[family-name:var(--font-heading)] text-2xl font-bold">
          Quiz Complete!
        </h2>
        <p className="mb-6 text-sm text-stone-400">{bookTitle}</p>

        <CircularProgress percentage={breakdown.percentage} />

        <div className="mt-4">
          <p className="text-lg text-stone-200">
            <span className="font-bold text-stone-100">
              <AnimatedCounter target={breakdown.correct} />
            </span>{" "}
            out of{" "}
            <span className="font-bold text-stone-100">{breakdown.total}</span>{" "}
            correct
          </p>
        </div>

        {/* Tier badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.4, ease: "easeOut" }}
          className={`mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 ${tier.bg}`}
        >
          <span className={`text-sm font-bold uppercase tracking-wider ${tier.color}`}>
            {tier.label} Tier
          </span>
        </motion.div>
      </motion.div>

      {/* Contest entry */}
      {cohortEntered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 glass-card border-gold-500/20 bg-gold-500/5 p-4 text-center"
        >
          <p className="text-sm font-medium text-gold-400">
            You have been entered into the contest: {cohortName}!
          </p>
          <p className="mt-1 text-xs text-stone-400">
            Your score has been recorded. Check the leaderboard to see your ranking.
          </p>
        </motion.div>
      )}

      {/* Difficulty breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-4 glass-card p-6"
      >
        <h3 className="mb-4 font-[family-name:var(--font-heading)] text-lg font-bold text-stone-200">
          Difficulty Breakdown
        </h3>
        <div className="space-y-4">
          {(["easy", "medium", "hard"] as const).map((diff, i) => {
            const data = breakdown.byDifficulty[diff];
            const pct = data.total > 0 ? (data.correct / data.total) * 100 : 0;
            return (
              <motion.div
                key={diff}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.15, duration: 0.4 }}
              >
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-stone-300">
                    {DIFFICULTY_LABELS[diff].label}
                  </span>
                  <span className="text-stone-400">
                    {data.correct} / {data.total}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-stone-800">
                  <motion.div
                    className={`h-full rounded-full ${DIFFICULTY_LABELS[diff].color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.9 + i * 0.15, duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Chapter breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-4 glass-card p-6"
      >
        <h3 className="mb-4 font-[family-name:var(--font-heading)] text-lg font-bold text-stone-200">
          Chapter Breakdown
        </h3>
        <div className="space-y-2">
          {Object.entries(breakdown.byChapter).map(([chapter, data], i) => {
            const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
            return (
              <motion.div
                key={chapter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.05, duration: 0.3 }}
                className="flex items-center justify-between rounded-lg bg-stone-900/50 px-3 py-2 text-sm"
              >
                <span className="text-stone-300">{chapter}</span>
                <div className="flex items-center gap-3">
                  <span className="text-stone-500">
                    {data.correct}/{data.total}
                  </span>
                  <span
                    className={`min-w-[3rem] text-right font-medium ${
                      pct >= 75
                        ? "text-green-400"
                        : pct >= 50
                          ? "text-gold-400"
                          : "text-red-400"
                    }`}
                  >
                    {pct}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mt-6 flex justify-center gap-4"
      >
        <a
          href="/quiz"
          className="rounded-lg border border-stone-700 px-6 py-2.5 text-sm text-stone-300 transition hover:bg-stone-800"
        >
          Back to Quizzes
        </a>
        <a
          href="/leaderboard"
          className="btn-primary text-sm"
        >
          View Leaderboard
        </a>
      </motion.div>
    </div>
  );
}
