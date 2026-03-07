import type { Metadata } from "next";
import Link from "next/link";
import BooksClient from "./BooksClient";
import {
  books,
  SERIES_NAME,
  AUTHOR_NAME,
} from "@/data/books";

export const metadata: Metadata = {
  title: "Books",
  description: `Browse all eight books in ${SERIES_NAME} by ${AUTHOR_NAME}. Epic fantasy with political intrigue, morally grey characters, and deep worldbuilding. Available on Kindle, paperback, and hardcover.`,
};

/* ------------------------------------------------------------------ */
/* Server-rendered SEO content — visible to all crawlers               */
/* ------------------------------------------------------------------ */
function SeoContent() {
  return (
    <div className="sr-only" aria-hidden="false">
      <h1>{SERIES_NAME} — Books by {AUTHOR_NAME}</h1>
      <p>
        Eight books. One epic saga of family, betrayal, and the price of power.
        An epic fantasy series for fans of George R.R. Martin, Joe Abercrombie,
        and Robin Hobb.
      </p>
      {books.map((book) => (
        <article key={book.number}>
          <h2>
            Book {book.number}: {book.title}
          </h2>
          <p>{book.tagline}</p>
          <p>{book.blurb}</p>
          {book.published && book.formats.length > 0 && (
            <ul>
              {book.formats.map((f) => (
                <li key={f.format}>
                  <a href={f.url}>
                    {f.format} — {f.price}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {!book.published && <p>Coming Soon</p>}
          <Link href={`/series/kingdom-of-valdrath/${book.number}`}>
            More details
          </Link>
        </article>
      ))}
    </div>
  );
}

export default function BooksPage() {
  return (
    <>
      <SeoContent />
      <BooksClient />
    </>
  );
}
