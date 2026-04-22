import { api } from "@/shared/api/client";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      console.warn("Logout request failed", e);
    }
    queryClient.resetQueries({ queryKey: ["user"] });
    navigate("/");
  };
};
