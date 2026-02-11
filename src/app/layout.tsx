import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { SessionProvider } from "@/components/providers/SessionProvider";

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
    default: "Book Creed - Epic Fantasy Series",
    template: "%s | Book Creed",
  },
  description:
    "Discover The Kingdom of Valdrath - an epic fantasy series of family, betrayal, and the price of power. Take quizzes, compete in contests, and win prizes.",
  metadataBase: new URL("https://bookcreed.com"),
  openGraph: {
    title: "Book Creed",
    description: "Epic fantasy books, interactive quizzes, and skill-based contests.",
    siteName: "Book Creed",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-stone-950 text-stone-200 font-[family-name:var(--font-body)] antialiased">
        <SessionProvider>
          <Header />
          <main className="min-h-[calc(100vh-160px)]">{children}</main>
          <Footer />
          <CookieConsent />
        </SessionProvider>
      </body>
    </html>
  );
}
