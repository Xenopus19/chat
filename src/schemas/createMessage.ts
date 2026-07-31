import { z } from "zod";

export const CreateMessageSchema = z.object({
  text: z.string().max(1000, "Max message length is 1000 characters"),
  chatId: z.string().max(200, "Max chatId length is 200 characters"),
});

export type NewMessage = z.infer<typeof CreateMessageSchema>;