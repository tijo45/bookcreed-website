"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const GIFT_CARD_OPTIONS = ["Amazon", "Visa", "Target", "Other"];

export default function RegisterPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setGlobalError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const address = formData.get("address") as string;
    const giftCardPref = formData.get("giftCardPref") as string;
    const newsletter = formData.get("newsletter") === "on";

    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email address";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          address: address || undefined,
          giftCardPref: giftCardPref || undefined,
          newsletter,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setGlobalError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      router.push("/account/login?registered=true");
    } catch {
      setGlobalError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-160px)] items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card w-full max-w-md p-8"
      >
        <h1 className="gold-gradient mb-6 text-center font-[family-name:var(--font-heading)] text-3xl font-bold">
          Create Account
        </h1>

        {globalError && (
          <div className="mb-4 rounded-lg bg-red-900/50 p-3 text-center text-sm text-red-300">
            {globalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Name" name="name" type="text" error={errors.name} required />
          <Field label="Email" name="email" type="email" error={errors.email} required />
          <Field
            label="Password"
            name="password"
            type="password"
            error={errors.password}
            required
          />
          <Field
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            error={errors.confirmPassword}
            required
          />
          <Field label="Address (optional)" name="address" type="text" />

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

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              className="h-4 w-4 rounded border-stone-600 bg-stone-800 accent-gold-500"
            />
            <label htmlFor="newsletter" className="text-sm text-stone-300">
              Subscribe to newsletter for updates and contests
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-stone-400">
          Already have an account?{" "}
          <Link href="/account/login" className="text-gold-400 hover:text-gold-300">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  error,
  required,
}: {
  label: string;
  name: string;
  type: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-stone-300">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={`w-full rounded-lg border bg-stone-900/50 px-4 py-2.5 text-stone-200 outline-none transition focus:ring-1 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-stone-700 focus:border-gold-500 focus:ring-gold-500"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
