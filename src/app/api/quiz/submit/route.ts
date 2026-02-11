import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { loadQuizData, scoreQuiz, verifyQuizToken } from "@/lib/quiz";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { bookSlug, token, answers } = body;

  if (!bookSlug || !token || !answers) {
    return NextResponse.json(
      { error: "bookSlug, token, and answers are required" },
      { status: 400 }
    );
  }

  if (!verifyQuizToken(token, bookSlug, session.user.id)) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 403 }
    );
  }

  const book = await prisma.book.findUnique({ where: { slug: bookSlug } });
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  const quizData = loadQuizData(book.quizData);

  // Convert string keys to numbers for scoreQuiz
  const numericAnswers: Record<number, string> = {};
  for (const [key, value] of Object.entries(answers)) {
    numericAnswers[Number(key)] = value as string;
  }

  const breakdown = scoreQuiz(quizData, numericAnswers);

  // Save score to database
  const quizScore = await prisma.quizScore.create({
    data: {
      userId: session.user.id,
      bookId: book.id,
      score: breakdown.correct,
      total: breakdown.total,
      percentage: breakdown.percentage,
    },
  });

  // Auto-enter active cohort
  let cohortEntered = false;
  let cohortName: string | null = null;

  const activeCohort = await prisma.cohort.findFirst({
    where: {
      status: "active",
      OR: [{ bookId: null }, { bookId: book.id }],
    },
    orderBy: { startDate: "desc" },
  });

  if (activeCohort) {
    // Check if user already has an entry in this cohort
    const existingEntry = await prisma.cohortEntry.findUnique({
      where: {
        cohortId_userId: {
          cohortId: activeCohort.id,
          userId: session.user.id,
        },
      },
      include: { score: true },
    });

    if (!existingEntry) {
      await prisma.cohortEntry.create({
        data: {
          cohortId: activeCohort.id,
          userId: session.user.id,
          scoreId: quizScore.id,
        },
      });
      cohortEntered = true;
      cohortName = activeCohort.name;
    } else if (breakdown.percentage > existingEntry.score.percentage) {
      // Update to higher score
      await prisma.cohortEntry.update({
        where: { id: existingEntry.id },
        data: { scoreId: quizScore.id },
      });
      cohortEntered = true;
      cohortName = activeCohort.name;
    }
  }

  return NextResponse.json({
    breakdown,
    cohortEntered,
    cohortName,
  });
}
