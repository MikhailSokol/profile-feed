import type { UserEditForm } from "../model/types";

export const fields: (keyof UserEditForm)[] = [
  "firstName",
  "lastName",
  "birthDay",
  "bio",
  "email",
  "phone",
];

export const labels: Record<keyof UserEditForm, string> = {
  firstName: "Имя",
  lastName: "Фамилия",
  email: "Почта",
  bio: "О себе",
  phone: "Телефон",
  birthDay: "Дата рождения",
};
