import { Routes, Route, Navigate } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import LeftNavbar from "./ui/LeftNavbar";
import HeaderBar from "./ui/HeaderBar";
import Portfolio from "./ui/Portfolio";
import { useAppContext } from "@common-ui/app-provider";

function App() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { isSmallScreen, isXs, isSm, isMd } = useAppContext();

  const sidebarBg = isDark
    ? "linear-gradient(180deg, #1c1c24ff 0%, #222228ff 50%, #09090b 100%)"
    : "linear-gradient(180deg, #f9f0f0ff 0%, #a6a6f0ff 100%)";

  const headerBg = isDark
    ? "linear-gradient(180deg, #1f1f2aff 0%, #262635ff 50%, #21212aff 100%)"
    : "linear-gradient(180deg, #f9f0f0ff 0%, #d7d7f3ff 100%)";

  // Sidebar width only when screen is NOT small
  const SIDEBAR_WIDTH = isSmallScreen ? 0 : 260;

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >

      {/* Sidebar */}
      {!isSmallScreen && (
        <Box
          sx={{
            width: SIDEBAR_WIDTH,
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
      )}

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          ml: `${SIDEBAR_WIDTH}px`,
          transition: "margin-left 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >

        {/* Header */}
        <Box
          sx={{
            position: "fixed",
            left: SIDEBAR_WIDTH,
            right: 0,
            height: 61,
            zIndex: 1000,
            background: headerBg,
            boxShadow: isDark
              ? "0 2px 10px rgba(0, 0, 0, 0.32)"
              : "0 2px 8px rgba(0,0,0,0.08)",
            transition: "left 0.3s ease, background 0.4s ease",
          }}
        >
          <HeaderBar />
        </Box>

        {/* Page Content */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            width: "100%",
            mt: "61px",
            p: 2,
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
