import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "../_data/posts";
import { BlogPostLayout } from "../_components/BlogPostLayout";

/* Post content imports */
import BestEpicFantasy2026 from "../_content/best-epic-fantasy-series-2026";
import DarkFantasyPolitical from "../_content/dark-fantasy-books-political-intrigue";
import ArtOfWorldBuilding from "../_content/art-of-world-building-kingdom-of-valdrath";
import SelfPublishingLessons from "../_content/self-publishing-epic-fantasy-lessons";
import SuccessionCrisis from "../_content/why-fantasy-readers-need-succession-crisis";

const contentMap: Record<string, React.ComponentType> = {
  "best-epic-fantasy-series-2026": BestEpicFantasy2026,
  "dark-fantasy-books-political-intrigue": DarkFantasyPolitical,
  "art-of-world-building-kingdom-of-valdrath": ArtOfWorldBuilding,
  "self-publishing-epic-fantasy-lessons": SelfPublishingLessons,
  "why-fantasy-readers-need-succession-crisis": SuccessionCrisis,
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      siteName: "Book Creed",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const Content = contentMap[slug];

  if (!post || !Content) {
    notFound();
  }

  return (
    <BlogPostLayout post={post}>
      <Content />
    </BlogPostLayout>
  );
}
