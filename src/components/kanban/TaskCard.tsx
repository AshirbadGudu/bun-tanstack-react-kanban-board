import * as React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import type { Task } from "../../types/kanban";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      sx={{
        position: "relative",
        "&:hover": {
          boxShadow: (theme) => theme.shadows[4],
        },
      }}
      {...attributes}
      {...listeners}
    >
      <CardContent>
        <Box sx={{ pr: 4 }}>
          <Typography variant="h6" component="div" gutterBottom>
            {task.title}
          </Typography>
          {task.description && (
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
          )}
        </Box>
        <IconButton
          size="small"
          color="error"
          onClick={() => onDelete(task.id)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}
