import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Eva Noir's Newsletter — Exclusive Updates & Behind-the-Scenes Content",
  description:
    "Join Eva Noir's newsletter for exclusive updates on The Kingdom of Valdrath series, behind-the-scenes writing insights, early access to new releases, and special content for fans.",
};

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-stone-950 pt-16">
      <div className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Join Eva Noir's{" "}
          <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
            Newsletter
          </span>
        </h1>
        
        <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-400 sm:text-xl">
          Get exclusive updates, behind-the-scenes content, and early access to new releases. 
          Join thousands of readers in Eva Noir's inner circle.
        </p>
        
        <div className="mt-12">
          <form className="mx-auto max-w-md">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-stone-700 bg-stone-900 px-4 py-3 text-stone-200 placeholder-stone-500 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                required
              />
              <button
                type="submit"
                className="rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3 font-semibold text-stone-900 hover:from-gold-400 hover:to-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-stone-800 bg-stone-900/50 p-6">
            <div className="text-2xl mb-3">📚</div>
            <h3 className="font-semibold text-stone-100 mb-2">First to Know</h3>
            <p className="text-sm text-stone-400">
              Get notified the moment new Valdrath books are available, before anyone else.
            </p>
          </div>
          
          <div className="rounded-lg border border-stone-800 bg-stone-900/50 p-6">
            <div className="text-2xl mb-3">✍️</div>
            <h3 className="font-semibold text-stone-100 mb-2">Behind the Scenes</h3>
            <p className="text-sm text-stone-400">
              Exclusive insights into Eva Noir's writing process and world-building.
            </p>
          </div>
          
          <div className="rounded-lg border border-stone-800 bg-stone-900/50 p-6">
            <div className="text-2xl mb-3">🎁</div>
            <h3 className="font-semibold text-stone-100 mb-2">Exclusive Content</h3>
            <p className="text-sm text-stone-400">
              Subscriber-only stories and bonus scenes you won't find anywhere else.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}