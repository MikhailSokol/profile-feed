import { Dialog, DialogTitle, DialogContent, TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fields, labels } from "../lib/fields";
import { userSchema } from "../model/schema";
import type { UserEdit } from "../model/types";
import { useUpdateUser } from "../api/api";
import type { User } from "@/entities/user/model/types";
import { useUI } from "@/shared/store/ui";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  user?: User | null;
};
export const EditProfileModal = ({ open, onClose, user }: Props) => {
  const update = useUpdateUser();
  const { globalError, setGlobalError } = useUI();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<UserEdit>({
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      bio: user?.bio ?? "",
      phone: user?.phone ?? "",
      birthDay: user?.birthDay ?? "",
    },
    resolver: zodResolver(userSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = (data: UserEdit) => {
    update.mutate(data);
    onClose();
    setGlobalError();
  };

  useEffect(() => {
    if (globalError && globalError?.message?.code === "ALREADY_EXIST") {
      setError("email", { message: globalError?.message?.message as string });
    }
  }, [globalError]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Редактировать профиль</DialogTitle>

      <DialogContent sx={{ minWidth: "400px" }}>
        <form onChange={() => clearErrors()} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {fields.map((key) => {
              return (
                <TextField
                  key={key}
                  label={labels[key]}
                  {...register(key)}
                  error={!!errors?.[key]}
                  helperText={errors?.[key]?.message as string}
                />
              );
            })}
            <Button type="submit" variant="contained">
              Сохранить
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
