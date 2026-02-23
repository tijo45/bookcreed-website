/**
 * Reusable JSON-LD structured data components for SEO.
 */

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbListJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbListJsonLd({ items }: BreadcrumbListJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface WebSiteJsonLdProps {
  name: string;
  url: string;
  description: string;
}

export function WebSiteJsonLd({ name, url, description }: WebSiteJsonLdProps) {
  const websiteData = {
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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://bookcreed.com/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const orgData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Book Creed",
    url: "https://bookcreed.com",
    logo: "https://bookcreed.com/covers/valdrath/book1.jpg",
    description:
      "Book Creed is the home of The Kingdom of Valdrath — an epic fantasy series by Eva Noir with interactive quizzes and reading contests.",
    founder: {
      "@type": "Person",
      name: "Eva Noir",
    },
    sameAs: [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgData) }}
      />
    </>
  );
}

interface ArticleJsonLdProps {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  url: string;
  image?: string;
}

export function ArticleJsonLd({
  headline,
  description,
  author,
  datePublished,
  url,
  image,
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished,
    dateModified: datePublished,
    url,
    image: image || "https://bookcreed.com/covers/valdrath/book1.jpg",
    publisher: {
      "@type": "Organization",
      name: "Book Creed",
      url: "https://bookcreed.com",
      logo: {
        "@type": "ImageObject",
        url: "https://bookcreed.com/covers/valdrath/book1.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface BookOffer {
  price: string;
  priceCurrency?: string;
  bookFormat: string;
  url?: string;
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
  asin?: string;
  datePublished?: string;
  publisher?: string;
  kdpUrl?: string;
  offers?: BookOffer[];
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
  asin,
  datePublished,
  publisher = "Book Creed Publishing",
  kdpUrl,
  offers,
}: BookJsonLdProps) {
  const imageUrl = coverImage.startsWith("http")
    ? coverImage
    : `https://bookcreed.com${coverImage}`;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: title,
    author: {
      "@type": "Person",
      name: author,
    },
    description,
    image: imageUrl,
    url,
    bookFormat: "https://schema.org/EBook",
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
  if (asin) data.identifier = { "@type": "PropertyValue", propertyID: "ASIN", value: asin };
  if (datePublished) data.datePublished = datePublished;

  if (offers && offers.length > 0) {
    data.offers = offers.map((o) => ({
      "@type": "Offer",
      price: o.price,
      priceCurrency: o.priceCurrency || "USD",
      availability: "https://schema.org/InStock",
      url: o.url || kdpUrl,
      itemCondition: "https://schema.org/NewCondition",
      ...(o.bookFormat === "Kindle"
        ? { bookFormat: "https://schema.org/EBook" }
        : { bookFormat: "https://schema.org/Paperback" }),
    }));
  } else if (kdpUrl) {
    data.offers = {
      "@type": "Offer",
      url: kdpUrl,
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
