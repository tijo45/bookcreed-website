import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, source } = body;

    // Validate email
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // Validate name
    const trimmedName = (name || "").trim();
    if (!trimmedName) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check for duplicate subscriber
    const existing = await prisma.subscriber.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You're already signed up! Check your email for the guide." },
        { status: 409 }
      );
    }

    // Create subscriber
    await prisma.subscriber.create({
      data: {
        email: normalizedEmail,
        name: trimmedName,
        source: source || "companion",
      },
    });

    // Also update newsletter preference if user already has an account
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (user) {
      await prisma.user.update({
        where: { email: normalizedEmail },
        data: { newsletter: true },
      });
    }

    // Send welcome email via Resend if configured
    if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.startsWith("re_your")) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        // Different email content based on source
        const isNewsletterSignup = source === "newsletter";
        
        await resend.emails.send({
          from: "Book Creed <noreply@bookcreed.com>",
          to: normalizedEmail,
          subject: isNewsletterSignup 
            ? "Welcome to Eva Noir's Kingdom! 👑" 
            : "Your Valdrath Companion Guide is Here! 🏰",
          html: isNewsletterSignup ? `
            <div style="max-width:600px;margin:0 auto;font-family:Georgia,serif;color:#1c1917;padding:24px;">
              <h1 style="font-family:'Cinzel',serif;color:#92400e;text-align:center;">Welcome to the Kingdom!</h1>
              <p>Hi there,</p>
              <p>Thank you for joining Eva Noir's newsletter! You're now part of an exclusive community of Valdrath enthusiasts.</p>
              <p>As a subscriber, you'll receive:</p>
              <ul>
                <li>📚 First access to new book announcements</li>
                <li>✍️ Behind-the-scenes writing insights</li>
                <li>🎁 Exclusive content and bonus scenes</li>
                <li>🗺️ Deep dives into Valdrath's history and lore</li>
                <li>⚡ Early access to sample chapters</li>
              </ul>
              <p>In the meantime, have you started reading the series? <a href="https://bookcreed.com/read/book-1" style="color:#d97706;">Read the first 3 chapters of The Exile's Return for free</a>!</p>
              <p>Also, don't forget to grab your <a href="https://bookcreed.com/companion" style="color:#d97706;">FREE Valdrath Companion Guide</a> — it's packed with character profiles, maps, and lore.</p>
              <p style="margin-top:24px;">Welcome to the Kingdom,<br/>— Eva Noir &amp; The Book Creed Team</p>
            </div>
          ` : `
            <div style="max-width:600px;margin:0 auto;font-family:Georgia,serif;color:#1c1917;padding:24px;">
              <h1 style="font-family:'Cinzel',serif;color:#92400e;text-align:center;">The Valdrath Companion Guide</h1>
              <p>Hi ${trimmedName},</p>
              <p>Thank you for joining the Kingdom of Valdrath community! We're putting the finishing touches on your Companion Guide.</p>
              <p>The guide includes:</p>
              <ul>
                <li>🗡️ Character profiles for every major player</li>
                <li>🗺️ A full map of the Kingdom of Valdrath</li>
                <li>📜 Timeline of key events</li>
                <li>📖 Glossary of terms and places</li>
                <li>👑 Royal family tree</li>
              </ul>
              <p>We'll send it to you as soon as it's ready. In the meantime, have you read <a href="https://bookcreed.com/read/book-1" style="color:#d97706;">the first 3 chapters of The Exile's Return</a>?</p>
              <p style="margin-top:24px;">— Eva Noir &amp; The Book Creed Team</p>
            </div>
          `,
        });
      } catch {
        // Don't fail the signup if email sending fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
