"use client";

import { useState, useCallback } from "react";
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

  const question = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  function selectAnswer(option: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: option }));
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
      <div className="mb-6">
        <h2 className="mb-1 font-[family-name:var(--font-heading)] text-xl font-bold text-stone-200">
          {bookTitle}
        </h2>
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
              <span className="text-xs text-gold-400">Flagged</span>
            )}
          </div>

          {/* Question text */}
          <h3 className="mb-6 text-lg font-medium leading-relaxed text-stone-100">
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {Object.entries(question.options).map(([key, value]) => {
              const isSelected = answers[question.id] === key;
              return (
                <button
                  key={key}
                  onClick={() => selectAnswer(key)}
                  className={`flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-all ${
                    isSelected
                      ? "border-gold-500 bg-gold-500/10 text-stone-100"
                      : "border-stone-700 bg-stone-900/30 text-stone-300 hover:border-stone-600 hover:bg-stone-800/50"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
                      isSelected
                        ? "border-gold-500 bg-gold-500 text-stone-950"
                        : "border-stone-600 text-stone-400"
                    }`}
                  >
                    {key}
                  </span>
                  <span className="pt-0.5">{value}</span>
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
            {flagged.has(question.id) ? "Unflag" : "Flag"}
          </button>

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

      {/* Question grid navigator */}
      <div className="mt-6 glass-card p-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-500">
          Question Navigator
        </p>
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
