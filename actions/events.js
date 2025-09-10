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

export async function getUserEvent(){
    const user = await currentUser();

    if(!user){
        throw new Error("Unauthorized");
    }

    // check if user exists in the db
     const existingUser = await db.user.findUnique({
        where:{clerkUserId:user.id},
    })

    if(!existingUser){
        throw new Error("User not found in the database");
    }

    // now get all the events for that user

    const events = await db.event.findMany({
        where:{userId:existingUser.id},
        orderBy:{createdAt:"desc"},
        include:{
            _count:{
                select:{bookings:true},
            },
        },
    });

    return {events,username:existingUser.username};
}

// delete the users event
export async function deleteEvent(eventId){
    const user = await currentUser();

    if(!user){
        throw new Error("Unauthorized");
    }

    // check if user exists in the db
     const existingUser = await db.user.findUnique({
        where:{clerkUserId:user.id},
    })

    if(!existingUser){
        throw new Error("User not found in the database");
    }

    // now get all the events for that user

    const event = await db.event.findUnique({
       where:{id:eventId}
    });

    if(!event || event.userId != existingUser.id){
        throw new Error("Event not found or you don't have permission to delete this event");
    }

    await db.event.delete({
        where:{id:eventId},
    })

    return {success:true};
}