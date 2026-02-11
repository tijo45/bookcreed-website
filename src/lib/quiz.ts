import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface QuizQuestion {
  id: number;
  chapter: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: Record<string, string>;
  correct_answer: string;
}

export interface QuizData {
  book_number: number;
  book_title: string;
  total_questions: number;
  questions: QuizQuestion[];
}

export interface ClientQuestion {
  id: number;
  chapter: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: Record<string, string>;
}

export interface ScoreBreakdown {
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

export function loadQuizData(quizDataPath: string): QuizData {
  const fullPath = path.join(process.cwd(), "src", "data", "quizzes", quizDataPath);
  const raw = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(raw);
}

export function getClientQuestions(quiz: QuizData): ClientQuestion[] {
  return quiz.questions.map(({ id, chapter, difficulty, question, options }) => ({
    id,
    chapter,
    difficulty,
    question,
    options,
  }));
}

export function scoreQuiz(
  quiz: QuizData,
  answers: Record<number, string>
): ScoreBreakdown {
  const byDifficulty = {
    easy: { correct: 0, total: 0 },
    medium: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 },
  };
  const byChapter: Record<string, { correct: number; total: number }> = {};

  let correct = 0;

  for (const q of quiz.questions) {
    const diff = q.difficulty;
    byDifficulty[diff].total++;

    if (!byChapter[q.chapter]) {
      byChapter[q.chapter] = { correct: 0, total: 0 };
    }
    byChapter[q.chapter].total++;

    if (answers[q.id] === q.correct_answer) {
      correct++;
      byDifficulty[diff].correct++;
      byChapter[q.chapter].correct++;
    }
  }

  return {
    total: quiz.total_questions,
    correct,
    percentage: Math.round((correct / quiz.total_questions) * 100),
    byDifficulty,
    byChapter,
  };
}

export function generateQuizToken(bookSlug: string, userId: string): string {
  const payload = JSON.stringify({
    bookSlug,
    userId,
    ts: Date.now(),
  });
  const secret = process.env.AUTH_SECRET || "fallback-secret";
  const hmac = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  const token = Buffer.from(payload).toString("base64") + "." + hmac;
  return token;
}

export function verifyQuizToken(
  token: string,
  bookSlug: string,
  userId: string
): boolean {
  try {
    const [payloadB64, hmac] = token.split(".");
    const payload = Buffer.from(payloadB64, "base64").toString("utf-8");
    const data = JSON.parse(payload);

    if (data.bookSlug !== bookSlug || data.userId !== userId) return false;

    // Token expires in 4 hours
    if (Date.now() - data.ts > 4 * 60 * 60 * 1000) return false;

    const secret = process.env.AUTH_SECRET || "fallback-secret";
    const expectedHmac = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");
    return hmac === expectedHmac;
  } catch {
    return false;
  }
}

export function hashAccessCode(code: string): string {
  return crypto.createHash("sha256").update(code.toLowerCase().trim()).digest("hex");
}
