import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "../_data/posts";
import { BlogPostLayout } from "../_components/BlogPostLayout";
import { ArticleJsonLd } from "@/components/seo/JsonLd";

/* Post content imports */
import MorallyGreyProtagonist from "../_content/morally-grey-protagonist-fantasy-series";
import RoyalFamiliesSuccession from "../_content/best-fantasy-books-royal-families-succession";
import EpicVsGrimdark from "../_content/epic-fantasy-vs-grimdark-difference";
import GreatPrologues from "../_content/fantasy-books-great-prologues";
import FantasyBooksLikeGOT from "../_content/fantasy-books-like-game-of-thrones";
import ExiledPrinceTrope from "../_content/exiled-prince-trope-fantasy";
import DarkFantasyRenaissance from "../_content/dark-fantasy-renaissance-2026";
import BestEpicFantasy2026 from "../_content/best-epic-fantasy-series-2026";
import DarkFantasyPolitical from "../_content/dark-fantasy-books-political-intrigue";
import ArtOfWorldBuilding from "../_content/art-of-world-building-kingdom-of-valdrath";
import SelfPublishingLessons from "../_content/self-publishing-epic-fantasy-lessons";
import SuccessionCrisis from "../_content/why-fantasy-readers-need-succession-crisis";
import TestYourKnowledgeValdrath from "../_content/test-your-knowledge-kingdom-of-valdrath";
import SelfPublishedFantasyBooksWorthReading2026 from "../_content/self-published-fantasy-books-worth-reading-2026";
import FantasySeriesComplexPoliticsBetrayal from "../_content/fantasy-series-with-complex-politics-and-betrayal";
import DarkFantasyBooksLikeGameOfThrones2026 from "../_content/dark-fantasy-books-like-game-of-thrones-2026";
import BooksLikeThroneOfGlassButDarker from "../_content/books-like-throne-of-glass-but-darker";
import WorldbuildingTipsForFantasyWriters from "../_content/worldbuilding-tips-for-fantasy-writers";

const contentMap: Record<string, React.ComponentType> = {
  "test-your-knowledge-kingdom-of-valdrath": TestYourKnowledgeValdrath,
  "morally-grey-protagonist-fantasy-series": MorallyGreyProtagonist,
  "best-fantasy-books-royal-families-succession": RoyalFamiliesSuccession,
  "epic-fantasy-vs-grimdark-difference": EpicVsGrimdark,
  "fantasy-books-great-prologues": GreatPrologues,
  "fantasy-books-like-game-of-thrones": FantasyBooksLikeGOT,
  "exiled-prince-trope-fantasy": ExiledPrinceTrope,
  "dark-fantasy-renaissance-2026": DarkFantasyRenaissance,
  "best-epic-fantasy-series-2026": BestEpicFantasy2026,
  "dark-fantasy-books-political-intrigue": DarkFantasyPolitical,
  "art-of-world-building-kingdom-of-valdrath": ArtOfWorldBuilding,
  "self-publishing-epic-fantasy-lessons": SelfPublishingLessons,
  "why-fantasy-readers-need-succession-crisis": SuccessionCrisis,
  "self-published-fantasy-books-worth-reading-2026": SelfPublishedFantasyBooksWorthReading2026,
  "fantasy-series-with-complex-politics-and-betrayal": FantasySeriesComplexPoliticsBetrayal,
  "dark-fantasy-books-like-game-of-thrones-2026": DarkFantasyBooksLikeGameOfThrones2026,
  "books-like-throne-of-glass-but-darker": BooksLikeThroneOfGlassButDarker,
  "worldbuilding-tips-for-fantasy-writers": WorldbuildingTipsForFantasyWriters,
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
    <>
      <ArticleJsonLd
        headline={post.title}
        description={post.description}
        author={post.author}
        datePublished={post.date}
        url={`https://bookcreed.com/blog/${slug}`}
      />
      <BlogPostLayout post={post}>
        <Content />
      </BlogPostLayout>
    </>
  );
}
