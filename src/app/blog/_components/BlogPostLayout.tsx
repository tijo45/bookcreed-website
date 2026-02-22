import Link from "next/link";
import { BlogPost } from "../_data/posts";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";

interface Props {
  post: BlogPost;
  children: React.ReactNode;
}

export function BlogPostLayout({ post, children }: Props) {
  const formattedDate = new Date(post.date + "T12:00:00").toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-stone-500">
        <Link href="/" className="hover:text-gold-400 transition-colors">
          Home
        </Link>
        <span className="mx-2">›</span>
        <Link href="/blog" className="hover:text-gold-400 transition-colors">
          Blog
        </Link>
        <span className="mx-2">›</span>
        <span className="text-stone-400">{post.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-12">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-stone-100 leading-tight mb-6">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-stone-400">
          <span>By {post.author}</span>
          <span className="text-stone-600">•</span>
          <time dateTime={post.date}>{formattedDate}</time>
          <span className="text-stone-600">•</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-invert prose-stone prose-lg max-w-none prose-headings:font-[family-name:var(--font-heading)] prose-headings:text-stone-100 prose-p:text-stone-300 prose-p:leading-relaxed prose-a:text-gold-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-stone-200 prose-li:text-stone-300 prose-blockquote:border-gold-500/50 prose-blockquote:text-stone-400 prose-hr:border-stone-800">
        {children}
      </div>

      {/* Newsletter Signup */}
      <NewsletterSignup variant="inline" className="mt-16" />

      {/* CTA */}
      <div className="mt-16 glass-card p-8 md:p-12 text-center">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold gold-gradient mb-4">
          Enter the Kingdom of Valdrath
        </h2>
        <p className="text-stone-400 max-w-lg mx-auto mb-6">
          Eight books of political intrigue, family betrayal, and a world that
          will consume you. Start reading today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/books"
            className="btn-primary rounded-lg px-8 py-3 inline-block text-center"
          >
            Read the Series
          </Link>
          <Link
            href="/companion"
            className="rounded-lg border border-gold-500/30 px-8 py-3 text-gold-400 hover:bg-gold-500/10 transition-colors inline-block text-center"
          >
            Get the Free Companion Guide
          </Link>
        </div>
      </div>

      {/* Back to blog */}
      <div className="mt-12 text-center">
        <Link
          href="/blog"
          className="text-stone-500 hover:text-gold-400 transition-colors text-sm"
        >
          ← Back to all posts
        </Link>
      </div>
    </article>
  );
}
