import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../types/jwt-payload.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.accessToken]),
      secretOrKey: process.env.JWT_ACCESS_SECRET as string,
      ignoreExpiration: false,
    });
  }

  validate(payload: JwtPayload) {
    if (!payload?.sub) {
      throw new UnauthorizedException({
        message: "Invalid token",
        code: "INVALID_TOKEN",
      });
    }
    return { userId: payload.sub, email: payload.email };
  }
}
