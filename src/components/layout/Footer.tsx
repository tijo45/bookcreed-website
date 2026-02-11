"use client";

import Link from "next/link";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-stone-800/50 bg-stone-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <span className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-wider gold-gradient">
              BOOK CREED
            </span>
            <p className="mt-3 text-sm text-stone-500">
              Epic fantasy books, interactive quizzes, and skill-based contests.
              Enter the Kingdom of Valdrath.
            </p>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-stone-400">
              Legal
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-stone-500 transition-colors hover:text-gold-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-stone-500 transition-colors hover:text-gold-400"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/contest/rules"
                  className="text-sm text-stone-500 transition-colors hover:text-gold-400"
                >
                  Contest Rules
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-stone-400">
              Newsletter
            </h4>
            {subscribed ? (
              <p className="mt-4 text-sm text-gold-400">
                Thanks for subscribing!
              </p>
            ) : (
              <form onSubmit={handleNewsletter} className="mt-4 flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 rounded-lg border border-stone-700 bg-stone-900/50 px-4 py-2 text-sm text-stone-200 placeholder-stone-600 outline-none transition-colors focus:border-gold-500/50"
                />
                <button type="submit" className="btn-primary rounded-lg px-4 py-2 text-sm">
                  Join
                </button>
              </form>
            )}
            <p className="mt-2 text-xs text-stone-600">
              Get notified about new books and contests.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-800/50 pt-6 text-center">
          <p className="text-xs text-stone-600">
            &copy; {new Date().getFullYear()} Book Creed. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
