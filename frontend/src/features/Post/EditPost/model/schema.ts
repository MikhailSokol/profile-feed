import { z } from "zod";

export const postSchema = z.object({
  text: z.string().nullable(),
  images: z.array(z.string()).nullable(),
  existingImages: z.array(z.string()).nullable(),
  createdAt: z.array(z.custom<File>()).nullable(),
  id: z.number().nullable(),
});
