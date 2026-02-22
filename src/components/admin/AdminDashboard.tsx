"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface CohortEntry {
  id: string;
  user: {
    name: string;
    email: string;
    address: string | null;
    giftCardPref: string | null;
  };
  score: {
    percentage: number;
    completedAt: string | Date;
    book: { title: string };
  };
}

interface Cohort {
  id: string;
  name: string;
  status: string;
  prizeDesc: string;
  startDate: string | Date;
  endDate: string | Date;
  entries: CohortEntry[];
}

interface Book {
  id: string;
  title: string;
  number: number;
}

export function AdminDashboard({
  initialCohorts,
  books,
}: {
  initialCohorts: Cohort[];
  books: Book[];
}) {
  const [cohorts, setCohorts] = useState(initialCohorts);
  const [showCreate, setShowCreate] = useState(false);
  const [expandedCohort, setExpandedCohort] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    bookId: "",
    startDate: "",
    endDate: "",
    prizeDesc: "",
  });
  const [creating, setCreating] = useState(false);

  function setOneYearCohort() {
    const now = new Date();
    const oneYearFromNow = new Date(now);
    oneYearFromNow.setFullYear(now.getFullYear() + 1);
    
    const formatDateForInput = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    setForm({
      ...form,
      startDate: formatDateForInput(now),
      endDate: formatDateForInput(oneYearFromNow),
      name: form.name || `Cohort ${now.getFullYear()}-${now.getFullYear() + 1}`,
      prizeDesc: form.prizeDesc || "$25 gift card of winner's choice"
    });
  }

  async function createCohort(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    const res = await fetch("/api/admin/cohorts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const { cohort } = await res.json();
      setCohorts([{ ...cohort, entries: [] }, ...cohorts]);
      setForm({ name: "", bookId: "", startDate: "", endDate: "", prizeDesc: "" });
      setShowCreate(false);
    }
    setCreating(false);
  }

  async function updateStatus(id: string, status: string) {
    const res = await fetch("/api/admin/cohorts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setCohorts(
        cohorts.map((c) => (c.id === id ? { ...c, status } : c))
      );
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] gold-gradient"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Admin Dashboard
        </motion.h1>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="btn-primary text-sm"
        >
          {showCreate ? "Cancel" : "New Cohort"}
        </button>
      </div>

      {showCreate && (
        <motion.form
          onSubmit={createCohort}
          className="glass-card p-6 mb-8 space-y-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200">
              Create New Cohort
            </h2>
            <button
              type="button"
              onClick={setOneYearCohort}
              className="text-sm px-3 py-1 bg-gold-600 hover:bg-gold-500 rounded text-stone-950 transition-colors"
            >
              Set 1-Year Duration
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-stone-400 mb-1">
                Cohort Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-stone-800 border border-stone-700 rounded-lg px-4 py-2 text-stone-200 focus:border-gold-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-stone-400 mb-1">
                Book Filter (optional)
              </label>
              <select
                value={form.bookId}
                onChange={(e) => setForm({ ...form, bookId: e.target.value })}
                className="w-full bg-stone-800 border border-stone-700 rounded-lg px-4 py-2 text-stone-200 focus:border-gold-500 focus:outline-none"
              >
                <option value="">Any Book</option>
                {books.map((b) => (
                  <option key={b.id} value={b.id}>
                    Book {b.number}: {b.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-stone-400 mb-1">
                Start Date
              </label>
              <input
                type="datetime-local"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
                className="w-full bg-stone-800 border border-stone-700 rounded-lg px-4 py-2 text-stone-200 focus:border-gold-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-stone-400 mb-1">
                End Date
              </label>
              <input
                type="datetime-local"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full bg-stone-800 border border-stone-700 rounded-lg px-4 py-2 text-stone-200 focus:border-gold-500 focus:outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-stone-400 mb-1">
              Prize Description
            </label>
            <input
              type="text"
              value={form.prizeDesc}
              onChange={(e) => setForm({ ...form, prizeDesc: e.target.value })}
              className="w-full bg-stone-800 border border-stone-700 rounded-lg px-4 py-2 text-stone-200 focus:border-gold-500 focus:outline-none"
              placeholder="e.g. $25 gift card of winner's choice"
              required
            />
          </div>
          <button
            type="submit"
            disabled={creating}
            className="btn-primary disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create Cohort"}
          </button>
        </motion.form>
      )}

      <div className="space-y-4">
        {cohorts.map((cohort) => (
          <motion.div
            key={cohort.id}
            className="glass-card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              className="p-6 cursor-pointer flex justify-between items-center"
              onClick={() =>
                setExpandedCohort(
                  expandedCohort === cohort.id ? null : cohort.id
                )
              }
            >
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-[family-name:var(--font-heading)] text-stone-200">
                    {cohort.name}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      cohort.status === "active"
                        ? "bg-green-900/50 text-green-400"
                        : cohort.status === "ended"
                        ? "bg-stone-700 text-stone-400"
                        : "bg-gold-900/50 text-gold-400"
                    }`}
                  >
                    {cohort.status}
                  </span>
                </div>
                <p className="text-stone-500 text-sm">
                  {cohort.prizeDesc} &middot; {cohort.entries.length} entries
                </p>
              </div>
              <div className="flex items-center gap-2">
                {cohort.status === "active" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateStatus(cohort.id, "ended");
                    }}
                    className="text-xs px-3 py-1 bg-stone-700 hover:bg-stone-600 rounded text-stone-300 transition-colors"
                  >
                    End Contest
                  </button>
                )}
                {cohort.status === "ended" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateStatus(cohort.id, "awarded");
                    }}
                    className="text-xs px-3 py-1 bg-gold-600 hover:bg-gold-500 rounded text-stone-950 transition-colors"
                  >
                    Mark Awarded
                  </button>
                )}
                <span className="text-stone-600 text-xl">
                  {expandedCohort === cohort.id ? "−" : "+"}
                </span>
              </div>
            </div>

            {expandedCohort === cohort.id && (
              <div className="border-t border-stone-800 p-6">
                {cohort.entries.length === 0 ? (
                  <p className="text-stone-500 text-center py-4">
                    No entries yet
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-stone-400 border-b border-stone-800">
                          <th className="pb-2 pr-4">#</th>
                          <th className="pb-2 pr-4">Name</th>
                          <th className="pb-2 pr-4">Email</th>
                          <th className="pb-2 pr-4">Score</th>
                          <th className="pb-2 pr-4">Book</th>
                          <th className="pb-2 pr-4">Address</th>
                          <th className="pb-2">Gift Card</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cohort.entries.map((entry, i) => (
                          <tr
                            key={entry.id}
                            className={`border-b border-stone-800/50 ${
                              i === 0 ? "text-gold-400" : "text-stone-300"
                            }`}
                          >
                            <td className="py-3 pr-4 font-bold">{i + 1}</td>
                            <td className="py-3 pr-4">{entry.user.name}</td>
                            <td className="py-3 pr-4">{entry.user.email}</td>
                            <td className="py-3 pr-4 font-bold">
                              {entry.score.percentage}%
                            </td>
                            <td className="py-3 pr-4">
                              {entry.score.book.title}
                            </td>
                            <td className="py-3 pr-4 text-xs">
                              {entry.user.address || "—"}
                            </td>
                            <td className="py-3 text-xs">
                              {entry.user.giftCardPref || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
