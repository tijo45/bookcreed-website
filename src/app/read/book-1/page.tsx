import type { Metadata } from "next";
import { chapters } from "./chapterData";

export const metadata: Metadata = {
  title: "Read The Exile's Return Free — First 3 Chapters | Kingdom of Valdrath",
  description:
    "Read the first three chapters of The Exile's Return by Eva Noir for free. Book One of The Kingdom of Valdrath epic fantasy series. A prince haunted by his past must return to face the family he abandoned.",
  keywords: [
    "Kingdom of Valdrath",
    "Kingdom of Valdrath read free",
    "The Exile's Return",
    "Eva Noir",
    "epic fantasy free chapters",
    "fantasy book free read",
    "read free fantasy online",
  ],
  openGraph: {
    title: "Read The Exile's Return Free — First 3 Chapters",
    description:
      "Dive into the epic fantasy world of Valdrath. Read the first three chapters of The Exile's Return by Eva Noir — free.",
    type: "article",
    url: "https://bookcreed.com/read/book-1",
  },
  alternates: {
    canonical: "https://bookcreed.com/read/book-1",
  },
};

const chapterKeys = ["prologue", "chapter1", "chapter2", "chapter3"] as const;

const navLabels: Record<string, string> = {
  prologue: "Prologue",
  chapter1: "Chapter 1",
  chapter2: "Chapter 2",
  chapter3: "Chapter 3",
};

function Paragraph({ text }: { text: string }) {
  // Short non-sentence fragments rendered as italic thoughts
  const isThought =
    !text.startsWith('"') &&
    !text.startsWith("\u201c") &&
    text.length < 80 &&
    !text.endsWith(".");

  return (
    <p
      className={`mb-5 leading-[1.9] ${isThought ? "italic text-stone-400" : "text-stone-300"}`}
    >
      {text}
    </p>
  );
}

export default function ReadBook1() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Book",
            name: "The Exile's Return",
            author: { "@type": "Person", name: "Eva Noir" },
            bookEdition: "Book One of The Kingdom of Valdrath",
            genre: "Epic Fantasy",
            url: "https://bookcreed.com/read/book-1",
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              url: "https://www.amazon.com/dp/B0GKXNCCXD",
            },
          }),
        }}
      />

      <div className="min-h-screen bg-stone-950">
        {/* Hero / Title Section */}
        <header className="relative pt-16 pb-12 text-center border-b border-stone-800/60">
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto px-6">
            <p className="text-gold-400 text-sm font-semibold tracking-[0.25em] uppercase mb-4">
              Book One of The Kingdom of Valdrath
            </p>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl text-stone-100 mb-4 leading-tight">
              The Exile&rsquo;s Return
            </h1>
            <p className="text-stone-400 text-lg">by Eva Noir</p>
            <div className="mt-6 flex items-center justify-center gap-3 text-stone-500 text-sm">
              <span className="inline-block w-8 h-px bg-gold-600/40" />
              <span>First 3 Chapters &mdash; Free Preview</span>
              <span className="inline-block w-8 h-px bg-gold-600/40" />
            </div>
          </div>
        </header>

        {/* Chapter Navigation */}
        <nav className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/40">
          <div className="max-w-2xl mx-auto px-6 py-3 flex items-center justify-center gap-2 md:gap-4 overflow-x-auto">
            {chapterKeys.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                className="whitespace-nowrap text-sm text-stone-400 hover:text-gold-400 transition-colors px-3 py-1 rounded-full hover:bg-stone-800/50"
              >
                {navLabels[key]}
              </a>
            ))}
            <span className="hidden md:inline-block w-px h-4 bg-stone-700 mx-1" />
            <a
              href="https://www.amazon.com/dp/B0GKXNCCXD"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors px-3 py-1"
            >
              Get Full Book →
            </a>
          </div>
        </nav>

        {/* Reading Content */}
        <article
          className="max-w-2xl mx-auto px-6 md:px-8 py-12"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {chapterKeys.map((key) => {
            const chapter = chapters[key];
            return (
              <section key={key} id={key} className="mb-16 scroll-mt-20">
                {/* Chapter heading */}
                <div className="text-center mb-10">
                  <div className="text-gold-500/60 text-2xl mb-4">❦</div>
                  <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl text-stone-100 mb-2">
                    {chapter.title}
                  </h2>
                  {chapter.subtitle && (
                    <p className="text-gold-400/80 italic text-base mt-2">
                      {chapter.subtitle}
                    </p>
                  )}
                  <div className="mt-4 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gold-600/50 to-transparent" />
                </div>

                {/* Chapter body */}
                <div className="text-[1.05rem] md:text-[1.1rem]">
                  {chapter.paragraphs.map((para: string, i: number) => (
                    <Paragraph key={i} text={para} />
                  ))}
                </div>
              </section>
            );
          })}

          {/* End Teaser */}
          <div className="text-center py-16 border-t border-stone-800/60">
            <div className="text-gold-500/60 text-3xl mb-6">⁂</div>
            <h3 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl text-stone-100 mb-4">
              Want to know what happens next?
            </h3>
            <p className="text-stone-400 text-lg mb-2 max-w-md mx-auto leading-relaxed">
              The story continues as Cassian returns to a kingdom that may not
              want him back — and a conspiracy that runs deeper than blood.
            </p>
            <p className="text-stone-500 italic mb-8">
              The Exile&rsquo;s Return — available now.
            </p>
            <a
              href="https://www.amazon.com/dp/B0GKXNCCXD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block btn-primary text-lg px-10 py-4 rounded-lg shadow-lg shadow-gold-900/20 hover:shadow-gold-800/30 transition-all hover:scale-105"
            >
              Continue Reading on Amazon
            </a>
          </div>
        </article>

        {/* Sticky bottom CTA (mobile) */}
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-stone-950/95 backdrop-blur-md border-t border-stone-800/60 p-3">
          <a
            href="https://www.amazon.com/dp/B0GKXNCCXD"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center btn-primary py-3 rounded-lg font-semibold text-base"
          >
            Continue Reading on Amazon →
          </a>
        </div>

        {/* Bottom padding for sticky CTA on mobile */}
        <div className="h-16 md:h-0" />
      </div>
    </>
  );
}
