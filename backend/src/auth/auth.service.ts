import { LoginDto } from "./dto/login.dto";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import bcrypt from "bcrypt";
import { JwtPayload } from "./types/jwt-payload.type";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async register(dto: LoginDto) {
    const exists = await this.userService.findByEmail(dto.email);
    if (exists) throw new BadRequestException({ message: "Email exists", code: "ALREADY_EXIST" });

    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.userService.create({
      email: dto.email,
      password: hash,
    });

    return this.generateTokens(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      return this.register(dto);
    }

    const match = await bcrypt.compare(dto.password, user.password);

    if (!match)
      throw new UnauthorizedException({ message: "Invalid password", code: "INVALID_PASSWORD" });

    return this.generateTokens(user as User);
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify<JwtPayload>(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.userService.findById(payload.sub);

      if (!user) throw new NotFoundException({ message: "User not found", code: "USER_NOT_FOUND" });

      // проверка хеша refresh токена
      const isValid = await bcrypt.compare(refreshToken, user.refreshTokenHash || "");

      if (!isValid)
        throw new UnauthorizedException({
          message: "Invalid refresh token",
          code: "INVALID_REFRESH_TOKEN",
        });

      return this.generateTokens(user);
    } catch {
      throw new UnauthorizedException({
        message: "Invalid refresh token",
        code: "INVALID_REFRESH_TOKEN",
      });
    }
  }

  async logout(userId: number) {
    await this.userService.updateUser(userId, {
      refreshTokenHash: null,
    });

    return { success: true };
  }

  async generateTokens(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: "15m",
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: "7d",
    });

    const hashed = await bcrypt.hash(refreshToken, 10);

    await this.userService.updateUser(user.id, {
      refreshTokenHash: hashed,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
