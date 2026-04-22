import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { UserEditForm } from "../model/types";
import { api } from "@/shared/api/client";
import type { User } from "@/entities/user/model/types";

export const useUpdateUser = () => {
  const qc = useQueryClient();

  return useMutation<User, Error, UserEditForm>({
    mutationFn: async (data: UserEditForm): Promise<User> => {
      const res = await api.patch<User>("/user", data);
      return res.data;
    },

    onSuccess: (updatedUser) => {
      qc.setQueryData(["user"], updatedUser);
    },
  });
};
