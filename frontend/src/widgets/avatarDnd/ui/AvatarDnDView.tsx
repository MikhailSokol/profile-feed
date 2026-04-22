import { Avatar, Box } from "@mui/material";
import type { DragEvent, ChangeEvent, RefObject } from "react";

type Props = {
  src?: string | null;
  isDragging: boolean;
  onClick: () => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  avatarError: string | null;
};

export const AvatarDnDView = ({
  src,
  isDragging,
  onClick,
  onDragOver,
  onDragLeave,
  onDrop,
  inputRef,
  onFileChange,
  disabled,
  avatarError,
}: Props) => {
  return (
    <Box
      onClick={onClick}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      sx={{
        position: "relative",
        cursor: "pointer",
        width: 96,
        height: 96,
        borderRadius: "50%",
        top: "3px",
        border: isDragging ? "3px solid #1976d2" : "3px solid transparent",
        transition: "0.2s",
      }}
    >
      <input
        disabled={disabled}
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={onFileChange}
      />

      <Avatar src={src ?? undefined} sx={{ width: 90, height: 90 }} />
      {avatarError && (
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: "absolute",
            background: "#fff",
            borderRadius: 2,
            padding: 2,
            border: "1px solid gray",
            zIndex: 2,
            left: "85%",
            top: "85%",
            width: "200px",
            cursor: "default",
          }}
        >
          {avatarError}
        </Box>
      )}
    </Box>
  );
};
