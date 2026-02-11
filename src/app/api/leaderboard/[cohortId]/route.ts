import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ cohortId: string }> }
) {
  const { cohortId } = await params;

  const cohort = await prisma.cohort.findUnique({
    where: { id: cohortId },
    include: {
      entries: {
        include: {
          user: { select: { name: true } },
          score: {
            include: {
              book: { select: { title: true } },
            },
          },
        },
        orderBy: {
          score: { percentage: "desc" },
        },
      },
    },
  });

  if (!cohort) {
    return NextResponse.json({ error: "Cohort not found" }, { status: 404 });
  }

  // For tiebreaker, sort by percentage DESC then completedAt ASC
  const sortedEntries = cohort.entries.sort((a, b) => {
    if (b.score.percentage !== a.score.percentage) {
      return b.score.percentage - a.score.percentage;
    }
    return (
      a.score.completedAt.getTime() - b.score.completedAt.getTime()
    );
  });

  return NextResponse.json({
    cohort: {
      id: cohort.id,
      name: cohort.name,
      status: cohort.status,
      prizeDesc: cohort.prizeDesc,
      startDate: cohort.startDate.toISOString(),
      endDate: cohort.endDate.toISOString(),
    },
    entries: sortedEntries.map((entry, index) => ({
      rank: index + 1,
      userName: entry.user.name,
      bookTitle: entry.score.book.title,
      percentage: entry.score.percentage,
      completedAt: entry.score.completedAt.toISOString(),
    })),
  });
}
