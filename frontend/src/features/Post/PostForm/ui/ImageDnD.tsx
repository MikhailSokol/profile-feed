import { SortableImages } from "@/shared/ui/SortableImages";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { validateFile } from "../model/helpers";
import { BASE_URL } from "@/shared/api/client";

type ExistingImage = {
  type: "existing";
  id: string;
  url: string;
};

type NewImage = {
  type: "new";
  id: string;
  file: File;
  url: string;
};

type AddItem = {
  type: "add";
  id: "add";
};

const ADD_ITEM: AddItem = {
  type: "add",
  id: "add",
};

type Item = ExistingImage | NewImage;

type Props = {
  defImages?: string[];
  onChange: (data: { existing: string[]; newFiles: File[] }) => void;
  error: string;
  setError: () => void;
};

const MAX = 10;

export const ImageDnD = ({ defImages = [], onChange, setError, error }: Props) => {
  const [items, setItems] = useState<Item[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const isLimitReached = items.length >= MAX;

  useEffect(() => {
    setItems(
      defImages.map((img) => ({
        type: "existing",
        id: img,
        url: BASE_URL + img,
      }))
    );
  }, [defImages]);

  const sync = (list: Item[]) => {
    onChange({
      existing: list.filter((i) => i.type === "existing").map((i) => i.id),
      newFiles: list.filter((i): i is NewImage => i.type === "new").map((i) => i.file),
    });
  };

  const handleChange = (list: Item[]) => {
    setItems(list);
    sync(list);
  };

  const onUpload = (files: FileList) => {
    if (isLimitReached) return;

    const available = MAX - items.length;

    const validFiles: File[] = [];

    for (const file of Array.from(files)) {
      const error = validateFile(file);

      if (error) {
        setError();
        return [];
      }

      validFiles.push(file);
    }

    const newItems: NewImage[] = Array.from(files)
      .slice(0, available)
      .map((file) => ({
        type: "new",
        id: crypto.randomUUID(),
        file,
        url: URL.createObjectURL(file),
      }));

    handleChange([...items, ...newItems]);
  };

  const onDelete = (id: string) => {
    handleChange(items.filter((i) => i.id !== id));
  };

  const displayItems: (Item | AddItem)[] = [...items, ...(items.length < MAX ? [ADD_ITEM] : [])];

  return (
    <Box>
      <input
        type="file"
        multiple
        hidden
        id="upload"
        onChange={(e) => e.target.files && onUpload(e.target.files)}
      />

      <Box
        onClick={() => {
          if (!isLimitReached) {
            document.getElementById("upload")?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!isLimitReached) setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDraggingOver(false);
          if (!isLimitReached) {
            onUpload(e.dataTransfer.files);
          }
        }}
        sx={{
          width: "100%",
          minHeight: 100,
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1,
          borderRadius: 2,
          border: isDraggingOver
            ? "2px solid #1976d2"
            : isLimitReached
              ? "2px dashed #ccc"
              : "2px dashed #aaa",
          background: isDraggingOver
            ? "rgba(25,118,210,0.08)"
            : isLimitReached
              ? "rgba(0,0,0,0.03)"
              : "transparent",
          cursor: isLimitReached ? "not-allowed" : "pointer",
          opacity: isLimitReached ? 0.7 : 1,
          overflowX: "auto",
          justifyContent: "center",
        }}
      >
        {items.length === 0 && <Typography>Перетащи изображения или кликни</Typography>}

        <Box sx={{ display: "flex", gap: 1 }}>
          {displayItems?.map((item) => {
            if (item.type === "add") {
              return (
                <Box
                  key="add"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isLimitReached) {
                      document.getElementById("upload")?.click();
                    }
                  }}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 1,
                    border: "2px dashed #aaa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    cursor: isLimitReached ? "not-allowed" : "pointer",
                    opacity: isLimitReached ? 0.5 : 1,
                  }}
                >
                  +
                </Box>
              );
            }

            return (
              <SortableImages
                key={item.id}
                items={[item]}
                onChange={() => {}}
                renderOverlay={() => (
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                    sx={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      zIndex: 2,
                      background: "rgba(0,0,0,0.5)",
                      color: "white",
                      width: 26,
                      height: 26,
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                )}
              />
            );
          })}
        </Box>
      </Box>

      {/* COUNTER */}
      <Typography
        variant="caption"
        sx={{
          mt: 1,
          display: "block",
          textAlign: "right",
          color: isLimitReached ? "error.main" : "text.secondary",
        }}
      >
        {items.length} / {MAX}
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};
