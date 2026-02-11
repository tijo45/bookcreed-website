import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized", status: 401 };
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { isAdmin: true },
  });
  if (!user?.isAdmin) {
    return { error: "Forbidden", status: 403 };
  }
  return null;
}

export async function GET() {
  const authError = await requireAdmin();
  if (authError) {
    return NextResponse.json(
      { error: authError.error },
      { status: authError.status }
    );
  }

  const cohorts = await prisma.cohort.findMany({
    orderBy: { startDate: "desc" },
    include: {
      entries: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
              address: true,
              giftCardPref: true,
            },
          },
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

  return NextResponse.json({ cohorts });
}

export async function POST(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) {
    return NextResponse.json(
      { error: authError.error },
      { status: authError.status }
    );
  }

  const body = await request.json();
  const { name, bookId, startDate, endDate, prizeDesc } = body;

  if (!name || !startDate || !endDate || !prizeDesc) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const cohort = await prisma.cohort.create({
    data: {
      name,
      bookId: bookId || null,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      prizeDesc,
      status: "active",
    },
  });

  return NextResponse.json({ cohort }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) {
    return NextResponse.json(
      { error: authError.error },
      { status: authError.status }
    );
  }

  const body = await request.json();
  const { id, status } = body;

  if (!id || !status) {
    return NextResponse.json(
      { error: "Missing id or status" },
      { status: 400 }
    );
  }

  if (!["active", "ended", "awarded"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const cohort = await prisma.cohort.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ cohort });
}
