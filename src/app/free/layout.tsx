import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Exile's Return - FREE for a Limited Time",
  description: "Get The Exile's Return absolutely FREE! Epic fantasy by Eva Noir - Book One of The Kingdom of Valdrath series. Free Feb 25 - Mar 1, 2026. Limited time offer.",
  keywords: [
    "free book",
    "The Exile's Return",
    "Eva Noir", 
    "Kingdom of Valdrath",
    "epic fantasy",
    "free ebook",
    "fantasy promotion",
    "limited time offer"
  ],
  openGraph: {
    title: "The Exile's Return - FREE for a Limited Time",
    description: "Get The Exile's Return absolutely FREE! Epic fantasy by Eva Noir - Book One of The Kingdom of Valdrath series. Free Feb 25 - Mar 1, 2026.",
    url: "https://bookcreed.com/free",
    images: [
      {
        url: "/covers/valdrath/book1.jpg",
        width: 800,
        height: 1200,
        alt: "The Exile's Return - Book 1 of The Kingdom of Valdrath",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Exile's Return - FREE for a Limited Time",
    description: "Epic fantasy adventure FREE for a limited time! Get your copy now.",
    images: ["/covers/valdrath/book1.jpg"],
  },
};

export default function FreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}