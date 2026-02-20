import type { Metadata } from "next";
import { CompanionPageClient } from "./CompanionPageClient";

export const metadata: Metadata = {
  title: "FREE Valdrath Companion Guide — Character Profiles, Maps & More",
  description:
    "Get the free Companion Guide to The Kingdom of Valdrath. Includes detailed character profiles, a full kingdom map, timeline of events, glossary of terms, and the royal family tree.",
  keywords: [
    "Kingdom of Valdrath companion guide",
    "Valdrath character profiles",
    "Valdrath map",
    "Eva Noir free guide",
    "Kingdom of Valdrath family tree",
    "fantasy companion guide",
    "Valdrath glossary",
  ],
  openGraph: {
    title: "Get the FREE Valdrath Companion Guide",
    description:
      "Character profiles, kingdom map, timeline, glossary, and royal family tree — all in one free guide for Kingdom of Valdrath readers.",
    type: "website",
    url: "https://bookcreed.com/companion",
    siteName: "Book Creed",
    images: [
      {
        url: "/covers/valdrath/book1.jpg",
        width: 800,
        height: 1200,
        alt: "The Kingdom of Valdrath — Companion Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FREE Valdrath Companion Guide",
    description:
      "Character profiles, maps, timelines & more. Get the free companion guide to The Kingdom of Valdrath.",
    images: ["/covers/valdrath/book1.jpg"],
  },
  alternates: {
    canonical: "https://bookcreed.com/companion",
  },
};

export default function CompanionPage() {
  return <CompanionPageClient />;
}
