import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "arc-requests.json");

interface ArcRequest {
  name: string;
  email: string;
  format: string;
  timestamp: string;
}

async function readRequests(): Promise<ArcRequest[]> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeRequests(requests: ArcRequest[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(requests, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, format } = body;

    // Validate required fields
    if (!name?.trim()) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!format || !["Kindle", "PDF", "ePub"].includes(format)) {
      return NextResponse.json({ error: "Please select a format." }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check for duplicates
    const existing = await readRequests();
    if (existing.some((r) => r.email === normalizedEmail)) {
      return NextResponse.json(
        { error: "You've already requested a copy! Check your email — it should be on its way." },
        { status: 409 }
      );
    }

    // Add the new request
    existing.push({
      name: name.trim(),
      email: normalizedEmail,
      format,
      timestamp: new Date().toISOString(),
    });

    await writeRequests(existing);

    // Also save to Prisma if available (belt and suspenders)
    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.subscriber.upsert({
        where: { email: normalizedEmail },
        update: {},
        create: {
          email: normalizedEmail,
          name: name.trim(),
          source: "arc-review",
        },
      });
    } catch {
      // Prisma not available or subscriber model issue — JSON file is the primary store
    }

    // Send confirmation email via Resend if configured
    if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.startsWith("re_your")) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Notify team
        await resend.emails.send({
          from: "Book Creed <noreply@bookcreed.com>",
          to: "poormanstocks@gmail.com",
          subject: `New ARC Request: ${name.trim()} wants ${format}`,
          html: `
            <div style="max-width:600px;margin:0 auto;font-family:Georgia,serif;color:#1c1917;padding:24px;">
              <h2 style="color:#92400e;">New ARC Request (Read & Review page)</h2>
              <p><strong>Name:</strong> ${name.trim()}</p>
              <p><strong>Email:</strong> ${normalizedEmail}</p>
              <p><strong>Format:</strong> ${format}</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}</p>
              <p style="margin-top:16px;color:#666;">Send them Book 1 in ${format} format.</p>
            </div>
          `,
        });

        // Confirm to reader
        await resend.emails.send({
          from: "Book Creed <noreply@bookcreed.com>",
          to: normalizedEmail,
          subject: "Your Free Copy of The Exile's Return is Coming!",
          html: `
            <div style="max-width:600px;margin:0 auto;font-family:Georgia,serif;color:#1c1917;padding:24px;">
              <h1 style="font-family:'Cinzel',serif;color:#92400e;text-align:center;">Your Free Book is On Its Way!</h1>
              <p>Hi ${name.trim()},</p>
              <p>Thank you for requesting a free copy of <strong>The Exile's Return</strong>! We'll send your <strong>${format}</strong> copy within 24 hours.</p>
              <p>Once you've read it, we'd love an honest review on Amazon:</p>
              <p style="text-align:center;margin:24px 0;">
                <a href="https://www.amazon.com/dp/B0GKXNCCXD?tag=pricerev-20" style="background:#92400e;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold;">Leave a Review on Amazon</a>
              </p>
              <p>No rush — read at your own pace. And remember: honest is all we ask. If you loved it, tell the world. If you didn't, that's okay too.</p>
              <p style="margin-top:24px;">Happy reading,<br/>— Eva Noir & The Book Creed Team</p>
            </div>
          `,
        });
      } catch {
        // Don't fail the request if email sending fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("ARC request error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
