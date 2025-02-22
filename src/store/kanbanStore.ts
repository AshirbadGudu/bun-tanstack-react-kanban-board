import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { KanbanStore, Column } from "../types/kanban";

const defaultColumns: Column[] = [
  { id: "todo", title: "To Do", color: "#ffebee" },
  { id: "inProgress", title: "In Progress", color: "#e3f2fd" },
  { id: "done", title: "Done", color: "#e8f5e9" },
];

export const useKanbanStore = create<KanbanStore>()(
  persist(
    (set) => ({
      tasks: [],
      columns: defaultColumns,
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: crypto.randomUUID(),
            },
          ],
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
      moveTask: (taskId, targetColumn) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, column: targetColumn } : task
          ),
        })),
    }),
    {
      name: "kanban-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
