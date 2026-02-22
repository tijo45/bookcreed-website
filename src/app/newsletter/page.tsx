import type { Metadata } from "next";
import { NewsletterPageClient } from "./NewsletterPageClient";

export const metadata: Metadata = {
  title: "Join Eva Noir's Newsletter — Exclusive Updates & Behind-the-Scenes Content",
  description:
    "Join Eva Noir's newsletter for exclusive updates on The Kingdom of Valdrath series, behind-the-scenes writing insights, early access to new releases, and special content for fans.",
  keywords: [
    "Eva Noir newsletter",
    "Kingdom of Valdrath updates", 
    "fantasy author newsletter",
    "book series updates",
    "exclusive fantasy content",
    "behind the scenes writing",
    "new book releases",
    "Valdrath series news",
  ],
  openGraph: {
    title: "Join Eva Noir's Newsletter — Kingdom of Valdrath Updates",
    description:
      "Get exclusive updates, behind-the-scenes content, and early access to new releases from The Kingdom of Valdrath series. Join Eva Noir's inner circle.",
    type: "website",
    url: "https://bookcreed.com/newsletter",
    siteName: "Book Creed",
    images: [
      {
        url: "/covers/valdrath/book1.jpg",
        width: 800,
        height: 1200,
        alt: "The Kingdom of Valdrath Newsletter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join Eva Noir's Newsletter",
    description:
      "Exclusive updates, behind-the-scenes content, and early access to new Valdrath releases.",
    images: ["/covers/valdrath/book1.jpg"],
  },
  alternates: {
    canonical: "https://bookcreed.com/newsletter",
  },
};

export default function NewsletterPage() {
  return <NewsletterPageClient />;
}