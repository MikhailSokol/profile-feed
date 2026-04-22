import { AuthGuard } from "@nestjs/passport";
import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtInfo } from "../types/jwt-info.type";

@Injectable()
export class RefreshAuthGuard extends AuthGuard("jwt-refresh") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleRequest(err: unknown, user: any, info: JwtInfo | undefined, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException({
        code: "NO_REFRESH_TOKEN",
        message: "Refresh token missing",
      });
    }

    if (info?.name === "TokenExpiredError") {
      throw new UnauthorizedException({
        code: "REFRESH_TOKEN_EXPIRED",
        message: "Refresh token expired",
      });
    }

    if (err || !user) {
      throw new UnauthorizedException({
        code: "INVALID_REFRESH_TOKEN",
        message: "Invalid refresh token",
      });
    }

    return user;
  }
}
