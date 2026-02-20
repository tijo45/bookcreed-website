import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Seven Scars of Cassian — The Kingdom of Valdrath",
  description:
    "Each scar tells a story. Each story changed a kingdom. Discover the Seven Scars of Cassian Stormborn — the prophecy written in flesh across eight books.",
  openGraph: {
    title: "The Seven Scars of Cassian — The Kingdom of Valdrath",
    description:
      "Each scar tells a story. Each story changed a kingdom. The prophecy of the Scarred King.",
    url: "https://bookcreed.com/lore/seven-scars",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Seven Scars of Cassian — The Kingdom of Valdrath",
    description:
      "Each scar tells a story. Each story changed a kingdom.",
  },
};

type Scar = {
  number: number;
  name: string;
  location: string;
  source: string;
  era: string;
  book: string;
  year: string;
  description: string;
  significance: string;
  quote?: string;
};

const scars: Scar[] = [
  {
    number: 1,
    name: "The Training Scar",
    location: "Left arm",
    source: "Combat training",
    era: "Youth",
    book: "Backstory",
    year: "~4975",
    description:
      "The first mark on the prince who would become the Scarred King. Earned in the royal training yard, where Daveth's sons learned that pain is the price of skill. Every warrior in Valdrath carries at least one training scar — it proves you began.",
    significance:
      "The beginning. Every story written on Cassian's body starts here. In Valdrath, a training scar is a rite of passage — proof that you stepped into the arena for the first time and survived.",
  },
  {
    number: 2,
    name: "The Crimson Shores Wound",
    location: "Torso",
    source: "War of the Crimson Shores",
    era: "Military service",
    book: "Backstory",
    year: "~4797–4802",
    description:
      "A wound from the five-year war against the Southern Confederacy — the war that killed King Roland IX and put Daveth on the throne. Cassian fought as a young soldier and carried the mark of that brutal campaign across his torso for the rest of his life.",
    significance:
      "War made Cassian a soldier. It also showed him what the Warrior Code demands: not just courage, but obedience. The torso scar is a reminder that he once fought without questioning why.",
  },
  {
    number: 3,
    name: "The Seven Farmers",
    location: "Hand (self-inflicted)",
    source: "Seven Farmers Incident",
    era: "Year 4988",
    book: "Backstory",
    year: "4988",
    description:
      "Cassian was ordered to execute seven farmers labeled as rebels. They were innocent. He obeyed. Afterward, he cut his own hand — the hand that held the sword — and fled into twelve years of self-imposed exile. He would not pick up a blade again for over a decade.",
    significance:
      "The scar that broke the prince. Self-inflicted — the only one Cassian chose. It represents the moment he realized the Code could make good men do monstrous things. This is the wound that sent him to Greyport, to Father Matthias, to the mechanic shop. Without this scar, there is no exile. Without exile, there is no return.",
    quote:
      "The farmers knelt. They didn't beg. They didn't run. They just... knelt. And I did what I was told.",
  },
  {
    number: 4,
    name: "The Cathedral Fire",
    location: "Back",
    source: "Church fire rescue",
    era: "Year 5000",
    book: "Book 1 — The Exile's Return",
    year: "5000",
    description:
      "Shadow Guard agents burned the cathedral to delay succession proceedings and eliminate witnesses. Cassian ran into the burning building to save those trapped inside, including Mrs. Chen. The flames seared his back. It was the first time in twelve years he had acted as a warrior — and he didn't use a sword.",
    significance:
      "The scar of selflessness. After twelve years of hiding from who he was, Cassian's body moved before his mind. He didn't fight anyone. He carried people out of a fire. This is the scar that proves strength doesn't require violence.",
  },
  {
    number: 5,
    name: "The Challenge of Brothers",
    location: "Chest",
    source: "Challenge Right vs. Lucian",
    era: "Year 5000",
    book: "Book 1 — The Exile's Return",
    year: "5000",
    description:
      "Cassian invoked the ancient Challenge Right against Lucian for murder, arson, and treason. Shirtless in the Grand Arena, scars visible, the two brothers fought. Lucian's blade found Cassian's chest. Cassian won — but showed mercy, exiling Lucian instead of killing him.",
    significance:
      "The scar of mercy. Cassian could have ended everything here. Instead, he chose to spare his brother. That mercy would haunt him for years — Lucian's agents would poison Father Matthias, terrorize the kingdom, and force Cassian back to violence. The chest scar asks the question the series spends six books answering: was mercy a gift or a mistake?",
  },
  {
    number: 6,
    name: "The Battle of Iron Bridge",
    location: "Face",
    source: "Battle during the civil war",
    era: "Year 5002",
    book: "Book 5 — The Gathering Storm",
    year: "5002",
    description:
      "During the campaign to retake the Capital from Edric's coup, Cassian fights on the front lines. A blade catches his face — the first scar anyone can see without him removing his shirt. The Scarred King's marks are now visible to the world.",
    significance:
      "The scar that can't be hidden. Until now, Cassian's scars were beneath his clothes — private scripture. The face scar makes his history public. He can no longer be just a mechanic from Greyport. He is, visibly and undeniably, the Scarred King.",
  },
  {
    number: 7,
    name: "The Final Duel",
    location: "Over the heart",
    source: "Final duel with Lucian",
    era: "Year 5002",
    book: "Book 6 — The Final Scar",
    year: "5002",
    description:
      "Cassian infiltrates the Shadow Guard fortress alone. He offers Lucian mercy one final time. Lucian refuses. In the duel that follows, Lucian's blade cuts deep across Cassian's chest — directly over the heart. Cassian's sword enters Lucian below the ribs. Lucian dies in his brother's arms, reaching for Cassian's hand in his final moment. Cassian carries his brother's body down the mountain.",
    significance:
      "The scar that completes the prophecy. Seven scars. The last one over the heart — because the deepest wound is always the one you carry for the people you love. Cassian broke his own mercy oath to save the kingdom. The seventh scar is not a medal. It's the cost of doing what no one else could.",
    quote:
      "These scars are not medals. They are failures I survived.",
  },
];

export default function SevenScarsPage() {
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
          <span className="text-stone-300">The Seven Scars</span>
        </nav>

        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
            The Prophecy Written in Flesh
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-stone-100 sm:text-5xl">
            <span className="gold-gradient">The Seven Scars</span>
          </h1>
          <div className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-400">
            In Valdrath, scars are scripture — holy text written on the body.
            Cassian Stormborn carries seven. Each one is a chapter in the story
            of a kingdom&apos;s transformation.
          </p>
        </div>

        {/* Prophecy callout */}
        <div className="mb-16 glass-card relative overflow-hidden p-8 text-center">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent" />
          <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-gold-500/70">
            From the Sealed Archives — Discovered by Marcus Stormborn
          </p>
          <blockquote className="relative mt-4 font-[family-name:var(--font-heading)] text-xl italic leading-relaxed text-stone-200 sm:text-2xl">
            &ldquo;A prince twice-broken bearing seven scars
            <br />
            shall forge the Code anew.&rdquo;
          </blockquote>
          <p className="relative mt-4 text-sm text-stone-500">
            — The Prophecy of the Scarred King
          </p>
        </div>

        {/* Scars */}
        <div className="space-y-8">
          {scars.map((scar) => (
            <article
              key={scar.number}
              className="group glass-card relative overflow-hidden"
            >
              {/* Number accent */}
              <div className="absolute -right-4 -top-4 font-[family-name:var(--font-heading)] text-[8rem] font-bold leading-none text-stone-800/20 select-none">
                {scar.number}
              </div>

              <div className="relative p-6 sm:p-8">
                {/* Header row */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-red-500/40 bg-red-500/10 font-[family-name:var(--font-heading)] text-sm font-bold text-red-400">
                    {scar.number}
                  </span>
                  <div>
                    <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-stone-100 sm:text-2xl">
                      {scar.name}
                    </h2>
                    <p className="text-sm text-stone-500">
                      {scar.location} · {scar.source}
                    </p>
                  </div>
                </div>

                {/* Meta */}
                <div className="mt-4 flex flex-wrap gap-3">
                  <span className="rounded-md bg-stone-800/60 px-2.5 py-1 text-xs text-stone-400">
                    📅 {scar.year}
                  </span>
                  <span className="rounded-md bg-stone-800/60 px-2.5 py-1 text-xs text-stone-400">
                    📖 {scar.book}
                  </span>
                  <span className="rounded-md bg-stone-800/60 px-2.5 py-1 text-xs text-stone-400">
                    📍 {scar.location}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-5 text-sm leading-relaxed text-stone-300">
                  {scar.description}
                </p>

                {/* Significance */}
                <div className="mt-5 border-l-4 border-gold-500/30 bg-stone-900/30 py-3 pl-5 pr-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold-500/70">
                    Significance
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-stone-400">
                    {scar.significance}
                  </p>
                </div>

                {/* Quote */}
                {scar.quote && (
                  <blockquote className="mt-5 text-center italic text-stone-400">
                    <span className="text-gold-500/60">&ldquo;</span>
                    {scar.quote}
                    <span className="text-gold-500/60">&rdquo;</span>
                    <span className="mt-1 block text-xs text-stone-600">
                      — Cassian Stormborn
                    </span>
                  </blockquote>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Epilogue */}
        <div className="mt-16 glass-card p-8 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-stone-200">
            Seven Is Enough
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-stone-400">
            There is no eighth scar. In Book 7, Cassian stands before the Great
            Council and shows each scar, one by one.{" "}
            <em>
              &ldquo;These scars are not medals. They are failures I
              survived.&rdquo;
            </em>{" "}
            The prophecy is fulfilled. The Scarred King is not a conqueror — he
            is a gardener who came home.
          </p>
          <p className="mt-4 text-sm italic text-stone-500">
            &ldquo;Plant the tomatoes. Tend them. The rest takes care of
            itself.&rdquo;
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-stone-700 to-transparent" />
          <p className="mt-8 font-[family-name:var(--font-heading)] text-lg text-stone-400">
            Read every scar&apos;s story
          </p>
          <a
            href="https://www.amazon.com/dp/B0DZSB8MBH"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-4 inline-block"
          >
            Start with Book 1 — The Exile&apos;s Return
          </a>
        </div>
      </div>
    </div>
  );
}
