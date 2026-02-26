import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, platforms, profileLink, audienceSize, booksWanted, format, genres, referralSource, notes } = body;

    // Validate required fields
    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!platforms?.length) {
      return NextResponse.json({ error: "Please select at least one review platform." }, { status: 400 });
    }
    if (!profileLink?.trim()) {
      return NextResponse.json({ error: "Please provide a link to your review profile." }, { status: 400 });
    }
    if (!booksWanted) {
      return NextResponse.json({ error: "Please select which books you want." }, { status: 400 });
    }
    if (!format) {
      return NextResponse.json({ error: "Please select your preferred format." }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check for existing request
    const existing = await prisma.reviewerRequest.findFirst({
      where: { email: normalizedEmail, status: { not: "declined" } },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You've already submitted a review request. We'll be in touch soon!" },
        { status: 409 }
      );
    }

    // Create the reviewer request
    await prisma.reviewerRequest.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        platforms: Array.isArray(platforms) ? platforms.join(",") : platforms,
        profileLink: profileLink.trim(),
        audienceSize: audienceSize || null,
        booksWanted,
        format,
        genres: Array.isArray(genres) ? genres.join(",") : (genres || null),
        referralSource: referralSource || null,
        notes: notes?.trim() || null,
      },
    });

    // Send notification email via Resend
    if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.startsWith("re_your")) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Notify Eva/team about the new request
        await resend.emails.send({
          from: "Book Creed <noreply@bookcreed.com>",
          to: "poormanstocks@gmail.com",
          subject: `New Reviewer Request: ${name.trim()} (${normalizedEmail})`,
          html: `
            <div style="max-width:600px;margin:0 auto;font-family:Georgia,serif;color:#1c1917;padding:24px;">
              <h2 style="color:#92400e;">New ARC Request</h2>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:4px 8px;font-weight:bold;">Name</td><td style="padding:4px 8px;">${name.trim()}</td></tr>
                <tr><td style="padding:4px 8px;font-weight:bold;">Email</td><td style="padding:4px 8px;">${normalizedEmail}</td></tr>
                <tr><td style="padding:4px 8px;font-weight:bold;">Platforms</td><td style="padding:4px 8px;">${Array.isArray(platforms) ? platforms.join(", ") : platforms}</td></tr>
                <tr><td style="padding:4px 8px;font-weight:bold;">Profile</td><td style="padding:4px 8px;"><a href="${profileLink.trim()}">${profileLink.trim()}</a></td></tr>
                <tr><td style="padding:4px 8px;font-weight:bold;">Audience</td><td style="padding:4px 8px;">${audienceSize || "Not specified"}</td></tr>
                <tr><td style="padding:4px 8px;font-weight:bold;">Books</td><td style="padding:4px 8px;">${booksWanted}</td></tr>
                <tr><td style="padding:4px 8px;font-weight:bold;">Format</td><td style="padding:4px 8px;">${format}</td></tr>
                <tr><td style="padding:4px 8px;font-weight:bold;">Genres</td><td style="padding:4px 8px;">${Array.isArray(genres) ? genres.join(", ") : (genres || "Not specified")}</td></tr>
                <tr><td style="padding:4px 8px;font-weight:bold;">Found via</td><td style="padding:4px 8px;">${referralSource || "Not specified"}</td></tr>
                <tr><td style="padding:4px 8px;font-weight:bold;">Notes</td><td style="padding:4px 8px;">${notes?.trim() || "None"}</td></tr>
              </table>
            </div>
          `,
        });

        // Send confirmation to the reviewer
        await resend.emails.send({
          from: "Book Creed <noreply@bookcreed.com>",
          to: normalizedEmail,
          subject: "Your Review Copy Request — The Kingdom of Valdrath",
          html: `
            <div style="max-width:600px;margin:0 auto;font-family:Georgia,serif;color:#1c1917;padding:24px;">
              <h1 style="font-family:'Cinzel',serif;color:#92400e;text-align:center;">Thank You, ${name.trim()}!</h1>
              <p>We've received your request for review copies of <strong>The Kingdom of Valdrath</strong> series.</p>
              <p>Here's what happens next:</p>
              <ol>
                <li>We'll review your request (usually within 24 hours)</li>
                <li>Once approved, we'll send your copies in <strong>${format}</strong> format</li>
                <li>Read at your pace — we suggest 4-6 weeks, but there's no hard deadline</li>
                <li>Post your honest review on your preferred platform</li>
              </ol>
              <p>In the meantime, you can <a href="https://bookcreed.com/read/book-1" style="color:#d97706;">read the first 3 chapters of The Exile's Return for free</a>.</p>
              <p style="margin-top:24px;">Welcome to the Kingdom,<br/>— Eva Noir</p>
            </div>
          `,
        });
      } catch {
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Reviewer request error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
