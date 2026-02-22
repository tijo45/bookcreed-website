"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import Link from "next/link";
import type { Metadata } from "next";

const benefits = [
  {
    icon: "📚",
    title: "First to Know",
    desc: "Get notified the moment new Valdrath books are available, before anyone else.",
  },
  {
    icon: "✍️",
    title: "Behind the Scenes",
    desc: "Exclusive insights into Eva Noir's writing process, character development, and world-building.",
  },
  {
    icon: "🎁",
    title: "Exclusive Content",
    desc: "Subscriber-only short stories, character backstories, and bonus scenes you won't find anywhere else.",
  },
  {
    icon: "🗺️",
    title: "World Expansion",
    desc: "Deep dives into Valdrath's history, hidden lore, and the stories behind the stories.",
  },
  {
    icon: "💬",
    title: "Direct Access",
    desc: "Join a community of passionate readers and get your questions answered by Eva herself.",
  },
  {
    icon: "⚡",
    title: "Early Access",
    desc: "Be among the first to read sample chapters, cover reveals, and special announcements.",
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

export default function NewsletterPage() {
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
              "Join Eva Noir's newsletter for exclusive updates on The Kingdom of Valdrath series, behind-the-scenes content, and early access to new releases.",
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

          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="inline-block rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
                Newsletter
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-6 font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
            >
              Join Eva Noir's{" "}
              <span className="gold-gradient">Kingdom</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-stone-400 sm:text-xl"
            >
              Get exclusive updates, behind-the-scenes content, and early access to new releases. 
              Join thousands of readers in Eva Noir's inner circle.
            </motion.p>
          </div>
        </section>

        {/* What You'll Get */}
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <RevealDiv className="text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl">
              What You'll <span className="gold-gradient">Receive</span>
            </h2>
            <p className="mt-3 text-stone-400">
              Exclusive content and updates delivered straight to your inbox.
            </p>
          </RevealDiv>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <RevealDiv key={benefit.title} delay={i * 0.08}>
                <div className="glass-card flex h-full flex-col p-6">
                  <div className="flex items-center">
                    <span className="text-2xl">{benefit.icon}</span>
                    <h3 className="ml-3 font-[family-name:var(--font-heading)] text-lg font-semibold text-stone-100">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-stone-400">{benefit.desc}</p>
                </div>
              </RevealDiv>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <NewsletterSignup variant="hero" className="pb-12" />

        {/* Testimonial/Social Proof */}
        <RevealDiv className="mx-auto max-w-4xl px-6 pb-20">
          <div className="glass-card relative overflow-hidden p-8 sm:p-12 text-center">
            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-gold-500/8 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-gold-600/5 blur-3xl" />
            
            <div className="relative z-10">
              <blockquote className="text-lg text-stone-300 italic">
                "Eva Noir's newsletter is like getting a private letter from the Kingdom of Valdrath itself. 
                The behind-the-scenes insights make me appreciate the books even more."
              </blockquote>
              <cite className="mt-4 block text-sm text-stone-500">
                — Sarah M., longtime Valdrath reader
              </cite>
            </div>
          </div>
        </RevealDiv>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-6 pb-24">
          <RevealDiv className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold sm:text-3xl">
              Frequently <span className="gold-gradient">Asked Questions</span>
            </h2>
          </RevealDiv>

          <div className="space-y-6">
            {[
              {
                q: "How often will I receive emails?",
                a: "You'll hear from us 1-2 times per month with major updates, plus occasional special announcements for new releases or exclusive content."
              },
              {
                q: "Is this different from the Companion Guide signup?",
                a: "Yes! The Companion Guide is a one-time free download. This newsletter provides ongoing updates, exclusive content, and behind-the-scenes insights."
              },
              {
                q: "Can I unsubscribe anytime?",
                a: "Absolutely. Every email includes an easy one-click unsubscribe link. No questions asked."
              },
              {
                q: "Will my email be shared with third parties?",
                a: "Never. Your email stays with us and is used exclusively for newsletter updates from Eva Noir and Book Creed."
              }
            ].map((faq, i) => (
              <RevealDiv key={i} delay={i * 0.1}>
                <div className="glass-card p-6">
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-stone-200 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-stone-400 text-sm">
                    {faq.a}
                  </p>
                </div>
              </RevealDiv>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mx-auto max-w-3xl px-6 pb-24">
          <RevealDiv>
            <div className="glass-card p-8 text-center">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold">
                Ready to Join the <span className="gold-gradient">Kingdom</span>?
              </h2>
              <p className="mt-3 text-stone-400 mb-6">
                Start receiving exclusive content and updates today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="#signup"
                  className="btn-primary rounded-lg px-8 py-3 inline-block text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('input[type="email"]')?.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                      (document.querySelector('input[type="email"]') as HTMLInputElement)?.focus();
                    }, 500);
                  }}
                >
                  Sign Me Up
                </Link>
                <Link
                  href="/series/kingdom-of-valdrath"
                  className="rounded-lg border border-stone-700 px-8 py-3 text-stone-300 hover:border-gold-500/50 hover:text-gold-400 transition-colors inline-block text-center"
                >
                  Read the Books First
                </Link>
              </div>
            </div>
          </RevealDiv>
        </section>
      </div>
    </>
  );
}