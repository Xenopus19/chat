import { z } from "zod";

export const CreateUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(3, "Password must be at least 3 characters long"),
  birthdate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid birthdate",
  }),
  description: z.string().max(500, "Max description length is 500 characters").optional(),
  avatarUrl: z.string().url("Invalid URL").nullable().optional(),
});

export type NewUser = z.infer<typeof CreateUserSchema>;