import type { Metadata } from "next";
import { ReviewersPageClient } from "./ReviewersPageClient";

export const metadata: Metadata = {
  title: "Request Free Review Copies — The Kingdom of Valdrath by Eva Noir",
  description:
    "Book reviewers and content creators: request free copies of Eva Noir's 8-book epic fantasy series. Available in ePub, MOBI, and PDF.",
  keywords: [
    "free fantasy book review copy",
    "fantasy ARC request",
    "Kingdom of Valdrath review",
    "Eva Noir ARC",
    "book reviewer free copies",
    "epic fantasy review copy",
  ],
  openGraph: {
    title: "Request Free Review Copies — The Kingdom of Valdrath",
    description:
      "Get free copies of Eva Noir's 8-book epic fantasy saga in exchange for an honest review.",
    type: "website",
    url: "https://bookcreed.com/reviewers",
    siteName: "Book Creed",
    images: [
      {
        url: "/covers/valdrath/book1.jpg",
        width: 800,
        height: 1200,
        alt: "The Kingdom of Valdrath — Request Review Copies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request Free Review Copies — The Kingdom of Valdrath",
    description:
      "Book reviewers: get free copies of Eva Noir's 8-book epic fantasy saga. Honest reviews only.",
    images: ["/covers/valdrath/book1.jpg"],
  },
  alternates: {
    canonical: "https://bookcreed.com/reviewers",
  },
};

export default function ReviewersPage() {
  return <ReviewersPageClient />;
}
