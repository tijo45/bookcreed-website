/**
 * Centralized book data for The Kingdom of Valdrath series.
 * Used by the storefront and other pages.
 */

export interface BookFormat {
  format: "Kindle" | "Paperback" | "Hardcover";
  price: string;
  url: string;
}

export interface BookData {
  number: number;
  title: string;
  coverUrl: string;
  published: boolean;
  asin?: string;
  isbn?: string;
  blurb: string;
  tagline: string;
  formats: BookFormat[];
}

const AUTHOR_PAGE = "https://www.amazon.com/stores/Eva-Noir/author/B0CJFMLR48";

export const books: BookData[] = [
  {
    number: 1,
    title: "The Exile's Return",
    coverUrl: "/covers/valdrath/book1.jpg",
    published: true,
    asin: "B0GKXNCCXD",
    isbn: "9798246509012",
    tagline: "A prince who ran from blood. A kingdom that demands more of it.",
    blurb:
      "Twelve years ago, Prince Cassian was forced to execute seven innocent farmers on his father's orders — and it shattered him. He fled the kingdom, buried his name, and swore he'd never return. But when his eldest brother is murdered and the throne fractures, Cassian is dragged back into a palace where every smile hides a blade — and the deadliest enemy wears his family's name.",
    formats: [
      { format: "Kindle", price: "$2.99", url: "https://www.amazon.com/dp/B0GKXNCCXD" },
      { format: "Paperback", price: "$14.99", url: "https://www.amazon.com/dp/B0GKXNCCXD" },
      { format: "Hardcover", price: "$24.99", url: "https://www.amazon.com/dp/B0GKXNCCXD" },
    ],
  },
  {
    number: 2,
    title: "The Shadow's Reach",
    coverUrl: "/covers/valdrath/book2.jpg",
    published: true,
    asin: "B0GL3YQFKS",
    isbn: "9798246717608",
    tagline: "The conspiracy didn't end. It evolved.",
    blurb:
      "Prince Cassian exposed his brother's treachery and survived the royal court — but defeating one traitor only revealed how deep the conspiracy runs. Sent to Greyport on the kingdom's edge, Cassian uncovers a threat that dwarfs a single assassination. The conspiracy that killed Crown Prince Aldric wasn't a family squabble. It was the opening move in something far larger.",
    formats: [
      { format: "Kindle", price: "$4.99", url: "https://www.amazon.com/dp/B0GL3YQFKS" },
      { format: "Paperback", price: "$14.99", url: "https://www.amazon.com/dp/B0GL3YQFKS" },
      { format: "Hardcover", price: "$24.99", url: "https://www.amazon.com/dp/B0GL3YQFKS" },
    ],
  },
  {
    number: 3,
    title: "The Fractured Peace",
    coverUrl: "/covers/valdrath/book3.jpg",
    published: false,
    tagline: "Reform meets resistance. The old guard strikes back.",
    blurb:
      "With the conspiracy exposed and the succession in shambles, Cassian pushes for reforms that threaten to upend five thousand years of warrior tradition. But the old guard won't surrender their power without a fight. As alliances shift and the court fractures along ideological lines, Cassian discovers that changing a kingdom may be harder than saving one.",
    formats: [],
  },
  {
    number: 4,
    title: "The Fractured Crown",
    coverUrl: "/covers/valdrath/book4.jpg",
    published: false,
    tagline: "A brother's betrayal shatters the kingdom.",
    blurb:
      "The uneasy peace shatters when a brother Cassian trusted launches a devastating bid for the throne. With the royal family torn apart and the kingdom descending into chaos, every prince must choose a side. The Warrior Code that built Valdrath is turning brother against brother — and Cassian faces the ultimate question: can he save his family without becoming the weapon he swore he'd never be again?",
    formats: [],
  },
  {
    number: 5,
    title: "The Gathering Storm",
    coverUrl: "/covers/valdrath/book5.jpg",
    published: false,
    tagline: "Civil war. Every brother must choose.",
    blurb:
      "Valdrath erupts into open civil war. Armies march under rival banners, cities burn, and the brothers who once shared a childhood now face each other across battle lines. As the kingdom bleeds, external enemies sense weakness and begin to circle. Cassian must forge impossible alliances and make devastating sacrifices to hold the realm together — or watch everything his family built crumble to ash.",
    formats: [],
  },
  {
    number: 6,
    title: "The Final Scar",
    coverUrl: "/covers/valdrath/book6.jpg",
    published: false,
    tagline: "Terror, sacrifice, and a final reckoning.",
    blurb:
      "The civil war reaches its bloodiest chapter as the true architects of Valdrath's destruction finally reveal themselves. With enemies within and without, Cassian wages a shadow war that demands everything — his principles, his relationships, and perhaps his soul. In a kingdom scarred by generations of violence, the final scar may be the one that saves it.",
    formats: [],
  },
  {
    number: 7,
    title: "The Quiet Throne",
    coverUrl: "/covers/valdrath/book7.jpg",
    published: false,
    tagline: "The kingdom remade. The Code rewritten.",
    blurb:
      "From the ashes of civil war, a new Valdrath begins to take shape. But rebuilding a kingdom means confronting the deepest flaws in its foundation — the Warrior Code itself. Cassian faces his most complex challenge yet: forging a new path for a civilization that has known nothing but strength as law, while enemies both old and new threaten to undo everything he's fought to build.",
    formats: [],
  },
  {
    number: 8,
    title: "The Scarred Crown",
    coverUrl: "/covers/valdrath/book8.jpg",
    published: false,
    tagline: "The final chapter. The ultimate price.",
    blurb:
      "The saga reaches its epic conclusion as every thread — every betrayal, every sacrifice, every question about the nature of power — converges in a final reckoning that will determine the fate of Valdrath forever. Cassian must answer the question that has haunted him since the beginning: what is true strength in a world that only respects force?",
    formats: [],
  },
];

export const SERIES_NAME = "The Kingdom of Valdrath";
export const AUTHOR_NAME = "Eva Noir";
export const AMAZON_AUTHOR_URL = AUTHOR_PAGE;

export const AUTHOR_BIO_SHORT =
  "Eva Noir crafts epic fantasy where political intrigue meets profound human truths. Author of the eight-book Kingdom of Valdrath, Eva explores power, betrayal, and redemption through complex worldbuilding and morally ambiguous characters.";

export const AUTHOR_BIO_MEDIUM =
  "Eva Noir writes epic fantasy where political intrigue meets profound human truths. Working under a pen name that reflects both mystery and elegance, Eva crafts worlds where power, betrayal, and redemption intertwine in complex tapestries that challenge readers' expectations.\n\nThe eight-book Kingdom of Valdrath represents Eva's passionate exploration of moral ambiguity in fantasy literature. These novels delve into the shadows between heroism and villainy, examining how ordinary people navigate extraordinary circumstances when kingdoms hang in the balance.\n\nDrawing inspiration from historical power structures and the timeless questions that drive human nature, Eva continues to build worlds that feel authentic despite their impossibility.";

export const COMP_AUTHORS = [
  "George R.R. Martin",
  "Joe Abercrombie",
  "Robin Hobb",
  "R.F. Kuang",
  "Katherine Addison",
];
