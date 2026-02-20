"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CompanionCTAProps {
  variant?: "banner" | "inline";
}

export function CompanionCTA({ variant = "banner" }: CompanionCTAProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  if (variant === "inline") {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="my-12 text-center"
      >
        <div className="glass-card mx-auto max-w-md p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gold-500">
            Free Download
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-heading)] text-xl font-bold text-stone-100">
            The Valdrath Companion Guide
          </h3>
          <p className="mt-2 text-sm text-stone-400">
            Character profiles, maps, timelines & the royal family tree.
          </p>
          <Link
            href="/companion"
            className="mt-4 inline-block btn-primary rounded-lg px-6 py-2.5 text-sm"
          >
            Get It Free →
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-4xl px-6 py-16"
    >
      <div className="glass-card relative overflow-hidden p-8 sm:p-10 text-center">
        {/* Glow */}
        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-gold-500/8 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-gold-600/5 blur-3xl" />

        <div className="relative z-10">
          <span className="inline-block rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-gold-400">
            Free Guide
          </span>

          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-2xl font-bold sm:text-3xl">
            Dive Deeper into <span className="gold-gradient">Valdrath</span>
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-stone-400">
            Get the free Companion Guide — packed with character profiles, a
            kingdom map, timeline of events, glossary, and the royal family tree.
          </p>

          <Link
            href="/companion"
            className="mt-6 inline-block btn-primary rounded-lg px-8 py-3 text-base"
          >
            Get the Free Guide →
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
