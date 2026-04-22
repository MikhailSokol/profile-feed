import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";
import type { ReactNode } from "react";

type SortableItemBase = {
  id: string;
  url: string;
};

type Props<T extends SortableItemBase> = {
  items: T[];
  onChange: (items: T[]) => void;
  onDelete?: (id: string) => void;
  renderOverlay?: (item: T) => ReactNode;
};

export function SortableImages<T extends { id: string; url: string }>({
  items,
  onChange,
  renderOverlay,
}: Props<T>) {
  const sensors = useSensors(useSensor(PointerSensor));

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    onChange(arrayMove(items, oldIndex, newIndex));
  };

  const SortableItem = ({ item }: { item: T }) => {
    const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
      id: item.id,
    });

    return (
      <Box
        ref={setNodeRef}
        {...attributes}
        sx={{
          width: 80,
          height: 80,
          position: "relative",
          borderRadius: 1,
          overflow: "hidden",
          transform: CSS.Transform.toString(transform),
          transition,
        }}
      >
        <img src={item.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

        <Box {...listeners} sx={{ position: "absolute", inset: 0, cursor: "grab", zIndex: 1 }} />

        {renderOverlay?.(item)}
      </Box>
    );
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
        <Box sx={{ display: "flex", gap: 1 }}>
          {items.map((i) => (
            <SortableItem key={i.id} item={i} />
          ))}
        </Box>
      </SortableContext>
    </DndContext>
  );
}
