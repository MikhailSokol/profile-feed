import { z } from "zod";

export const userSchema = z.object({
  firstName: z
    .string()
    .max(30, { message: "Максимум 30 символов" })
    .transform((val) => (val === "" ? null : val))
    .nullable(),
  lastName: z
    .string()
    .max(30, { message: "Максимум 30 символов" })
    .transform((val) => (val === "" ? null : val))
    .nullable(),

  email: z
    .string()
    .email("Неверный email")
    .or(z.literal(""))
    .transform((v) => (v === "" ? null : v))
    .nullable(),

  bio: z
    .string()
    .max(150, { message: "Максимум 150 символов" })
    .transform((val) => (val === "" ? null : val))
    .nullable(),

  phone: z
    .union([
      z.string().regex(/^\+?\d{7,12}$/, {
        message: "Неверный формат телефона",
      }),
      z.literal(""),
      z.null(),
    ])
    .transform((val) => (val === "" ? null : val))
    .nullable(),

  birthDay: z
    .union([
      z.string().regex(/^\d{2}\.\d{2}\.\d{4}$/, {
        message: "Неверный формат даты (ДД.ММ.ГГГГ)",
      }),
      z.literal(""),
      z.null(),
    ])
    .transform((val) => (val === "" ? null : val))
    .nullable(),
});
