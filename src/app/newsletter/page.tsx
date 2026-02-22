import type { Metadata } from "next";
import { NewsletterPageClient } from "./NewsletterPageClient";

export const metadata: Metadata = {
  title: "Join Eva Noir's Newsletter — Kingdom of Valdrath Updates & Exclusive Content",
  description:
    "Subscribe to Eva Noir's newsletter for exclusive Kingdom of Valdrath content, behind-the-scenes insights, early access to new releases, and bonus scenes you won't find anywhere else.",
  keywords: [
    "Eva Noir newsletter",
    "Kingdom of Valdrath newsletter",
    "fantasy newsletter",
    "book updates",
    "exclusive content",
    "author newsletter",
    "Valdrath updates",
    "fantasy book series",
    "Eva Noir updates",
  ],
  openGraph: {
    title: "Join Eva Noir's Newsletter — Exclusive Valdrath Content",
    description:
      "Get exclusive Kingdom of Valdrath content, behind-the-scenes insights, early access to releases, and bonus scenes delivered to your inbox.",
    type: "website",
    url: "https://bookcreed.com/newsletter",
    siteName: "Book Creed",
    images: [
      {
        url: "/covers/valdrath/book1.jpg",
        width: 800,
        height: 1200,
        alt: "Join Eva Noir's Newsletter — Kingdom of Valdrath",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join Eva Noir's Newsletter",
    description:
      "Exclusive Valdrath content, behind-the-scenes insights, and early access to new releases.",
    images: ["/covers/valdrath/book1.jpg"],
  },
  alternates: {
    canonical: "https://bookcreed.com/newsletter",
  },
};

export default function NewsletterPage() {
  return <NewsletterPageClient />;
}