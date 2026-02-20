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
  return {
    title: `${book.title} - ${series.title}`,
    description: book.blurb.slice(0, 160),
  };
}

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
