import Link from "next/link";

export default function FreeBookAlertExilesReturnKindle() {
  return (
    <>
      {/* Event structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SaleEvent",
            name: "The Exile's Return — Free on Kindle",
            description:
              "Download The Exile's Return by Eva Noir for FREE on Amazon Kindle. Book 1 of the 8-book Kingdom of Valdrath epic fantasy series. Limited time: February 25 through March 1, 2026.",
            startDate: "2026-02-25T00:00:00-05:00",
            endDate: "2026-03-01T23:59:59-05:00",
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode:
              "https://schema.org/OnlineEventAttendanceMode",
            location: {
              "@type": "VirtualLocation",
              url: "https://www.amazon.com/dp/B0GKXNCCXD",
            },
            organizer: {
              "@type": "Organization",
              name: "Book Creed",
              url: "https://bookcreed.com",
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              validFrom: "2026-02-25",
              validThrough: "2026-03-01",
              url: "https://www.amazon.com/dp/B0GKXNCCXD",
            },
          }),
        }}
      />

      <p>
        <strong>
          From February 25 through March 1, 2026,{" "}
          <em>The Exile&apos;s Return</em> is completely FREE on Amazon Kindle.
        </strong>
      </p>
      <p>
        No catch. No Kindle Unlimited subscription required. Just go to Amazon,
        hit download, and the book is yours — forever.
      </p>
      <p>
        This is Book 1 of{" "}
        <Link href="/series" className="text-gold-400 hover:underline">
          The Kingdom of Valdrath
        </Link>
        , an eight-book epic fantasy series about a royal family tearing itself
        apart over a dying king&apos;s throne. If you&apos;ve been looking for
        your next fantasy obsession — something with the political depth of{" "}
        <em>Game of Thrones</em>, the family drama of{" "}
        <em>Succession</em>, and a protagonist who&apos;s been wronged in ways
        you won&apos;t see coming — this is your entry point.
      </p>

      <p className="text-center">
        <a
          href="https://www.amazon.com/dp/B0GKXNCCXD"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-4 text-lg font-bold text-stone-950 transition-all hover:from-gold-400 hover:to-gold-500 hover:scale-105 hover:shadow-lg hover:shadow-gold-500/25 no-underline"
        >
          📚 Download Free on Amazon Kindle
        </a>
      </p>

      <hr />

      <h2>What&apos;s the Book About?</h2>

      <p>
        Prince Cassian Valdrath was exiled from the kingdom he was born to rule.
        Now he&apos;s back — not to reclaim his throne, but to investigate his
        brother&apos;s murder. What he discovers is far worse than a single
        killing. The conspiracy that destroyed his life reaches into every
        corner of the royal court, and the people he trusted most are the ones
        he should have feared.
      </p>

      <p>
        <em>The Exile&apos;s Return</em> is a full-length epic fantasy novel
        that sets the stage for an eight-book saga of political intrigue,
        betrayal, and dark secrets buried beneath a kingdom&apos;s gilded
        surface. Readers have compared it to <em>A Game of Thrones</em> for its
        layered politics and morally complex characters — but this series goes
        somewhere Martin&apos;s never did.
      </p>

      <blockquote>
        <p>
          &ldquo;I picked this up expecting a typical fantasy opener and stayed
          up until 3 AM finishing it. The court politics are razor-sharp, and
          Cassian is the kind of protagonist you root for even when he&apos;s
          making terrible decisions.&rdquo;
        </p>
      </blockquote>

      <h2>Why Is It Free?</h2>

      <p>
        Simple: we want new readers to experience the world of Valdrath. The
        series is eight books deep, and Book 1 is the gateway. If you love it,
        the rest of the saga is waiting. If you don&apos;t, you got a
        full-length fantasy novel for nothing. Either way, you win.
      </p>
      <p>
        The free promotion runs exclusively through Amazon Kindle from{" "}
        <strong>February 25 through March 1, 2026</strong>. After that, the
        price goes back to $4.99. Set a reminder or grab it now — the window is
        only five days.
      </p>

      <h2>What Readers Are Saying</h2>

      <ul>
        <li>
          <strong>&ldquo;Better than most traditionally published fantasy I&apos;ve read this year.&rdquo;</strong>
        </li>
        <li>
          <strong>&ldquo;The world-building is incredible — felt like stepping into a real place.&rdquo;</strong>
        </li>
        <li>
          <strong>&ldquo;If you like political intrigue with actual consequences, this delivers.&rdquo;</strong>
        </li>
        <li>
          <strong>&ldquo;Cassian is a protagonist who earns your loyalty chapter by chapter.&rdquo;</strong>
        </li>
      </ul>

      <h2>Bonus: Test Your Knowledge After You Read</h2>

      <p>
        Here&apos;s something most free book promotions don&apos;t offer. Once
        you finish <em>The Exile&apos;s Return</em>, head to{" "}
        <Link href="/quiz" className="text-gold-400 hover:underline">
          bookcreed.com/quiz
        </Link>{" "}
        and take the Book 1 quiz. It&apos;s a timed, skill-based challenge
        that tests how closely you were paying attention — and top scorers
        compete on a{" "}
        <Link href="/leaderboard" className="text-gold-400 hover:underline">
          live leaderboard
        </Link>{" "}
        for real prizes.
      </p>
      <p>
        The quiz system is part of what makes Book Creed different. We don&apos;t
        just publish books — we build experiences around them. There&apos;s also
        a{" "}
        <Link href="/companion" className="text-gold-400 hover:underline">
          free companion guide
        </Link>
        , a{" "}
        <Link href="/lore/world" className="text-gold-400 hover:underline">
          full lore encyclopedia
        </Link>
        , and character deep-dives that make re-reads even more rewarding.
      </p>

      <h2>The Series at a Glance</h2>

      <p>
        <strong>Series:</strong> The Kingdom of Valdrath
        <br />
        <strong>Author:</strong> Eva Noir
        <br />
        <strong>Books:</strong> 8 (and growing)
        <br />
        <strong>Genre:</strong> Epic Fantasy, Political Intrigue, Dark Fantasy
        <br />
        <strong>Comparable to:</strong> <em>A Song of Ice and Fire</em>,{" "}
        <em>The First Law</em>, <em>The Poppy War</em>
      </p>

      <p>
        <Link
          href="/series/kingdom-of-valdrath"
          className="text-gold-400 hover:underline"
        >
          → Explore the full series on bookcreed.com
        </Link>
      </p>

      <hr />

      <h2>How to Get Your Free Copy</h2>

      <ol>
        <li>
          <strong>
            <a
              href="https://www.amazon.com/dp/B0GKXNCCXD"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:underline"
            >
              Go to the Amazon listing
            </a>
          </strong>{" "}
          — the price will show as $0.00 between Feb 25 and Mar 1.
        </li>
        <li>
          <strong>Click &ldquo;Buy now with 1-Click&rdquo;</strong> — it works
          on any Kindle device, the Kindle app (iOS/Android/Mac/PC), or Kindle
          Cloud Reader.
        </li>
        <li>
          <strong>Start reading</strong> — and when you finish, come back to{" "}
          <Link href="/quiz" className="text-gold-400 hover:underline">
            bookcreed.com/quiz
          </Link>{" "}
          to test your knowledge.
        </li>
      </ol>

      <p className="text-center">
        <a
          href="https://www.amazon.com/dp/B0GKXNCCXD"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 px-8 py-4 text-lg font-bold text-stone-950 transition-all hover:from-gold-400 hover:to-gold-500 hover:scale-105 hover:shadow-lg hover:shadow-gold-500/25 no-underline"
        >
          📚 Get The Exile&apos;s Return FREE on Kindle
        </a>
      </p>

      <p className="text-center text-sm text-stone-500">
        Free February 25 – March 1, 2026. Regular price $4.99.
        <br />
        No Kindle Unlimited required. Yours to keep forever.
      </p>
    </>
  );
}
