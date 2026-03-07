import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Book Creed - The Kingdom of Valdrath | Epic Fantasy by Eva Noir",
  description:
    "Enter The Kingdom of Valdrath — an epic fantasy series by Eva Noir. A world of family, betrayal, and the price of power. Read the books, take skill-based quizzes, and compete for real prizes.",
};

/* ------------------------------------------------------------------ */
/* Server-rendered SEO content (visible to all crawlers)               */
/* Rendered as a hidden fallback; the client component provides the    */
/* full interactive experience with animations.                        */
/* ------------------------------------------------------------------ */
function SeoContent() {
  return (
    <div className="sr-only" aria-hidden="false">
      <h1>The Kingdom of Valdrath — Epic Fantasy Series by Eva Noir</h1>
      <p>
        A world of family, betrayal, and the price of power. Read the books,
        prove your knowledge, and compete for real prizes. An epic fantasy series
        for fans of George R.R. Martin, Joe Abercrombie, and Robin Hobb.
      </p>
      <h2>The Series — Eight Books, One Epic Saga</h2>
      <ul>
        <li>Book 1: The Exile&apos;s Return — Available Now</li>
        <li>Book 2: The Shadow&apos;s Reach — Available Now</li>
        <li>Book 3: The Fractured Peace — Coming Soon</li>
        <li>Book 4: The Fractured Crown — Coming Soon</li>
        <li>Book 5: The Gathering Storm — Coming Soon</li>
        <li>Book 6: The Final Scar — Coming Soon</li>
        <li>Book 7: The Quiet Throne — Coming Soon</li>
        <li>Book 8: The Scarred Crown — Coming Soon</li>
      </ul>
      <h2>Interactive Quizzes</h2>
      <p>
        Test your knowledge of The Kingdom of Valdrath series. Each book has 100
        unique quiz questions. Read the book, find the access code, take the
        quiz, and compete on the leaderboard for real gift card prizes.
      </p>
      <h2>How It Works</h2>
      <ol>
        <li>Buy the Book — Grab your copy of any book in the series</li>
        <li>Get Your Code — Find the access code at the end of your book</li>
        <li>Take the Quiz — Test your knowledge with timed questions</li>
        <li>Win Prizes — Top scorers win cash prizes and exclusive rewards</li>
      </ol>
      <nav>
        <Link href="/books">Browse Books</Link>
        <Link href="/series/kingdom-of-valdrath">Explore the Series</Link>
        <Link href="/quiz">Take a Quiz</Link>
        <Link href="/leaderboard">View Leaderboard</Link>
        <Link href="/lore">World Lore</Link>
        <Link href="/contest/rules">Contest Rules</Link>
      </nav>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <SeoContent />
      <HomeClient />
    </>
  );
}
