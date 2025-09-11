import z, { regex } from "zod";

export const usernameSchema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/,"username can only contain letters, numbers, and underscores"),

})

export const eventSchema = z.object({
  title:z.string().min(1,"Title is required").max(100,"Title is too long"),
  description : z.string().min(1,"Description is required").max(500,"Description is too long"),
  duration : z.number().int().positive("Duration must be a positive integer"),

  isPrivate:z.boolean(),
})

export const daySchema = z.object({
  isAvailable:z.boolean(),
  startTime:z.string().optional(),
  endTime :z.string().optional(),
}).refine((data)=> {
  if(data.isAvailable){
    return data.startTime < data.endTime
  }
  return true
},{
  message:"Start time must be before end time",
  path:["endTime"]
})

export const availabilitySchema = z.object({
  monday:daySchema,
  tuesday:daySchema,
  wednesday:daySchema,
  thursday:daySchema,
  friday:daySchema,
  saturday:daySchema,
  sunday:daySchema,
  timeGap:z.number().min(0,"Time gap must be 0 or more minutes").int(),
})