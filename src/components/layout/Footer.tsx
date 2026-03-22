"use client";

import Link from "next/link";
import { useState } from "react";

const SUBSTACK_URL = "https://evanoir.substack.com";

const authorPlatforms = [
  {
    name: "Twitter / X",
    url: "https://twitter.com/EvaNoirAuthor",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://instagram.com/evanoir_author",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "Amazon",
    url: "https://www.amazon.com/stores/author/B0CJFMLR48/about?tag=pricerev-20",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.136-.06.234-.1.293-.13.226-.088.39-.046.493.13a.36.36 0 01.057.22c0 .15-.1.3-.3.44-.732.508-1.727 1.024-2.985 1.55a18.6 18.6 0 01-6.508 1.2c-4.58 0-8.548-1.192-11.905-3.574-.168-.12-.236-.24-.196-.36l.07-.1zM6.023 16.42c1.09.147 1.986.22 2.69.22 2.267 0 4.168-.622 5.704-1.866.147-.12.074-.237-.218-.353a1.74 1.74 0 00-.24-.058c-.194-.03-.377.02-.548.15-1.24.88-2.778 1.32-4.61 1.32-.772 0-1.613-.096-2.524-.29-.242-.05-.387.04-.435.27a.32.32 0 00.06.27c.06.08.12.136.18.167l-.06.17zm15.837-.2c.167.106.15.253-.048.44l-.108.098c-.453.402-1.058.72-1.814.955a2.84 2.84 0 01-.77.133c-.487 0-.64-.16-.46-.483.18-.32.534-.584 1.064-.79.242-.093.6-.222 1.074-.387a6.1 6.1 0 00.8-.38l.262.414z" />
        <path d="M21.754 14.6c-.157-.256-.374-.395-.65-.418a1.27 1.27 0 00-.564.07c-.054.02-.118.046-.193.082-.06.028-.198.09-.414.187l-.612.31c-.776.368-1.768.662-2.978.883a15.6 15.6 0 01-2.682.236c-4.34 0-7.676-1.604-10.008-4.813-.344-.476-.554-.574-.63-.295a.616.616 0 00-.024.2c.072 1.168.55 2.394 1.434 3.677 1.088 1.554 2.594 2.753 4.518 3.596 2.368 1.02 4.918 1.43 7.65 1.228 2.418-.18 4.086-.753 5.004-1.72.132-.14.178-.29.138-.46a.66.66 0 00-.248-.38l.26-.383z" />
      </svg>
    ),
  },
  {
    name: "Goodreads",
    url: "https://www.goodreads.com/author/show/Eva_Noir",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.43 23.995c-3.608-.208-6.274-2.077-6.448-5.078.695.007 1.375-.013 2.07-.006.224 1.342 1.065 2.43 2.683 3.026 1.583.496 3.737.46 5.082-.174 1.351-.636 2.145-1.822 2.503-3.577.212-1.042.236-1.734.236-2.851V14.57c-.98 1.874-3.053 2.861-5.404 2.861C7.49 17.421 4.1 14.078 4.1 9.373c0-4.817 3.413-8.397 8.175-8.397 2.31 0 4.2.878 5.235 2.772V1.473h1.96v13.834c0 1.85-.135 3.073-.533 4.25-.674 1.97-2.505 3.476-4.856 4.043-1.155.3-2.17.39-2.65.395zm.547-7.065c3.32 0 5.632-2.56 5.632-6.35 0-3.99-2.097-6.763-5.632-6.763-3.32 0-5.725 2.64-5.725 6.604 0 4.06 2.19 6.509 5.725 6.509z" />
      </svg>
    ),
  },
  {
    name: "BookBub",
    url: "https://www.bookbub.com/authors/eva-noir",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.5 14.5h-2V7.5h2c1.657 0 3 .895 3 2s-.448 2-2 2.5c1.657.5 2.5 1.343 2.5 2.5s-1.343 2.5-3.5 2.5zm5 0h-2V7.5h2c1.657 0 3 .895 3 2s-.448 2-2 2.5c1.657.5 2.5 1.343 2.5 2.5s-1.343 2.5-3.5 2.5z" />
      </svg>
    ),
  },
  {
    name: "Substack",
    url: SUBSTACK_URL,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
      </svg>
    ),
  },
  {
    name: "Medium",
    url: "https://medium.com/@evanoir",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: "Newsletter Subscriber", source: "newsletter" }),
      });
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-stone-800/50 bg-stone-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
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

          {/* Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-stone-400">
              Explore
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/books"
                  className="text-sm text-stone-500 transition-colors hover:text-gold-400"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  href="/quiz"
                  className="text-sm text-stone-500 transition-colors hover:text-gold-400"
                >
                  Quizzes
                </Link>
              </li>
              <li>
                <Link
                  href="/lore"
                  className="text-sm text-stone-500 transition-colors hover:text-gold-400"
                >
                  World Lore
                </Link>
              </li>
              <li>
                <Link
                  href="/review"
                  className="text-sm text-stone-500 transition-colors hover:text-gold-400"
                >
                  Leave a Review
                </Link>
              </li>
            </ul>
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
              Join the Inner Circle
            </h4>
            {subscribed ? (
              <p className="mt-4 text-sm text-gold-400">
                ✨ Welcome to the Inner Circle!
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
              Worldbuilding secrets, deleted scenes &amp; early access.
            </p>
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-xs text-gold-400/60 transition-colors hover:text-gold-400"
            >
              Or subscribe on Substack →
            </a>
          </div>
        </div>

        {/* Author Platform Links */}
        <div className="mt-10 flex flex-col items-center gap-4 border-t border-stone-800/50 pt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Find Eva Noir
          </p>
          <div className="flex items-center gap-4">
            {authorPlatforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-800 bg-stone-900/50 text-stone-400 transition-all hover:border-gold-500/40 hover:text-gold-400 hover:bg-gold-500/10"
                title={platform.name}
              >
                {platform.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-stone-600">
            &copy; {new Date().getFullYear()} Book Creed. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
