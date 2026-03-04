"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const REVIEW_LINKS = {
  book1Amazon: "https://www.amazon.com/review/create-review?asin=B0GKXNCCXD",
  book2Amazon: "https://www.amazon.com/review/create-review?asin=B0GL3YQFKS",
  goodreads: "https://www.goodreads.com/series/417498-the-kingdom-of-valdrath",
};

const reviewPrompts = {
  easy: [
    "What made you pick up this book?",
    "Would you recommend it? To who?",
    "How many stars and why?",
  ],
  fun: [
    "Which character stayed with you?",
    "Was there a scene you couldn't stop thinking about?",
    "Did the ending surprise you?",
    "What did you feel when you turned the last page?",
  ],
  specific: [
    "How was the world-building?",
    "Did the magic system intrigue you?",
    "How did you feel about the characters' choices?",
    "Would you read the next book?",
  ],
};

const templates = [
  {
    text: '"I picked up The Warrior Prince because ________. What kept me reading was ________. My favorite part was ________. I\'d give it ____ stars because ________."',
  },
  {
    text: '"If you like [similar book/author], you\'ll love this. The ________ was incredible and I couldn\'t put it down after ________."',
  },
  {
    text: '"Honestly? ________. That\'s my whole review. Read it."',
  },
];

const tips = {
  do: [
    { icon: "✅", text: "Be honest. Authentic > positive. A thoughtful 3-star review helps more than a vague 5-star." },
    { icon: "✅", text: 'Be specific. "I loved the magic system" beats "it was good."' },
    { icon: "✅", text: 'Mention the genre. ("Great for fans of dark fantasy / epic fantasy / grimdark")' },
    { icon: "✅", text: "No spoilers (or warn first). Respect the next reader's experience." },
    { icon: "✅", text: "Star ratings matter. Even without words, stars help with rankings." },
  ],
  dont: [
    { icon: "❌", text: "Don't summarize the whole plot — the description already does that." },
    { icon: "❌", text: "Don't worry about grammar or polish — just be real." },
  ],
};

function SectionFade({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ReviewPageClient() {
  const [activeTab, setActiveTab] = useState<"easy" | "fun" | "specific">("easy");

  return (
    <div className="min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/20 py-20 lg:py-28">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gold-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gold-600/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-gold-500/3 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <SectionFade>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-500">
              Thank You for Reading
            </p>
            <h1 className="mt-6 font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              You Finished The Warrior Prince.{" "}
              <span className="gold-gradient">The Prince Isn&apos;t Finished With You.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-400 leading-relaxed">
              If this story stayed with you — if you&apos;re still thinking about the betrayal,
              the magic, the ending — then you already have something to say.
            </p>
            <p className="mt-4 text-xl font-medium text-stone-200">
              A review is just that feeling, written down.
            </p>
            <div className="mt-10">
              <a
                href="#leave-review"
                className="btn-primary inline-block rounded-lg px-8 py-4 text-lg font-semibold shadow-lg shadow-gold-500/20 transition-all hover:shadow-gold-500/30"
              >
                Leave Your Review ↓
              </a>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* ── Why Your Review Matters ── */}
      <section className="border-y border-stone-800/50 bg-stone-900/30 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <SectionFade className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/10 text-gold-400">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
              </svg>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl">
              Every Review Is a <span className="gold-gradient">Signal Fire</span>
            </h2>
          </SectionFade>

          <SectionFade className="mx-auto mt-8 max-w-3xl">
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  icon: "📖",
                  title: "For the Next Reader",
                  desc: "It tells them: this book is worth your time.",
                },
                {
                  icon: "📊",
                  title: "For the Algorithm",
                  desc: "It says: show this to more people who'd love it.",
                },
                {
                  icon: "✍️",
                  title: "For Me",
                  desc: "It says: keep writing. Your voice matters.",
                },
              ].map((item) => (
                <div key={item.title} className="glass-card rounded-xl p-6 text-center">
                  <span className="text-3xl">{item.icon}</span>
                  <h3 className="mt-3 font-[family-name:var(--font-heading)] text-lg font-semibold text-stone-100">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-400">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-stone-400 leading-relaxed">
              I&apos;m an indie author. I don&apos;t have a Big Five publisher running ads. I have{" "}
              <strong className="text-stone-200">you.</strong> Your voice is my marketing department,
              my billboard, my word-of-mouth. One honest review from a real reader outweighs a
              thousand paid promotions.
            </p>
            <p className="mt-4 text-center text-sm text-gold-500/80 font-medium">
              You don&apos;t need to be a professional reviewer. You just need to have read the book
              and felt something.
            </p>
          </SectionFade>
        </div>
      </section>

      {/* ── One-Click Review Buttons ── */}
      <section id="leave-review" className="py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionFade className="text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl">
              Leave Your Review
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-stone-400">
              It takes 2 minutes. Pick your platform and your book:
            </p>
          </SectionFade>

          <SectionFade className="mx-auto mt-12 max-w-3xl">
            {/* Book 1 */}
            <div className="glass-card overflow-hidden rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <div className="flex-shrink-0">
                  <Image
                    src="/covers/valdrath/book1.jpg"
                    alt="The Exile's Return — Book 1"
                    width={120}
                    height={180}
                    className="rounded-lg shadow-lg shadow-black/40"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-500">
                    Book 1
                  </p>
                  <h3 className="mt-1 font-[family-name:var(--font-heading)] text-xl font-bold text-stone-100 sm:text-2xl">
                    The Exile&apos;s Return
                  </h3>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={REVIEW_LINKS.book1Amazon}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-semibold shadow-lg shadow-gold-500/20 transition-all hover:shadow-gold-500/30"
                    >
                      <span>⭐</span> Review on Amazon
                    </a>
                    <a
                      href={REVIEW_LINKS.goodreads}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-700 px-6 py-3 text-base font-medium text-stone-300 transition-all hover:border-gold-500/50 hover:text-gold-400"
                    >
                      <span>📚</span> Review on Goodreads
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Book 2 */}
            <div className="glass-card mt-6 overflow-hidden rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <div className="flex-shrink-0">
                  <Image
                    src="/covers/valdrath/book2.jpg"
                    alt="The Shadow's Reach — Book 2"
                    width={120}
                    height={180}
                    className="rounded-lg shadow-lg shadow-black/40"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-500">
                    Book 2
                  </p>
                  <h3 className="mt-1 font-[family-name:var(--font-heading)] text-xl font-bold text-stone-100 sm:text-2xl">
                    The Shadow&apos;s Reach
                  </h3>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={REVIEW_LINKS.book2Amazon}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-semibold shadow-lg shadow-gold-500/20 transition-all hover:shadow-gold-500/30"
                    >
                      <span>⭐</span> Review on Amazon
                    </a>
                    <a
                      href={REVIEW_LINKS.goodreads}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-700 px-6 py-3 text-base font-medium text-stone-300 transition-all hover:border-gold-500/50 hover:text-gold-400"
                    >
                      <span>📚</span> Review on Goodreads
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-stone-500">
              <strong className="text-stone-400">Pro tip:</strong> Post on both Amazon AND Goodreads
              for maximum impact. You can copy-paste the same review.
            </p>
          </SectionFade>
        </div>
      </section>

      {/* ── Don't Know What to Write? ── */}
      <section className="border-y border-stone-800/50 bg-stone-900/30 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <SectionFade className="text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl">
              &ldquo;But I Don&apos;t Know{" "}
              <span className="gold-gradient">What to Write</span>&rdquo;
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-stone-400">
              That&apos;s normal. Here&apos;s a secret:{" "}
              <strong className="text-stone-200">
                the best reviews aren&apos;t literary criticism. They&apos;re personal reactions.
              </strong>
            </p>
            <p className="mx-auto mt-2 max-w-lg text-sm text-stone-500">
              You don&apos;t need to write an essay. Just answer one or two of these:
            </p>
          </SectionFade>

          {/* Tabbed prompts */}
          <SectionFade className="mx-auto mt-10 max-w-2xl">
            <div className="flex justify-center gap-2">
              {(["easy", "fun", "specific"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    activeTab === tab
                      ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                      : "text-stone-500 hover:text-stone-300 border border-transparent"
                  }`}
                >
                  {tab === "easy" ? "🎯 The Easy Ones" : tab === "fun" ? "🎭 The Fun Ones" : "🔍 The Specific Ones"}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <div className="glass-card rounded-xl p-6">
                <ul className="space-y-3">
                  {reviewPrompts[activeTab].map((prompt, i) => (
                    <li key={i} className="flex items-start gap-3 text-stone-300">
                      <span className="mt-0.5 text-gold-500">•</span>
                      <span>{prompt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </SectionFade>

          {/* Templates */}
          <SectionFade className="mx-auto mt-12 max-w-2xl">
            <h3 className="text-center font-[family-name:var(--font-heading)] text-xl font-bold text-stone-100">
              Fill-in-the-Blank Templates
            </h3>
            <p className="mt-2 text-center text-sm text-stone-500">
              Seriously — just fill in the blanks and post it.
            </p>
            <div className="mt-6 space-y-4">
              {templates.map((t, i) => (
                <div key={i} className="glass-card rounded-xl p-5">
                  <p className="text-sm italic leading-relaxed text-stone-400">{t.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 glass-card rounded-xl p-5 text-center border border-gold-500/20">
              <p className="text-stone-300 font-medium">
                Length doesn&apos;t matter.
              </p>
              <p className="mt-2 text-sm text-stone-400">
                Two sentences is a review. A paragraph is a review. A single line that says{" "}
                <em className="text-gold-400">&ldquo;This book wrecked me, 5 stars&rdquo;</em> is a
                review. It all counts.
              </p>
            </div>
          </SectionFade>

          {/* Tips */}
          <SectionFade className="mx-auto mt-12 max-w-2xl">
            <h3 className="text-center font-[family-name:var(--font-heading)] text-xl font-bold text-stone-100">
              Quick Guide to Great Reviews
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="glass-card rounded-xl p-5">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-green-400">Do</h4>
                <ul className="mt-3 space-y-2">
                  {tips.do.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-stone-400">
                      <span className="flex-shrink-0">{tip.icon}</span>
                      <span>{tip.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card rounded-xl p-5">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-red-400">Don&apos;t</h4>
                <ul className="mt-3 space-y-2">
                  {tips.dont.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-stone-400">
                      <span className="flex-shrink-0">{tip.icon}</span>
                      <span>{tip.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionFade>
        </div>
      </section>

      {/* ── Already Left a Review? (Post-Review CTAs) ── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <SectionFade className="text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl">
              Already Left a Review?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-stone-400">
              <strong className="text-stone-200">Thank you.</strong> Genuinely. You just did more
              for this book than any ad ever could.
            </p>
            <p className="mt-2 text-stone-500">Want to go further?</p>
          </SectionFade>

          <SectionFade className="mx-auto mt-10 max-w-2xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: "📲",
                  title: "Share on Social Media",
                  desc: "Post your review, tag @evanoir, use #WarriorPrinceSaga",
                  href: "https://twitter.com/intent/tweet?text=Just%20finished%20The%20Warrior%20Prince%20by%20Eva%20Noir%20%E2%80%94%20incredible%20dark%20fantasy!%20%23WarriorPrinceSaga&url=https://bookcreed.com",
                  external: true,
                },
                {
                  icon: "💬",
                  title: "Tell a Friend",
                  desc: '"You should read this" is the most powerful marketing in the world',
                  href: undefined,
                  external: false,
                },
                {
                  icon: "📧",
                  title: "Join the Inner Circle",
                  desc: "Get Book 2 early access, exclusive content, and behind-the-scenes updates",
                  href: "/newsletter",
                  external: false,
                },
                {
                  icon: "⭐",
                  title: "Cross-Post Your Review",
                  desc: "If you reviewed on Amazon, paste it on Goodreads too (and vice versa)",
                  href: REVIEW_LINKS.goodreads,
                  external: true,
                },
              ].map((item) => (
                <div key={item.title} className="glass-card rounded-xl p-6">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="mt-3 font-[family-name:var(--font-heading)] text-lg font-semibold text-stone-100">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-400">{item.desc}</p>
                  {item.href && (
                    item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-sm font-medium text-gold-500 hover:text-gold-400 transition-colors"
                      >
                        Go →
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="mt-3 inline-block text-sm font-medium text-gold-500 hover:text-gold-400 transition-colors"
                      >
                        Go →
                      </Link>
                    )
                  )}
                </div>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* ── Eva Noir's Personal Note ── */}
      <section className="border-t border-stone-800/50 bg-gradient-to-br from-stone-900 to-amber-950/10 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <SectionFade>
            <div className="glass-card relative overflow-hidden rounded-2xl p-8 sm:p-10">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold-500/8 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-gold-600/5 blur-3xl" />

              <div className="relative z-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-500">
                  A Note From the Author
                </p>
                <h2 className="mt-4 font-[family-name:var(--font-heading)] text-2xl font-bold sm:text-3xl">
                  From Eva, With Gratitude
                </h2>

                <div className="mt-6 space-y-4 text-stone-400 leading-relaxed">
                  <p>
                    I wrote <em>The Warrior Prince</em> in the hours between midnight and dawn,
                    fueled by the belief that dark stories can carry light inside them.
                  </p>
                  <p>
                    Every time someone reads it — really reads it — a piece of that midnight work
                    becomes real. Your review isn&apos;t just feedback. It&apos;s proof that the
                    story landed. That it mattered to someone besides me.
                  </p>
                  <p>
                    So if you have sixty seconds and something to say: say it. The Warrior
                    Prince&apos;s story continues because of readers like you.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <Image
                    src="/covers/valdrath/book1.jpg"
                    alt="Eva Noir"
                    width={48}
                    height={48}
                    className="rounded-full object-cover shadow-md"
                  />
                  <div>
                    <p className="font-[family-name:var(--font-heading)] text-lg font-bold text-stone-100">
                      With gratitude and shadows,
                    </p>
                    <p className="text-gold-400 font-medium">Eva Noir 🖤</p>
                  </div>
                </div>
              </div>
            </div>
          </SectionFade>

          {/* Final CTA */}
          <SectionFade className="mt-12 text-center">
            <p className="text-stone-500">Ready?</p>
            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={REVIEW_LINKS.book1Amazon}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 rounded-lg px-8 py-4 text-lg font-semibold shadow-lg shadow-gold-500/20"
              >
                ⭐ Review Book 1
              </a>
              <a
                href={REVIEW_LINKS.book2Amazon}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 rounded-lg px-8 py-4 text-lg font-semibold shadow-lg shadow-gold-500/20"
              >
                ⭐ Review Book 2
              </a>
            </div>
            <p className="mt-6 text-sm text-stone-600">
              bookcreed.com/review — share this link with fellow readers
            </p>
          </SectionFade>
        </div>
      </section>
    </div>
  );
}
