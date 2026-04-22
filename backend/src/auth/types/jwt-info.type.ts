export type JwtInfo = {
  name?: "TokenExpiredError" | "JsonWebTokenError" | string;
  message?: string;
};
