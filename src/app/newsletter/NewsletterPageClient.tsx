"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const newsletterBenefits = [
  {
    icon: "📚",
    title: "First Access to New Books",
    desc: "Be the first to know when new Kingdom of Valdrath books are released.",
  },
  {
    icon: "✍️",
    title: "Behind-the-Scenes Insights",
    desc: "Get exclusive peeks into Eva's writing process and world-building decisions.",
  },
  {
    icon: "🎁",
    title: "Exclusive Bonus Content",
    desc: "Access deleted scenes, character backstories, and content you won't find anywhere else.",
  },
  {
    icon: "🗺️",
    title: "Deep Lore & World-Building",
    desc: "Explore the rich history of Valdrath with detailed lore articles and expanded timelines.",
  },
  {
    icon: "⚡",
    title: "Early Access & Previews",
    desc: "Read sample chapters and excerpts before they're available to the public.",
  },
  {
    icon: "💬",
    title: "Direct Connection with Eva",
    desc: "Get answers to your questions and participate in exclusive Q&A sessions.",
  },
];

function RevealDiv({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function NewsletterPageClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), source: "newsletter" }),
      });

      const data = await res.json();

      if (!res.ok) {
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
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Eva Noir's Newsletter",
            description:
              "Join Eva Noir's newsletter for exclusive Kingdom of Valdrath content, behind-the-scenes insights, and early access to new releases.",
            url: "https://bookcreed.com/newsletter",
            author: { "@type": "Person", name: "Eva Noir" },
          }),
        }}
      />

      <div className="min-h-screen bg-stone-950">
        {/* Hero */}
        <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(245,158,11,0.15),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_80%,rgba(180,83,9,0.08),transparent)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="inline-block rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
                Join the Kingdom
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-6 font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
            >
              Join{" "}
              <span className="gold-gradient">Eva Noir's Newsletter</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-lg leading-relaxed text-stone-300 sm:text-xl"
            >
              Get exclusive <strong>Kingdom of Valdrath</strong> content, behind-the-scenes insights, 
              early access to new releases, and bonus scenes delivered straight to your inbox.
            </motion.p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <RevealDiv className="text-center">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white sm:text-4xl">
                What You'll Get
              </h2>
              <p className="mt-4 text-lg text-stone-400">
                Join thousands of readers in the inner circle
              </p>
            </RevealDiv>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {newsletterBenefits.map((benefit, i) => (
                <RevealDiv key={benefit.title} delay={i * 0.1}>
                  <div className="group relative rounded-2xl border border-stone-800/60 bg-gradient-to-b from-stone-800/20 to-stone-900/40 p-6 backdrop-blur-sm transition-all hover:border-gold-500/30 hover:bg-gradient-to-b hover:from-stone-800/30 hover:to-stone-900/50">
                    <div className="text-3xl mb-4">{benefit.icon}</div>
                    <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-white group-hover:text-gold-300">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-stone-400">{benefit.desc}</p>
                  </div>
                </RevealDiv>
              ))}
            </div>
          </div>
        </section>

        {/* Signup Form */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-2xl px-6">
            <RevealDiv className="text-center">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white sm:text-4xl">
                Ready to Join the Kingdom?
              </h2>
              <p className="mt-4 text-lg text-stone-400">
                Enter your details below and you'll be part of Eva Noir's inner circle
              </p>
            </RevealDiv>

            <RevealDiv delay={0.2} className="mt-12">
              {status === "success" ? (
                <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center backdrop-blur-sm">
                  <div className="mx-auto w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                    <span className="text-2xl text-green-400">✓</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">Welcome to the Kingdom!</h3>
                  <p className="mt-2 text-stone-300">
                    Check your email for a welcome message from Eva Noir. We're thrilled to have you aboard!
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-stone-800/60 bg-gradient-to-b from-stone-800/20 to-stone-900/40 p-8 backdrop-blur-sm">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-stone-300 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-stone-700 bg-stone-800/50 px-4 py-3 text-white placeholder-stone-400 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                        placeholder="Enter your name"
                        required
                        disabled={status === "loading"}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-stone-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-stone-700 bg-stone-800/50 px-4 py-3 text-white placeholder-stone-400 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
                        placeholder="Enter your email"
                        required
                        disabled={status === "loading"}
                      />
                    </div>

                    {errorMsg && (
                      <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-red-300 text-sm">
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full rounded-lg bg-gradient-to-r from-gold-600 to-gold-500 px-6 py-4 font-semibold text-stone-900 transition-all hover:from-gold-500 hover:to-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-stone-950 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? "Joining..." : "Join the Newsletter"}
                    </button>

                    <p className="text-xs text-stone-400 text-center">
                      No spam, ever. Unsubscribe anytime. We respect your privacy.
                    </p>
                  </form>
                </div>
              )}
            </RevealDiv>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <RevealDiv>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white sm:text-4xl">
                Haven't Started Reading Yet?
              </h2>
              <p className="mt-4 text-lg text-stone-400">
                Dive into the Kingdom of Valdrath with the first three chapters — completely free.
              </p>
              <div className="mt-8">
                <a
                  href="/read/book-1"
                  className="inline-flex rounded-lg border border-gold-500/30 bg-transparent px-8 py-3 font-semibold text-gold-400 transition-all hover:border-gold-400 hover:bg-gold-500/10 hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-stone-950"
                >
                  Read the First 3 Chapters Free
                </a>
              </div>
            </RevealDiv>
          </div>
        </section>
      </div>
    </>
  );
}