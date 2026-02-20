import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Behind the World of Valdrath",
  description:
    "Author updates, world-building insights, and behind-the-scenes looks at The Kingdom of Valdrath epic fantasy series by Eva Noir.",
  openGraph: {
    title: "Blog — Behind the World of Valdrath",
    description:
      "Author updates, world-building insights, and behind-the-scenes looks at The Kingdom of Valdrath.",
  },
};

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <div className="text-center mb-16">
        <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold gold-gradient mb-4">
          The Creed Chronicles
        </h1>
        <p className="text-stone-400 text-lg max-w-2xl mx-auto">
          Author updates, world-building insights, and behind-the-scenes looks
          at The Kingdom of Valdrath.
        </p>
      </div>

      {/* Placeholder — no posts yet */}
      <div className="glass-card p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/10 text-gold-400 mx-auto mb-6">
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5"
            />
          </svg>
        </div>
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold mb-3">
          Coming Soon
        </h2>
        <p className="text-stone-400 max-w-md mx-auto mb-8">
          The first posts are being crafted. Subscribe to get notified when new
          articles drop.
        </p>
        <Link
          href="/"
          className="btn-primary rounded-lg px-8 py-3 inline-block"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
