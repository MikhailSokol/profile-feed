import {
  Controller,
  Get,
  Patch,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Express } from "express";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { JwtUser } from "../auth/types/jwt-user.type";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("user")
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser(@CurrentUser() user: JwtUser) {
    return await this.userService.findById(user.userId);
  }

  @Patch()
  updateUser(@CurrentUser() user: JwtUser, @Body() data: UpdateUserDto) {
    return this.userService.updateUser(user.userId, data);
  }

  @Post("avatar")
  @UseInterceptors(FileInterceptor("avatar"))
  async uploadFile(@CurrentUser() user: JwtUser, @UploadedFile() file: Express.Multer.File) {
    const avatarUrl = `${process.env.BASE_URL}/uploads/${file.filename}`;

    await this.userService.updateUser(user.userId, {
      avatar: avatarUrl,
    });

    return { avatar: avatarUrl };
  }
}
