import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AccountClient from "./AccountClient";

export const metadata = {
  title: "My Account",
};

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/account/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      giftCardPref: true,
      newsletter: true,
      scores: {
        include: {
          book: {
            select: { title: true },
          },
        },
        orderBy: { completedAt: "desc" },
      },
    },
  });

  if (!user) {
    redirect("/account/login");
  }

  return <AccountClient user={user} />;
}
