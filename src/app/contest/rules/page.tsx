import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Official Contest Rules",
};

export default function ContestRulesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] gold-gradient mb-8">
        Official Contest Rules
      </h1>
      <div className="prose prose-invert prose-stone max-w-none space-y-6 text-stone-300 leading-relaxed">
        <p className="text-stone-400 text-sm">Last updated: February 2026</p>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            1. Sponsor
          </h2>
          <p>
            The Book Creed Quiz Challenge (&quot;Contest&quot;) is sponsored by
            Book Creed (&quot;Sponsor&quot;). Contact: contests@bookcreed.com
          </p>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            2. Eligibility
          </h2>
          <p>
            The Contest is open to legal residents of the United States who are
            18 years of age or older at the time of entry. Employees of the
            Sponsor and their immediate family members are not eligible.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            3. Contest Period
          </h2>
          <p>
            Each Contest runs as a &quot;cohort&quot; with specific start and end
            dates. The current cohort&apos;s dates are displayed on the{" "}
            <a
              href="/leaderboard"
              className="text-gold-400 underline hover:text-gold-300"
            >
              Leaderboard
            </a>{" "}
            page. All entries must be submitted before the cohort end date and
            time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            4. How to Enter
          </h2>
          <p>To enter the Contest, you must:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Purchase a book</strong> from The Kingdom of Valdrath
              series (or an applicable series as specified by the cohort)
            </li>
            <li>
              <strong>Obtain your access code</strong> included with your book
              purchase
            </li>
            <li>
              <strong>Create an account</strong> at bookcreed.com with your name,
              email, and optionally your shipping address and gift card
              preference
            </li>
            <li>
              <strong>Unlock and complete the quiz</strong> for your book using
              the access code
            </li>
          </ol>
          <p>
            Your quiz score is automatically entered into any active contest
            cohort. One entry per user per cohort.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            5. This Is a Skill-Based Contest
          </h2>
          <p>
            This Contest is a <strong>skill-based competition</strong>, not a
            game of chance. Winners are determined solely by their knowledge of
            the book content as demonstrated through quiz performance. No element
            of chance is involved in determining the winner.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            6. Scoring and Winner Determination
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Each quiz consists of 100 multiple-choice questions drawn from the
              book content
            </li>
            <li>
              Your score is calculated as a percentage of correct answers
            </li>
            <li>
              The entrant with the <strong>highest percentage score</strong> at
              the end of the cohort period wins
            </li>
            <li>
              <strong>Tiebreaker:</strong> If two or more entrants achieve the
              same score, the entrant who submitted their quiz earliest wins
            </li>
            <li>
              Only your most recent quiz submission for each book counts toward
              the contest
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            7. Prize
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Prize:</strong> A gift card of the winner&apos;s choice
              (e.g., Amazon, Visa, Target). The value of the prize is specified
              per cohort on the Leaderboard page.
            </li>
            <li>
              <strong>Delivery:</strong> The gift card will be delivered
              electronically to the winner&apos;s registered email address, or
              physically to their registered shipping address, based on the
              winner&apos;s preference.
            </li>
            <li>
              Prize is non-transferable and cannot be exchanged for cash (other
              than Visa gift cards).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            8. Winner Notification
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              The winner will be notified via email at their registered email
              address within <strong>7 days</strong> of the cohort end date
            </li>
            <li>
              The winner must respond to the notification within{" "}
              <strong>14 days</strong> to claim their prize
            </li>
            <li>
              If the winner does not respond within 14 days, the prize is
              forfeited and may be awarded to the next-highest-scoring entrant
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            9. General Conditions
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Sponsor reserves the right to disqualify any entrant who violates
              these rules or the Site&apos;s Terms of Service
            </li>
            <li>
              Sponsor reserves the right to cancel, modify, or suspend the
              Contest if fraud, technical failures, or other factors compromise
              its integrity
            </li>
            <li>
              By entering, you grant Sponsor permission to use your name and
              score for leaderboard display and winner announcements
            </li>
            <li>
              Any attempt to tamper with the quiz system, use automated tools, or
              otherwise cheat will result in disqualification and potential
              account termination
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            10. Release and Limitations of Liability
          </h2>
          <p>
            By entering the Contest, you release the Sponsor from any and all
            liability, claims, or actions arising from or related to the Contest,
            including but not limited to: (a) any technical failures or
            malfunctions, (b) any incorrect or inaccurate information, (c) any
            injury or damage related to participation, and (d) any prize-related
            issues.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            11. Privacy
          </h2>
          <p>
            Information collected in connection with the Contest is subject to
            the Sponsor&apos;s{" "}
            <a
              href="/privacy"
              className="text-gold-400 underline hover:text-gold-300"
            >
              Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            12. Governing Law
          </h2>
          <p>
            This Contest is governed by the laws of the United States. Any
            disputes shall be resolved through binding arbitration or in courts
            of competent jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            13. Contact
          </h2>
          <p>
            For questions about the Contest, contact:
          </p>
          <p className="text-gold-400">contests@bookcreed.com</p>
        </section>
      </div>
    </div>
  );
}
