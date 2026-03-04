"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const AMAZON_LINK = "https://www.amazon.com/dp/B0GKXNCCXD";

const faqs = [
  {
    q: "Is this really free?",
    a: "Yes! The Exile's Return is available free on Kindle Unlimited, and we periodically run free Kindle promotions. No strings attached — just grab your copy and enjoy.",
  },
  {
    q: "How long do I have to leave a review?",
    a: "Take your time! We'd love a review within 2–4 weeks of reading, but there's no hard deadline. Whenever you finish, head to Amazon and share your honest thoughts.",
  },
  {
    q: "What format is the book in?",
    a: "The free copy is available as a Kindle eBook on Amazon. You can read it on any Kindle device, the free Kindle app on your phone/tablet, or Kindle Cloud Reader in your browser.",
  },
  {
    q: "Can I review on Goodreads too?",
    a: "Absolutely! We'd love reviews on Goodreads, BookBub, or anywhere else you share book recommendations. Amazon is the most impactful for us, but every review helps.",
  },
];

export function ReviewPageClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-40px" });

  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "-40px" });

  const faqRef = useRef<HTMLDivElement>(null);
  const faqInView = useInView(faqRef, { once: true, margin: "-40px" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          source: "review-page",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setStatus("success");
          setName("");
          setEmail("");
          return;
        }
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/20 py-20 lg:py-28">
        {/* Background glow */}
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gold-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gold-600/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="grid gap-12 lg:grid-cols-2 lg:items-center"
          >
            {/* Left: Text */}
            <div className="text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-500">
                Limited Time Offer
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Love Fantasy?{" "}
                <span className="gold-gradient">Get a FREE Copy</span> of The
                Exile&apos;s Return
              </h1>
              <p className="mt-6 text-lg text-stone-400 leading-relaxed">
                A prince stripped of his birthright. A kingdom rotting from
                within. When Cassian Valdrath returns from exile, he finds his
                homeland on the brink of collapse — and the only way to save it
                may cost him everything.
              </p>
              <p className="mt-4 text-base text-stone-500">
                Book 1 of <em>The Kingdom of Valdrath</em> — an 8-book epic
                fantasy saga by Eva Noir.
              </p>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <a
                  href={AMAZON_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary rounded-lg px-8 py-4 text-lg font-semibold shadow-lg shadow-gold-500/20 transition-all hover:shadow-gold-500/30"
                >
                  Get Your Free Copy →
                </a>
                <a
                  href="#signup"
                  className="rounded-lg border border-stone-700 px-6 py-4 text-base font-medium text-stone-300 transition-all hover:border-gold-500/50 hover:text-gold-400"
                >
                  Join the ARC Team
                </a>
              </div>
            </div>

            {/* Right: Cover Image */}
            <div className="flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={heroInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-gold-500/20 via-transparent to-gold-600/10 blur-xl" />
                <Image
                  src="/covers/valdrath/book1.jpg"
                  alt="The Exile's Return — Book 1 cover"
                  width={400}
                  height={600}
                  className="relative rounded-lg shadow-2xl shadow-black/50"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Ask Section */}
      <section className="border-y border-stone-800/50 bg-stone-900/30 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/10 text-gold-400">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl">
              All We Ask in Return
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-stone-400">
              Leave an <strong className="text-stone-200">honest review on Amazon</strong> after
              reading. That&apos;s it. Good, bad, or in between — your genuine opinion
              helps other readers discover the series and helps us improve.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                {
                  icon: "📖",
                  title: "1. Get the Book",
                  desc: "Grab your free Kindle copy from Amazon",
                },
                {
                  icon: "⚔️",
                  title: "2. Read & Enjoy",
                  desc: "Dive into the world of Valdrath at your own pace",
                },
                {
                  icon: "⭐",
                  title: "3. Leave a Review",
                  desc: "Share your honest thoughts on Amazon",
                },
              ].map((step) => (
                <div
                  key={step.title}
                  className="glass-card rounded-xl p-6 text-center"
                >
                  <span className="text-3xl">{step.icon}</span>
                  <h3 className="mt-3 font-[family-name:var(--font-heading)] text-lg font-semibold text-stone-100">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-400">{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ARC Signup Section */}
      <section id="signup" className="py-20">
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 30 }}
          animate={formInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl px-6"
        >
          <div className="glass-card relative overflow-hidden p-8 sm:p-10">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold-500/8 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-gold-600/5 blur-3xl" />

            <div className="relative z-10 text-center">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold sm:text-3xl">
                Join the <span className="gold-gradient">ARC Team</span>
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-stone-400">
                Sign up to receive free advance review copies of upcoming books
                in the series. Be the first to read new installments before
                anyone else.
              </p>

              <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md">
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    disabled={status === "loading"}
                    className="w-full rounded-lg border border-stone-700 bg-stone-900/80 px-4 py-3 text-stone-200 placeholder:text-stone-600 focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/30 disabled:opacity-50"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    disabled={status === "loading"}
                    className="w-full rounded-lg border border-stone-700 bg-stone-900/80 px-4 py-3 text-stone-200 placeholder:text-stone-600 focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/30 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary rounded-lg px-6 py-3 text-base font-semibold disabled:opacity-60"
                  >
                    {status === "loading"
                      ? "Signing Up..."
                      : "Sign Up for Free Review Copies"}
                  </button>
                </div>

                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-sm text-green-400"
                  >
                    ✨ You&apos;re on the list! We&apos;ll email you when the
                    next book is ready for review.
                  </motion.p>
                )}

                {status === "error" && (
                  <p className="mt-4 text-sm text-red-400">{errorMsg}</p>
                )}
              </form>

              <p className="mt-4 text-xs text-stone-500">
                No spam, ever. Unsubscribe with one click.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Placeholder */}
      <section className="border-t border-stone-800/50 bg-stone-900/20 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold sm:text-3xl">
              What Readers Are Saying
            </h2>
            <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="glass-card rounded-xl p-6 text-center"
                >
                  <div className="flex justify-center gap-1 text-gold-400">
                    {[...Array(5)].map((_, j) => (
                      <svg
                        key={j}
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-4 text-sm italic text-stone-400">
                    Reviews coming soon!
                  </p>
                  <p className="mt-2 text-xs text-stone-600">— Reader {i}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-stone-500">
              Be one of the first to leave a review and see your name here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <motion.div
          ref={faqRef}
          initial={{ opacity: 0, y: 30 }}
          animate={faqInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl px-6"
        >
          <h2 className="text-center font-[family-name:var(--font-heading)] text-2xl font-bold sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glass-card overflow-hidden rounded-xl"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-stone-800/30"
                >
                  <span className="font-medium text-stone-200">
                    {faq.q}
                  </span>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-gold-400 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-stone-800/50 px-6 pb-5 pt-4"
                  >
                    <p className="text-stone-400">{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-stone-800/50 bg-gradient-to-br from-stone-900 to-amber-950/10 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold sm:text-3xl">
            Ready to Enter the{" "}
            <span className="gold-gradient">Kingdom of Valdrath</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-stone-400">
            Grab your free copy of The Exile&apos;s Return and discover why
            readers are calling it &quot;Game of Thrones meets The Count of
            Monte Cristo.&quot;
          </p>
          <a
            href={AMAZON_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 inline-block rounded-lg px-8 py-4 text-lg font-semibold shadow-lg shadow-gold-500/20"
          >
            Get Your Free Copy on Amazon →
          </a>
        </div>
      </section>
    </div>
  );
}
