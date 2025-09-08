"use server";
import { eventSchema } from "@/app/_lib/validators";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function createEvent(data){
    const user = await currentUser();

    if(!user){
        throw new Error("Unauthorized");
    }

    // Create the event in the database
    const validatedData = eventSchema.parse(data);

    const existingUser = await db.user.findUnique({
        where:{clerkUserId:user.id},
    })

    if(!existingUser){
        throw new Error("User not found in the database");
    }
    
    const event = await db.event.create({
        data:{
            ...validatedData,
            userId: existingUser.id,
        }
    })
    
    return event;

}