"use server";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getLatestUpdates() {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // check if user exists in the db
  const existingUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!existingUser) {
    throw new Error("User not found in the database");
  }

  const now = new Date();

  const upcomingMeetings = await db.booking.findMany({
    where: {
      userId: existingUser.id,
      startTime: { gte: now },
    },
    include: {
      event: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      startTime: "asc",
    },
    take: 3,
  });

  return upcomingMeetings;
}
