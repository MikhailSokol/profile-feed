import { IsOptional, IsString, IsArray } from "class-validator";
import { Transform } from "class-transformer";

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return [];
    if (typeof value === "string") return JSON.parse(value);
    return value;
  })
  @IsArray()
  @IsString({ each: true })
  existingImages?: string[];
}
