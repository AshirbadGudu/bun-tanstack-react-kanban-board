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
  const { setNodeRef } = useDroppable({
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
          }}
        >
          <SortableContext
            items={tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={onDeleteTask} />
            ))}
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
