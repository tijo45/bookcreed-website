"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface QuizUnlockProps {
  bookSlug: string;
  bookTitle: string;
  onUnlock: (token: string) => void;
}

export function QuizUnlock({ bookSlug, bookTitle, onUnlock }: QuizUnlockProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/quiz/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookSlug, code: code.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Verification failed");
        setLoading(false);
        return;
      }

      onUnlock(data.token);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-md"
    >
      <div className="glass-card p-8 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10">
          <svg
            className="h-10 w-10 text-gold-400"
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

        <h2 className="gold-gradient mb-2 font-[family-name:var(--font-heading)] text-2xl font-bold">
          Quiz Locked
        </h2>
        <p className="mb-6 text-sm text-stone-400">
          Enter the access code found in{" "}
          <span className="text-stone-300">{bookTitle}</span> to unlock this
          quiz.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter access code..."
              className="w-full rounded-lg border border-stone-700 bg-stone-900/50 px-4 py-3 text-center text-lg tracking-wider text-stone-200 outline-none transition focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
              autoFocus
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg bg-red-900/50 p-3 text-sm text-red-300"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Unlock Quiz"}
          </button>
        </form>

        <p className="mt-4 text-xs text-stone-500">
          The access code is on the Quiz Challenge page at the end of your book.
        </p>
      </div>
    </motion.div>
  );
}
