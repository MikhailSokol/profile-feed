import { api } from "@/shared/api/client";
import { useUI } from "@/shared/store/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { email: string; password: string }) => api.post("/auth/login", data),

    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["user"] });
      useUI.getState().closeLogin();
    },
  });
};
