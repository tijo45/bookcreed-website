import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cohorts = await prisma.cohort.findMany({
    orderBy: { startDate: "desc" },
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

  const formatted = cohorts.map((cohort) => ({
    id: cohort.id,
    name: cohort.name,
    status: cohort.status,
    prizeDesc: cohort.prizeDesc,
    startDate: cohort.startDate.toISOString(),
    endDate: cohort.endDate.toISOString(),
    entries: cohort.entries.map((entry, index) => ({
      rank: index + 1,
      userName: entry.user.name,
      bookTitle: entry.score.book.title,
      percentage: entry.score.percentage,
      completedAt: entry.score.completedAt.toISOString(),
    })),
  }));

  return NextResponse.json({ cohorts: formatted });
}
