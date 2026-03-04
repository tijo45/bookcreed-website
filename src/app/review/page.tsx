import type { Metadata } from "next";
import { ReviewPageClient } from "./ReviewPageClient";

export const metadata: Metadata = {
  title: "Get a FREE Copy of The Exile's Return — Read & Review",
  description:
    "Love fantasy? Get a free copy of The Exile's Return by Eva Noir — Book 1 of The Kingdom of Valdrath. All we ask is an honest Amazon review after reading.",
  keywords: [
    "free fantasy book",
    "The Exile's Return free",
    "Kingdom of Valdrath",
    "Eva Noir",
    "free Kindle book",
    "fantasy book review",
    "epic fantasy free copy",
    "read and review",
  ],
  openGraph: {
    title: "Love Fantasy? Get a FREE Copy of The Exile's Return",
    description:
      "Grab a free copy of Eva Noir's epic fantasy debut. Read it. Review it. Help a new series grow.",
    type: "website",
    url: "https://bookcreed.com/review",
    siteName: "Book Creed",
    images: [
      {
        url: "/covers/valdrath/book1.jpg",
        width: 800,
        height: 1200,
        alt: "The Exile's Return — Book 1 of The Kingdom of Valdrath",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Love Fantasy? Get a FREE Copy of The Exile's Return",
    description:
      "Free epic fantasy book. Read it. Review it. Simple as that.",
    images: ["/covers/valdrath/book1.jpg"],
  },
  alternates: {
    canonical: "https://bookcreed.com/review",
  },
};

export default function ReviewPage() {
  return <ReviewPageClient />;
}
