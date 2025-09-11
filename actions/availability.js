"use server"
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getUserAvailability() {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const existingUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
    include: {
      availability: {
        include: { days: true },
      },
    },
  });

  if (!existingUser || !existingUser.availability) {
    return null;
  }

  const availabilityData = {
    timeGap: user.availability.timeGap,
  }[
    ("monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday")
  ].forEach((day) => {
    const dayAvailability = user.availability.days.find(
      (d) => d.day === day.toUpperCase()
    );

    availabilityData[day] = {
      isAvailable: !!dayAvailability,
      startTime: dayAvailability
        ? dayAvailability.startTime.toISOString().slice(11, 16)
        : "09:00",
      endTime: dayAvailability
        ? dayAvailability.endTime.toISOString().slice(11, 16)
        : "17:00",
    };
  });

  return availabilityData;
}
