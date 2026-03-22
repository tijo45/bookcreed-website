import type { Metadata } from "next";
import Link from "next/link";
import {
  getSubstackPosts,
  type SubstackPost,
} from "@/lib/substack";

export const revalidate = 3600; // ISR: refresh archive data every hour

export const metadata: Metadata = {
  title: "Newsletter Archive — Eva Noir's Dispatch from Valdrath",
  description:
    "Browse every issue of Eva Noir's newsletter: exclusive world-building dispatches, behind-the-scenes insights, and subscriber-only lore from the Kingdom of Valdrath.",
  keywords: [
    "Eva Noir newsletter archive",
    "Kingdom of Valdrath newsletter",
    "fantasy author newsletter",
    "Eva Noir Substack",
    "Valdrath lore updates",
    "epic fantasy newsletter",
  ],
  openGraph: {
    title: "Newsletter Archive — Eva Noir's Dispatch from Valdrath",
    description:
      "Every issue of Eva Noir's newsletter — exclusive lore, behind-the-scenes content, and more.",
    type: "website",
    url: "https://bookcreed.com/archive",
    siteName: "Book Creed",
    images: [
      {
        url: "/covers/valdrath/book1.jpg",
        width: 800,
        height: 1200,
        alt: "Eva Noir Newsletter Archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Newsletter Archive — Eva Noir",
    description: "Browse every issue of Eva Noir's Substack newsletter.",
    images: ["/covers/valdrath/book1.jpg"],
  },
  alternates: {
    canonical: "https://bookcreed.com/archive",
  },
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ArchivePage() {
  const posts = await getSubstackPosts();

  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold gold-gradient mb-4">
          Newsletter Archive
        </h1>
        <p className="text-stone-400 text-lg max-w-2xl mx-auto">
          Every dispatch from Valdrath — exclusive lore, behind-the-scenes
          content, and author updates delivered to subscribers of{" "}
          <a
            href="https://evanoir.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-400 hover:text-gold-300 underline underline-offset-4 transition-colors"
          >
            Eva Noir's Substack
          </a>
          .
        </p>
      </div>

      {/* Subscribe CTA */}
      <div className="glass-card p-8 mb-12 text-center border border-gold-500/20">
        <p className="text-stone-300 mb-4 text-lg">
          📬 Get the next issue directly in your inbox
        </p>
        <a
          href="https://evanoir.substack.com?utm_source=bookcreed&utm_medium=archive"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gold-600 hover:bg-gold-500 text-black font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Subscribe Free on Substack →
        </a>
        <p className="text-stone-500 text-sm mt-3">
          Free issues always available • Paid subscribers get bonus lore &amp; early chapters
        </p>
      </div>

      {/* Post List */}
      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <PostCard key={post.url} post={post} />
          ))}
        </div>
      )}

      {/* Footer CTA */}
      <div className="mt-16 text-center">
        <p className="text-stone-500 text-sm mb-4">
          Want to discuss the series with other readers?
        </p>
        <Link
          href="/blog"
          className="text-gold-400 hover:text-gold-300 underline underline-offset-4 transition-colors"
        >
          Visit the Creed Chronicles blog →
        </Link>
      </div>
    </section>
  );
}

// ─── Components ──────────────────────────────────────────────────────────────

function PostCard({ post }: { post: SubstackPost }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card p-8 block group hover:border-gold-500/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <time
              dateTime={post.date}
              className="text-stone-500 text-sm font-mono"
            >
              {formattedDate}
            </time>
            {post.isPaywalled && (
              <span className="text-xs bg-gold-900/40 text-gold-400 border border-gold-500/30 px-2 py-0.5 rounded-full">
                Subscribers only
              </span>
            )}
          </div>

          <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-stone-100 group-hover:text-gold-300 transition-colors mb-3">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="text-stone-400 text-sm leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          )}
        </div>

        {post.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-24 h-24 object-cover rounded-lg flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
          />
        )}
      </div>

      <p className="mt-4 text-gold-400 text-sm font-medium group-hover:text-gold-300 transition-colors">
        Read on Substack →
      </p>
    </a>
  );
}

function EmptyState() {
  return (
    <div className="glass-card p-16 text-center border border-stone-700/40">
      <div className="text-5xl mb-6">✉️</div>
      <h2 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-stone-200 mb-4">
        First Issue Coming Soon
      </h2>
      <p className="text-stone-400 max-w-md mx-auto mb-8">
        Eva Noir's newsletter is launching soon. Subscribe now to be among the
        first to receive exclusive Valdrath dispatches, world-building lore, and
        behind-the-scenes author content.
      </p>
      <a
        href="https://evanoir.substack.com?utm_source=bookcreed&utm_medium=archive-empty"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-gold-600 hover:bg-gold-500 text-black font-semibold px-8 py-3 rounded-lg transition-colors"
      >
        Subscribe to Get Notified →
      </a>
    </div>
  );
}
