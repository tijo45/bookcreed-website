import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You're In! — Valdrath Companion Guide",
  description: "Thank you for signing up for the Valdrath Companion Guide.",
  robots: { index: false, follow: false },
};

export default function CompanionThanksPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="mx-auto max-w-lg text-center">
        {/* Decorative crown */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold-500/10">
          <span className="text-4xl">👑</span>
        </div>

        <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl">
          You&rsquo;re <span className="gold-gradient">In!</span>
        </h1>

        <p className="mt-4 text-lg text-stone-400">
          Check your email for the Valdrath Companion Guide. It may take a few
          minutes to arrive.
        </p>

        <p className="mt-2 text-sm text-stone-500">
          Don&rsquo;t see it? Check your spam folder, or email us at{" "}
          <a
            href="mailto:info@creed.services"
            className="text-gold-500 underline decoration-gold-500/30 underline-offset-2 hover:decoration-gold-400"
          >
            info@creed.services
          </a>
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/read/book-1"
            className="btn-primary rounded-lg px-8 py-3 text-base"
          >
            Read Chapter 1 Free
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-stone-700 px-8 py-3 text-base font-semibold text-stone-300 transition-all hover:border-gold-500/50 hover:text-gold-400"
          >
            Back to Home
          </Link>
        </div>

        {/* Subtle decorative divider */}
        <div className="mt-12 flex items-center justify-center gap-3 text-stone-600">
          <span className="h-px w-12 bg-stone-800" />
          <span className="text-gold-500/60">❦</span>
          <span className="h-px w-12 bg-stone-800" />
        </div>

        <p className="mt-6 text-sm text-stone-500">
          While you wait, why not explore the{" "}
          <Link
            href="/series/kingdom-of-valdrath"
            className="text-gold-500 underline decoration-gold-500/30 underline-offset-2 hover:decoration-gold-400"
          >
            full series
          </Link>
          ?
        </p>
      </div>
    </div>
  );
}
