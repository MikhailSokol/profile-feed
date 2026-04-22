import type { postFormSchema } from "./schema";
import type z from "zod";

export type PostFormValues = z.infer<typeof postFormSchema>;
