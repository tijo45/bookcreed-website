import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hashAccessCode, generateQuizToken } from "@/lib/quiz";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: "You must be logged in" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { bookSlug, code } = body;

  if (!bookSlug || !code) {
    return NextResponse.json(
      { success: false, error: "Book slug and access code are required" },
      { status: 400 }
    );
  }

  const rateLimitKey = `quiz-code:${session.user.id}:${bookSlug}`;
  const rateLimit = checkRateLimit(rateLimitKey, 5, 15 * 60 * 1000);

  if (!rateLimit.allowed) {
    const minutesLeft = Math.ceil((rateLimit.resetAt - Date.now()) / 60000);
    return NextResponse.json(
      {
        success: false,
        error: `Too many attempts. Try again in ${minutesLeft} minute${minutesLeft === 1 ? "" : "s"}.`,
        rateLimited: true,
      },
      { status: 429 }
    );
  }

  const book = await prisma.book.findUnique({ where: { slug: bookSlug } });

  if (!book) {
    return NextResponse.json(
      { success: false, error: "Book not found" },
      { status: 404 }
    );
  }

  const hashedInput = hashAccessCode(code);

  if (hashedInput !== book.accessCode) {
    return NextResponse.json(
      {
        success: false,
        error: `Incorrect access code. ${rateLimit.remaining} attempt${rateLimit.remaining === 1 ? "" : "s"} remaining.`,
        remaining: rateLimit.remaining,
      },
      { status: 403 }
    );
  }

  const token = generateQuizToken(bookSlug, session.user.id);

  return NextResponse.json({ success: true, token });
}
