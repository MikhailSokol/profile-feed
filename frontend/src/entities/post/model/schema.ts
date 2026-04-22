import { z } from "zod";

export const postSchema = z.object({
  text: z.string().nullable(),
  images: z.array(z.string()).nullable(),
  createdAt: z.string().nullable(),
  id: z.number().nullable(),
});
