import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/account/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { isAdmin: true },
  });

  if (!user?.isAdmin) redirect("/");

  const cohorts = await prisma.cohort.findMany({
    orderBy: { startDate: "desc" },
    include: {
      entries: {
        include: {
          user: {
            select: {
              name: true,
              email: true,
              address: true,
              giftCardPref: true,
            },
          },
          score: {
            include: {
              book: { select: { title: true } },
            },
          },
        },
        orderBy: {
          score: { percentage: "desc" },
        },
      },
    },
  });

  const books = await prisma.book.findMany({
    orderBy: { number: "asc" },
    select: { id: true, title: true, number: true },
  });

  return <AdminDashboard initialCohorts={cohorts} books={books} />;
}
