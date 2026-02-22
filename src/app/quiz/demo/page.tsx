"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface DemoQuestion {
  id: number;
  chapter: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: Record<string, string>;
  correctAnswer: string;
}

const DEMO_QUESTIONS: DemoQuestion[] = [
  {
    id: 1,
    chapter: "The Royal Family",
    difficulty: "easy",
    question: "How many brothers are in the Valdrath royal family?",
    options: {
      A: "5",
      B: "6",
      C: "7",
      D: "8",
    },
    correctAnswer: "C",
  },
  {
    id: 2,
    chapter: "The Exile",
    difficulty: "easy",
    question: "What is the name of the exiled prince?",
    options: {
      A: "Lucian",
      B: "Cassian",
      C: "Daveth",
      D: "Aldric",
    },
    correctAnswer: "B",
  },
  {
    id: 3,
    chapter: "The Banishment",
    difficulty: "medium",
    question: "Why was Cassian exiled from Valdrath?",
    options: {
      A: "He betrayed the kingdom to an enemy nation",
      B: "He refused to marry the princess of a rival house",
      C: "He was found guilty of killing innocent farmers",
      D: "He challenged his father for the throne",
    },
    correctAnswer: "C",
  },
  {
    id: 4,
    chapter: "The King's Secret",
    difficulty: "medium",
    question: "What secret does only Lucian know about King Daveth?",
    options: {
      A: "The King has a hidden heir from a previous marriage",
      B: "The King is dying of cancer",
      C: "The King secretly lost the war in the northern territories",
      D: "The King plans to abdicate and flee the kingdom",
    },
    correctAnswer: "B",
  },
  {
    id: 5,
    chapter: "The Return",
    difficulty: "hard",
    question: "How many years was Cassian in exile before returning to Valdrath?",
    options: {
      A: "7 years",
      B: "10 years",
      C: "12 years",
      D: "15 years",
    },
    correctAnswer: "C",
  },
];

const DIFFICULTY_COLORS = {
  easy: "text-green-400",
  medium: "text-gold-400",
  hard: "text-red-400",
};

function getTier(percentage: number) {
  if (percentage >= 80) return { label: "Master", color: "text-gold-400" };
  if (percentage >= 60) return { label: "Expert", color: "text-purple-400" };
  if (percentage >= 40) return { label: "Adept", color: "text-blue-400" };
  return { label: "Novice", color: "text-stone-400" };
}

export default function QuizDemoPage() {
  const [state, setState] = useState<"intro" | "playing" | "results">("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [direction, setDirection] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const question = DEMO_QUESTIONS[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / DEMO_QUESTIONS.length) * 100;

  // Calculate results
  const results = useMemo(() => {
    let correct = 0;
    for (const q of DEMO_QUESTIONS) {
      if (answers[q.id] === q.correctAnswer) correct++;
    }
    return {
      correct,
      total: DEMO_QUESTIONS.length,
      percentage: Math.round((correct / DEMO_QUESTIONS.length) * 100),
    };
  }, [answers]);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      setShowAnswer(false);
    },
    [currentIndex]
  );

  function selectAnswer(option: string) {
    if (answers[question.id]) return; // Can't change after answering in demo
    setAnswers((prev) => ({ ...prev, [question.id]: option }));
    setShowAnswer(true);
  }

  function handleNext() {
    if (currentIndex < DEMO_QUESTIONS.length - 1) {
      goTo(currentIndex + 1);
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    if (state !== "playing") return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case "1":
        case "2":
        case "3":
        case "4": {
          const keys = Object.keys(question.options);
          const idx = parseInt(e.key) - 1;
          if (idx < keys.length && !answers[question.id]) {
            selectAnswer(keys[idx]);
          }
          break;
        }
        case "ArrowRight":
        case "Enter":
          e.preventDefault();
          if (showAnswer) handleNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (currentIndex > 0) goTo(currentIndex - 1);
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, currentIndex, showAnswer, answers]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 40 : -40, opacity: 0 }),
  };

  // INTRO
  if (state === "intro") {
    return (
      <div className="px-4 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-lg text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/10">
            <svg className="h-10 w-10 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
          </div>

          <h1 className="gold-gradient mb-3 font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl">
            Try the Demo Quiz
          </h1>
          <p className="mb-2 text-stone-300">
            5 sample questions from <em>The Exile&apos;s Return</em>
          </p>
          <p className="mb-6 text-sm text-stone-500">
            No account or access code needed. Get a taste of the full 100-question challenge.
          </p>

          <div className="mb-6 flex justify-center gap-3 text-xs text-stone-500">
            <span className="rounded-full border border-stone-700 px-3 py-1">
              <span className="text-green-400">2</span> Easy
            </span>
            <span className="rounded-full border border-stone-700 px-3 py-1">
              <span className="text-gold-400">2</span> Medium
            </span>
            <span className="rounded-full border border-stone-700 px-3 py-1">
              <span className="text-red-400">1</span> Hard
            </span>
          </div>

          <button
            onClick={() => setState("playing")}
            className="btn-primary text-base px-8 py-3"
          >
            Start Demo Quiz
          </button>

          <p className="mt-4 text-xs text-stone-600">
            Takes about 2 minutes
          </p>
        </motion.div>
      </div>
    );
  }

  // RESULTS
  if (state === "results") {
    const tier = getTier(results.percentage);

    return (
      <div className="px-4 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-lg"
        >
          {/* Score card */}
          <div className="glass-card p-8 text-center">
            <h2 className="gold-gradient mb-2 font-[family-name:var(--font-heading)] text-2xl font-bold">
              Demo Complete!
            </h2>
            <p className="mb-4 text-sm text-stone-400">
              The Exile&apos;s Return — Sample Quiz
            </p>

            <div className="mb-4 text-5xl font-bold text-stone-100">
              {results.correct}<span className="text-2xl text-stone-400">/{results.total}</span>
            </div>

            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 ${
              results.percentage >= 80
                ? "bg-gold-500/10 border-gold-500/30"
                : results.percentage >= 60
                  ? "bg-purple-500/10 border-purple-500/30"
                  : "bg-stone-700/30 border-stone-600/30"
            }`}>
              <span className={`text-sm font-bold uppercase tracking-wider ${tier.color}`}>
                {tier.label} Tier
              </span>
            </div>

            {/* Per-question results */}
            <div className="mt-6 space-y-2 text-left">
              {DEMO_QUESTIONS.map((q, i) => {
                const userAnswer = answers[q.id];
                const isCorrect = userAnswer === q.correctAnswer;
                return (
                  <div key={q.id} className="flex items-center gap-3 rounded-lg bg-stone-900/50 px-3 py-2 text-sm">
                    <span className={`shrink-0 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                      {isCorrect ? "✓" : "✗"}
                    </span>
                    <span className="flex-1 text-stone-300 truncate">Q{i + 1}: {q.question}</span>
                    <span className={`shrink-0 text-xs ${DIFFICULTY_COLORS[q.difficulty]}`}>
                      {q.difficulty}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA — Buy the book */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 glass-card border-gold-500/20 bg-gold-500/5 p-6 text-center"
          >
            <h3 className="mb-2 font-[family-name:var(--font-heading)] text-xl font-bold text-stone-100">
              Ready for the Full Challenge?
            </h3>
            <p className="mb-4 text-sm text-stone-400">
              The full quiz has <span className="text-stone-300 font-medium">100 questions</span> across every chapter, with a chance to{" "}
              <span className="text-gold-400 font-medium">win real prizes</span>. Get your copy of{" "}
              <em>The Exile&apos;s Return</em> — your access code is inside.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://www.amazon.com/dp/B0GKXNCCXD"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                Get the Book on Amazon
              </a>
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-700 px-6 py-3 text-sm text-stone-300 transition hover:bg-stone-800"
              >
                View All Quizzes
              </Link>
            </div>
          </motion.div>

          {/* How it works reminder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center"
          >
            <p className="text-xs text-stone-500">
              Buy the book → Find your access code → Take the full quiz → Compete for prizes
            </p>
            <p className="mt-1 text-xs text-stone-600">
              This is a skill-based contest — the highest score wins.
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // PLAYING
  return (
    <div className="px-4 py-8 pb-20 sm:py-12 sm:pb-20">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-stone-200">
              Demo Quiz
            </h2>
            <span className="rounded-full border border-stone-700 bg-stone-900/50 px-3 py-1 text-xs text-stone-400">
              FREE PREVIEW
            </span>
          </div>
          <p className="text-sm text-stone-500">The Exile&apos;s Return — Sample Questions</p>
          <div className="mt-2 flex items-center justify-between text-sm text-stone-400">
            <span>Question {currentIndex + 1} of {DEMO_QUESTIONS.length}</span>
            <span>{answeredCount} / {DEMO_QUESTIONS.length} answered</span>
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
              <span className={`text-xs font-medium uppercase tracking-wider ${DIFFICULTY_COLORS[question.difficulty]}`}>
                {question.difficulty}
              </span>
            </div>

            {/* Question text */}
            <h3 className="mb-6 text-lg font-medium leading-relaxed text-stone-100">
              {question.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {Object.entries(question.options).map(([key, value]) => {
                const isSelected = answers[question.id] === key;
                const isCorrect = question.correctAnswer === key;
                const hasAnswered = answers[question.id] !== undefined;

                let classes = "border-stone-700 bg-stone-900/30 text-stone-300 hover:border-stone-600 hover:bg-stone-800/50";
                if (hasAnswered && showAnswer) {
                  if (isCorrect) {
                    classes = "border-green-500 bg-green-500/10 text-green-300";
                  } else if (isSelected && !isCorrect) {
                    classes = "border-red-500 bg-red-500/10 text-red-300";
                  } else {
                    classes = "border-stone-700/50 bg-stone-900/20 text-stone-500";
                  }
                } else if (isSelected) {
                  classes = "border-gold-500 bg-gold-500/10 text-stone-100";
                }

                return (
                  <button
                    key={key}
                    onClick={() => selectAnswer(key)}
                    disabled={hasAnswered}
                    className={`flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-all ${classes} disabled:cursor-default`}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-all ${
                        hasAnswered && showAnswer
                          ? isCorrect
                            ? "border-green-500 bg-green-500 text-stone-950"
                            : isSelected
                              ? "border-red-500 bg-red-500 text-stone-950"
                              : "border-stone-600/50 text-stone-500"
                          : isSelected
                            ? "border-gold-500 bg-gold-500 text-stone-950"
                            : "border-stone-600 text-stone-400"
                      }`}
                    >
                      {hasAnswered && showAnswer && isCorrect ? "✓" : hasAnswered && showAnswer && isSelected && !isCorrect ? "✗" : key}
                    </span>
                    <span className="pt-0.5">{value}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback after answering */}
            {showAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 rounded-lg p-3 text-sm ${
                  answers[question.id] === question.correctAnswer
                    ? "bg-green-500/10 text-green-300"
                    : "bg-red-500/10 text-red-300"
                }`}
              >
                {answers[question.id] === question.correctAnswer
                  ? "✓ Correct!"
                  : `✗ The correct answer was ${question.correctAnswer}: ${question.options[question.correctAnswer]}`}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => goTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="rounded-lg border border-stone-700 px-4 py-2 text-sm text-stone-300 transition hover:bg-stone-800 disabled:opacity-30"
          >
            Previous
          </button>

          {currentIndex === DEMO_QUESTIONS.length - 1 ? (
            <button
              onClick={() => setState("results")}
              disabled={answeredCount < DEMO_QUESTIONS.length}
              className="btn-primary text-sm disabled:opacity-50"
              title={answeredCount < DEMO_QUESTIONS.length ? "Answer all questions to see results" : "View your results"}
            >
              See Results
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

        {/* Question dots */}
        <div className="mt-6 flex justify-center gap-2">
          {DEMO_QUESTIONS.map((q, i) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = i === currentIndex;
            return (
              <button
                key={q.id}
                onClick={() => goTo(i)}
                className={`h-3 w-3 rounded-full transition ${
                  isCurrent
                    ? "bg-gold-500"
                    : isAnswered
                      ? "bg-stone-600"
                      : "bg-stone-800"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
