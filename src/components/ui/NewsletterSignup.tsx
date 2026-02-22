"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface NewsletterSignupProps {
  variant?: "hero" | "inline" | "sticky" | "page";
  className?: string;
}

export function NewsletterSignup({ variant = "inline", className = "" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email.trim(), 
          name: "Newsletter Subscriber", // Default name for newsletter signups
          source: "newsletter" 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setStatus("success");
          setEmail("");
          return;
        }
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  // Hero variant (large, above the fold)
  if (variant === "hero") {
    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className={`mx-auto max-w-4xl px-6 py-20 ${className}`}
      >
        <div className="glass-card relative overflow-hidden p-8 sm:p-12 text-center">
          {/* Glow effects */}
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold-500/8 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-gold-600/5 blur-3xl" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold-500/10 text-gold-400"
            >
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </motion.div>

            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold sm:text-4xl">
              Join Eva Noir's <span className="gold-gradient">Kingdom</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-stone-400">
              Get exclusive updates, behind-the-scenes content, and early access to new releases. 
              Be the first to know when new Valdrath stories are coming.
            </p>

            <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  disabled={status === "loading"}
                  className="flex-1 rounded-lg border border-stone-700 bg-stone-900/80 px-4 py-3 text-stone-200 placeholder:text-stone-600 focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/30 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary rounded-lg px-6 py-3 text-base font-semibold disabled:opacity-60 sm:whitespace-nowrap"
                >
                  {status === "loading" ? "Joining..." : "Join the Kingdom"}
                </button>
              </div>
              
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-center text-sm text-green-400"
                >
                  ✨ Welcome to the Kingdom! Check your email for confirmation.
                </motion.p>
              )}
              
              {status === "error" && (
                <p className="mt-3 text-center text-sm text-red-400">{errorMsg}</p>
              )}
            </form>

            <p className="mt-4 text-center text-xs text-stone-500">
              No spam, ever. Unsubscribe with one click.
            </p>
          </div>
        </div>
      </motion.section>
    );
  }

  // Inline variant (smaller, for blog posts)
  if (variant === "inline") {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className={`my-12 ${className}`}
      >
        <div className="glass-card p-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gold-500">
            Newsletter
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-heading)] text-xl font-bold text-stone-100">
            Join Eva Noir's Kingdom
          </h3>
          <p className="mt-2 text-sm text-stone-400">
            Get updates on new books, exclusive content, and behind-the-scenes insights.
          </p>
          
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                disabled={status === "loading"}
                className="flex-1 rounded-lg border border-stone-700 bg-stone-900/80 px-3 py-2 text-sm text-stone-200 placeholder:text-stone-600 focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/30 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-60 sm:whitespace-nowrap"
              >
                {status === "loading" ? "Joining..." : "Join"}
              </button>
            </div>
            
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-xs text-green-400"
              >
                ✨ Successfully joined! Check your email.
              </motion.p>
            )}
            
            {status === "error" && (
              <p className="mt-2 text-xs text-red-400">{errorMsg}</p>
            )}
          </form>
        </div>
      </motion.div>
    );
  }

  // Sticky variant (fixed position)
  if (variant === "sticky") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className={`fixed bottom-6 right-6 z-50 max-w-sm ${className}`}
      >
        <div className="glass-card p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-500">
                Newsletter
              </p>
              <p className="mt-1 text-sm font-medium text-stone-200">
                Join the Kingdom
              </p>
            </div>
            <form onSubmit={handleSubmit} className="ml-3 flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                disabled={status === "loading"}
                className="w-32 rounded border border-stone-700 bg-stone-900/80 px-2 py-1 text-xs text-stone-200 placeholder:text-stone-600 focus:border-gold-500/50 focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary rounded px-3 py-1 text-xs font-semibold disabled:opacity-60"
              >
                {status === "loading" ? "..." : "Join"}
              </button>
            </form>
          </div>
          
          {status === "success" && (
            <p className="mt-2 text-xs text-green-400">✨ Joined successfully!</p>
          )}
          
          {status === "error" && (
            <p className="mt-2 text-xs text-red-400">Error: {errorMsg}</p>
          )}
        </div>
      </motion.div>
    );
  }

  // Default return for unknown variants
  return null;
}