import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BookDetail } from "./BookDetail";
import { BookJsonLd } from "@/components/seo/JsonLd";

interface Props {
  params: Promise<{ slug: string; bookNumber: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, bookNumber } = await params;
  const num = parseInt(bookNumber, 10);
  const series = await prisma.series.findUnique({ where: { slug } });
  if (!series) return {};
  const book = await prisma.book.findFirst({
    where: { seriesId: series.id, number: num },
  });
  if (!book) return {};

  const coverUrl = book.coverImage.startsWith("http")
    ? book.coverImage
    : `https://bookcreed.com${book.coverImage}`;

  return {
    title: `${book.title} - ${series.title}`,
    description: book.blurb.slice(0, 160),
    openGraph: {
      title: `${book.title} — Book ${book.number} of ${series.title}`,
      description: book.blurb.slice(0, 200),
      type: "book",
      siteName: "Book Creed",
      images: [
        {
          url: coverUrl,
          width: 800,
          height: 1200,
          alt: `${book.title} — Book ${book.number} of ${series.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${book.title} — ${series.title} by Eva Noir`,
      description: book.blurb.slice(0, 200),
      images: [coverUrl],
    },
  };
}

/** Book metadata for published books */
const BOOK_META: Record<
  number,
  {
    isbn: string;
    asin: string;
    numberOfPages: number;
    datePublished: string;
    offers: { price: string; bookFormat: string; url?: string }[];
  }
> = {
  1: {
    isbn: "9798246509012",
    asin: "B0GKXNCCXD",
    numberOfPages: 320,
    datePublished: "2025-11-15",
    offers: [
      { price: "2.99", bookFormat: "Kindle", url: "https://www.amazon.com/dp/B0GKXNCCXD" },
      { price: "14.99", bookFormat: "Paperback", url: "https://www.amazon.com/dp/B0GKXNCCXD" },
      { price: "24.99", bookFormat: "Hardcover", url: "https://www.amazon.com/dp/B0GKXNCCXD" },
    ],
  },
  2: {
    isbn: "9798246717608",
    asin: "B0GL3YQFKS",
    numberOfPages: 340,
    datePublished: "2026-01-10",
    offers: [
      { price: "4.99", bookFormat: "Kindle", url: "https://www.amazon.com/dp/B0GL3YQFKS" },
      { price: "14.99", bookFormat: "Paperback", url: "https://www.amazon.com/dp/B0GL3YQFKS" },
      { price: "24.99", bookFormat: "Hardcover", url: "https://www.amazon.com/dp/B0GL3YQFKS" },
    ],
  },
};

export default async function BookDetailPage({ params }: Props) {
  const { slug, bookNumber } = await params;
  const num = parseInt(bookNumber, 10);
  if (isNaN(num)) notFound();

  const series = await prisma.series.findUnique({
    where: { slug },
    include: {
      books: {
        orderBy: { number: "asc" },
        select: { number: true, title: true, slug: true },
      },
    },
  });

  if (!series) notFound();

  const book = await prisma.book.findFirst({
    where: { seriesId: series.id, number: num },
    select: {
      id: true,
      number: true,
      title: true,
      slug: true,
      blurb: true,
      coverImage: true,
      published: true,
      kdpUrl: true,
    },
  });

  if (!book) notFound();

  const meta = BOOK_META[book.number];

  return (
    <>
      <BookJsonLd
        title={book.title}
        author="Eva Noir"
        description={book.blurb}
        bookNumber={book.number}
        seriesName={series.title}
        coverImage={book.coverImage}
        url={`https://bookcreed.com/series/${series.slug}/${book.number}`}
        kdpUrl={book.kdpUrl ?? undefined}
        genre={["Epic Fantasy", "Dark Fantasy", "Political Fantasy"]}
        {...(meta
          ? {
              isbn: meta.isbn,
              asin: meta.asin,
              numberOfPages: meta.numberOfPages,
              datePublished: meta.datePublished,
              offers: meta.offers,
            }
          : {})}
      />
      <BookDetail
        book={book}
        series={{
          title: series.title,
          slug: series.slug,
          books: series.books,
        }}
      />
    </>
  );
}
