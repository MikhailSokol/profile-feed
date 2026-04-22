import { z } from "zod";

export const postFormSchema = z.object({
  text: z.string().nullable(),
  images: z.array(z.custom<File>()).nullable().optional(),
  existingImages: z.array(z.string()).nullable().optional(),
});
