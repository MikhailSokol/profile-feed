import { postsKeys } from "@/entities/post/api/api";
import type { PostsResponse } from "@/entities/post/model/types";
import { api } from "@/shared/api/client";
import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import type { PostFormValues } from "../../PostForm/model/types";

export const useUpdatePost = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ fd, id }: { fd: PostFormValues; id: number }) => {
      const form = new FormData();

      if (fd.images?.length) {
        fd.images.forEach((image) => {
          form.append("images", image);
        });
      }

      form.append("text", fd.text as string);
      form.append("existingImages", JSON.stringify(fd.existingImages));

      return api.patch(`/posts/${id}`, form);
    },

    onMutate: async ({ fd, id }) => {
      await qc.cancelQueries({ queryKey: postsKeys.all });

      const prev = qc.getQueriesData({ queryKey: postsKeys.all });

      qc.setQueriesData(
        { queryKey: postsKeys.all },
        (old: InfiniteData<PostsResponse> | undefined) => {
          if (!old) return old;

          return {
            ...old,
            pages: old?.pages?.map((page) => ({
              ...page,
              items: page?.items?.map((post) =>
                post.id === id
                  ? {
                      ...post,
                      text: fd.text ?? post.text,
                    }
                  : post
              ),
            })),
          };
        }
      );

      return { prev };
    },

    onSuccess: (response, { id }) => {
      qc.setQueriesData(
        { queryKey: postsKeys.all },
        (old: InfiniteData<PostsResponse> | undefined) => {
          if (!old) return old;

          return {
            ...old,
            pages: old?.pages?.map((page) => ({
              ...page,
              items: page?.items?.map((post) =>
                post.id === id
                  ? {
                      ...post,
                      ...response.data,
                    }
                  : post
              ),
            })),
          };
        }
      );
    },

    onError: (e) => console.log("ERROR", e),
  });
};
