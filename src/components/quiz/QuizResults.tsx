"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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
  bookSlug?: string;
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
  bookSlug,
  cohortEntered,
  cohortName,
}: QuizResultsProps) {
  const tier = getTier(breakdown.percentage);
  const [copied, setCopied] = useState(false);
  const [leaderboardRank, setLeaderboardRank] = useState<{ rank: number; total: number } | null>(null);

  // Fetch leaderboard rank
  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((data) => {
        const cohorts = data.cohorts || [];
        const activeCohort = cohorts.find((c: { status: string }) => c.status === "active");
        if (activeCohort) {
          const total = activeCohort.entries.length;
          // Find our approximate rank by score
          const entriesBetter = activeCohort.entries.filter(
            (e: { percentage: number }) => e.percentage > breakdown.percentage
          ).length;
          setLeaderboardRank({ rank: entriesBetter + 1, total });
        }
      })
      .catch(() => {});
  }, [breakdown.percentage]);

  const shareText = `I scored ${breakdown.percentage}% (${tier.label} tier) on the ${bookTitle} quiz at bookcreed.com! Can you beat my score? 📚🏆`;

  const copyShareText = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareText]);

  const shareOnTwitter = useCallback(() => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent("https://bookcreed.com/quiz")}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [shareText]);

  const challengeLink = `https://bookcreed.com/quiz${bookSlug ? `/${bookSlug}` : ""}`;

  const copyChallengeLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(challengeLink);
    } catch {
      // silently fail
    }
  }, [challengeLink]);

  // Count wrong answers per chapter
  const wrongByChapter = Object.entries(breakdown.byChapter)
    .map(([chapter, data]) => ({
      chapter,
      wrong: data.total - data.correct,
      total: data.total,
    }))
    .filter((c) => c.wrong > 0)
    .sort((a, b) => b.wrong - a.wrong);

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

        {/* Leaderboard rank */}
        {leaderboardRank && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="mt-3 text-sm text-stone-400"
          >
            You&apos;re{" "}
            <span className="font-bold text-gold-400">#{leaderboardRank.rank}</span>{" "}
            out of{" "}
            <span className="text-stone-300">{leaderboardRank.total} entries</span>!
          </motion.p>
        )}
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
            🏆 You have been entered into the contest: {cohortName}!
          </p>
          <p className="mt-1 text-xs text-stone-400">
            Your score has been recorded. Check the leaderboard to see your ranking.
          </p>
        </motion.div>
      )}

      {/* Share Your Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-4 glass-card p-6"
      >
        <h3 className="mb-4 font-[family-name:var(--font-heading)] text-lg font-bold text-stone-200">
          Share Your Score
        </h3>

        {/* Share text preview */}
        <div className="mb-4 rounded-lg bg-stone-900/50 p-3 text-sm text-stone-300 italic">
          &ldquo;{shareText}&rdquo;
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Copy text */}
          <button
            onClick={copyShareText}
            className="flex items-center gap-2 rounded-lg border border-stone-700 px-4 py-2 text-sm text-stone-300 transition hover:bg-stone-800"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
            {copied ? "Copied!" : "Copy Text"}
          </button>

          {/* Twitter/X */}
          <button
            onClick={shareOnTwitter}
            className="flex items-center gap-2 rounded-lg border border-stone-700 px-4 py-2 text-sm text-stone-300 transition hover:bg-stone-800"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Share on X
          </button>

          {/* Challenge a friend */}
          <button
            onClick={copyChallengeLink}
            className="flex items-center gap-2 rounded-lg border border-gold-500/50 bg-gold-500/10 px-4 py-2 text-sm text-gold-400 transition hover:bg-gold-500/20"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.21a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364l1.757 1.757" />
            </svg>
            Challenge a Friend
          </button>
        </div>
      </motion.div>

      {/* Wrong answers by chapter */}
      {wrongByChapter.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mt-4 glass-card p-6"
        >
          <h3 className="mb-3 font-[family-name:var(--font-heading)] text-lg font-bold text-stone-200">
            Areas to Review
          </h3>
          <p className="mb-3 text-xs text-stone-500">
            Chapters where you missed the most questions — re-read these for a higher score next time.
          </p>
          <div className="space-y-1.5">
            {wrongByChapter.slice(0, 8).map((ch) => (
              <div key={ch.chapter} className="flex items-center justify-between rounded-lg bg-stone-900/50 px-3 py-2 text-sm">
                <span className="text-stone-300">{ch.chapter}</span>
                <span className="text-red-400/80 text-xs">
                  {ch.wrong} wrong of {ch.total}
                </span>
              </div>
            ))}
          </div>
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
        className="mt-6 flex flex-wrap justify-center gap-3"
      >
        {bookSlug && (
          <Link
            href={`/quiz/${bookSlug}`}
            className="rounded-lg border border-stone-700 px-5 py-2.5 text-sm text-stone-300 transition hover:bg-stone-800"
          >
            🔄 Retake Quiz
          </Link>
        )}
        <Link
          href="/quiz"
          className="rounded-lg border border-stone-700 px-5 py-2.5 text-sm text-stone-300 transition hover:bg-stone-800"
        >
          Back to Quizzes
        </Link>
        <Link
          href="/leaderboard"
          className="btn-primary text-sm"
        >
          View Leaderboard
        </Link>
      </motion.div>
    </div>
  );
}
