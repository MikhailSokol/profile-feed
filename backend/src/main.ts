import "reflect-metadata";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import * as helmet from "helmet";
import { json, urlencoded } from "express";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    helmet.default({
      crossOriginResourcePolicy: {
        policy: "cross-origin",
      },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          imgSrc: ["'self'", "data:", process.env.BASE_URL as string],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https:"],
        },
      },
    })
  );

  // Body parser
  app.use(json({ limit: "10mb" }));
  app.use(urlencoded({ extended: true, limit: "10mb" }));

  // Статика для файлов
  app.useStaticAssets(join(process.cwd(), "uploads"), {
    prefix: "/uploads/",
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.use(cookieParser());

  app.enableCors({
    origin: [process.env.FRONT_URL as string],
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(3000, "0.0.0.0");
  console.log(`Server started at http://localhost:${port}`);
}

bootstrap();
