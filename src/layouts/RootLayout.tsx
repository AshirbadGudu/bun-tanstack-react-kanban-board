import * as React from "react";
import { Link, Outlet } from "@tanstack/react-router";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";

export function RootLayout() {
  return (
    <>
      <AppBar position="static" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Kanban App
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                component={Link}
                to="/"
                color="inherit"
                sx={{
                  "&[data-active]": {
                    fontWeight: "bold",
                  },
                }}
                activeOptions={{ exact: true }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/about"
                color="inherit"
                sx={{
                  "&[data-active]": {
                    fontWeight: "bold",
                  },
                }}
              >
                About
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", minHeight: "100vh" }}
      >
        <Outlet />
      </Box>
    </>
  );
}
