import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Timeline — The Kingdom of Valdrath",
  description:
    "Five thousand years of Valdrath history: from the Founding and the First Code through civil war, reformation, and the age of the Scarred King.",
  openGraph: {
    title: "Timeline — The Kingdom of Valdrath",
    description:
      "Five thousand years of history. Every war, coronation, betrayal, and triumph in the Kingdom of Valdrath.",
    url: "https://bookcreed.com/lore/timeline",
    type: "website",
  },
};

type TimelineEvent = {
  year: number | string;
  era: string;
  title: string;
  description: string;
  type: "political" | "war" | "cultural" | "death" | "combat" | "religious" | "disaster" | "personal";
  book?: number;
};

const eras: { name: string; range: string; color: string }[] = [
  { name: "Ancient Era", range: "Year 0 – ~1200", color: "border-amber-700" },
  { name: "Age of Fracture", range: "Year 1203 – 1247", color: "border-red-700" },
  { name: "Shadow Years", range: "Year 2103 – 2150", color: "border-purple-700" },
  { name: "The Renewal", range: "Year 3247+", color: "border-sky-700" },
  { name: "Modern Era", range: "Year 4797 – 5005", color: "border-gold-500" },
];

const events: TimelineEvent[] = [
  { year: 0, era: "Ancient Era", title: "The Founding of Valdrath", description: "Aldric the Unifier defeated each of seven clan champions in single combat and proposed the covenant that created the Kingdom of Valdrath.", type: "political" },
  { year: 47, era: "Ancient Era", title: "The First Code", description: "King Aldric established the Warrior's Code: Strength proves worth. Honor demands truth. Scars are history written in flesh.", type: "cultural" },
  { year: 1203, era: "Age of Fracture", title: "The Usurper Wars", description: "The Iron Dynasty ended without an heir. Seven noble houses claimed the throne. Forty-four years of devastating civil war followed.", type: "war" },
  { year: 1247, era: "Age of Fracture", title: "The Phoenix Restoration", description: "Garrett Stormborn, a blacksmith's son, defeated seven champions in a single day and was named king. The Stormborn Dynasty began.", type: "political" },
  { year: 2103, era: "Shadow Years", title: "The Plague of Shadows", description: "A mysterious illness killed a third of the population. It struck warriors hardest — the kingdom's greatest strength became its vulnerability.", type: "disaster" },
  { year: 2150, era: "Shadow Years", title: "The Reformation", description: "Queen Isabella the Wise established the Church of the Eternal Blade, unifying hundreds of warrior cults under one theology.", type: "religious" },
  { year: 3247, era: "The Renewal", title: "The Northern Invasions", description: "Barbarian hordes invaded from beyond the Iron Mountains. King Hadrian VII fell. Marcus the Scarred took the throne and restored the warrior code.", type: "war" },
  { year: 4797, era: "Modern Era", title: "The War of the Crimson Shores", description: "Five-year war against the Southern Confederacy. Victory for Valdrath, but King Roland IX died of his wounds. Daveth took the throne.", type: "war" },
  { year: 4965, era: "Modern Era", title: "Daveth's Coronation", description: "Daveth the Strong crowned at age 32. A 35-year reign of iron-fisted rule begins.", type: "political" },
  { year: 4983, era: "Modern Era", title: "Death of Queen Marianne", description: "The Queen died in childbirth with Theo. Cassian was holding her hand. The King hardened further; Cassian's breaking point began.", type: "death" },
  { year: 4988, era: "Modern Era", title: "The Seven Farmers Incident", description: "Cassian ordered to execute farmers labeled as rebels. They were innocent. He obeyed. The guilt drove him into twelve years of self-imposed exile.", type: "personal" },

  // Book 1 events
  { year: 5000, era: "Modern Era", title: "Aldric's Assassination", description: "Crown Prince Aldric killed during a Challenge Right when his blade was sabotaged. The succession crisis begins.", type: "death", book: 1 },
  { year: 5000, era: "Modern Era", title: "Cassian's Return", description: "After twelve years of exile in Greyport, Cassian is summoned home to investigate his brother's death.", type: "political", book: 1 },
  { year: 5000, era: "Modern Era", title: "The Cathedral Fire", description: "Shadow Guard agents burn the capital cathedral. Three witnesses die in separate 'accidents.' The cover-up deepens.", type: "war", book: 1 },
  { year: 5000, era: "Modern Era", title: "The Challenge of Brothers", description: "Cassian invokes Challenge Right against Lucian. Cassian wins but shows mercy, exiling Lucian instead of killing him.", type: "combat", book: 1 },
  { year: 5000, era: "Modern Era", title: "Death of King Daveth", description: "King Daveth dies from illness during the succession crisis, ending a 35-year reign. Reconciles with Cassian at his bedside.", type: "death", book: 1 },
  { year: 5000, era: "Modern Era", title: "Cassian Abdicates to Theo", description: "After winning the Challenge Right, Cassian voluntarily gives the throne to Theo — the youngest king in centuries, crowned at 17.", type: "political", book: 1 },

  // Book 2-3 events
  { year: 5000, era: "Modern Era", title: "Scarred King Prophecy Discovered", description: "Marcus discovers sealed archives: 'A prince twice-broken bearing seven scars shall forge the Code anew.'", type: "religious", book: 2 },
  { year: 5000, era: "Modern Era", title: "Father Matthias Poisoned", description: "Lucian's agents poison Cassian's mentor. He survives but is permanently crippled.", type: "death", book: 2 },
  { year: 5001, era: "Modern Era", title: "Publication of The True Code", description: "Marcus proves the Warrior Code was corrupted 800 years ago. The original Code was about moral strength, not martial supremacy.", type: "cultural", book: 3 },
  { year: 5001, era: "Modern Era", title: "Lucian's Coordinated Attacks", description: "Simultaneous strikes: Magistrate assassinated, grain warehouse burned, Greyport dock bombed. The shadow war escalates.", type: "war", book: 3 },

  // Book 4 events
  { year: 5001, era: "Modern Era", title: "Night of Knives", description: "Edric launches a coup with Confederate soldiers. The Capital falls. Edric crowns himself king. Three-way civil war begins.", type: "political", book: 4 },

  // Book 5 events
  { year: 5001, era: "Modern Era", title: "Vincent Pledges to Theo", description: "Vincent brings 60,000 eastern army troops to the loyalist cause, tipping the civil war decisively.", type: "political", book: 5 },
  { year: 5002, era: "Modern Era", title: "Battle for the Capital", description: "Loyalists retake the Capital. Edric is captured. Confederate forces pushed to the border. The civil war ends.", type: "combat", book: 5 },
  { year: 5002, era: "Modern Era", title: "Constitutional Convention", description: "The great convention convenes to reform the Warrior Code. Nobles, citizens, and Father Matthias — despite failing health — all contribute.", type: "political", book: 5 },

  // Book 6 events
  { year: 5002, era: "Modern Era", title: "Death of Father Matthias", description: "Matthias dies peacefully in the church vestry with Cassian holding his hand. Last words: 'Tell Lucian—' (unfinished).", type: "death", book: 6 },
  { year: 5002, era: "Modern Era", title: "The Final Duel", description: "Cassian infiltrates Lucian's fortress alone. Offers mercy one last time. Lucian refuses. Cassian's seventh scar — over the heart. Lucian dies in his brother's arms.", type: "combat", book: 6 },
  { year: 5002, era: "Modern Era", title: "Cassian & Sera Marry", description: "Quiet ceremony at Greyport's church, near Father Matthias's grave. Sera proposed: 'I'm informing you. There's a difference.'", type: "personal", book: 6 },

  // Book 7 events
  { year: 5003, era: "Modern Era", title: "Cassian Addresses the Great Council", description: "Cassian shows his seven scars: 'These scars are not medals. They are failures I survived.' The prophecy is fulfilled.", type: "political", book: 7 },
  { year: 5003, era: "Modern Era", title: "The Reformed Code Adopted", description: "The Great Council formally replaces the corrupted Warrior Code. Moral strength over martial supremacy. A new era begins.", type: "cultural", book: 7 },

  // Book 8 events
  { year: 5005, era: "Modern Era", title: "Confederate Invasion", description: "100,000 Confederate troops invade, seeing the reformed kingdom as weakened. The greatest external threat since the Last War.", type: "war", book: 8 },
  { year: 5005, era: "Modern Era", title: "Battle of Ashen Ford", description: "The decisive battle. Captain Rowan's initiative at a critical defile turns the tide. Reformed Code warriors prove themselves.", type: "combat", book: 8 },
  { year: 5005, era: "Modern Era", title: "Peace Treaty Signed", description: "Theo rejects harsh terms, offers equitable peace. A 20-year treaty is signed. The reformed kingdom has proven it can endure.", type: "political", book: 8 },
  { year: 5005, era: "Modern Era", title: "Cassian's Final Homecoming", description: "Cassian holds his son at the church, Sera beside him. The gardener comes home. 'Plant the tomatoes. Tend them. The rest takes care of itself.'", type: "personal", book: 8 },
];

function typeIcon(type: TimelineEvent["type"]) {
  switch (type) {
    case "political": return "👑";
    case "war": return "⚔️";
    case "cultural": return "📖";
    case "death": return "💀";
    case "combat": return "🗡️";
    case "religious": return "🕯️";
    case "disaster": return "🔥";
    case "personal": return "❤️";
  }
}

function typeColor(type: TimelineEvent["type"]) {
  switch (type) {
    case "political": return "border-gold-500/50";
    case "war": return "border-red-500/50";
    case "cultural": return "border-sky-500/50";
    case "death": return "border-stone-500/50";
    case "combat": return "border-orange-500/50";
    case "religious": return "border-purple-500/50";
    case "disaster": return "border-amber-500/50";
    case "personal": return "border-emerald-500/50";
  }
}

export default function TimelinePage() {
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
          <span className="text-stone-300">Timeline</span>
        </nav>

        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gold-500">
            5,000 Years of History
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-stone-100 sm:text-5xl">
            <span className="gold-gradient">Timeline of Valdrath</span>
          </h1>
          <div className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-400">
            From the Founding to the Reformed Code — every war, coronation,
            betrayal, and quiet act of courage that shaped a kingdom.
          </p>
        </div>

        {/* Era legend */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {eras.map((era) => (
            <div
              key={era.name}
              className={`rounded-lg border-l-4 ${era.color} bg-stone-900/40 px-4 py-2`}
            >
              <p className="text-xs font-bold text-stone-200">{era.name}</p>
              <p className="text-xs text-stone-500">{era.range}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500/40 via-stone-700/40 to-stone-800/20 sm:left-8" />

          <div className="space-y-1">
            {events.map((event, i) => {
              const prevEvent = events[i - 1];
              const showEra = !prevEvent || prevEvent.era !== event.era;

              return (
                <div key={`${event.year}-${event.title}`}>
                  {/* Era header */}
                  {showEra && (
                    <div className="relative mb-6 mt-10 first:mt-0 flex items-center gap-4 pl-14 sm:pl-20">
                      <div className="absolute left-4 h-4 w-4 rounded-full border-2 border-gold-500 bg-stone-950 sm:left-6" />
                      <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-gold-400">
                        {event.era}
                      </h2>
                    </div>
                  )}

                  {/* Event */}
                  <div className="group relative flex gap-4 py-3 pl-14 sm:pl-20">
                    {/* Dot */}
                    <div
                      className={`absolute left-[19px] top-[22px] h-2.5 w-2.5 rounded-full border-2 ${typeColor(event.type)} bg-stone-950 transition-colors group-hover:bg-stone-800 sm:left-[27px]`}
                    />

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold text-stone-500 tabular-nums">
                          Year {event.year}
                        </span>
                        <span className="text-sm">{typeIcon(event.type)}</span>
                        {event.book && (
                          <span className="rounded-full bg-gold-500/10 px-2 py-0.5 text-xs font-medium text-gold-400">
                            Book {event.book}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-1 font-[family-name:var(--font-heading)] text-base font-bold text-stone-200 transition-colors group-hover:text-gold-400">
                        {event.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-stone-400">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="mx-auto h-px w-32 bg-gradient-to-r from-transparent via-stone-700 to-transparent" />
          <p className="mt-8 font-[family-name:var(--font-heading)] text-lg text-stone-400">
            Experience the history as it unfolds
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
