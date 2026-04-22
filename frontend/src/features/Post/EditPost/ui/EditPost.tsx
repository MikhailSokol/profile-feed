import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useUpdatePost } from "../api/api";
import { usePost } from "@/entities/post/api/api";

import { useUI } from "@/shared/store/ui";
import type { PostFormValues } from "../../PostForm/model/types";
import { PostForm } from "../../PostForm/ui/PostForm";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const EditPost = ({ open, onClose }: Props) => {
  const { postIdEdit } = useUI();
  const { data } = usePost(Number(postIdEdit));
  const update = useUpdatePost();

  if (!data || !postIdEdit) return null;

  const handleSubmit = (formData: PostFormValues) => {
    update.mutate(
      { fd: formData, id: Number(postIdEdit) },
      {
        onSuccess: () => onClose(),
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Редактировать пост</DialogTitle>

      <DialogContent>
        <PostForm
          defaultValues={{
            text: data.text,
            existingImages: data.images,
            images: [],
          }}
          onSubmit={handleSubmit}
          loading={update.isPending}
        />
      </DialogContent>
    </Dialog>
  );
};
