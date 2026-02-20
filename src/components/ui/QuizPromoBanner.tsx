import Link from "next/link";

interface QuizPromoBannerProps {
  variant?: "default" | "compact";
}

export function QuizPromoBanner({ variant = "default" }: QuizPromoBannerProps) {
  if (variant === "compact") {
    return (
      <div className="glass-card relative overflow-hidden p-6 text-center transition-all duration-300 hover:border-gold-500/30">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-500/5 blur-3xl" />
        <div className="relative z-10">
          <p className="text-2xl font-bold">📚 Read. 🧠 Quiz. 🏆 Win.</p>
          <p className="mt-2 text-sm text-stone-400">
            Test your knowledge &amp; compete for gift cards.
          </p>
          <Link
            href="/quiz"
            className="mt-4 inline-block rounded-lg bg-gold-500/10 px-6 py-2 text-sm font-semibold text-gold-400 ring-1 ring-gold-500/30 transition-all hover:bg-gold-500/20 hover:ring-gold-500/50"
          >
            Take a Quiz →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card relative overflow-hidden p-8 sm:p-12 transition-all duration-300 hover:border-gold-500/30">
      {/* Background glows */}
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-gold-600/5 blur-3xl" />

      <div className="relative z-10 text-center">
        <p className="text-4xl font-bold sm:text-5xl">📚 Read. 🧠 Quiz. 🏆 Win.</p>

        <h3 className="mt-4 font-[family-name:var(--font-heading)] text-2xl font-bold text-stone-100 sm:text-3xl">
          Think You Know <span className="gold-gradient">Valdrath</span>?
        </h3>

        <p className="mx-auto mt-4 max-w-xl text-stone-400">
          Every book in the Kingdom of Valdrath series has a quiz with 100
          unique questions. Read the book, find the access code, take the quiz,
          and compete on the leaderboard for real gift card prizes. The highest
          scores win — no random draws, just skill.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/quiz"
            className="btn-primary rounded-lg px-8 py-3 text-base"
          >
            Take a Quiz Now
          </Link>
          <Link
            href="/leaderboard"
            className="rounded-lg border border-stone-700 px-8 py-3 text-base font-semibold text-stone-300 transition-all hover:border-gold-500/50 hover:text-gold-400"
          >
            View Leaderboard
          </Link>
        </div>

        <p className="mt-6 text-xs text-stone-500">
          Access codes are found on the Quiz Challenge page at the end of each
          book.
        </p>
      </div>
    </div>
  );
}
