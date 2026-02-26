"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const PLATFORM_OPTIONS = [
  "Amazon",
  "Goodreads",
  "BookBub",
  "Personal Blog",
  "BookTok (TikTok)",
  "Bookstagram (Instagram)",
  "BookTube (YouTube)",
  "Podcast",
  "Other",
];

const AUDIENCE_OPTIONS = [
  "Just starting out",
  "Under 500",
  "500 – 1K",
  "1K – 5K",
  "5K – 10K",
  "10K – 50K",
  "50K+",
];

const BOOK_OPTIONS = [
  "Book 1 only (start here)",
  "Books 1–3",
  "Books 1–5",
  "Complete series (all 8)",
];

const FORMAT_OPTIONS = ["ePub", "MOBI", "PDF", "Kindle delivery"];

const GENRE_OPTIONS = [
  "Epic Fantasy",
  "Dark Fantasy",
  "Grimdark",
  "Political Fantasy",
  "Military Fantasy",
  "General Fantasy",
  "Sci-Fi / Fantasy",
  "Other",
];

const REFERRAL_OPTIONS = [
  "Social media",
  "Blog outreach",
  "BookSirens",
  "StoryOrigin",
  "Author event",
  "Friend recommendation",
  "Search engine",
  "Other",
];

const books = [
  { number: 1, title: "The Exile's Return", cover: "/covers/valdrath/book1.jpg", available: true },
  { number: 2, title: "The Shadow's Reach", cover: "/covers/valdrath/book2.jpg", available: true },
  { number: 3, title: "The Crimson Throne", cover: "/covers/valdrath/book3.jpg", available: false },
  { number: 4, title: "The Iron Heir", cover: "/covers/valdrath/book4.jpg", available: false },
  { number: 5, title: "The Gathering Storm", cover: "/covers/valdrath/book5.jpg", available: false },
  { number: 6, title: "The Final Scar", cover: "/covers/valdrath/book6.jpg", available: false },
  { number: 7, title: "The Quiet Throne", cover: "/covers/valdrath/book7.jpg", available: false },
  { number: 8, title: "The Scarred Crown", cover: "/covers/valdrath/book8.jpg", available: false },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
  required,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
  required?: boolean;
}) {
  const toggle = (opt: string) => {
    onChange(
      selected.includes(opt)
        ? selected.filter((s) => s !== opt)
        : [...selected, opt]
    );
  };

  return (
    <fieldset>
      <legend className="block text-sm font-medium text-stone-300 mb-2">
        {label} {required && <span className="text-gold-500">*</span>}
      </legend>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {options.map((opt) => (
          <label
            key={opt}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all text-sm ${
              selected.includes(opt)
                ? "border-gold-500 bg-gold-500/10 text-gold-300"
                : "border-stone-700 bg-stone-900/50 text-stone-400 hover:border-stone-500"
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => toggle(opt)}
              className="sr-only"
            />
            <span
              className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${
                selected.includes(opt)
                  ? "bg-gold-500 border-gold-500"
                  : "border-stone-600"
              }`}
            >
              {selected.includes(opt) && (
                <svg className="w-3 h-3 text-stone-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            {opt}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ReviewersPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    platforms: [] as string[],
    profileLink: "",
    audienceSize: "",
    booksWanted: "",
    format: "",
    genres: [] as string[],
    referralSource: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/reviewer-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 md:p-12 max-w-lg text-center"
        >
          <div className="text-5xl mb-4">📚</div>
          <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl text-gold-400 mb-4">
            Request Received!
          </h2>
          <p className="text-stone-300 mb-4">
            Thank you! We&apos;ll review your request and send your copies within 24–48 hours. Check your email (and spam folder) for delivery details.
          </p>
          <p className="text-stone-400 text-sm mb-6">
            In the meantime, you can start reading Book 1 free on Kindle Unlimited.
          </p>
          <Link
            href="https://www.amazon.com/dp/B0GKXNCCXD"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            Read on Kindle Unlimited →
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900/80 to-stone-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08),transparent_60%)]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-4 font-medium">
              Review Copies Available
            </p>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl text-stone-100 mb-6 leading-tight">
              The Kingdom of{" "}
              <span className="gold-gradient">Valdrath</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto mb-8">
              Get free copies of Eva Noir&apos;s 8-book epic fantasy saga in exchange for an honest review
            </p>
            <a
              href="#request-form"
              className="btn-primary inline-block text-lg"
            >
              Request Your Free Copy
            </a>
          </motion.div>
        </div>
      </section>

      {/* Book Covers Row */}
      <section className="py-12 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-4 justify-center flex-wrap">
            {books.map((book) => (
              <motion.div
                key={book.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: book.number * 0.08 }}
                className="relative w-28 md:w-36 flex-shrink-0"
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg shadow-black/40 border border-stone-800/50">
                  <Image
                    src={book.cover}
                    alt={`Book ${book.number}: ${book.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 112px, 144px"
                  />
                  {!book.available && (
                    <div className="absolute inset-0 bg-stone-950/40 flex items-end justify-center pb-2">
                      <span className="text-xs text-stone-400 bg-stone-950/80 px-2 py-0.5 rounded">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-stone-400 text-center mt-2 leading-tight">
                  {book.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Series */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-stone-100 text-center mb-8">
              About the Series
            </h2>
            <div className="glass-card p-8 md:p-10">
              <blockquote className="text-xl md:text-2xl text-stone-200 italic text-center mb-6 font-[family-name:var(--font-heading)] leading-relaxed">
                &ldquo;Seven princes. One throne. A conspiracy that will destroy them all.&rdquo;
              </blockquote>
              <p className="text-stone-300 leading-relaxed mb-4">
                <strong className="text-stone-100">The Kingdom of Valdrath</strong> is a completed 8-book epic fantasy series
                following Cassian Stormborn — an exiled prince who returns home after twelve years to investigate his
                brother&apos;s murder. What he uncovers threatens to destroy everything.
              </p>
              <div className="flex flex-wrap gap-2 justify-center mt-6">
                <span className="text-gold-400 text-sm font-medium">For fans of:</span>
                {["Joe Abercrombie", "Robin Hobb", "Mark Lawrence"].map((author) => (
                  <span
                    key={author}
                    className="px-3 py-1 rounded-full bg-stone-800/60 text-stone-300 text-sm border border-stone-700/50"
                  >
                    {author}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {[
                  "Morally grey characters",
                  "Political intrigue",
                  "Family betrayal",
                  "Dark fantasy",
                  "Military conflict",
                  "Ancient magic",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs border border-gold-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Offer Reviewers */}
      <section className="py-16 md:py-20 bg-stone-900/30">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-stone-100 text-center mb-12">
              What We Offer Reviewers
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "📚",
                title: "Free Review Copies",
                desc: "Choose any or all 8 books in the series. Available in ePub, MOBI, or PDF format. Delivered within 24 hours of approval.",
              },
              {
                icon: "⭐",
                title: "No Strings Attached",
                desc: "We want honest reviews — positive, negative, or mixed. Your genuine reaction is what matters. No minimum star rating required.",
              },
              {
                icon: "🎁",
                title: "Extras for Creators",
                desc: "BookTok, Bookstagram, and BookTube creators: we can provide character art, series maps, discussion questions, and exclusive excerpts.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-6 md:p-8 text-center hover:border-gold-500/30 transition-colors"
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl text-gold-400 mb-3">
                  {card.title}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section id="request-form" className="py-16 md:py-24 scroll-mt-8">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-stone-100 text-center mb-3">
              Request Your Review Copy
            </h2>
            <p className="text-stone-400 text-center mb-10">
              Fill out the form below and we&apos;ll send your copies within 24–48 hours.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="glass-card p-6 md:p-10 space-y-6">
            {/* Name & Email */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-300 mb-1">
                  Name <span className="text-gold-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-stone-900/80 border border-stone-700 text-stone-200 placeholder-stone-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-300 mb-1">
                  Email <span className="text-gold-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-stone-900/80 border border-stone-700 text-stone-200 placeholder-stone-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Platforms */}
            <CheckboxGroup
              label="Review Platform(s)"
              options={PLATFORM_OPTIONS}
              selected={formData.platforms}
              onChange={(platforms) => setFormData({ ...formData, platforms })}
              required
            />

            {/* Profile Link */}
            <div>
              <label htmlFor="profileLink" className="block text-sm font-medium text-stone-300 mb-1">
                Profile / Channel Link <span className="text-gold-500">*</span>
              </label>
              <input
                id="profileLink"
                type="url"
                required
                value={formData.profileLink}
                onChange={(e) => setFormData({ ...formData, profileLink: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-stone-900/80 border border-stone-700 text-stone-200 placeholder-stone-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 transition-colors"
                placeholder="https://www.amazon.com/gp/profile/..."
              />
              <p className="text-xs text-stone-500 mt-1">
                Link to your Amazon reviewer profile, blog, TikTok, YouTube channel, etc.
              </p>
            </div>

            {/* Audience Size */}
            <div>
              <label htmlFor="audienceSize" className="block text-sm font-medium text-stone-300 mb-1">
                Approximate Audience Size
              </label>
              <select
                id="audienceSize"
                value={formData.audienceSize}
                onChange={(e) => setFormData({ ...formData, audienceSize: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-stone-900/80 border border-stone-700 text-stone-200 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 transition-colors"
              >
                <option value="">Select (optional)</option>
                {AUDIENCE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Books Wanted */}
            <div>
              <label htmlFor="booksWanted" className="block text-sm font-medium text-stone-300 mb-1">
                Which books do you want? <span className="text-gold-500">*</span>
              </label>
              <select
                id="booksWanted"
                required
                value={formData.booksWanted}
                onChange={(e) => setFormData({ ...formData, booksWanted: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-stone-900/80 border border-stone-700 text-stone-200 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 transition-colors"
              >
                <option value="">Select books</option>
                {BOOK_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Preferred Format */}
            <div>
              <label htmlFor="format" className="block text-sm font-medium text-stone-300 mb-1">
                Preferred Format <span className="text-gold-500">*</span>
              </label>
              <select
                id="format"
                required
                value={formData.format}
                onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-stone-900/80 border border-stone-700 text-stone-200 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 transition-colors"
              >
                <option value="">Select format</option>
                {FORMAT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Genres */}
            <CheckboxGroup
              label="Genres You Typically Review"
              options={GENRE_OPTIONS}
              selected={formData.genres}
              onChange={(genres) => setFormData({ ...formData, genres })}
            />

            {/* Referral Source */}
            <div>
              <label htmlFor="referralSource" className="block text-sm font-medium text-stone-300 mb-1">
                How did you find us?
              </label>
              <select
                id="referralSource"
                value={formData.referralSource}
                onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-stone-900/80 border border-stone-700 text-stone-200 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 transition-colors"
              >
                <option value="">Select (optional)</option>
                {REFERRAL_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-stone-300 mb-1">
                Anything else?
              </label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-stone-900/80 border border-stone-700 text-stone-200 placeholder-stone-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 transition-colors resize-none"
                placeholder="Special requests, content creator materials needed, etc."
              />
            </div>

            {/* Error Message */}
            {status === "error" && errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
                {errorMsg}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary w-full text-center text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending Request..." : "Request My Free Copies"}
            </button>

            <p className="text-xs text-stone-500 text-center">
              We respect your privacy. Your information is only used to deliver review copies and will never be shared.
            </p>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-stone-900/30">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl text-stone-100 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Do I have to leave a positive review?",
                a: "Absolutely not. We want honest reviews. Your genuine reaction — whether 2 stars or 5 — is valuable.",
              },
              {
                q: "Where should I post my review?",
                a: "Amazon and Goodreads are most helpful, but any platform works. Cross-posting to multiple platforms is appreciated but not required.",
              },
              {
                q: "How long do I have to read and review?",
                a: "We suggest 4–6 weeks, but there's no strict deadline. Life happens — just let us know if you need more time.",
              },
              {
                q: "Can I review just Book 1 first?",
                a: "Yes! Start with Book 1 and request more if you enjoy it. No pressure to commit to all 8 upfront.",
              },
              {
                q: "I'm a content creator. Do you provide materials?",
                a: "Yes! We can provide character art, series maps, discussion questions, comp title graphics, and exclusive excerpts. Just mention it in your request.",
              },
              {
                q: "Do you accept international reviewers?",
                a: "Yes, we welcome reviewers worldwide. We'll deliver digital copies in your preferred format.",
              },
            ].map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card group"
              >
                <summary className="px-6 py-4 cursor-pointer list-none flex items-center justify-between text-stone-200 hover:text-gold-400 transition-colors font-medium">
                  {faq.q}
                  <svg
                    className="w-5 h-5 text-stone-500 group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-stone-400 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-stone-400 mb-4">
            Questions about review copies?
          </p>
          <a
            href="mailto:poormanstocks@gmail.com"
            className="text-gold-400 hover:text-gold-300 transition-colors underline underline-offset-4"
          >
            poormanstocks@gmail.com
          </a>
          <div className="mt-8">
            <Link
              href="https://www.amazon.com/dp/B0GKXNCCXD"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-gold-400 text-sm transition-colors"
            >
              Read Book 1 free on Kindle Unlimited →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
