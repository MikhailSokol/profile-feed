import { postsKeys } from "@/entities/post/api/api";
import type { PostsResponse, PostsResponseItem } from "@/entities/post/model/types";
import { api } from "@/shared/api/client";
import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import type { PostFormValues } from "../../PostForm/model/types";

export const useCreatePost = (userId: number) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: PostFormValues) => {
      const fd = new FormData();

      fd.append("text", data.text ?? "");
      data?.images?.forEach((f) => fd.append("images", f));

      return api.post("/posts", fd);
    },

    onMutate: async (data) => {
      await qc.cancelQueries({ queryKey: postsKeys.all });

      const prev = qc.getQueriesData({ queryKey: postsKeys.all });

      const tempPost: PostsResponseItem = {
        id: Date.now(),
        text: data.text ?? "",
        images: [],
        createdAt: new Date().toISOString(),
        userId,
      };

      qc.setQueriesData(
        { queryKey: postsKeys.all },
        (old: InfiniteData<PostsResponse> | undefined) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page, i: number) =>
              i === 0 ? { ...page, items: [tempPost, ...page.items] } : page
            ),
          };
        }
      );

      return { prev };
    },

    onError: (e) => console.log("ERROR", e),

    onSettled: () => {
      qc.invalidateQueries({ queryKey: postsKeys.all });
    },
  });
};
