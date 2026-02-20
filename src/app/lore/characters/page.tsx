import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Characters — The Kingdom of Valdrath",
  description:
    "Meet the Stormborn brothers and key figures of Valdrath: Cassian the Scarred King, Lucian the Shadow, King Daveth, Theo the Reformer, and more.",
  openGraph: {
    title: "Characters — The Kingdom of Valdrath",
    description:
      "Meet the Stormborn brothers and key figures of Valdrath. Warriors, kings, schemers, and saints.",
    url: "https://bookcreed.com/lore/characters",
    type: "website",
  },
};

type Character = {
  name: string;
  title: string;
  status: string;
  born: string;
  died?: string;
  description: string;
  traits: string;
  category: "stormborn" | "ally" | "antagonist";
  spoilerLevel?: number; // 0 = no spoilers, 1 = Book 1
};

const characters: Character[] = [
  {
    name: "Cassian Stormborn",
    title: "The Scarred King · Second Prince of Valdrath",
    status: "Alive — Greyport",
    born: "Year 4960",
    description:
      "6'2\", lean muscle. Dark hair, grey eyes. Body covered in seven scars — each one a chapter in the story of Valdrath's transformation. Exiled himself at 28 after the Seven Farmers Incident. Returned at 40 to find his eldest brother dead and a kingdom rotting from within. A man who could be king but chose to be a gardener.",
    traits: "Intense · Haunted · Moral · Elite warrior · Tactical mind",
    category: "stormborn",
  },
  {
    name: "Lucian Stormborn",
    title: "Sixth Prince · Former Captain of the Shadow Guard",
    status: "Deceased",
    born: "Year 4972",
    died: "Year 5002",
    description:
      "The third Stormborn brother — charming, ruthless, and driven by a secret that consumed him. He built a shadow network from exile, waged a guerrilla war, and terrorized the kingdom. In the end, he refused Cassian's final offer of mercy. He died in his brother's arms, reaching for Cassian's hand.",
    traits: "Charming · Ruthless · Ambitious · Master manipulator",
    category: "stormborn",
  },
  {
    name: "King Daveth Stormborn",
    title: "King of Valdrath · Keeper of the Ancient Code",
    status: "Deceased",
    born: "Year 4933",
    died: "Year 5000",
    description:
      "6'4\", silver-haired, heavily scarred, eyes like storm clouds. Ruled for 35 years with an iron fist. His body told the story of a hundred battles. He showed love through harsh training and could never adapt to a changing world. He died during the succession crisis — but not before reconciling with Cassian at his bedside.",
    traits: "Uncompromising · Iron-willed · Master warrior · Haunted",
    category: "stormborn",
  },
  {
    name: "King Theo Stormborn",
    title: "King of Valdrath · Lord of Valdrath",
    status: "Alive — Reigning King",
    born: "Year 4983",
    description:
      "The youngest brother, crowned at 17 — the youngest king in centuries. Dark hair like Cassian, his mother's eyes. He never knew his mother; she died bringing him into the world. Survived Lucian's captivity, led the Great Council, proved himself as a wartime king against the Confederate invasion. His reign is secure for a generation.",
    traits: "Idealistic · Resilient · Bridge between brothers",
    category: "stormborn",
  },
  {
    name: "Aldric Stormborn",
    title: "Crown Prince · First Blade of Valdrath",
    status: "Deceased",
    born: "Year 4958",
    died: "Year 5000",
    description:
      "6'5\", powerfully built, golden-haired. Perfect, charismatic, but brittle underneath. The Crown Prince who never truly failed or suffered. His assassination during a Challenge Right — his blade sabotaged — is the spark that ignites the entire series.",
    traits: "Charismatic · Master swordsman · Natural leader",
    category: "stormborn",
  },
  {
    name: "Vincent Stormborn",
    title: "Lord Marshal of the Royal Army",
    status: "Retired",
    born: "Year 4965",
    description:
      "6'3\", heavily muscled, black hair, dark eyes. A true warrior with no interest in politics. He brought 60,000 troops to Theo's cause during the civil war and commanded the defense against the Confederate invasion. Loyal to the crown regardless of who wears it. Retired after the war and died peacefully.",
    traits: "True warrior · Master tactician · Unwavering loyalty",
    category: "stormborn",
  },
  {
    name: "Marcus Stormborn",
    title: "Lord Chancellor · Master of the Academy",
    status: "Alive",
    born: "Year 4968",
    description:
      "5'11\", slender. Brown hair, grey eyes. The intellectual prince who would rather read than fight. He discovered the Scarred King Prophecy, proved the Warrior Code was corrupted 800 years ago, authored the Reformed Code, and wrote the definitive twelve-volume history of the reform era. The series we read is his record.",
    traits: "Intellectual · Pacifist · Historian · Code-breaker",
    category: "stormborn",
  },
  {
    name: "Edric Stormborn",
    title: "Fourth Prince (Titles Stripped)",
    status: "Exiled — 10 years",
    born: "Year 4962",
    description:
      "Former diplomat turned usurper. He knew about the conspiracy against Aldric and did nothing. Later launched the Night of Knives coup with Confederate backing, seizing the throne. Captured, imprisoned, and ultimately sentenced to exile — a poetic mirror of Cassian's original exile. Returned during the Confederate invasion to serve as a useful advisor.",
    traits: "Clever · Calculating · Ambitious · Master manipulator",
    category: "stormborn",
  },
  {
    name: "Captain Sera",
    title: "Royal Intelligence Officer · Wife of Cassian",
    status: "Alive",
    born: "",
    description:
      "Professional, sharp, direct. She investigated Aldric's death independently, driven by grief and conflicted loyalties. Married Cassian after Lucian's death in a quiet ceremony at the Greyport church. Mother of young Matthias. Runs the crown intelligence network. Proposed to Cassian with: \"I'm informing you. There's a difference.\"",
    traits: "Driven · Sharp · Espionage expert · Combat-trained",
    category: "ally",
  },
  {
    name: "Father Matthias Ironhand",
    title: "Forge-Keeper of Greyport's Church",
    status: "Deceased",
    born: "Year 4929",
    died: "Year 5002",
    description:
      "Former royal guard turned Forge-Keeper. Lost his sword arm in battle. Served as Cassian's father figure during twelve years of exile. Poisoned by Lucian's agents — survived but was slowly crippled. Died peacefully with Cassian holding his hand. His last words included an unfinished sentence: \"Tell Lucian—\"",
    traits: "Wise · Patient · Father figure · Spiritual guide",
    category: "ally",
  },
  {
    name: "Chancellor Morin",
    title: "Former Lord High Administrator",
    status: "Arrested",
    born: "Year 4940",
    description:
      "Silver-tongued, distinguished, the face of royal administration for decades. He orchestrated Prince Aldric's assassination — not for personal power, but because he believed the kingdom needed his guidance more than any king's. His conspiracy reached into every institution of Valdrath.",
    traits: "Calculating · Patient · Utterly pragmatic",
    category: "antagonist",
  },
];

function statusColor(status: string): string {
  if (status.toLowerCase().includes("deceased")) return "text-red-400";
  if (status.toLowerCase().includes("alive") || status.toLowerCase().includes("reigning"))
    return "text-emerald-400";
  if (status.toLowerCase().includes("exiled")) return "text-amber-400";
  if (status.toLowerCase().includes("arrested")) return "text-orange-400";
  if (status.toLowerCase().includes("retired")) return "text-stone-400";
  return "text-stone-400";
}

function categoryLabel(cat: Character["category"]) {
  switch (cat) {
    case "stormborn":
      return { label: "House Stormborn", color: "border-gold-500/40 text-gold-400" };
    case "ally":
      return { label: "Ally", color: "border-emerald-500/40 text-emerald-400" };
    case "antagonist":
      return { label: "Antagonist", color: "border-red-500/40 text-red-400" };
  }
}

export default function CharactersPage() {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-stone-900)_0%,_var(--color-stone-950)_70%)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-stone-500">
          <Link href="/lore" className="hover:text-gold-400 transition-colors">
            Lore
          </Link>
          <span className="mx-2">/</span>
          <span className="text-stone-300">Characters</span>
        </nav>

        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
            Seven Brothers · One Kingdom
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-stone-100 sm:text-5xl">
            <span className="gold-gradient">Characters</span>
          </h1>
          <div className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-400">
            The Stormborn dynasty has ruled Valdrath for 3,753 years. Now seven
            brothers — and the people caught in their orbit — will determine
            whether the kingdom evolves or destroys itself.
          </p>
        </div>

        {/* Character cards */}
        <div className="space-y-6">
          {characters.map((char) => {
            const cat = categoryLabel(char.category);
            return (
              <article
                key={char.name}
                className="glass-card overflow-hidden p-6 sm:p-8 transition-all duration-300 hover:border-gold-500/20"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-stone-100 sm:text-2xl">
                        {char.name}
                      </h2>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${cat.color}`}
                      >
                        {cat.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm italic text-gold-500/80">
                      {char.title}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
                    <span className={`font-medium ${statusColor(char.status)}`}>
                      {char.status}
                    </span>
                    {char.born && (
                      <span className="text-stone-500">
                        Born {char.born}
                      </span>
                    )}
                    {char.died && (
                      <span className="text-stone-500">
                        Died {char.died}
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-stone-300">
                  {char.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {char.traits.split(" · ").map((trait) => (
                    <span
                      key={trait}
                      className="rounded-md bg-stone-800/60 px-2.5 py-1 text-xs text-stone-400"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {/* Spoiler note */}
        <div className="mt-12 glass-card p-6 text-center">
          <p className="text-sm text-stone-500">
            ⚠️ Character descriptions include details through the full series.
            For a spoiler-free experience, read the books first.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-stone-700 to-transparent" />
          <p className="mt-8 font-[family-name:var(--font-heading)] text-lg text-stone-400">
            Meet them in the pages
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
