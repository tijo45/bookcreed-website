"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClientQuestion {
  id: number;
  chapter: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: Record<string, string>;
}

interface QuizPlayerProps {
  questions: ClientQuestion[];
  bookTitle: string;
  onSubmit: (answers: Record<number, string>) => void;
  submitting: boolean;
}

const DIFFICULTY_COLORS = {
  easy: "text-green-400",
  medium: "text-gold-400",
  hard: "text-red-400",
};

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function QuizPlayer({
  questions,
  bookTitle,
  onSubmit,
  submitting,
}: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [showConfirm, setShowConfirm] = useState(false);
  const [direction, setDirection] = useState(0);
  const [showNavigator, setShowNavigator] = useState(false);
  const [selectedPulse, setSelectedPulse] = useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const startTimeRef = useRef(Date.now());

  const question = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;
  const optionKeys = useMemo(() => Object.keys(question.options), [question]);

  // Difficulty distribution
  const difficultyDist = useMemo(() => {
    const dist = { easy: 0, medium: 0, hard: 0 };
    for (const q of questions) {
      dist[q.difficulty]++;
    }
    return dist;
  }, [questions]);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  function selectAnswer(option: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: option }));
    setSelectedPulse(option);
    setTimeout(() => setSelectedPulse(null), 300);
  }

  function toggleFlag() {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(question.id)) {
        next.delete(question.id);
      } else {
        next.add(question.id);
      }
      return next;
    });
  }

  function goToNextFlagged() {
    const flaggedIds = Array.from(flagged);
    if (flaggedIds.length === 0) return;

    // Find next flagged question after current index
    for (let i = currentIndex + 1; i < questions.length; i++) {
      if (flagged.has(questions[i].id)) {
        goTo(i);
        return;
      }
    }
    // Wrap around
    for (let i = 0; i <= currentIndex; i++) {
      if (flagged.has(questions[i].id)) {
        goTo(i);
        return;
      }
    }
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      goTo(currentIndex + 1);
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      goTo(currentIndex - 1);
    }
  }

  function handleSubmit() {
    if (answeredCount < questions.length) {
      setShowConfirm(true);
    } else {
      onSubmit(answers);
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't capture if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (showConfirm) return;

      switch (e.key) {
        case "1":
        case "2":
        case "3":
        case "4": {
          const idx = parseInt(e.key) - 1;
          if (idx < optionKeys.length) {
            selectAnswer(optionKeys[idx]);
          }
          break;
        }
        case "ArrowRight":
          e.preventDefault();
          handleNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          handlePrev();
          break;
        case "Enter":
          if (currentIndex === questions.length - 1 && answeredCount > 0) {
            handleSubmit();
          } else {
            handleNext();
          }
          break;
        case "f":
        case "F":
          toggleFlag();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, optionKeys, showConfirm, answeredCount]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir < 0 ? 40 : -40,
      opacity: 0,
    }),
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-stone-200">
            {bookTitle}
          </h2>
          {/* Timer */}
          <div className="flex items-center gap-2 rounded-lg border border-stone-700 bg-stone-900/50 px-3 py-1.5">
            <svg className="h-4 w-4 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-mono text-sm text-stone-300">{formatTime(elapsedSeconds)}</span>
          </div>
        </div>

        {/* Difficulty distribution */}
        <div className="mb-2 flex items-center gap-3 text-xs text-stone-500">
          <span className="text-green-400/70">{difficultyDist.easy} Easy</span>
          <span className="text-stone-600">·</span>
          <span className="text-gold-400/70">{difficultyDist.medium} Medium</span>
          <span className="text-stone-600">·</span>
          <span className="text-red-400/70">{difficultyDist.hard} Hard</span>
        </div>

        <div className="flex items-center justify-between text-sm text-stone-400">
          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span>
            {answeredCount} / {questions.length} answered
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-2 overflow-hidden rounded-full bg-stone-800">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Keyboard shortcuts hint (desktop only) */}
      <div className="mb-4 hidden sm:flex items-center gap-4 text-[10px] text-stone-600">
        <span><kbd className="rounded border border-stone-700 bg-stone-800 px-1.5 py-0.5 font-mono">1-4</kbd> select</span>
        <span><kbd className="rounded border border-stone-700 bg-stone-800 px-1.5 py-0.5 font-mono">←→</kbd> navigate</span>
        <span><kbd className="rounded border border-stone-700 bg-stone-800 px-1.5 py-0.5 font-mono">Enter</kbd> next/submit</span>
        <span><kbd className="rounded border border-stone-700 bg-stone-800 px-1.5 py-0.5 font-mono">F</kbd> flag</span>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={question.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="glass-card p-6 sm:p-8"
        >
          {/* Question meta */}
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-stone-700 bg-stone-800/50 px-3 py-1 text-xs text-stone-400">
              {question.chapter}
            </span>
            <span
              className={`text-xs font-medium uppercase tracking-wider ${DIFFICULTY_COLORS[question.difficulty]}`}
            >
              {question.difficulty}
            </span>
            {flagged.has(question.id) && (
              <span className="text-xs text-gold-400">⚑ Flagged</span>
            )}
          </div>

          {/* Question text */}
          <h3 className="mb-6 text-lg font-medium leading-relaxed text-stone-100">
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {Object.entries(question.options).map(([key, value], idx) => {
              const isSelected = answers[question.id] === key;
              const isPulsing = selectedPulse === key;
              return (
                <button
                  key={key}
                  onClick={() => selectAnswer(key)}
                  className={`flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-all ${
                    isSelected
                      ? "border-gold-500 bg-gold-500/10 text-stone-100"
                      : "border-stone-700 bg-stone-900/30 text-stone-300 hover:border-stone-600 hover:bg-stone-800/50"
                  } ${isPulsing ? "scale-[1.02]" : ""}`}
                  style={{
                    transition: "all 0.2s ease, transform 0.15s ease",
                  }}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-all ${
                      isSelected
                        ? "border-gold-500 bg-gold-500 text-stone-950"
                        : "border-stone-600 text-stone-400"
                    }`}
                  >
                    {key}
                  </span>
                  <span className="pt-0.5 flex-1">{value}</span>
                  <span className="hidden sm:inline-block shrink-0 pt-0.5 text-xs text-stone-600 font-mono">
                    {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="rounded-lg border border-stone-700 px-4 py-2 text-sm text-stone-300 transition hover:bg-stone-800 disabled:opacity-30"
        >
          Previous
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleFlag}
            className={`rounded-lg border px-3 py-2 text-sm transition ${
              flagged.has(question.id)
                ? "border-gold-500/50 bg-gold-500/10 text-gold-400"
                : "border-stone-700 text-stone-400 hover:bg-stone-800"
            }`}
          >
            {flagged.has(question.id) ? "⚑ Unflag" : "⚐ Flag"}
          </button>

          {flagged.size > 0 && (
            <button
              onClick={goToNextFlagged}
              className="rounded-lg border border-stone-700 px-3 py-2 text-sm text-gold-400 transition hover:bg-stone-800"
              title="Jump to next flagged question"
            >
              Next Flagged ({flagged.size})
            </button>
          )}

          {currentIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary text-sm disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Quiz"}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="rounded-lg border border-gold-500/50 bg-gold-500/10 px-4 py-2 text-sm text-gold-400 transition hover:bg-gold-500/20"
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* Question grid navigator — collapsible on mobile */}
      <div className="mt-6 glass-card p-4">
        <button
          onClick={() => setShowNavigator(!showNavigator)}
          className="flex w-full items-center justify-between sm:cursor-default"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
            Question Navigator
          </p>
          <svg
            className={`h-4 w-4 text-stone-500 transition-transform sm:hidden ${showNavigator ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        <div className={`mt-2 ${showNavigator ? "block" : "hidden sm:block"}`}>
          <div className="flex flex-wrap gap-1.5">
            {questions.map((q, i) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = i === currentIndex;
              const isFlagged = flagged.has(q.id);
              return (
                <button
                  key={q.id}
                  onClick={() => goTo(i)}
                  className={`flex h-8 w-8 items-center justify-center rounded text-xs font-medium transition ${
                    isCurrent
                      ? "bg-gold-500 text-stone-950"
                      : isAnswered
                        ? "bg-stone-700 text-stone-200"
                        : "bg-stone-800/50 text-stone-500 hover:bg-stone-800"
                  } ${isFlagged ? "ring-1 ring-gold-400" : ""}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          {/* Legend */}
          <div className="mt-3 flex items-center gap-4 text-[10px] text-stone-600">
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded bg-gold-500"></span> Current
            </span>
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded bg-stone-700"></span> Answered
            </span>
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded bg-stone-800/50 ring-1 ring-gold-400"></span> Flagged
            </span>
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded bg-stone-800/50"></span> Unanswered
            </span>
          </div>
        </div>
      </div>

      {/* Confirm dialog */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card max-w-sm p-6 text-center"
            >
              <h3 className="mb-2 font-[family-name:var(--font-heading)] text-lg font-bold text-stone-100">
                Submit Incomplete Quiz?
              </h3>
              <p className="mb-4 text-sm text-stone-400">
                You have answered {answeredCount} of {questions.length}{" "}
                questions. Unanswered questions will be marked incorrect.
              </p>
              {flagged.size > 0 && (
                <p className="mb-4 text-sm text-gold-400">
                  You still have {flagged.size} flagged question{flagged.size > 1 ? "s" : ""} to review.
                </p>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 rounded-lg border border-stone-700 px-4 py-2 text-sm text-stone-300 transition hover:bg-stone-800"
                >
                  Continue Quiz
                </button>
                <button
                  onClick={() => {
                    setShowConfirm(false);
                    onSubmit(answers);
                  }}
                  disabled={submitting}
                  className="btn-primary flex-1 text-sm disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Anyway"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
