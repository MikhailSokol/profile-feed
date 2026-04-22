import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { Response } from "express";
import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { JwtUser } from "./types/jwt-user.type";
import { RefreshAuthGuard } from "./guards/refresh-auth.guard";
import { ACCESS_TTL, REFRESH_TTL } from "../common/config/config";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.login(dto);

    if (!tokens?.accessToken || !tokens?.refreshToken) {
      throw new InternalServerErrorException({
        message: "Tokens not generated",
        code: "TOKENS_NOT_GENERATED",
      });
    }

    res.cookie("accessToken", tokens?.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: ACCESS_TTL * 1000,
    });

    res.cookie("refreshToken", tokens?.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: REFRESH_TTL * 1000,
    });

    return { success: true };
  }

  @UseGuards(RefreshAuthGuard)
  @Post("refresh")
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies.refreshToken;

    const tokens = await this.authService.refresh(refreshToken);

    res.cookie("accessToken", tokens?.accessToken, {
      httpOnly: true,
    });

    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  logout(@CurrentUser() user: JwtUser, @Res({ passthrough: true }) res: Response) {
    this.authService.logout(user.userId);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return { success: true };
  }
}
