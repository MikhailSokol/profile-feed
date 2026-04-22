import { useUploadAvatar } from "@/widgets/avatarDnd/api/api";

export const useHomeActions = () => {
  const uploadAvatar = useUploadAvatar();

  return {
    uploadAvatar,
  };
};
