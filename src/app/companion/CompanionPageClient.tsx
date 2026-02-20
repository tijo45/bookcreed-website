"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";

const guideFeatures = [
  {
    icon: "🗡️",
    title: "Character Profiles",
    desc: "Deep dives into every major character — their motivations, secrets, and allegiances.",
  },
  {
    icon: "🗺️",
    title: "Kingdom Map",
    desc: "A beautifully detailed map of Valdrath and its surrounding territories.",
  },
  {
    icon: "📜",
    title: "Timeline of Events",
    desc: "From the founding of the kingdom to the present — every major event charted.",
  },
  {
    icon: "📖",
    title: "Glossary of Terms",
    desc: "Places, titles, artifacts, and terminology explained and cross-referenced.",
  },
  {
    icon: "👑",
    title: "Royal Family Tree",
    desc: "Trace the lineage of every royal house and see how the bloodlines intertwine.",
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

export function CompanionPageClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), source: "companion" }),
      });

      const data = await res.json();

      if (!res.ok) {
        // If already signed up, still redirect to thanks
        if (res.status === 409) {
          router.push("/companion/thanks");
          return;
        }
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
        return;
      }

      router.push("/companion/thanks");
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
            name: "The Valdrath Companion Guide",
            description:
              "Free companion guide to The Kingdom of Valdrath series by Eva Noir. Character profiles, maps, timelines, and more.",
            url: "https://bookcreed.com/companion",
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
                100% Free
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-6 font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
            >
              Get the{" "}
              <span className="gold-gradient">FREE</span> Companion Guide to{" "}
              <span className="gold-gradient">The Kingdom of Valdrath</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mx-auto mt-6 max-w-xl text-lg text-stone-400"
            >
              Everything you need to navigate the world of Valdrath — character
              profiles, maps, timelines, and more. Delivered straight to your
              inbox.
            </motion.p>
          </div>
        </section>

        {/* What's Inside */}
        <section className="mx-auto max-w-5xl px-6 pb-20">
          <RevealDiv className="text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold sm:text-3xl">
              What&rsquo;s Inside the <span className="gold-gradient">Guide</span>
            </h2>
            <p className="mt-3 text-stone-400">
              Your ultimate reference for the Kingdom of Valdrath series.
            </p>
          </RevealDiv>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guideFeatures.map((feature, i) => (
              <RevealDiv key={feature.title} delay={i * 0.08}>
                <div className="glass-card flex h-full flex-col items-center p-6 text-center">
                  <span className="text-4xl">{feature.icon}</span>
                  <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-semibold text-stone-100">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-400">{feature.desc}</p>
                </div>
              </RevealDiv>
            ))}
          </div>
        </section>

        {/* Signup Form */}
        <section className="mx-auto max-w-xl px-6 pb-24">
          <RevealDiv>
            <div className="glass-card relative overflow-hidden p-8 sm:p-10">
              {/* Glow effect */}
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-500/10 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-gold-600/5 blur-3xl" />

              <div className="relative z-10">
                <h2 className="text-center font-[family-name:var(--font-heading)] text-2xl font-bold sm:text-3xl">
                  Claim Your <span className="gold-gradient">Free Guide</span>
                </h2>
                <p className="mt-3 text-center text-sm text-stone-400">
                  Enter your details and we&rsquo;ll send it right over.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-stone-300">
                      First Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your first name"
                      className="w-full rounded-lg border border-stone-700 bg-stone-900/80 px-4 py-3 text-stone-200 placeholder:text-stone-600 focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/30"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-stone-300">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-stone-700 bg-stone-900/80 px-4 py-3 text-stone-200 placeholder:text-stone-600 focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/30"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-400">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary w-full rounded-lg py-3.5 text-base disabled:opacity-60"
                  >
                    {status === "loading" ? "Sending..." : "Send Me the Guide →"}
                  </button>
                </form>

                <p className="mt-4 text-center text-xs text-stone-500">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </RevealDiv>

          {/* Social proof */}
          <RevealDiv delay={0.2} className="mt-8 text-center">
            <p className="text-sm text-stone-500">
              <span className="text-gold-500">✦</span>{" "}
              Join fellow readers exploring the Kingdom of Valdrath{" "}
              <span className="text-gold-500">✦</span>
            </p>
          </RevealDiv>
        </section>
      </div>
    </>
  );
}
