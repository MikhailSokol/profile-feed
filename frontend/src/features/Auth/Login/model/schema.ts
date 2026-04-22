import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z
    .string()
    .min(8, "Минимум 8 символов")
    .max(20, "Максимум 20 символов")
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
      message: "Пароль должен содержать хотя бы одну латинскую букву и одну цифру",
    }),
});
