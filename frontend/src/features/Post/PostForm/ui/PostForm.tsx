import { TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { postFormSchema } from "../model/schema";
import type { PostFormValues } from "../model/types";
import { ImageDnD } from "./ImageDnD";

type Props = {
  defaultValues?: PostFormValues;
  onSubmit: (data: PostFormValues) => void;
  loading?: boolean;
};

export const PostForm = ({ defaultValues, onSubmit, loading }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues]);

  const values = watch();

  const isFormEmpty = Object.values(values).every((v) => (Array.isArray(v) ? v.length === 0 : !v));

  const handleImagesChange = (data: { existing: string[]; newFiles: File[] }) => {
    clearErrors();
    setValue("images", data.newFiles);
    setValue("existingImages", data.existing);
  };

  const checkErrorImage = () => {
    setError("images", { message: "Формат картинки: png, jpeg, webp и не не более 5 МБ" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField multiline rows={3} label="Что нового?" {...register("text")} />

        <ImageDnD
          error={errors.images?.message as string}
          setError={checkErrorImage}
          defImages={defaultValues?.existingImages ?? []}
          onChange={handleImagesChange}
        />

        <Button type="submit" variant="contained" disabled={loading || isFormEmpty}>
          Сохранить
        </Button>
      </Stack>
    </form>
  );
};
