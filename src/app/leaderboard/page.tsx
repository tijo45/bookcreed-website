"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

interface LeaderboardEntry {
  rank: number;
  userName: string;
  bookTitle: string;
  percentage: number;
  completedAt: string;
}

interface CohortInfo {
  id: string;
  name: string;
  status: string;
  prizeDesc: string;
  startDate: string;
  endDate: string;
  entries: LeaderboardEntry[];
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1)
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gold-500 text-stone-950 font-bold text-sm">
        1
      </span>
    );
  if (rank === 2)
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-stone-400 text-stone-950 font-bold text-sm">
        2
      </span>
    );
  if (rank === 3)
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-700 text-stone-200 font-bold text-sm">
        3
      </span>
    );
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 text-stone-400 font-medium text-sm">
      {rank}
    </span>
  );
}

function CountdownTimer({ endDate }: { endDate: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function update() {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("Contest ended");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="flex items-center gap-2">
      <svg className="h-4 w-4 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="font-mono text-sm text-gold-400">{timeLeft}</span>
    </div>
  );
}

const ENTRIES_PER_PAGE = 20;

export default function LeaderboardPage() {
  const { data: session } = useSession();
  const [cohorts, setCohorts] = useState<CohortInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookFilter, setBookFilter] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(ENTRIES_PER_PAGE);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((data) => {
        setCohorts(data.cohorts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const activeCohorts = cohorts.filter((c) => c.status === "active");
  const pastCohorts = cohorts.filter((c) => c.status !== "active");

  // Get unique book titles across all cohorts for filter
  const allBookTitles = Array.from(
    new Set(
      cohorts.flatMap((c) => c.entries.map((e) => e.bookTitle))
    )
  ).sort();

  function filterEntries(entries: LeaderboardEntry[]) {
    if (bookFilter === "all") return entries;
    return entries.filter((e) => e.bookTitle === bookFilter);
  }

  // Find current user's position
  function findUserPosition(entries: LeaderboardEntry[]): number | null {
    if (!session?.user?.name) return null;
    const filtered = filterEntries(entries);
    const idx = filtered.findIndex((e) => e.userName === session.user?.name);
    return idx >= 0 ? idx + 1 : null;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.h1
        className="text-4xl md:text-5xl font-[family-name:var(--font-heading)] gold-gradient mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Leaderboard
      </motion.h1>
      <motion.p
        className="text-stone-400 text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Compete for the top score and win prizes
      </motion.p>

      {/* Book filter */}
      {allBookTitles.length > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mb-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-lg border border-stone-700 bg-stone-900/50 p-1">
            <button
              onClick={() => { setBookFilter("all"); setVisibleCount(ENTRIES_PER_PAGE); }}
              className={`rounded-md px-3 py-1.5 text-sm transition ${
                bookFilter === "all"
                  ? "bg-gold-500/20 text-gold-400"
                  : "text-stone-400 hover:text-stone-300"
              }`}
            >
              All Books
            </button>
            {allBookTitles.map((title) => (
              <button
                key={title}
                onClick={() => { setBookFilter(title); setVisibleCount(ENTRIES_PER_PAGE); }}
                className={`rounded-md px-3 py-1.5 text-sm transition ${
                  bookFilter === title
                    ? "bg-gold-500/20 text-gold-400"
                    : "text-stone-400 hover:text-stone-300"
                }`}
              >
                {title}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-card p-6 animate-pulse h-16 rounded-xl"
            />
          ))}
        </div>
      ) : (
        <>
          {activeCohorts.map((cohort) => {
            const filteredEntries = filterEntries(cohort.entries);
            const userPosition = findUserPosition(cohort.entries);
            const displayedEntries = filteredEntries.slice(0, visibleCount);
            const hasMore = filteredEntries.length > visibleCount;

            return (
              <motion.section
                key={cohort.id}
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="glass-card p-6 mb-6 border border-gold-500/20">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold">
                        Active Contest
                      </span>
                      <h2 className="text-2xl font-[family-name:var(--font-heading)] text-stone-100 mt-1">
                        {cohort.name}
                      </h2>
                      <p className="text-stone-400 text-sm mt-1">
                        {cohort.prizeDesc}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <CountdownTimer endDate={cohort.endDate} />
                      <p className="text-sm text-stone-400">
                        Ends:{" "}
                        {new Date(cohort.endDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-gold-400 font-semibold text-sm">
                        {filteredEntries.length} participant{filteredEntries.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {/* User position highlight */}
                  {userPosition && (
                    <div className="mt-4 pt-4 border-t border-stone-700/50 text-center">
                      <p className="text-sm text-stone-400">
                        Your Position:{" "}
                        <span className="text-gold-400 font-bold text-lg">#{userPosition}</span>
                        {" "}out of {filteredEntries.length}
                      </p>
                    </div>
                  )}
                </div>

                {filteredEntries.length === 0 ? (
                  <div className="text-center py-12 text-stone-500">
                    No entries yet{bookFilter !== "all" ? " for this book" : ""}. Be the first to compete!
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      {displayedEntries.map((entry, i) => {
                        const isCurrentUser = session?.user?.name === entry.userName;
                        return (
                          <motion.div
                            key={`${cohort.id}-${i}`}
                            className={`glass-card px-6 py-4 flex items-center gap-4 ${
                              isCurrentUser ? "border-gold-500/30 bg-gold-500/5" : ""
                            }`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * Math.min(i, 10) }}
                          >
                            <RankBadge rank={entry.rank} />
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium truncate ${isCurrentUser ? "text-gold-400" : "text-stone-200"}`}>
                                {entry.userName}
                                {isCurrentUser && (
                                  <span className="ml-2 text-xs text-gold-500">(You)</span>
                                )}
                              </p>
                              <p className="text-stone-500 text-sm truncate">
                                {entry.bookTitle}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-2xl font-bold gold-gradient">
                                {entry.percentage}%
                              </p>
                              <p className="text-stone-500 text-xs">
                                {new Date(entry.completedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Load more */}
                    {hasMore && (
                      <div className="mt-4 text-center">
                        <button
                          onClick={() => setVisibleCount((v) => v + ENTRIES_PER_PAGE)}
                          className="rounded-lg border border-stone-700 px-6 py-2 text-sm text-stone-400 transition hover:bg-stone-800 hover:text-stone-300"
                        >
                          Load More ({filteredEntries.length - visibleCount} remaining)
                        </button>
                      </div>
                    )}
                  </>
                )}
              </motion.section>
            );
          })}

          {pastCohorts.length > 0 && (
            <section>
              <h2 className="text-2xl font-[family-name:var(--font-heading)] text-stone-300 mb-6">
                Past Contests
              </h2>
              {pastCohorts.map((cohort) => (
                <div key={cohort.id} className="glass-card p-6 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg text-stone-200">{cohort.name}</h3>
                      <p className="text-stone-500 text-sm">
                        {cohort.prizeDesc}
                      </p>
                    </div>
                    {cohort.entries.length > 0 && (
                      <div className="text-right">
                        <p className="text-sm text-gold-400">Winner</p>
                        <p className="text-stone-200 font-medium">
                          {cohort.entries[0]?.userName}
                        </p>
                        <p className="text-gold-400 font-bold">
                          {cohort.entries[0]?.percentage}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}

          {cohorts.length === 0 && (
            <div className="text-center py-20 text-stone-500">
              <p className="text-xl mb-2">No active contests</p>
              <p>Check back soon for the next challenge!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
