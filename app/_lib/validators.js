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