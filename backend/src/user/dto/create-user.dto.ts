import { IsEmail, IsOptional, IsString, Matches, MinLength, MaxLength } from "class-validator";

export class CreateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @Matches(/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/, {
    message: "Дата должна быть в формате дд.мм.гггг",
  })
  birthDay?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
    message: "Пароль должен быть от 8 до 20 символов и содержать буквы и цифры ",
  })
  password!: string;
}
