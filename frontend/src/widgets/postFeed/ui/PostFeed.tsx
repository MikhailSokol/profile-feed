import { Box, Button, Stack, Typography } from "@mui/material";
import { PostCard } from "@/entities/post/ui/PostCard/PostCard";
import { PostSkeleton } from "@/shared/ui/PostsSkeleton";
import { usePostFeed } from "../model/usePostFeed";
import { useEffect, type RefObject } from "react";
import { Loader } from "@/shared/ui/Loader";

type Props = {
  scrollContainer: RefObject<HTMLDivElement | null>;
  sesssioUserId?: number | null;
};

export const PostFeed = ({ scrollContainer, sesssioUserId }: Props) => {
  const {
    posts,
    isLoading,
    order,
    setOrder,
    sentryRef,
    isFetchingNextPage,
    hasNextPage,
    searchParams,
  } = usePostFeed();

  useEffect(() => {
    if (!searchParams.get("order")?.length) {
      setOrder("desc");
    }
  }, [searchParams]);

  if (isLoading) return <PostSkeleton />;

  return (
    <Stack spacing={2}>
      {!!posts?.length && (
        <Stack direction="row" sx={{ position: "sticky", top: 0, bgcolor: "#fff", zIndex: 2 }}>
          <Button
            sx={order === "desc" ? { opacity: 0.7 } : {}}
            onClick={() => {
              setOrder("desc");
              scrollContainer.current?.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={posts?.length <= 1}
          >
            Новые
          </Button>

          <Button
            sx={order === "asc" ? { opacity: 0.7 } : {}}
            onClick={() => {
              setOrder("asc");
              scrollContainer.current?.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={posts?.length <= 1}
          >
            Старые
          </Button>
        </Stack>
      )}

      {posts?.map((p) => (
        <PostCard sesssioUserId={sesssioUserId} key={p.id} post={p} />
      ))}

      {!posts?.length && (
        <Typography color="textSecondary" sx={{ textAlign: "center", mt: "30px !important" }}>
          {"Постов не найдено"}
        </Typography>
      )}
      <div ref={sentryRef} style={{ height: 1 }} />
      {(isFetchingNextPage || hasNextPage) && (
        <Box sx={{ margin: "0 auto" }}>
          <Loader />
        </Box>
      )}
    </Stack>
  );
};
