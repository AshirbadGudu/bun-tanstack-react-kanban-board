import * as React from "react";
import { Paper, Typography, Button, Box, Grid } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import type { Column as ColumnType, Task } from "../../types/kanban";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskCard } from "./TaskCard";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onAddClick: () => void;
  onDeleteTask: (id: string) => void;
}

export function Column({
  column,
  tasks,
  onAddClick,
  onDeleteTask,
}: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <Grid item xs={12} md={4}>
      <Paper
        elevation={2}
        sx={{
          p: 2,
          bgcolor: column.color,
          height: "100%",
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.2s ease",
          outline: isOver ? "2px dashed rgba(0, 0, 0, 0.2)" : "none",
          outlineOffset: "-8px",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          {column.title}
        </Typography>

        <Box
          ref={setNodeRef}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minHeight: 200,
            p: 1,
            mx: -1,
            borderRadius: 1,
            backgroundColor: isOver ? "rgba(0, 0, 0, 0.04)" : "transparent",
            transition: "background-color 0.2s ease",
          }}
        >
          <SortableContext
            items={tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={onDeleteTask} />
            ))}
            {tasks.length === 0 && isOver && (
              <Box
                sx={{
                  height: 100,
                  border: "2px dashed rgba(0, 0, 0, 0.1)",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "text.secondary",
                }}
              >
                Drop here
              </Box>
            )}
          </SortableContext>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddClick}
          sx={{ mt: 2 }}
          fullWidth
        >
          Add Task
        </Button>
      </Paper>
    </Grid>
  );
}
