import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email } = body;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  // Update newsletter preference if user exists
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    await prisma.user.update({
      where: { email },
      data: { newsletter: true },
    });
  }

  // Optionally send welcome email via Resend
  if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.startsWith("re_your")) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Book Creed <noreply@bookcreed.com>",
        to: email,
        subject: "Welcome to Book Creed!",
        html: `
          <h1>Welcome to Book Creed!</h1>
          <p>Thank you for subscribing to our newsletter. You'll be the first to know about new book releases, quiz challenges, and contest opportunities.</p>
          <p>— The Book Creed Team</p>
        `,
      });
    } catch {
      // Don't fail if email sending fails
    }
  }

  return NextResponse.json({ success: true });
}
