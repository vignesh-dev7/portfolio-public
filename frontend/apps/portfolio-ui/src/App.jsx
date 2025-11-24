import { Routes, Route, Navigate } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import LeftNavbar from "./ui/LeftNavbar";
import HeaderBar from "./ui/HeaderBar";
import Portfolio from "./ui/Portfolio";

function App() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const sidebarBg = isDark
  ? "linear-gradient(180deg, #1c1c24ff 0%, #222228ff 50%, #09090b 100%)"
  : "linear-gradient(180deg, #f9f0f0ff 0%, #a6a6f0ff 100%)";

const headerBg = isDark
  ? "linear-gradient(180deg, #1f1f2aff 0%, #262635ff 50%, #21212aff 100%)"
  : "linear-gradient(180deg, #f9f0f0ff 0%, #d7d7f3ff 100%)";

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh", // allowed here ONLY
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: 260,
          height: "100vh",
          position: "fixed",
          background: sidebarBg,
          borderRight: `1px solid ${theme.palette.divider}`,
          transition: "background 0.4s ease",
          zIndex: 1200,
          overflowY: "auto",  
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
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
          flexDirection: "column"
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