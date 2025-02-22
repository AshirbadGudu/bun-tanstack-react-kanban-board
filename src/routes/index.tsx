import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { KanbanBoard } from "../components/kanban/KanbanBoard";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return <KanbanBoard />;
}
