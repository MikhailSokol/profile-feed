import type z from "zod";
import type { userSchema } from "./schema";

export type UserEditForm = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  bio: string | null;
  phone: string | null;
  birthDay: string | null;
};

export type UserEdit = z.infer<typeof userSchema>;
