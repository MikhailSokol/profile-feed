import { BadRequestException, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { Post } from "./post.entity";

import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { User } from "../user/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User]),
    MulterModule.register({
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },

      fileFilter: (req, file, callback) => {
        const allowedMimes = ["image/jpeg", "image/png", "image/webp"];

        if (!allowedMimes.includes(file.mimetype)) {
          return callback(
            new BadRequestException({
              message: "Only images allowed",
              code: "INVALID_FILE_TYPE",
            }),
            false
          );
        }

        callback(null, true);
      },
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
