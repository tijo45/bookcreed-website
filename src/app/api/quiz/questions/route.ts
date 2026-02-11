import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { loadQuizData, getClientQuestions, verifyQuizToken } from "@/lib/quiz";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const bookSlug = searchParams.get("bookSlug");
  const token = searchParams.get("token");

  if (!bookSlug || !token) {
    return NextResponse.json(
      { error: "bookSlug and token are required" },
      { status: 400 }
    );
  }

  if (!verifyQuizToken(token, bookSlug, session.user.id)) {
    return NextResponse.json(
      { error: "Invalid or expired token. Please re-enter your access code." },
      { status: 403 }
    );
  }

  const book = await prisma.book.findUnique({ where: { slug: bookSlug } });
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  const quizData = loadQuizData(book.quizData);
  const questions = getClientQuestions(quizData);

  return NextResponse.json({ questions, bookTitle: quizData.book_title });
}
