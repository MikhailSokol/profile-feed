import { Card, CardContent, Typography, Stack, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { memo, useMemo } from "react";
import { ImageWithSkeleton } from "@/shared/ui/ImageWithSkeleton";
import { useDeletePost } from "../../api/api";
import { useUI } from "@/shared/store/ui";

type Props = {
  post: {
    id: number;
    text: string;
    images: string[];
    createdAt: string;
    userId: number;
  };
  sesssioUserId?: number | null;
};

export const PostCard = memo(({ post, sesssioUserId }: Props) => {
  const { openEditPost } = useUI((s) => s);

  const deletePost = useDeletePost();

  const handleDelete = () => {
    deletePost.mutate(post.id);
  };

  const handleUpdate = () => {
    openEditPost(post.id);
  };

  const formattedDate = useMemo(() => new Date(post.createdAt).toLocaleString(), [post.createdAt]);

  const images = useMemo(
    () => post.images.map((img) => `http://localhost:3000${img}`),
    [post.images]
  );

  return (
    <Card>
      <CardContent>
        <Stack direction="row">
          <Typography variant="body2" color="textSecondary">
            {formattedDate}
          </Typography>

          {sesssioUserId === post.userId && (
            <Stack sx={{ ml: "auto" }} direction="row">
              <IconButton sx={{ pt: 0 }} onClick={handleUpdate}>
                <EditIcon />
              </IconButton>

              <IconButton sx={{ pt: 0 }} onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          )}
        </Stack>

        <Stack direction="column" spacing={2}>
          <Typography color="textPrimary">{post.text}</Typography>

          {post.images?.length > 0 && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: post.images.length === 1 ? "1fr" : "repeat(2, 1fr)",
                gap: 1,
                maxWidth: post.images.length === 1 ? "50%" : "100%",
              }}
            >
              {images.map((img) => (
                <ImageWithSkeleton key={img} src={img} />
              ))}
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
});
