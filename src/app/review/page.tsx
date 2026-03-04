import type { Metadata } from "next";
import { ReviewPageClient } from "./ReviewPageClient";

export const metadata: Metadata = {
  title: "Review The Warrior Prince by Eva Noir",
  description:
    "Finished The Warrior Prince? Leave a quick review on Amazon or Goodreads. Your words help the next reader find this story.",
  keywords: [
    "review The Warrior Prince",
    "Kingdom of Valdrath review",
    "Eva Noir",
    "leave a book review",
    "Amazon book review",
    "epic fantasy review",
  ],
  openGraph: {
    title: "Review The Warrior Prince by Eva Noir",
    description:
      "Finished the book? Your review helps the next reader find this story. It takes 2 minutes.",
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
    title: "Review The Warrior Prince by Eva Noir",
    description:
      "Your review helps the next reader find this story. It takes 2 minutes.",
    images: ["/covers/valdrath/book1.jpg"],
  },
  alternates: {
    canonical: "https://bookcreed.com/review",
  },
};

export default function ReviewPage() {
  return <ReviewPageClient />;
}
