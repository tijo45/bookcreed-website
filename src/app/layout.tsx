import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { FreeDayBanner } from "@/components/ui/FreeDayBanner";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { WebSiteJsonLd } from "@/components/seo/JsonLd";

const cinzel = localFont({
  src: "../fonts/Cinzel-VariableFont_wght.ttf",
  variable: "--font-heading",
  display: "swap",
});

const inter = localFont({
  src: "../fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Book Creed - The Kingdom of Valdrath | Epic Fantasy by Eva Noir",
    template: "%s | Book Creed",
  },
  description:
    "Enter The Kingdom of Valdrath — an epic fantasy series by Eva Noir. A world of family, betrayal, and the price of power. Read the books, take skill-based quizzes, and compete for real prizes.",
  keywords: [
    "Kingdom of Valdrath",
    "Eva Noir",
    "epic fantasy",
    "fantasy book series",
    "book quiz",
    "reading contest",
    "fantasy novels",
  ],
  authors: [{ name: "Eva Noir" }],
  creator: "Eva Noir",
  metadataBase: new URL("https://bookcreed.com"),
  openGraph: {
    title: "Book Creed — The Kingdom of Valdrath by Eva Noir",
    description:
      "An epic fantasy series of family, betrayal, and the price of power. Read the books, prove your knowledge, and compete for real prizes.",
    siteName: "Book Creed",
    type: "website",
    locale: "en_US",
    url: "https://bookcreed.com",
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
    title: "Book Creed — The Kingdom of Valdrath by Eva Noir",
    description:
      "Epic fantasy. Skill-based quizzes. Real prizes. Dive into the world of Valdrath.",
    images: ["/covers/valdrath/book1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      <head>
        <WebSiteJsonLd
          name="Book Creed"
          url="https://bookcreed.com"
          description="Enter The Kingdom of Valdrath — an epic fantasy series by Eva Noir. Read the books, take quizzes, and compete for real prizes."
        />
      </head>
      <body className="min-h-screen bg-stone-950 text-stone-200 font-[family-name:var(--font-body)] antialiased">
        <SessionProvider>
          <FreeDayBanner />
          <Header />
          <main className="min-h-[calc(100vh-160px)]">{children}</main>
          <Footer />
          <CookieConsent />
        </SessionProvider>
      </body>
    </html>
  );
}
