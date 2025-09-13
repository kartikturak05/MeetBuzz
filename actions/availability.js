"use server";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { success } from "zod";

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

  const availabilityData = { timeGap: existingUser.availability.timeGap };

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  daysOfWeek.forEach((day) => {
    const dayAvailability = existingUser.availability.days.find(
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

// Update user availability

export async function updateAvailability(data) {
  const user = await currentUser();

  if (!user) {  
    throw new Error("Unauthorized");
  }

  const existingUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
    include: {
      availability: true,
    },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const availabilityData = Object.entries(data).flatMap(
    ([day, { isAvailable, startTime, endTime }]) => {
      if (isAvailable) {
        const baseDate = new Date().toISOString().split("T")[0];

        return [
          {
            day: day.toUpperCase(),
            startTime: new Date(`${baseDate}T${startTime}:00Z`),
            endTime: new Date(`${baseDate}T${endTime}:00Z`),
          },
        ];
      }
      return [];
    }
  );

  if(existingUser.availability){
    await db.availability.update({
      where:{id:existingUser.availability.id},
      data:{
        timeGap: data.timeGap,
        days:{
          deleteMany:{},
          create:availabilityData
        },
      },
    })
  }else{
     await db.availability.create({
      data:{
        userId:existingUser.id,
        timeGap: data.timeGap,
        days:{
          create:availabilityData
        },
      },
    })
  }

  return  {success:true};

}
