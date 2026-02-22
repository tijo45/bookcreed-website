import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Eva Noir's Newsletter — Exclusive Updates & Behind-the-Scenes Content",
  description:
    "Join Eva Noir's newsletter for exclusive updates on The Kingdom of Valdrath series, behind-the-scenes writing insights, early access to new releases, and special content for fans.",
  keywords: [
    "Eva Noir newsletter",
    "Kingdom of Valdrath updates",
    "fantasy book newsletter",
    "author updates",
    "exclusive content",
    "behind-the-scenes",
    "early access",
    "fantasy series newsletter"
  ],
  openGraph: {
    title: "Join Eva Noir's Newsletter",
    description: "Get exclusive updates, behind-the-scenes content, and early access to new Valdrath releases.",
    type: "website",
    url: "https://bookcreed.com/newsletter",
    images: [
      {
        url: "https://bookcreed.com/images/newsletter-og.jpg",
        width: 1200,
        height: 630,
        alt: "Eva Noir Newsletter - Join the Kingdom"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Join Eva Noir's Newsletter",
    description: "Get exclusive updates, behind-the-scenes content, and early access to new Valdrath releases."
  }
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}