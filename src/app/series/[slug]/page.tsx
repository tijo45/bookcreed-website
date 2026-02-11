import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

interface BookCard {
  id: string;
  number: number;
  title: string;
  slug: string;
  coverImage: string;
  published: boolean;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = await prisma.series.findUnique({
    where: { slug },
    select: { title: true, tagline: true },
  });
  if (!series) return {};
  return {
    title: series.title,
    description: series.tagline,
  };
}

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params;
  const series = await prisma.series.findUnique({
    where: { slug },
    include: { books: { orderBy: { number: "asc" } } },
  });

  if (!series) notFound();

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Series header */}
      <div className="text-center mb-16">
        <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl gold-gradient mb-4">
          {series.title}
        </h1>
        <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto mb-6">
          {series.tagline}
        </p>
        <p className="text-stone-300 max-w-3xl mx-auto leading-relaxed">
          {series.description}
        </p>
      </div>

      {/* Book grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {series.books.map((book: BookCard) => (
          <Link
            key={book.id}
            href={`/series/${slug}/${book.number}`}
            className="group block"
          >
            <div className="glass-card overflow-hidden transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]">
              {/* Cover */}
              <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                  src={book.coverImage}
                  alt={`${book.title} cover`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {!book.published && (
                  <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-sm text-gold-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-gold-400/30">
                    Coming Soon
                  </div>
                )}
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-stone-950/90 to-transparent" />
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-gold-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  Book {book.number}
                </p>
                <h3 className="font-[family-name:var(--font-heading)] text-stone-100 text-sm md:text-base leading-tight">
                  {book.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
