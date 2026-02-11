"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const GIFT_CARD_OPTIONS = ["Amazon", "Visa", "Target", "Other"];

type Score = {
  id: string;
  score: number;
  total: number;
  percentage: number;
  completedAt: Date;
  book: { title: string };
};

type UserData = {
  id: string;
  name: string;
  email: string;
  address: string | null;
  giftCardPref: string | null;
  newsletter: boolean;
  scores: Score[];
};

export default function AccountClient({ user }: { user: UserData }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          address: formData.get("address") || null,
          giftCardPref: formData.get("giftCardPref") || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Update failed");
        setLoading(false);
        return;
      }

      setMessage("Profile updated successfully");
      setEditing(false);
      setLoading(false);
      router.refresh();
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="gold-gradient mb-8 font-[family-name:var(--font-heading)] text-3xl font-bold">
          My Account
        </h1>

        {message && (
          <div className="mb-4 rounded-lg bg-green-900/50 p-3 text-sm text-green-300">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-lg bg-red-900/50 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="glass-card mb-8 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-heading)] text-xl text-gold-400">
              Profile
            </h2>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="text-sm text-gold-400 hover:text-gold-300"
              >
                Edit
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-stone-300"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={user.name}
                  required
                  className="w-full rounded-lg border border-stone-700 bg-stone-900/50 px-4 py-2.5 text-stone-200 outline-none transition focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="mb-1 block text-sm font-medium text-stone-300"
                >
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  defaultValue={user.address ?? ""}
                  className="w-full rounded-lg border border-stone-700 bg-stone-900/50 px-4 py-2.5 text-stone-200 outline-none transition focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                />
              </div>

              <div>
                <label
                  htmlFor="giftCardPref"
                  className="mb-1 block text-sm font-medium text-stone-300"
                >
                  Gift Card Preference
                </label>
                <select
                  id="giftCardPref"
                  name="giftCardPref"
                  defaultValue={user.giftCardPref ?? ""}
                  className="w-full rounded-lg border border-stone-700 bg-stone-900/50 px-4 py-2.5 text-stone-200 outline-none transition focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                >
                  <option value="">Select preference...</option>
                  {GIFT_CARD_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setError("");
                  }}
                  className="rounded-lg border border-stone-600 px-6 py-2.5 text-sm text-stone-300 transition hover:bg-stone-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3 text-sm">
              <InfoRow label="Name" value={user.name} />
              <InfoRow label="Email" value={user.email} />
              <InfoRow label="Address" value={user.address || "Not set"} />
              <InfoRow
                label="Gift Card Preference"
                value={user.giftCardPref || "Not set"}
              />
              <InfoRow
                label="Newsletter"
                value={user.newsletter ? "Subscribed" : "Not subscribed"}
              />
            </div>
          )}
        </div>

        <div className="glass-card p-6">
          <h2 className="mb-4 font-[family-name:var(--font-heading)] text-xl text-gold-400">
            Quiz History
          </h2>

          {user.scores.length === 0 ? (
            <p className="text-sm text-stone-400">
              No quizzes completed yet. Read a book and take a quiz to see your
              scores here.
            </p>
          ) : (
            <div className="space-y-3">
              {user.scores.map((score) => (
                <div
                  key={score.id}
                  className="flex items-center justify-between rounded-lg border border-stone-800 bg-stone-900/30 p-4"
                >
                  <div>
                    <p className="font-medium text-stone-200">
                      {score.book.title}
                    </p>
                    <p className="text-xs text-stone-500">
                      {new Date(score.completedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gold-400">
                      {score.score}/{score.total}
                    </p>
                    <p className="text-xs text-stone-400">
                      {Math.round(score.percentage)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-stone-800 pb-2">
      <span className="text-stone-400">{label}</span>
      <span className="text-stone-200">{value}</span>
    </div>
  );
}
