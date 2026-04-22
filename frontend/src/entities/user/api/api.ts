import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/api/client";
import type { User } from "../model/types";

export const useUser = () =>
  useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async (): Promise<User | null> => {
      try {
        const res = await api.get<User>("/user");
        return res.data;
      } catch (e) {
        console.warn("Login request failed", e);
        return null;
      }
    },
    retry: false,
  });
