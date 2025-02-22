import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Card,
  CardContent,
  Fade,
  Grid,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useKanbanStore } from "../../store/kanbanStore";
import type { Column, Task } from "../../types/kanban";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Column as ColumnComponent } from "./Column";

export function KanbanBoard() {
  const { tasks, columns, addTask, deleteTask, moveTask } = useKanbanStore();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [newTaskData, setNewTaskData] = React.useState({
    title: "",
    description: "",
    columnId: "",
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleOpenDialog = (columnId: string) => {
    setNewTaskData({ title: "", description: "", columnId });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddTask = () => {
    if (newTaskData.title.trim()) {
      addTask({
        title: newTaskData.title.trim(),
        description: newTaskData.description.trim(),
        column: newTaskData.columnId,
      });
      handleCloseDialog();
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the task being dragged
    const task = tasks.find((t) => t.id === activeId);
    if (!task) return;

    // If hovering over a column and it's different from the current column
    if (columns.some((col) => col.id === overId) && task.column !== overId) {
      moveTask(activeId, overId);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the task being dragged
    const task = tasks.find((t) => t.id === activeId);
    if (!task) return;

    // If dropped over a column and it's different from the current column
    if (columns.some((col) => col.id === overId) && task.column !== overId) {
      moveTask(activeId, overId);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 4 }}
        >
          Kanban Board
        </Typography>

        <Grid container spacing={3}>
          {columns.map((column: Column) => (
            <ColumnComponent
              key={column.id}
              column={column}
              tasks={tasks.filter((task: Task) => task.column === column.id)}
              onAddClick={() => handleOpenDialog(column.id)}
              onDeleteTask={deleteTask}
            />
          ))}
        </Grid>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add New Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Task Title"
              fullWidth
              value={newTaskData.title}
              onChange={(e) =>
                setNewTaskData({ ...newTaskData, title: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Description (optional)"
              fullWidth
              multiline
              rows={3}
              value={newTaskData.description}
              onChange={(e) =>
                setNewTaskData({ ...newTaskData, description: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleAddTask} variant="contained">
              Add Task
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </DndContext>
  );
}
