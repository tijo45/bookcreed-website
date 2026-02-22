"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Countdown timer hook
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(targetDate.getTime() - Date.now(), 0);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

export default function FreePage() {
  // Free promotion ends March 1, 2026 at 11:59 PM EST
  const promoEndDate = new Date("2026-03-02T04:59:00Z"); // UTC equivalent of March 1, 2026 11:59 PM EST
  const countdown = useCountdown(promoEndDate);

  const amazonLink = "https://www.amazon.com/dp/B0GKXNCCXD";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/20 py-20">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(245,158,11,0.15),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(180,83,9,0.1),transparent)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Free Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-2 text-sm font-bold uppercase tracking-wider text-white shadow-lg"
            >
              Limited Time FREE
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-6 font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              The Exile's Return
              <br />
              <span className="gold-gradient">FREE for a Limited Time</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-4 text-lg text-stone-300 sm:text-xl"
            >
              Book One of The Kingdom of Valdrath Epic Fantasy Series
            </motion.p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Book Cover */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-gold-500/20 to-amber-600/20 blur-xl" />
                <Image
                  src="/covers/valdrath/book1.jpg"
                  alt="The Exile's Return - Book Cover"
                  width={400}
                  height={600}
                  className="relative rounded-lg shadow-2xl"
                  priority
                />
              </div>
            </motion.div>

            {/* Book Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="space-y-6"
            >
              {/* Countdown */}
              <div className="glass-card p-6">
                <h3 className="text-center font-[family-name:var(--font-heading)] text-xl font-semibold text-gold-400">
                  Free Period Ends In:
                </h3>
                <div className="mt-4 flex items-center justify-center gap-4">
                  {[
                    { label: "Days", value: countdown.days },
                    { label: "Hours", value: countdown.hours },
                    { label: "Min", value: countdown.minutes },
                    { label: "Sec", value: countdown.seconds },
                  ].map((unit) => (
                    <div key={unit.label} className="flex flex-col items-center">
                      <span className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white sm:text-3xl">
                        {String(unit.value).padStart(2, "0")}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-stone-400">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-center text-sm text-stone-300">
                  <strong>February 25 - March 1, 2026</strong>
                </p>
              </div>

              {/* Book Description */}
              <div className="space-y-4 text-stone-300">
                <p className="leading-relaxed">
                  Cassian Stormborn spent twelve years hiding. A prince who fled after being forced to execute innocent farmers, he built a quiet life as a mechanic, attending church every Sunday, trying to forget the blood on his hands.
                </p>
                <p className="leading-relaxed">
                  Then his brother - Crown Prince Aldric - is murdered.
                </p>
                <p className="leading-relaxed">
                  Summoned home to a palace full of vipers, Cassian discovers someone sabotaged Aldric's blade. Someone is covering it up. As he investigates, the conspiracy leads to the highest levels of power - implicating his brothers, his father, and the warrior code that defines their kingdom.
                </p>
                <p className="leading-relaxed">
                  To find the truth, he must become the warrior he swore he'd never be again. To save his family, he might have to destroy everything his father built.
                </p>
                <p className="italic leading-relaxed text-gold-300">
                  Walk away again, or fight for a throne he never wanted.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4">
                <a
                  href={amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-lg bg-gradient-to-r from-green-600 to-emerald-700 px-8 py-4 text-center text-lg font-bold text-white shadow-lg transition-all hover:from-green-500 hover:to-emerald-600 hover:shadow-xl"
                >
                  Get Your Free Copy on Amazon
                </a>
                <Link
                  href="/series/kingdom-of-valdrath"
                  className="block w-full rounded-lg border border-gold-500/50 px-8 py-3 text-center font-semibold text-gold-400 transition-all hover:border-gold-400 hover:bg-gold-500/10 hover:text-gold-300"
                >
                  Explore the Full Series
                </Link>
              </div>

              {/* Additional Info */}
              <div className="rounded-lg bg-stone-800/50 p-4 text-sm text-stone-400">
                <p>
                  <strong className="text-stone-300">Genre:</strong> Epic Fantasy / Political Thriller / Family Drama
                </p>
                <p className="mt-1">
                  <strong className="text-stone-300">Age Range:</strong> Adult
                </p>
                <p className="mt-2 italic text-gold-300">
                  "A sword can be sheathed, but it cannot become a plowshare. Accept what you are and choose how to use it."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Read Section */}
      <section className="bg-stone-900/50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white">
              Why Readers Love <span className="gold-gradient">The Exile's Return</span>
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="glass-card p-6 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white">Epic World-Building</h3>
                <p className="mt-2 text-sm text-stone-400">Immerse yourself in the rich, complex world of Valdrath</p>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white">Complex Characters</h3>
                <p className="mt-2 text-sm text-stone-400">Multi-layered characters facing impossible choices</p>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-white">Political Intrigue</h3>
                <p className="mt-2 text-sm text-stone-400">Masterfully woven plot of betrayal and power</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-stone-950 to-amber-950/20 py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white">
              Don't Miss Out!
            </h2>
            <p className="mt-4 text-lg text-stone-300">
              This epic fantasy adventure is free for a limited time. Start your journey into the Kingdom of Valdrath today.
            </p>
            <a
              href={amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-lg bg-gradient-to-r from-green-600 to-emerald-700 px-10 py-4 text-xl font-bold text-white shadow-xl transition-all hover:from-green-500 hover:to-emerald-600 hover:shadow-2xl hover:scale-105"
            >
              Claim Your Free Copy Now
            </a>
            <p className="mt-4 text-sm text-stone-500">
              Available on Amazon Kindle • Free Feb 25 - Mar 1, 2026
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}