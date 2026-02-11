"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/series/kingdom-of-valdrath", label: "Series" },
  { href: "/quiz", label: "Quizzes" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/contest/rules", label: "Contest Rules" },
];

export function Header() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-stone-950/80 backdrop-blur-xl border-b border-stone-800/50 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-wider gold-gradient">
            BOOK CREED
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-400 transition-colors hover:text-gold-400"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop auth */}
        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <>
              <Link
                href="/account"
                className="text-sm font-medium text-stone-300 transition-colors hover:text-gold-400"
              >
                Account
              </Link>
              <button
                onClick={() => signOut()}
                className="rounded-lg border border-stone-700 px-4 py-2 text-sm font-medium text-stone-300 transition-all hover:border-gold-500/50 hover:text-gold-400"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/account/login"
                className="text-sm font-medium text-stone-300 transition-colors hover:text-gold-400"
              >
                Login
              </Link>
              <Link
                href="/account/register"
                className="btn-primary rounded-lg px-5 py-2 text-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-6 bg-stone-300"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block h-0.5 w-6 bg-stone-300"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-6 bg-stone-300"
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-stone-950/95 backdrop-blur-xl px-6 pt-24 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-[family-name:var(--font-heading)] text-2xl text-stone-200 transition-colors hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 border-t border-stone-800 pt-8">
              {session ? (
                <>
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className="text-lg text-stone-300 hover:text-gold-400"
                  >
                    Account
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileOpen(false);
                    }}
                    className="w-fit rounded-lg border border-stone-700 px-6 py-3 text-stone-300 hover:border-gold-500/50 hover:text-gold-400"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/account/login"
                    onClick={() => setMobileOpen(false)}
                    className="text-lg text-stone-300 hover:text-gold-400"
                  >
                    Login
                  </Link>
                  <Link
                    href="/account/register"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary w-fit rounded-lg px-6 py-3 text-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
