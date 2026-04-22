import { BadRequestException, Catch, HttpException, HttpStatus } from "@nestjs/common";
import type { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { MulterError } from "multer";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: ExceptionFilter, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    if (exception instanceof MulterError) {
      if (exception.code === "LIMIT_FILE_SIZE") {
        throw new BadRequestException({
          code: "FILE_TOO_LARGE",
          message: "Max file size is 5MB",
        });
      }
    }
    console.error("ERROR:", exception);

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.getResponse() : "Internal server error";

    res.status(status).json({
      statusCode: status,
      message,
    });
  }
}
