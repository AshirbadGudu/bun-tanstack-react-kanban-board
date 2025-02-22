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

interface Task {
  id: string;
  title: string;
  column: string;
  description?: string;
}

interface Column {
  id: string;
  title: string;
  color: string;
}

export function KanbanBoard() {
  const [tasks, setTasks] = React.useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("kanbanTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [openDialog, setOpenDialog] = React.useState(false);
  const [newTaskData, setNewTaskData] = React.useState({
    title: "",
    description: "",
    columnId: "",
  });

  const columns: Column[] = [
    { id: "todo", title: "To Do", color: "#ffebee" },
    { id: "inProgress", title: "In Progress", color: "#e3f2fd" },
    { id: "done", title: "Done", color: "#e8f5e9" },
  ];

  React.useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleOpenDialog = (columnId: string) => {
    setNewTaskData({ title: "", description: "", columnId });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddTask = () => {
    if (newTaskData.title.trim()) {
      setTasks((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          title: newTaskData.title.trim(),
          description: newTaskData.description.trim(),
          column: newTaskData.columnId,
        },
      ]);
      handleCloseDialog();
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
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
        {columns.map((column) => (
          <Grid item xs={12} md={4} key={column.id}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                bgcolor: column.color,
                height: "100%",
                minHeight: "70vh",
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                {column.title}
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {tasks
                  .filter((task) => task.column === column.id)
                  .map((task) => (
                    <Fade in key={task.id}>
                      <Card sx={{ position: "relative" }}>
                        <CardContent>
                          <Typography variant="h6" component="div">
                            {task.title}
                          </Typography>
                          {task.description && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 1 }}
                            >
                              {task.description}
                            </Typography>
                          )}
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => deleteTask(task.id)}
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
                    </Fade>
                  ))}
              </Box>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog(column.id)}
                sx={{ mt: 2 }}
                fullWidth
              >
                Add Task
              </Button>
            </Paper>
          </Grid>
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
  );
}
