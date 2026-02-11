import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] gold-gradient mb-8">
        Terms of Service
      </h1>
      <div className="prose prose-invert prose-stone max-w-none space-y-6 text-stone-300 leading-relaxed">
        <p className="text-stone-400 text-sm">Last updated: February 2026</p>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using Book Creed (&quot;the Site&quot;), you agree to
            be bound by these Terms of Service. If you do not agree to these
            terms, do not use the Site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            2. Account Requirements
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>You must be at least 18 years of age to create an account</li>
            <li>
              You must provide accurate and complete registration information
            </li>
            <li>
              You are responsible for maintaining the security of your account
              credentials
            </li>
            <li>
              You may not create more than one account per person
            </li>
            <li>
              You are responsible for all activity that occurs under your account
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            3. Access Codes
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Access codes are provided with book purchases and grant access to
              book-specific quizzes
            </li>
            <li>
              Each access code is intended for the individual purchaser only
            </li>
            <li>
              Sharing, selling, or publicly posting access codes is prohibited
            </li>
            <li>
              We reserve the right to invalidate access codes that have been
              shared or misused
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            4. Prohibited Activities
          </h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Scrape, crawl, or use automated tools to extract quiz data or
              answers
            </li>
            <li>
              Share quiz questions or answers publicly or with other users
            </li>
            <li>
              Create multiple accounts to gain an unfair advantage in contests
            </li>
            <li>
              Use any form of cheating, automation, or exploitation to achieve
              quiz scores
            </li>
            <li>
              Attempt to reverse-engineer, decompile, or access the source code
              of quiz scoring systems
            </li>
            <li>
              Interfere with or disrupt the Site&apos;s infrastructure or other
              users&apos; experience
            </li>
            <li>
              Use the Site for any unlawful purpose
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            5. Intellectual Property
          </h2>
          <p>
            All content on Book Creed — including quiz questions, book
            descriptions, cover artwork, and site design — is protected by
            copyright and other intellectual property laws. Quiz questions are
            copyrighted works and may not be reproduced, distributed, or
            displayed without explicit written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            6. Contests
          </h2>
          <p>
            Skill-based contests are governed by the{" "}
            <a
              href="/contest/rules"
              className="text-gold-400 underline hover:text-gold-300"
            >
              Official Contest Rules
            </a>
            . By participating in any contest, you agree to be bound by those
            rules in addition to these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            7. Limitation of Liability
          </h2>
          <p>
            Book Creed is provided &quot;as is&quot; without warranties of any
            kind, either express or implied. To the fullest extent permitted by
            law, Book Creed and its operators shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages
            arising from your use of the Site.
          </p>
          <p>
            Our total liability for any claim arising from or related to the Site
            shall not exceed the amount you paid for the book associated with
            your claim.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            8. Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate your account at our
            discretion, without notice, for conduct that we determine violates
            these Terms or is harmful to other users, us, or third parties.
            Grounds for termination include but are not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Violation of any provision of these Terms</li>
            <li>Sharing access codes or quiz answers</li>
            <li>Creating multiple accounts</li>
            <li>Cheating or exploiting contest mechanics</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            9. Governing Law
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with the
            laws of the United States. Any disputes arising under these Terms
            shall be resolved in the courts of competent jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            10. Changes to Terms
          </h2>
          <p>
            We may revise these Terms at any time by updating this page.
            Continued use of the Site after changes constitutes acceptance of the
            revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-[family-name:var(--font-heading)] text-stone-200 mt-8 mb-3">
            11. Contact
          </h2>
          <p>
            For questions about these Terms, contact us at:
          </p>
          <p className="text-gold-400">legal@bookcreed.com</p>
        </section>
      </div>
    </div>
  );
}
