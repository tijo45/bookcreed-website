/**
 * Reusable JSON-LD structured data components for SEO.
 */

interface WebSiteJsonLdProps {
  name: string;
  url: string;
  description: string;
}

export function WebSiteJsonLd({ name, url, description }: WebSiteJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    publisher: {
      "@type": "Organization",
      name: "Book Creed",
      url: "https://bookcreed.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface BookJsonLdProps {
  title: string;
  author: string;
  description: string;
  bookNumber: number;
  seriesName: string;
  coverImage: string;
  url: string;
  isbn?: string;
  datePublished?: string;
  publisher?: string;
  kdpUrl?: string;
}

export function BookJsonLd({
  title,
  author,
  description,
  bookNumber,
  seriesName,
  coverImage,
  url,
  isbn,
  datePublished,
  publisher = "Book Creed Publishing",
  kdpUrl,
}: BookJsonLdProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: title,
    author: {
      "@type": "Person",
      name: author,
    },
    description,
    image: coverImage.startsWith("http")
      ? coverImage
      : `https://bookcreed.com${coverImage}`,
    url,
    bookFormat: "https://schema.org/EBook",
    numberOfPages: undefined,
    isPartOf: {
      "@type": "BookSeries",
      name: seriesName,
      position: bookNumber,
    },
    publisher: {
      "@type": "Organization",
      name: publisher,
    },
  };

  if (isbn) data.isbn = isbn;
  if (datePublished) data.datePublished = datePublished;
  if (kdpUrl) {
    data.offers = {
      "@type": "Offer",
      url: kdpUrl,
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
    };
  }

  // Clean up undefined values
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined) delete data[key];
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
