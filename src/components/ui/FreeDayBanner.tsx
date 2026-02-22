"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function FreeDayBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Free day event dates: Feb 25 - Mar 1, 2026
  const startDate = new Date("2026-02-25T00:00:00-05:00"); // Feb 25, 2026 midnight EST
  const endDate = new Date("2026-03-01T23:59:59-05:00"); // Mar 1, 2026 11:59 PM EST

  useEffect(() => {
    // Check if user has dismissed the banner
    const dismissed = localStorage.getItem("freeDayBanner2026Dismissed");
    const now = new Date();
    
    // Show banner if not dismissed and we're in the promotional period
    if (!dismissed && now >= startDate && now <= endDate) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const updateCountdown = () => {
      const now = new Date();
      const targetDate = now <= startDate ? startDate : endDate;
      const diff = Math.max(targetDate.getTime() - now.getTime(), 0);
      
      // If we've passed the end date, hide the banner
      if (now > endDate) {
        setIsVisible(false);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [isVisible, startDate, endDate]);

  const handleDismiss = () => {
    localStorage.setItem("freeDayBanner2026Dismissed", "true");
    setIsVisible(false);
  };

  const isEventActive = () => {
    const now = new Date();
    return now >= startDate && now <= endDate;
  };

  const getTimeLeftText = () => {
    if (!isEventActive()) {
      return "Event starts in:";
    }
    return "Ends in:";
  };

  if (!isVisible) return null;

  return (
    <div className="relative w-full border-b border-gold-500/20 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,rgba(245,158,11,0.15),transparent)]" />
      <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-gold-500/5 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-gold-500/5 to-transparent" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-3 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-4">
          {/* Left side: Main message */}
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔥</span>
              <div>
                <h3 className="font-bold text-gold-400 text-sm sm:text-base">
                  FREE ON KINDLE — FEB 25-MAR 1!
                </h3>
                <p className="text-xs text-stone-300 sm:text-sm">
                  <span className="font-semibold">The Exile's Return</span> — Book 1 of Kingdom of Valdrath
                </p>
              </div>
            </div>
          </div>

          {/* Center: Countdown */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xs text-stone-400 mb-1">{getTimeLeftText()}</p>
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <div className="flex flex-col items-center">
                  <span className="font-bold text-gold-400">{String(timeLeft.days).padStart(2, "0")}</span>
                  <span className="text-xs text-stone-500">days</span>
                </div>
                <span className="text-gold-500">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-bold text-gold-400">{String(timeLeft.hours).padStart(2, "0")}</span>
                  <span className="text-xs text-stone-500">hrs</span>
                </div>
                <span className="text-gold-500">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-bold text-gold-400">{String(timeLeft.minutes).padStart(2, "0")}</span>
                  <span className="text-xs text-stone-500">min</span>
                </div>
                <span className="text-gold-500">:</span>
                <div className="flex flex-col items-center">
                  <span className="font-bold text-gold-400">{String(timeLeft.seconds).padStart(2, "0")}</span>
                  <span className="text-xs text-stone-500">sec</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: CTA and dismiss */}
          <div className="flex items-center gap-3">
            <Link
              href="https://www.amazon.com/dp/B0GKXNCCXD?utm_source=bookcreed&utm_medium=banner&utm_campaign=free_promo_feb2026"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 px-4 py-2 text-xs sm:text-sm font-bold text-stone-950 transition-all hover:from-gold-400 hover:to-gold-500 hover:scale-105 hover:shadow-lg hover:shadow-gold-500/25"
            >
              <span>📱</span>
              GET FREE NOW
            </Link>
            
            <button
              onClick={handleDismiss}
              className="flex items-center justify-center w-6 h-6 rounded-full text-stone-500 hover:text-stone-300 hover:bg-stone-800/50 transition-all"
              aria-label="Dismiss banner"
              title="Dismiss this banner"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Mobile-friendly additional info */}
        <div className="mt-2 text-center sm:hidden">
          <p className="text-xs text-stone-400">
            Usually $4.99 • Epic Fantasy • Limited Time Only
          </p>
        </div>
      </div>
    </div>
  );
}