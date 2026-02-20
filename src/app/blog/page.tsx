import { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "./_data/posts";

export const metadata: Metadata = {
  title: "Blog — Behind the World of Valdrath",
  description:
    "Author updates, world-building insights, and behind-the-scenes looks at The Kingdom of Valdrath epic fantasy series by Eva Noir.",
  keywords: [
    "fantasy blog",
    "Eva Noir blog",
    "Kingdom of Valdrath",
    "fantasy world building",
    "epic fantasy recommendations",
  ],
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

      <div className="space-y-8">
        {blogPosts.map((post) => {
          const formattedDate = new Date(
            post.date + "T12:00:00",
          ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="glass-card p-8 block group hover:border-gold-500/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <h2 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-semibold text-stone-100 group-hover:text-gold-400 transition-colors leading-tight">
                  {post.title}
                </h2>
                <div className="flex items-center gap-3 text-sm text-stone-500 shrink-0">
                  <time dateTime={post.date}>{formattedDate}</time>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>
              <p className="text-stone-400 leading-relaxed">{post.excerpt}</p>
              <span className="inline-block mt-4 text-gold-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                Read more →
              </span>
            </Link>
          );
        })}
      </div>

      {/* Email signup CTA */}
      <div className="mt-16 glass-card p-8 md:p-12 text-center">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold gold-gradient mb-4">
          Never Miss a Post
        </h2>
        <p className="text-stone-400 max-w-lg mx-auto mb-6">
          Get the free Valdrath Companion Guide and be the first to know when
          new articles drop.
        </p>
        <Link
          href="/companion"
          className="btn-primary rounded-lg px-8 py-3 inline-block"
        >
          Get the Free Companion Guide
        </Link>
      </div>
    </section>
  );
}
