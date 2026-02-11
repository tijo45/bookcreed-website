"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/account");
    router.refresh();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card w-full max-w-md p-8"
    >
      <h1 className="gold-gradient mb-6 text-center font-[family-name:var(--font-heading)] text-3xl font-bold">
        Sign In
      </h1>

      {registered && (
        <div className="mb-4 rounded-lg bg-green-900/50 p-3 text-center text-sm text-green-300">
          Account created successfully. Please sign in.
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-lg bg-red-900/50 p-3 text-center text-sm text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-stone-300"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-stone-700 bg-stone-900/50 px-4 py-2.5 text-stone-200 outline-none transition focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-stone-300"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-lg border border-stone-700 bg-stone-900/50 px-4 py-2.5 text-stone-200 outline-none transition focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-stone-400">
        Don&apos;t have an account?{" "}
        <Link href="/account/register" className="text-gold-400 hover:text-gold-300">
          Create one
        </Link>
      </p>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-160px)] items-center justify-center px-4 py-12">
      <Suspense
        fallback={
          <div className="glass-card w-full max-w-md p-8 animate-pulse h-96" />
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
