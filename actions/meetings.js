import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getUpcomingMeetings = async (type = "upcoming") => {
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

  const meetings = await db.booking.findMany({
    where: {
        userId: existingUser.id,
        startTime: type === "upcoming" ? { gte: now } : { lt: now },
    },
    include:{
        event:{
            include:{
                user:{
                    select:{
                        name:true,
                        email:true,
                    }
                }
            }
        }
    },
    orderBy:{
        startTime:type==="upcoming"?"asc":"desc",
    },
  })

  return meetings;

};
