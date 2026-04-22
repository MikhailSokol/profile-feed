import { validateFile } from "@/features/Post/PostForm/model/helpers";
import { useState, useCallback } from "react";

export const useAvatarPreview = (
  onChange: (file: File) => void,
  onError?: (msg: string | null) => void
) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      const isNotValid = validateFile(file);

      if (isNotValid) {
        onError?.(isNotValid);
        return;
      }
      onError?.(null);
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange(file);
    },
    [onChange, onError]
  );

  return { preview, handleFile };
};
