"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { QuizUnlock } from "@/components/quiz/QuizUnlock";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { QuizResults } from "@/components/quiz/QuizResults";

type QuizState = "LOADING" | "LOCKED" | "PLAYING" | "SUBMITTING" | "RESULTS";

interface ClientQuestion {
  id: number;
  chapter: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: Record<string, string>;
}

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

export default function QuizPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const bookSlug = params.bookSlug as string;

  const [state, setState] = useState<QuizState>("LOADING");
  const [token, setToken] = useState<string | null>(null);
  const [questions, setQuestions] = useState<ClientQuestion[]>([]);
  const [bookTitle, setBookTitle] = useState("");
  const [error, setError] = useState("");
  const [results, setResults] = useState<{
    breakdown: ScoreBreakdown;
    cohortEntered: boolean;
    cohortName: string | null;
  } | null>(null);

  // Auth check
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push(`/account/login?callbackUrl=/quiz/${bookSlug}`);
      return;
    }
    setState("LOCKED");
  }, [session, status, router, bookSlug]);

  async function handleUnlock(newToken: string) {
    setToken(newToken);
    setError("");

    try {
      const res = await fetch(
        `/api/quiz/questions?bookSlug=${encodeURIComponent(bookSlug)}&token=${encodeURIComponent(newToken)}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to load questions");
        setState("LOCKED");
        return;
      }

      setQuestions(data.questions);
      setBookTitle(data.bookTitle);
      setState("PLAYING");
    } catch {
      setError("Failed to load questions. Please try again.");
      setState("LOCKED");
    }
  }

  async function handleSubmit(answers: Record<number, string>) {
    if (!token) return;
    setState("SUBMITTING");

    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookSlug, token, answers }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to submit quiz");
        setState("PLAYING");
        return;
      }

      setResults({
        breakdown: data.breakdown,
        cohortEntered: data.cohortEntered,
        cohortName: data.cohortName,
      });
      setState("RESULTS");
    } catch {
      setError("Failed to submit quiz. Please try again.");
      setState("PLAYING");
    }
  }

  if (state === "LOADING" || status === "loading") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-8 w-8 rounded-full border-2 border-stone-700 border-t-gold-500"
        />
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:py-12">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-6 max-w-md rounded-lg bg-red-900/50 p-3 text-center text-sm text-red-300"
        >
          {error}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {state === "LOCKED" && (
          <motion.div
            key="locked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizUnlock
              bookSlug={bookSlug}
              bookTitle={bookTitle || bookSlug.replace(/-/g, " ")}
              onUnlock={handleUnlock}
            />
          </motion.div>
        )}

        {(state === "PLAYING" || state === "SUBMITTING") && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizPlayer
              questions={questions}
              bookTitle={bookTitle}
              onSubmit={handleSubmit}
              submitting={state === "SUBMITTING"}
            />
          </motion.div>
        )}

        {state === "RESULTS" && results && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizResults
              breakdown={results.breakdown}
              bookTitle={bookTitle}
              cohortEntered={results.cohortEntered}
              cohortName={results.cohortName}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
