import type { Metadata } from "next";
import Link from "next/link";
import LeaderboardClient from "./LeaderboardClient";

export const metadata: Metadata = {
  title: "Leaderboard",
  description:
    "See who tops the Kingdom of Valdrath quiz leaderboard. Compete for the highest score and win cash prizes and exclusive rewards.",
};

/* ------------------------------------------------------------------ */
/* Server-rendered SEO content — visible to all crawlers               */
/* ------------------------------------------------------------------ */
function SeoContent() {
  return (
    <div className="sr-only" aria-hidden="false">
      <h1>Kingdom of Valdrath Quiz Leaderboard</h1>
      <p>
        Compete for the top score in the Kingdom of Valdrath quiz challenge.
        Top scorers each cohort win cash prizes and exclusive rewards.
      </p>
      <h2>How to Compete</h2>
      <ol>
        <li>Buy any book in The Kingdom of Valdrath series</li>
        <li>Find your access code at the end of the book</li>
        <li>Take the quiz and score as high as you can</li>
        <li>Check back here to see your ranking</li>
      </ol>
      <nav>
        <Link href="/quiz">Take a Quiz</Link>
        <Link href="/books">Browse Books</Link>
        <Link href="/contest/rules">Contest Rules</Link>
      </nav>
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <>
      <SeoContent />
      <LeaderboardClient />
    </>
  );
}
