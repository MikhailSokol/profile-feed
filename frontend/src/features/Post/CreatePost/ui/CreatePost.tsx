import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useCreatePost } from "../api/api";
import type { PostFormValues } from "../../PostForm/model/types";
import { PostForm } from "../../PostForm/ui/PostForm";

type Props = {
  open: boolean;
  onClose: () => void;
  sessionUserId: number;
};

export const CreatePost = ({ open, onClose, sessionUserId }: Props) => {
  const create = useCreatePost(sessionUserId);

  const handleSubmit = (data: PostFormValues) => {
    create.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Создать пост</DialogTitle>

      <DialogContent>
        <PostForm
          defaultValues={{ images: [], existingImages: [], text: "" }}
          onSubmit={handleSubmit}
          loading={create.isPending}
        />
      </DialogContent>
    </Dialog>
  );
};
