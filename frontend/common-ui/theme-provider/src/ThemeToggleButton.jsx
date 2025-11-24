// src/ThemeToggleButton.jsx
import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "./ThemeProviderContext";

export const ThemeToggleButton = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
      <IconButton id="theme-toggle-btn" color="inherit" onClick={(e) => toggleTheme(e)} >
        {mode === "light" ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
};
