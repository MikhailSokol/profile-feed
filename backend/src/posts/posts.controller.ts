import {
  Controller,
  Get,
  Post as HttpPost,
  Patch,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
  Query,
  UseGuards,
  NotFoundException,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Post } from "./post.entity";
import { FilesInterceptor } from "@nestjs/platform-express";
import { UpdatePostDto } from "./dto/update-post.dto";
import type { Express } from "express";
import { CreatePostDto } from "./dto/create-post.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { JwtUser } from "../auth/types/jwt-user.type";

type PostsResponse = {
  items: Post[];
  hasMore: boolean;
  nextOffset: number | null;
  total: number;
};

@Controller("posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get(":id")
  async show(@Param("id") id: string) {
    return this.postsService.show(Number(id));
  }

  @Get()
  async findAll(
    @Query("sort") sort: "asc" | "desc" = "desc",
    @Query("limit") limit = "10",
    @Query("offset") offset = "0"
  ): Promise<PostsResponse> {
    return this.postsService.findAll({
      sort,
      limit: Number(limit),
      offset: Number(offset),
    });
  }

  @HttpPost()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor("images"))
  async create(
    @CurrentUser() user: JwtUser,
    @Body() dto: CreatePostDto,
    @UploadedFiles() files: Express.Multer.File[] = []
  ) {
    return this.postsService.create(user.userId, dto, files);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor("images"))
  async update(
    @Param("id") id: string,
    @Body() data: UpdatePostDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.postsService.update(Number(id), data, data?.existingImages ?? [], files);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async delete(@Param("id") id: string) {
    const result = await this.postsService.delete(+id);

    if (result.affected === 0) {
      throw new NotFoundException({ message: "Post not found", code: "NOT_FOUND" });
    }

    return { success: true };
  }
}
