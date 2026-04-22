import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtInfo } from "../types/jwt-info.type";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleRequest(err: unknown, user: any, info: JwtInfo | undefined, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      throw new UnauthorizedException({
        code: "NO_ACCESS_TOKEN",
        message: "Access token missing",
      });
    }

    if (info?.name === "TokenExpiredError") {
      throw new UnauthorizedException({
        code: "ACCESS_TOKEN_EXPIRED",
        message: "Access token expired",
      });
    }

    if (err || !user) {
      throw new UnauthorizedException({
        code: "INVALID_TOKEN",
        message: "Invalid token",
      });
    }

    return user;
  }
}
