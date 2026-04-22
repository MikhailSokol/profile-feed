import { IsEmail, IsNumber } from "class-validator";

export class LogoutDto {
  @IsNumber()
  userId!: number;

  @IsEmail()
  email!: string;
}
