import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../types/jwt-payload.type";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.refreshToken]),
      secretOrKey: process.env.JWT_REFRESH_SECRET as string,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
