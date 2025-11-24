import { Routes, Route, Navigate } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import LeftNavbar from "./ui/LeftNavbar";
import HeaderBar from "./ui/HeaderBar";
import Portfolio from "./ui/Portfolio";

function App() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const sidebarBg = isDark
    ? "linear-gradient(180deg, #0E1118 0%, #101B2D 100%)"
    : "linear-gradient(180deg, #FFFFFF 0%, #F3F6FA 100%)";

  const headerBg = isDark
    ? "linear-gradient(90deg, #142033 0%, #1F2E45 100%)"
    : "linear-gradient(90deg, #FFFFFF 0%, #F6F8FC 100%)";

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh", // allowed here ONLY
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: 260,
          height: "100vh",     // keep only for sidebar since it's fixed
          position: "fixed",
          background: sidebarBg,
          borderRight: `1px solid ${theme.palette.divider}`,
          transition: "background 0.4s ease",
          zIndex: 1200,
        }}
      >
        <LeftNavbar />
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          ml: "260px",
          display: "flex",
          flexDirection: "column",
          // ❌ REMOVE minHeight: 100vh; DO NOT ADD ANY HEIGHT HERE
        }}
      >
        {/* Header */}
        <Box
          sx={{
            position: "fixed",
            left: 260,
            right: 0,
            height: 61,
            zIndex: 1000,
            background: headerBg,
            boxShadow: isDark
              ? "0 2px 10px rgba(0, 0, 0, 0.32)"
              : "0 2px 8px rgba(0,0,0,0.08)",
            transition: "background 0.4s ease",
          }}
        >
          <HeaderBar />
        </Box>

        {/* Page Scroll Area */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            width: "100%",
            mt: "60px",
            p: 3,
            // ❌ REMOVE minHeight calc(100vh - 60px)
            // let it grow naturally:
            bgcolor: theme.palette.background.default,
            transition: "background 0.4s ease, color 0.4s ease",
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/about" replace />} />
            <Route path="/:section" element={<Portfolio />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );

}

export default App;