import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  useQuery,
  type InfiniteData,
} from "@tanstack/react-query";
import { api } from "../../../shared/api/client";
import type { PostsQueryParams, PostsResponse, PostsResponseItem } from "../model/types";

export const postsKeys = {
  all: ["posts"] as const,
  list: (sort: string, limit: number) => ["posts", "list", sort, limit] as const,
};

export const usePosts = (params: PostsQueryParams = { limit: 5, sort: "desc" }) => {
  const limit = params.limit ?? 5;
  const sort = params.sort ?? "desc";
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage, isError, error } =
    useInfiniteQuery({
      queryKey: postsKeys.list(sort, limit),

      queryFn: async ({ pageParam = 0 }) => {
        const { data } = await api.get<PostsResponse>("/posts", {
          params: {
            sort: params?.sort,
            limit: params?.limit,
            offset: pageParam,
          },
        });

        return data;
      },
      initialPageParam: 0,

      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.hasMore) return undefined;

        return allPages.length * (params?.limit ?? 5);
      },
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
  };
};

export const useDeletePost = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.delete(`/posts/${id}`),

    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: postsKeys.all });

      const prev = qc.getQueriesData({ queryKey: postsKeys.all });

      qc.setQueriesData(
        { queryKey: postsKeys.all },
        (old: InfiniteData<PostsResponse> | undefined) => {
          if (!old?.pages) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              items: page.items.filter((p: PostsResponseItem) => p.id !== id),
            })),
          };
        }
      );

      return { prev };
    },

    onError: (_err, _id, ctx) => {
      if (!ctx?.prev) return;

      ctx.prev.forEach(([key, data]) => {
        qc.setQueryData(key, data);
      });
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: postsKeys.all });
    },
  });
};

export const usePost = (id?: number) => {
  return useQuery({
    queryKey: ["posts", "detail", id],
    enabled: !!id,

    queryFn: async () => {
      const { data } = await api.get(`/posts/${id}`);
      return data;
    },
  });
};
