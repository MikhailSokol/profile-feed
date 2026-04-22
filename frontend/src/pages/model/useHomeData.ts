import { useUser } from "@/entities/user/api/api";

export const useHomeData = () => {
  const { data: user, isLoading } = useUser();
  return {
    user,
    isLoading,
  };
};
