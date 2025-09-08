"use server";

import { db } from "@/lib/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export async function updateUsername(username) {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  // Check if username already taken
  const existingUser = await db.user.findUnique({
    where: { username },
  });

  if (existingUser && existingUser.clerkUserId !== user.id) {
    throw new Error("Username is already taken");
  }

  // Update in DB
  await db.user.update({
    where: { clerkUserId: user.id },
    data: { username },
  });

  // Update in Clerk
  // await clerkClient.users.updateUser(user.id, { username });

  return { success: true, username };
}
