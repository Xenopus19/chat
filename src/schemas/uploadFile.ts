import { z } from "zod";

export const UploadFileSchema = z.object({
  fileName: z.string().max(200),
  fileType: z.string().max(200),
});

export type UploadFile = z.infer<typeof UploadFileSchema>;