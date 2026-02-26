import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "../_data/posts";
import { BlogPostLayout } from "../_components/BlogPostLayout";
import { ArticleJsonLd, BreadcrumbListJsonLd } from "@/components/seo/JsonLd";

/* Post content imports */
import BestFreeFantasyBooksRightNow from "../_content/best-free-fantasy-books-right-now";
import FreeFantasySeriesAmazonGuide from "../_content/free-fantasy-series-amazon-guide";
import FreeEpicFantasyBooks2026 from "../_content/free-epic-fantasy-books-2026";
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
import BestEpicFantasyBooks2026 from "../_content/best-epic-fantasy-books-2026";
import HowToWriteMorallyGrayCharacters from "../_content/how-to-write-morally-gray-characters";
import PoliticalFantasyBooksLikeGameOfThrones from "../_content/political-fantasy-books-like-game-of-thrones";
import SelfPublishingFantasySeriesLessonsLearned from "../_content/self-publishing-fantasy-series-lessons-learned";
import FantasyWorldbuildingGuide from "../_content/fantasy-worldbuilding-guide";
import EpicFantasySagas2026 from "../_content/epic-fantasy-sagas-2026";
import EpicFantasySeriesLikeGameOfThrones from "../_content/epic-fantasy-series-like-game-of-thrones";
import FreeFantasyBooksKindleFebruary2026 from "../_content/free-fantasy-books-kindle-february-2026";
import HowToBuildFantasyWorldThatFeelsReal from "../_content/how-to-build-fantasy-world-that-feels-real";
import RiseOfDarkFantasyMorallyGrayHeroes from "../_content/rise-of-dark-fantasy-morally-gray-heroes";
import FreeBookAlertExilesReturnKindle from "../_content/free-book-alert-exiles-return-kindle";
import BestDarkFantasyBookSeries2026 from "../_content/best-dark-fantasy-book-series-2026";
import BooksLikeGameOfThronesButFinished from "../_content/books-like-game-of-thrones-but-finished";
import FantasyBooksComplexMagicSystems from "../_content/fantasy-books-complex-magic-systems";
import FantasyBooksPerfectForBookClubs from "../_content/fantasy-books-perfect-for-book-clubs";
import UnderratedFantasySeriesHiddenGems from "../_content/underrated-fantasy-series-hidden-gems";
import FantasyBooksWithMorallyGreyCharacters from "../_content/fantasy-books-with-morally-grey-characters";
import EpicFantasySeriesCompleted2026 from "../_content/epic-fantasy-series-completed-2026";
import FantasyBooksAboutRoyalSuccession from "../_content/fantasy-books-about-royal-succession";
import BooksWithPoliticalIntrigueAndBetrayal from "../_content/books-with-political-intrigue-and-betrayal";
import IndieFantasyAuthorsToWatch2026 from "../_content/indie-fantasy-authors-to-watch-2026";
import FantasyBooksWhereTheVillainWins from "../_content/fantasy-books-where-the-villain-wins";
import BestFantasyBooksAboutBrothers from "../_content/best-fantasy-books-about-brothers";
import DarkFantasyBooksWithNoMagic from "../_content/dark-fantasy-books-with-no-magic";
import FantasyBooksSetInMedievalKingdoms from "../_content/fantasy-books-set-in-medieval-kingdoms";
import CompletedFantasySeriesToBingeRead from "../_content/completed-fantasy-series-to-binge-read";
import CompleteReadingOrderKingdomValdrath from "../_content/complete-reading-order-kingdom-valdrath";
import FiveReasonsPoliticalFantasyFansLoveWarriorPrince from "../_content/five-reasons-political-fantasy-fans-love-warrior-prince";
import CassianValdrathExiledPrinceCharacterSpotlight from "../_content/cassian-valdrath-exiled-prince-character-spotlight";
import FantasyWritingToolsDigitalProducts from "../_content/fantasy-writing-tools-digital-products";
const contentMap: Record<string, React.ComponentType> = {
  "fantasy-writing-tools-digital-products": FantasyWritingToolsDigitalProducts,
  "best-free-fantasy-books-right-now": BestFreeFantasyBooksRightNow,
  "free-fantasy-series-amazon-guide": FreeFantasySeriesAmazonGuide,
  "free-epic-fantasy-books-2026": FreeEpicFantasyBooks2026,
  "complete-reading-order-kingdom-valdrath": CompleteReadingOrderKingdomValdrath,
  "five-reasons-political-fantasy-fans-love-warrior-prince": FiveReasonsPoliticalFantasyFansLoveWarriorPrince,
  "cassian-valdrath-exiled-prince-character-spotlight": CassianValdrathExiledPrinceCharacterSpotlight,  "free-book-alert-exiles-return-kindle": FreeBookAlertExilesReturnKindle,
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
  "best-epic-fantasy-books-2026": BestEpicFantasyBooks2026,
  "how-to-write-morally-gray-characters": HowToWriteMorallyGrayCharacters,
  "political-fantasy-books-like-game-of-thrones": PoliticalFantasyBooksLikeGameOfThrones,
  "self-publishing-fantasy-series-lessons-learned": SelfPublishingFantasySeriesLessonsLearned,
  "fantasy-worldbuilding-guide": FantasyWorldbuildingGuide,
  "epic-fantasy-sagas-2026": EpicFantasySagas2026,
  "epic-fantasy-series-like-game-of-thrones": EpicFantasySeriesLikeGameOfThrones,
  "free-fantasy-books-kindle-february-2026": FreeFantasyBooksKindleFebruary2026,
  "how-to-build-fantasy-world-that-feels-real": HowToBuildFantasyWorldThatFeelsReal,
  "rise-of-dark-fantasy-morally-gray-heroes": RiseOfDarkFantasyMorallyGrayHeroes,
  "best-dark-fantasy-book-series-2026": BestDarkFantasyBookSeries2026,
  "books-like-game-of-thrones-but-finished": BooksLikeGameOfThronesButFinished,
  "fantasy-books-complex-magic-systems": FantasyBooksComplexMagicSystems,
  "fantasy-books-perfect-for-book-clubs": FantasyBooksPerfectForBookClubs,
  "underrated-fantasy-series-hidden-gems": UnderratedFantasySeriesHiddenGems,
  "fantasy-books-with-morally-grey-characters": FantasyBooksWithMorallyGreyCharacters,
  "epic-fantasy-series-completed-2026": EpicFantasySeriesCompleted2026,
  "fantasy-books-about-royal-succession": FantasyBooksAboutRoyalSuccession,
  "books-with-political-intrigue-and-betrayal": BooksWithPoliticalIntrigueAndBetrayal,
  "indie-fantasy-authors-to-watch-2026": IndieFantasyAuthorsToWatch2026,
  "fantasy-books-where-the-villain-wins": FantasyBooksWhereTheVillainWins,
  "best-fantasy-books-about-brothers": BestFantasyBooksAboutBrothers,
  "dark-fantasy-books-with-no-magic": DarkFantasyBooksWithNoMagic,
  "fantasy-books-set-in-medieval-kingdoms": FantasyBooksSetInMedievalKingdoms,
  "completed-fantasy-series-to-binge-read": CompletedFantasySeriesToBingeRead,
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
      <BreadcrumbListJsonLd
        items={[
          { name: "Home", url: "https://bookcreed.com" },
          { name: "Blog", url: "https://bookcreed.com/blog" },
          { name: post.title, url: `https://bookcreed.com/blog/${slug}` },
        ]}
      />
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
