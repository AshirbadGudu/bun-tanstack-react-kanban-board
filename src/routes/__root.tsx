import * as React from "react";
import { createRootRoute } from "@tanstack/react-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../theme";
import { RootLayout } from "../layouts/RootLayout";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RootLayout />
    </ThemeProvider>
  );
}
