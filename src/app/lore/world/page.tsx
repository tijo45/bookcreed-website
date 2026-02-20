import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The World — The Kingdom of Valdrath",
  description:
    "Discover the Kingdom of Valdrath: geography, politics, the Warrior Code, the Church of the Eternal Blade, and a culture where scars are scripture and combat is prayer.",
  openGraph: {
    title: "The World — The Kingdom of Valdrath",
    description:
      "Geography, politics, religion, and culture of a kingdom where strength proves worth and scars tell the truth.",
    url: "https://bookcreed.com/lore/world",
    type: "website",
  },
};

type Section = {
  id: string;
  icon: string;
  title: string;
  content: React.ReactNode;
};

const sections: Section[] = [
  {
    id: "geography",
    icon: "🗺️",
    title: "Geography",
    content: (
      <>
        <p>
          Valdrath is a warrior kingdom roughly 5,000 years old, spanning from
          the <strong>Iron Mountains</strong> in the north to the border of the{" "}
          <strong>Southern Confederacy</strong>, and from the western mountain
          fortresses to the <strong>Azure Sea</strong> trade routes in the east.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            {
              name: "The Capital",
              desc: "Skyscrapers alongside ancient towers. Highways through historic districts. A city where progress and tradition wage constant war.",
            },
            {
              name: "Greyport",
              desc: "Industrial city in the far north. Factories, immigrants, dockworkers — a place where bloodlines don't matter. Cassian's home in exile.",
            },
            {
              name: "Iron Mountains",
              desc: "The great mountain range forming Valdrath's northern border. Barbarian hordes once invaded from beyond these peaks.",
            },
            {
              name: "Azure Sea",
              desc: "The eastern sea, vital for trade. Valdrath's naval and commercial lifeline to the wider world.",
            },
            {
              name: "Fortress of Ironhold",
              desc: "Abandoned military fortress on a mountain saddle, sheer drops on three sides. Used by Lucian as his shadow war base.",
            },
            {
              name: "Karshen",
              desc: "A freeport city in the Southern Confederacy. Major harbor and merchant quarter. Lucian's base during exile.",
            },
          ].map((loc) => (
            <div
              key={loc.name}
              className="rounded-lg border border-stone-800/50 bg-stone-900/30 p-4"
            >
              <h4 className="font-[family-name:var(--font-heading)] text-sm font-bold text-gold-400">
                {loc.name}
              </h4>
              <p className="mt-1 text-sm text-stone-400">{loc.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "warrior-code",
    icon: "⚔️",
    title: "The Warrior Code",
    content: (
      <>
        <p>
          For five millennia, Valdrath has been governed by three tenets forged
          by Aldric the Unifier:
        </p>
        <div className="mt-6 space-y-4">
          {[
            {
              tenet: "Strength Proves Worth",
              desc: "Merit demonstrated through action, not words or birth. Combat trials determine rank, succession, and legal disputes.",
            },
            {
              tenet: "Honor Demands Truth",
              desc: "Deception is weakness. Confession is strength. The Quenching ritual allows warriors to confess without judgment.",
            },
            {
              tenet: "Scars Are History Written in Flesh",
              desc: "The body is a holy text. Scars record your contribution to creation. Hiding them is lying to the Divine.",
            },
          ].map((t) => (
            <blockquote
              key={t.tenet}
              className="border-l-4 border-gold-500/40 bg-stone-900/30 py-3 pl-5 pr-4"
            >
              <p className="font-[family-name:var(--font-heading)] text-base font-bold text-gold-400">
                &ldquo;{t.tenet}&rdquo;
              </p>
              <p className="mt-1 text-sm text-stone-400">{t.desc}</p>
            </blockquote>
          ))}
        </div>
        <p className="mt-6 text-sm text-stone-400 italic">
          In Book 3, Marcus Stormborn proves the Code was corrupted 800 years
          ago by King Aldric IV. The original Code was about{" "}
          <strong>moral strength</strong>, not martial supremacy. This discovery
          drives the reform movement at the series&apos; heart.
        </p>
      </>
    ),
  },
  {
    id: "politics",
    icon: "👑",
    title: "Politics & Succession",
    content: (
      <>
        <p>
          The Stormborn dynasty has ruled Valdrath for 3,753 years since Garrett
          Stormborn, a blacksmith&apos;s son, defeated seven champions in a
          single day during the Phoenix Restoration.
        </p>
        <div className="mt-6 space-y-4">
          <div className="rounded-lg border border-stone-800/50 bg-stone-900/30 p-5">
            <h4 className="font-[family-name:var(--font-heading)] text-sm font-bold text-gold-400">
              Succession by Strength
            </h4>
            <p className="mt-2 text-sm text-stone-400">
              The throne passes to the strongest heir, not necessarily the
              eldest. Worth must be proved through combat — the Seven&apos;s
              Trial, where a warrior faces seven opponents shirtless, scars
              visible, to prove their worth.
            </p>
          </div>
          <div className="rounded-lg border border-stone-800/50 bg-stone-900/30 p-5">
            <h4 className="font-[family-name:var(--font-heading)] text-sm font-bold text-gold-400">
              Challenge Right
            </h4>
            <p className="mt-2 text-sm text-stone-400">
              Any noble may challenge another&apos;s claim through single
              combat. It was during a Challenge Right that Crown Prince Aldric
              was assassinated — his blade sabotaged. And it was through
              Challenge Right that Cassian defeated Lucian and won the claim he
              would voluntarily give to Theo.
            </p>
          </div>
          <div className="rounded-lg border border-stone-800/50 bg-stone-900/30 p-5">
            <h4 className="font-[family-name:var(--font-heading)] text-sm font-bold text-gold-400">
              The Seven Princes
            </h4>
            <p className="mt-2 text-sm text-stone-400">
              King Daveth fathered seven sons: Aldric (dead), Cassian (exiled,
              returned), Edric (usurper, exiled), Vincent (Lord Marshal,
              retired), Marcus (Lord Chancellor), Lucian (dead), and Theo
              (King). Each represents a different vision for Valdrath&apos;s
              future.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "religion",
    icon: "🕯️",
    title: "The Church of the Eternal Blade",
    content: (
      <>
        <p>
          Founded in Year 2150 by Queen Isabella the Wise, the Church unified
          hundreds of warrior cults under a single theology. It remains deeply
          intertwined with the state.
        </p>
        <div className="mt-6 space-y-4">
          <div className="rounded-lg border border-stone-800/50 bg-stone-900/30 p-5">
            <h4 className="font-[family-name:var(--font-heading)] text-sm font-bold text-gold-400">
              Core Theology — The Divine Smith
            </h4>
            <p className="mt-2 text-sm text-stone-400">
              The Creator forged the world through cosmic combat. Struggle is
              sacred. Combat is prayer. Scars are scripture written on the body —
              to hide them is to lie to the Divine.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                name: "Sunday Forging",
                desc: "Weekly worship service",
              },
              {
                name: "The Quenching",
                desc: "Ritual confession — warriors speak truth without judgment",
              },
              {
                name: "Rite of Scars",
                desc: "Coming-of-age ceremony proving adulthood through combat",
              },
              {
                name: "Blessing of Blades",
                desc: "Consecration of weapons as sacred instruments",
              },
            ].map((r) => (
              <div
                key={r.name}
                className="rounded-lg border border-stone-800/50 bg-stone-900/30 p-4"
              >
                <h4 className="font-[family-name:var(--font-heading)] text-sm font-bold text-stone-200">
                  {r.name}
                </h4>
                <p className="mt-1 text-xs text-stone-500">{r.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-stone-400">
            The Church hierarchy mirrors military structure: the{" "}
            <strong>High Forge</strong> (cathedral) leads, followed by{" "}
            <strong>Regional Forges</strong> and <strong>Parish Forges</strong>,
            led by Forge-Masters and Forge-Keepers. Father Matthias Ironhand, the
            Forge-Keeper of Greyport, served as Cassian&apos;s spiritual father
            for twelve years of exile.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "technology",
    icon: "⚙️",
    title: "Technology & Culture",
    content: (
      <>
        <p>
          Valdrath exists at a fascinating crossroads: a kingdom with{" "}
          <strong>airships, firearms, and electronics</strong> that still values
          hand-to-hand combat as the measure of a person&apos;s worth.
        </p>
        <div className="mt-6 rounded-lg border border-stone-800/50 bg-stone-900/30 p-5">
          <p className="text-sm text-stone-400">
            Firearms are <em>tools</em>. Blades prove <em>worth</em>. A soldier
            may carry a rifle on the battlefield, but promotion comes through the
            arena. Technology serves the kingdom; the Warrior Code defines it.
          </p>
          <p className="mt-3 text-sm text-stone-400">
            The Capital is a city of contrasts: skyscrapers next to ancient
            towers, highways cutting through historic districts. Greyport is the
            industrial heart — factories, docks, and a working-class immigrant
            population that measures people by what they can do, not who they were
            born to.
          </p>
        </div>
        <p className="mt-6 text-sm italic text-stone-500">
          This tension — between tradition and progress, between the sword and
          the future — is the beating heart of the entire series.
        </p>
      </>
    ),
  },
  {
    id: "houses",
    icon: "🦅",
    title: "Great Houses & Factions",
    content: (
      <>
        <div className="space-y-4">
          {[
            {
              name: "House Stormborn",
              sigil: "Silver eagle with spread wings",
              colors: "Midnight Blue & Silver",
              motto: "Forged in Thunder",
              desc: "The royal house. Founded by Garrett Stormborn after the Phoenix Restoration. Has ruled for 3,753 years. Current members include the seven princes.",
            },
            {
              name: "House Harston",
              sigil: "—",
              colors: "Crimson & Black",
              motto: "—",
              desc: "Lords of the Eastern Marches. Led conservative opposition to Theo's reforms. Lord Harston voted against the Reformed Code but accepted the process — principled opposition, not treachery.",
            },
            {
              name: "House Ashworth",
              sigil: "—",
              colors: "Silver & Grey",
              motto: "—",
              desc: "Eastern lords. Lord Ashworth was a moderate conservative who broke from the coalition after the school burning. His two daughters attended the reform school.",
            },
            {
              name: "The Southern Confederacy",
              sigil: "Wheel-and-star",
              colors: "Red & Grey",
              motto: "—",
              desc: "A foreign power south of Valdrath. Backed Edric's coup, then later launched a full-scale invasion with 100,000 troops. Defeated at the Battle of Ashen Ford.",
            },
          ].map((house) => (
            <div
              key={house.name}
              className="rounded-lg border border-stone-800/50 bg-stone-900/30 p-5"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h4 className="font-[family-name:var(--font-heading)] text-base font-bold text-gold-400">
                  {house.name}
                </h4>
                {house.colors !== "—" && (
                  <span className="rounded-full bg-stone-800/60 px-2.5 py-0.5 text-xs text-stone-400">
                    {house.colors}
                  </span>
                )}
              </div>
              {house.motto !== "—" && (
                <p className="mt-1 text-xs italic text-stone-500">
                  &ldquo;{house.motto}&rdquo;
                </p>
              )}
              <p className="mt-2 text-sm text-stone-400">{house.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
];

export default function WorldPage() {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-stone-900)_0%,_var(--color-stone-950)_70%)]" />

      <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-stone-500">
          <Link href="/lore" className="hover:text-gold-400 transition-colors">
            Lore
          </Link>
          <span className="mx-2">/</span>
          <span className="text-stone-300">The World</span>
        </nav>

        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
            Geography · Politics · Religion · Culture
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-stone-100 sm:text-5xl">
            <span className="gold-gradient">The Kingdom of Valdrath</span>
          </h1>
          <div className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-400">
            A kingdom where combat is prayer and scars are scripture. Where
            airships share the sky with ancient traditions, and a single
            corrupted code shapes the lives of millions.
          </p>
        </div>

        {/* Table of contents */}
        <div className="mb-12 glass-card p-6">
          <h2 className="font-[family-name:var(--font-heading)] text-sm font-bold text-stone-300 uppercase tracking-wider">
            Contents
          </h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-lg border border-stone-800/50 px-3 py-1.5 text-sm text-stone-400 transition-colors hover:border-gold-500/30 hover:text-gold-400"
              >
                {s.icon} {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-16">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{section.icon}</span>
                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-stone-100">
                  {section.title}
                </h2>
              </div>
              <div className="mt-1 h-px w-full bg-gradient-to-r from-gold-500/30 to-transparent" />
              <div className="mt-6 text-sm leading-relaxed text-stone-300">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-stone-700 to-transparent" />
          <p className="mt-8 font-[family-name:var(--font-heading)] text-lg text-stone-400">
            Step into the kingdom
          </p>
          <a
            href="https://www.amazon.com/dp/B0DZSB8MBH"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-4 inline-block"
          >
            Read the Books on Amazon
          </a>
        </div>
      </div>
    </div>
  );
}
