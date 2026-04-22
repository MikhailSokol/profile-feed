import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/api/client";
import type { User } from "@/entities/user/model/types";

export const useUploadAvatar = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => {
      const fd = new FormData();
      fd.append("avatar", file);

      return api.post("/user/avatar", fd);
    },

    onSuccess: (res) => {
      qc.setQueryData(["user"], (old: User) => ({
        ...old,
        avatar: res.data.avatar,
      }));
    },
  });
};
