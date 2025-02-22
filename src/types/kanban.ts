export interface Task {
  id: string;
  title: string;
  column: string;
  description?: string;
}

export interface Column {
  id: string;
  title: string;
  color: string;
}

export interface KanbanStore {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, targetColumn: string) => void;
  columns: Column[];
}
