import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function hashAccessCode(code: string): string {
  return crypto
    .createHash("sha256")
    .update(code.toLowerCase().trim())
    .digest("hex");
}

const books = [
  {
    number: 1,
    title: "The Exile's Return",
    slug: "the-exiles-return",
    published: true,
    kdpUrl: "https://www.amazon.com/dp/B0GKXNCCXD",
    accessCode: hashAccessCode("VALDRATH-EXILE-7FARM"),
    quizData: "valdrath/book1.json",
    coverImage: "/covers/valdrath/book1.jpg",
    blurb:
      "Cassian Stormborn spent twelve years hiding. A prince who fled after being forced to execute innocent farmers, he built a quiet life as a mechanic, attending church every Sunday, trying to forget the blood on his hands. Then his brother\u2014Crown Prince Aldric\u2014is murdered. Summoned home to a palace full of vipers, Cassian discovers someone sabotaged Aldric's blade. To find the truth, he must become the warrior he swore he'd never be again.",
  },
  {
    number: 2,
    title: "The Shadow's Reach",
    slug: "the-shadows-reach",
    published: true,
    kdpUrl: "https://www.amazon.com/dp/B0GL3YQFKS",
    accessCode: hashAccessCode("VALDRATH-SHADOW-GREYP"),
    quizData: "valdrath/book2.json",
    coverImage: "/covers/valdrath/book2.jpg",
    blurb:
      "Cassian has barely reclaimed his place in court when a string of poisonings targets the kingdom's outer provinces. The trail leads to a shadowy network that stretches far beyond Valdrath's borders\u2014and someone inside the palace is feeding them secrets. With enemies closing in from every direction, Cassian must decide who to trust before the shadows swallow everything he's fighting to protect.",
  },
  {
    number: 3,
    title: "The Fractured Peace",
    slug: "the-fractured-peace",
    published: false,
    accessCode: hashAccessCode("VALDRATH-PEACE-TRUCE"),
    quizData: "valdrath/book3.json",
    coverImage: "/covers/valdrath/book3.jpg",
    blurb:
      "A fragile ceasefire holds between the warring houses, but it was built on lies. When a massacre at a border town shatters the truce, old alliances crumble and new battle lines are drawn. Cassian must broker an impossible peace\u2014or watch the kingdom tear itself apart while the true enemy waits in the ruins.",
  },
  {
    number: 4,
    title: "The Fractured Crown",
    slug: "the-fractured-crown",
    published: false,
    accessCode: hashAccessCode("VALDRATH-CROWN-FORGE"),
    quizData: "valdrath/book4.json",
    coverImage: "/covers/valdrath/book4.jpg",
    blurb:
      "The throne sits empty and three claimants demand the crown. Cassian never wanted to rule, but with his family's blood soaking the palace stones, he may be the only one who can hold the kingdom together. Forced into a deadly game of succession, he discovers that the crown itself carries a curse\u2014one that has driven every ruler before him to madness or murder.",
  },
  {
    number: 5,
    title: "The Gathering Storm",
    slug: "the-gathering-storm",
    published: false,
    accessCode: hashAccessCode("VALDRATH-STORM-RIDGE"),
    quizData: "valdrath/book5.json",
    coverImage: "/covers/valdrath/book5.jpg",
    blurb:
      "War is no longer a threat\u2014it is a certainty. A foreign army masses at the northern border while rebellion festers in the south. Cassian rallies what allies remain, but the cost of loyalty grows steeper with every battle. As the storm breaks across Valdrath, he must confront the terrible possibility that saving his kingdom may mean destroying his family.",
  },
  {
    number: 6,
    title: "The Final Scar",
    slug: "the-final-scar",
    published: false,
    accessCode: hashAccessCode("VALDRATH-SCAR-SEVEN"),
    quizData: "valdrath/book6.json",
    coverImage: "/covers/valdrath/book6.jpg",
    blurb:
      "The war has taken everything\u2014cities reduced to ash, allies buried in mass graves, and Cassian bearing wounds that will never heal. But the enemy offers terms: surrender the throne, and the bloodshed ends. Cassian knows it's a trap, yet refusing means sending thousands more to die. One final scar will decide the fate of a kingdom.",
  },
  {
    number: 7,
    title: "The Quiet Throne",
    slug: "the-quiet-throne",
    published: false,
    accessCode: hashAccessCode("VALDRATH-THRONE-REFORM"),
    quizData: "valdrath/book7.json",
    coverImage: "/covers/valdrath/book7.jpg",
    blurb:
      "The war is over, but victory tastes like ashes. Cassian sits on a throne he never wanted, ruling a broken kingdom that barely survived. As he struggles to rebuild, whispers spread that the peace was bought with a secret bargain\u2014one that traded away something far more valuable than land. The quiet throne demands a price, and Cassian may have already paid it.",
  },
  {
    number: 8,
    title: "The Scarred Crown",
    slug: "the-scarred-crown",
    published: false,
    accessCode: hashAccessCode("VALDRATH-SCARRED-ASHEN"),
    quizData: "valdrath/book8.json",
    coverImage: "/covers/valdrath/book8.jpg",
    blurb:
      "Every sacrifice, every betrayal, every scar has led to this. A final conspiracy threatens to undo everything Cassian has built, and the mastermind behind it all is someone he once called family. To save Valdrath, he must make one last impossible choice\u2014between the crown and the man he used to be. The saga of the Stormborn dynasty ends where it began: in blood, fire, and faith.",
  },
];

async function main() {
  console.log("Seeding database...");

  // Upsert series
  const series = await prisma.series.upsert({
    where: { slug: "kingdom-of-valdrath" },
    update: {},
    create: {
      slug: "kingdom-of-valdrath",
      title: "The Kingdom of Valdrath",
      tagline:
        "Eight books. One family. A kingdom at war with itself.",
      description:
        "The Kingdom of Valdrath is an epic fantasy series following Cassian Stormborn\u2014a prince who abandoned his throne after being forced to commit an unforgivable act. When tragedy drags him back to court, he must navigate a web of betrayal, war, and dark secrets that threaten to destroy everything he loves. Spanning eight books, this saga explores the cost of power, the weight of duty, and whether a broken man can save a broken kingdom.",
    },
  });

  console.log(`Created series: ${series.title}`);

  // Upsert books
  for (const bookData of books) {
    const book = await prisma.book.upsert({
      where: { slug: bookData.slug },
      update: {
        title: bookData.title,
        blurb: bookData.blurb,
        coverImage: bookData.coverImage,
        published: bookData.published,
        kdpUrl: bookData.kdpUrl ?? null,
        accessCode: bookData.accessCode,
        quizData: bookData.quizData,
      },
      create: {
        seriesId: series.id,
        number: bookData.number,
        title: bookData.title,
        slug: bookData.slug,
        blurb: bookData.blurb,
        coverImage: bookData.coverImage,
        published: bookData.published,
        kdpUrl: bookData.kdpUrl ?? null,
        accessCode: bookData.accessCode,
        quizData: bookData.quizData,
      },
    });
    console.log(`  Book ${book.number}: ${book.title}`);
  }

  // Create admin user
  const adminPasswordHash = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@bookcreed.com" },
    update: {},
    create: {
      email: "admin@bookcreed.com",
      name: "Admin",
      passwordHash: adminPasswordHash,
      isAdmin: true,
    },
  });
  console.log(`Created admin user: ${admin.email}`);

  // Create sample cohort
  const now = new Date();
  const endDate = new Date(now);
  endDate.setMonth(endDate.getMonth() + 1);

  const firstBook = await prisma.book.findFirst({
    where: { slug: "the-exiles-return" },
  });

  if (firstBook) {
    const cohort = await prisma.cohort.create({
      data: {
        name: "January 2026 - The Exile's Return",
        bookId: firstBook.id,
        startDate: now,
        endDate: endDate,
        status: "active",
        prizeDesc: "$25 Amazon Gift Card for the top scorer",
      },
    });
    console.log(`Created cohort: ${cohort.name}`);
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
