import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { QuizHub } from "./QuizHub";

export const metadata: Metadata = {
  title: "Quizzes",
  description:
    "Test your knowledge of The Kingdom of Valdrath series. Unlock quizzes, compete for top scores, and win prizes.",
};

export default async function QuizPage() {
  const session = await auth();

  const series = await prisma.series.findMany({
    include: {
      books: {
        where: { published: true },
        orderBy: { number: "asc" },
        select: {
          id: true,
          slug: true,
          title: true,
          number: true,
          coverImage: true,
        },
      },
    },
  });

  // Get user scores if logged in
  let userScores: Record<string, { percentage: number; score: number; total: number }> = {};
  if (session?.user?.id) {
    const scores = await prisma.quizScore.findMany({
      where: { userId: session.user.id },
      orderBy: { percentage: "desc" },
      distinct: ["bookId"],
      select: { bookId: true, percentage: true, score: true, total: true },
    });
    for (const s of scores) {
      userScores[s.bookId] = {
        percentage: s.percentage,
        score: s.score,
        total: s.total,
      };
    }
  }

  // Get active cohort
  const activeCohort = await prisma.cohort.findFirst({
    where: { status: "active" },
    orderBy: { startDate: "desc" },
    select: { name: true, prizeDesc: true, endDate: true },
  });

  return (
    <QuizHub
      series={series}
      userScores={userScores}
      activeCohort={activeCohort}
      isLoggedIn={!!session?.user}
    />
  );
}
