import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();

const cohorts = await p.cohort.findMany({ orderBy: { startDate: "desc" }, include: { entries: true } });
console.log("Found cohorts:", cohorts.length);
for (const c of cohorts) {
  console.log(`  [${c.id}] "${c.name}" status=${c.status} entries=${c.entries.length} start=${c.startDate.toISOString()} end=${c.endDate.toISOString()}`);
}

if (cohorts.length > 1) {
  const sorted = [...cohorts].sort((a, b) => {
    if (a.entries.length !== b.entries.length) return b.entries.length - a.entries.length;
    return b.startDate.getTime() - a.startDate.getTime();
  });
  
  const keep = sorted[0];
  const toDelete = sorted.slice(1);
  
  console.log(`\nKeeping: [${keep.id}] "${keep.name}" (${keep.entries.length} entries)`);
  
  for (const c of toDelete) {
    if (c.entries.length > 0) {
      await p.cohortEntry.deleteMany({ where: { cohortId: c.id } });
      console.log(`  Deleted ${c.entries.length} entries from cohort ${c.id}`);
    }
    await p.cohort.delete({ where: { id: c.id } });
    console.log(`  Deleted duplicate cohort: [${c.id}] "${c.name}"`);
  }
  
  await p.cohort.update({
    where: { id: keep.id },
    data: { name: "January 2026 - The Exile's Return" }
  });
  console.log("  Updated name to: January 2026 - The Exile's Return");
}

const remaining = await p.cohort.findMany();
console.log(`\nRemaining cohorts: ${remaining.length}`);
for (const c of remaining) {
  console.log(`  [${c.id}] "${c.name}" status=${c.status}`);
}

await p.$disconnect();
