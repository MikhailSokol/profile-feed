import type z from "zod";
import { postSchema } from "../model/schema";

export type PostsQueryParams = {
  sort?: "asc" | "desc";
  limit?: number;
  id?: number;
};

export type PostsResponse = {
  items: PostsResponseItem[];
  nextOffset: number | null;
  hasMore: boolean;
  total: number;
};

export type PostsResponseItem = {
  text: string;
  images: string[];
  id: number;
  createdAt: string;
  userId: number;
};

export type Post = z.infer<typeof postSchema>;
