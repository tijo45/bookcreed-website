import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] gold-gradient mb-8">
        Privacy Policy
      </h1>
      <div className="prose prose-invert prose-stone max-w-none space-y-6 text-stone-300 leading-relaxed">
        <p className="text-stone-400 text-sm">Last updated: February 2026</p>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            1. Information We Collect
          </h2>
          <p>
            When you create an account on Book Creed, we collect the following
            information:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Name</strong> — used to display on leaderboards and
              identify contest winners
            </li>
            <li>
              <strong>Email address</strong> — used for account authentication,
              winner notifications, and optional newsletter
            </li>
            <li>
              <strong>Password</strong> — stored as a one-way cryptographic hash
              (bcrypt); we never store or have access to your plain-text password
            </li>
            <li>
              <strong>Shipping address</strong> (optional) — used solely for
              gift card prize delivery to contest winners
            </li>
            <li>
              <strong>Gift card preference</strong> (optional) — your preferred
              gift card brand for prize selection
            </li>
            <li>
              <strong>Quiz scores</strong> — your quiz completion data including
              scores, timestamps, and book associations
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To provide and maintain your account</li>
            <li>To display your name and scores on public leaderboards</li>
            <li>
              To enter you into skill-based contests and deliver prizes to
              winners
            </li>
            <li>
              To send you newsletter emails (only if you opt in; you can
              unsubscribe at any time)
            </li>
            <li>To respond to your support requests</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            3. Data Sharing
          </h2>
          <p>
            We do <strong>not</strong> sell, rent, or share your personal
            information with any third parties. Your data is used exclusively for
            the purposes described in this policy.
          </p>
          <p>
            Your name and quiz scores may appear on public leaderboards visible
            to other users of the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            4. Data Retention
          </h2>
          <p>
            We retain your account data for as long as your account is active. If
            you wish to delete your account and all associated data, you may
            request deletion by contacting us at the email address below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            5. Your Rights
          </h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Access</strong> your personal data stored on our platform
            </li>
            <li>
              <strong>Correct</strong> any inaccurate information via your
              account settings
            </li>
            <li>
              <strong>Delete</strong> your account and all associated data by
              contacting us
            </li>
            <li>
              <strong>Opt out</strong> of newsletter communications at any time
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            6. Cookies
          </h2>
          <p>
            Book Creed uses only <strong>essential cookies</strong> required for
            authentication and session management. We do not use tracking
            cookies, analytics cookies, or any third-party cookies. No data is
            shared with advertising networks or analytics providers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            7. Security
          </h2>
          <p>
            We take reasonable measures to protect your personal information,
            including:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Passwords are hashed using bcrypt before storage</li>
            <li>All data is transmitted over HTTPS</li>
            <li>Access codes are stored as SHA-256 hashes</li>
            <li>
              Authentication uses secure JWT tokens with server-side validation
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            8. Children&apos;s Privacy
          </h2>
          <p>
            Book Creed is intended for users aged 18 and older. We do not
            knowingly collect personal information from children under 18. If we
            learn that we have collected personal information from a child under
            18, we will delete it promptly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            9. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            registered users of material changes via email. The &quot;Last
            updated&quot; date at the top of this page indicates the most recent
            revision.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            10. Contact Us
          </h2>
          <p>
            For any questions about this Privacy Policy or to exercise your data
            rights, please contact us at:
          </p>
          <p className="text-gold-400">privacy@bookcreed.com</p>
        </section>
      </div>
    </div>
  );
}
