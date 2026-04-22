import { useRef, useState } from "react";
import { AvatarDnDView } from "./AvatarDnDView";
import { useAvatarPreview } from "../model/useAvatarPreview";

type Props = {
  value?: string | null;
  onChange: (file: File) => void;
  disabled: boolean;
};

export const AvatarDnD = ({ value, onChange, disabled }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const { preview, handleFile } = useAvatarPreview(onChange, setAvatarError);

  return (
    <AvatarDnDView
      avatarError={avatarError}
      disabled={disabled}
      src={preview || value}
      isDragging={isDragging}
      inputRef={inputRef}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
      }}
      onFileChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
      }}
    />
  );
};
