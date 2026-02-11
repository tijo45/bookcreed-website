"use client";

import { useEffect, useState } from "react";
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

export default function LeaderboardPage() {
  const [cohorts, setCohorts] = useState<CohortInfo[]>([]);
  const [loading, setLoading] = useState(true);

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
        className="text-stone-400 text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Compete for the top score and win prizes
      </motion.p>

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
          {activeCohorts.map((cohort) => (
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
                  <div className="text-right text-sm text-stone-400">
                    <p>
                      Ends:{" "}
                      {new Date(cohort.endDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-gold-400 font-semibold">
                      {cohort.entries.length} entries
                    </p>
                  </div>
                </div>
              </div>

              {cohort.entries.length === 0 ? (
                <div className="text-center py-12 text-stone-500">
                  No entries yet. Be the first to compete!
                </div>
              ) : (
                <div className="space-y-2">
                  {cohort.entries.map((entry, i) => (
                    <motion.div
                      key={`${cohort.id}-${i}`}
                      className="glass-card px-6 py-4 flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <RankBadge rank={entry.rank} />
                      <div className="flex-1">
                        <p className="text-stone-200 font-medium">
                          {entry.userName}
                        </p>
                        <p className="text-stone-500 text-sm">
                          {entry.bookTitle}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold gold-gradient">
                          {entry.percentage}%
                        </p>
                        <p className="text-stone-500 text-xs">
                          {new Date(entry.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.section>
          ))}

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
