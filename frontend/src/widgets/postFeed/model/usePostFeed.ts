import { useMemo } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { usePosts } from "@/entities/post/api/api";
import { useSearchParams } from "react-router-dom";

export const usePostFeed = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const order = (searchParams.get("order") as "asc" | "desc") || "desc";

  const setOrder = (value: "asc" | "desc") => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("order", value);
      return params;
    });
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = usePosts({
    sort: order,
    limit: 5,
  });

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: !!hasNextPage,
    onLoadMore: () => fetchNextPage?.(),
    rootMargin: "0px 0px 200px 0px",
  });

  const posts = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((p) => p.items);
  }, [data]);

  return {
    posts,
    isLoading,
    order,
    setOrder,
    sentryRef,
    isFetchingNextPage,
    hasNextPage,
    searchParams,
  };
};
