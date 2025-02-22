import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
  MoreVert as MoreIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import type { Task } from "../../types/kanban";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    onEdit(task);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete(task.id);
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
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
          <IconButton
            size="small"
            sx={{
              cursor: "grab",
              color: "text.secondary",
              "&:hover": { backgroundColor: "transparent" },
            }}
            {...listeners}
          >
            <DragIcon />
          </IconButton>
          <Box sx={{ flex: 1, pr: 4 }}>
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
            onClick={handleMenuClick}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "text.secondary",
            }}
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: "error.main" }}>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  );
}
