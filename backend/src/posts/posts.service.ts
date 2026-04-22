import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import type { Express } from "express";
import { Post } from "./post.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { User } from "../user/user.entity";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  async findAll(params: { sort: "asc" | "desc"; limit: number; offset: number }) {
    const order = params.sort === "asc" ? "ASC" : "DESC";

    const [items, total] = await this.repo.findAndCount({
      order: {
        createdAt: order,
      },
      take: params.limit,
      skip: params.offset,
    });

    const nextOffset = params.offset + params.limit;

    return {
      items,
      hasMore: nextOffset < total,
      nextOffset: nextOffset < total ? nextOffset : null,
      total,
    };
  }

  async create(userId: number, data: CreatePostDto, files: Express.Multer.File[] = []) {
    const images = files.map((f) => `/uploads/${f.filename}`);

    const post = this.repo.create({
      ...data,
      images,
      user: { id: userId } as User,
    });

    return this.repo.save(post);
  }

  async update(
    id: number,
    data: UpdatePostDto,
    existingImages: string[],
    files: Express.Multer.File[]
  ) {
    const post = await this.repo.findOne({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException({ message: "Post not found", code: "NOT_FOUND" });
    }

    const existing = Array.isArray(existingImages) ? existingImages : [];

    const kept = post.images.filter((img) => existing.includes(img));
    const added = files.map((f) => `/uploads/${f.filename}`);

    post.images = [...kept, ...added];

    if (data.text !== undefined) {
      post.text = data.text;
    }

    return this.repo.save(post);
  }

  async delete(id: number) {
    const post = await this.repo.findOneBy({ id });
    if (!post) throw new NotFoundException({ message: "Post not found", code: "NOT_FOUND" });
    return this.repo.delete(id);
  }

  async show(id: number) {
    const post = await this.repo.findOneBy({ id });
    if (!post) throw new NotFoundException({ message: "Post not found", code: "NOT_FOUND" });
    return post;
  }
}
