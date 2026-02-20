export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  excerpt: string;
  date: string; // ISO
  author: string;
  readingTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "best-epic-fantasy-series-2026",
    title: "Best Epic Fantasy Series to Start in 2026",
    description:
      "Discover the best epic fantasy series to dive into in 2026 — from beloved classics to fresh indie gems like The Kingdom of Valdrath.",
    keywords: [
      "best epic fantasy series 2026",
      "new fantasy series",
      "epic fantasy books",
      "fantasy series recommendations",
      "best fantasy books to read",
    ],
    excerpt:
      "Looking for your next epic fantasy obsession? Here are 10 series — from beloved titans to fresh indie gems — that deserve a spot on your 2026 reading list.",
    date: "2026-02-18",
    author: "Eva Noir",
    readingTime: "8 min read",
  },
  {
    slug: "dark-fantasy-books-political-intrigue",
    title: "Dark Fantasy Books with Political Intrigue: 15 Must-Reads",
    description:
      "Love scheming nobles, backstabbing courts, and morally grey rulers? These 15 dark fantasy books deliver political intrigue on every page.",
    keywords: [
      "dark fantasy political intrigue",
      "fantasy books like game of thrones",
      "political fantasy books",
      "dark fantasy recommendations",
      "court intrigue fantasy",
    ],
    excerpt:
      "If you live for scheming nobles, backstabbing courts, and morally grey rulers, these 15 dark fantasy novels will keep you guessing until the final page.",
    date: "2026-02-15",
    author: "Eva Noir",
    readingTime: "10 min read",
  },
  {
    slug: "art-of-world-building-kingdom-of-valdrath",
    title: "The Art of World-Building: How I Created the Kingdom of Valdrath",
    description:
      "Author Eva Noir shares the world-building process behind The Kingdom of Valdrath — from cultural databases to the Seven Scars system.",
    keywords: [
      "fantasy world building",
      "how to build a fantasy world",
      "world building tips",
      "fantasy writing advice",
      "creating fantasy cultures",
    ],
    excerpt:
      "I didn't just write a kingdom — I built one from the ground up. Here's how a spreadsheet-obsessed author created the living, breathing world of Valdrath.",
    date: "2026-02-10",
    author: "Eva Noir",
    readingTime: "9 min read",
  },
  {
    slug: "self-publishing-epic-fantasy-lessons",
    title:
      "Self-Publishing an Epic Fantasy Series: Lessons from Writing 8 Books",
    description:
      "Eva Noir shares hard-won lessons from self-publishing an 8-book epic fantasy series on Amazon KDP — from covers to marketing to keeping your sanity.",
    keywords: [
      "self publishing fantasy",
      "indie fantasy author tips",
      "KDP fantasy books",
      "self publish epic fantasy",
      "indie author advice",
    ],
    excerpt:
      "Eight books. Thousands of pages. Countless lessons. Here's everything I wish I'd known before self-publishing an epic fantasy series on Amazon KDP.",
    date: "2026-02-05",
    author: "Eva Noir",
    readingTime: "9 min read",
  },
  {
    slug: "why-fantasy-readers-need-succession-crisis",
    title: "Why Every Fantasy Reader Needs a Good Succession Crisis",
    description:
      "From Shakespeare to Sanderson, succession crises drive the best fantasy stories. Here's why throne wars make for unforgettable reading.",
    keywords: [
      "fantasy succession",
      "throne war fantasy books",
      "succession crisis fantasy",
      "fantasy books about kings",
      "royal fantasy novels",
    ],
    excerpt:
      "A dead king, rival heirs, and a kingdom on the brink — succession crises have fueled the greatest stories in fantasy. Here's why they work so well.",
    date: "2026-02-01",
    author: "Eva Noir",
    readingTime: "8 min read",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
