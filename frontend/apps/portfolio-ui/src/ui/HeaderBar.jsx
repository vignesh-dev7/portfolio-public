import React, { useMemo, useState } from "react";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  useTheme,
  Tooltip,
  Drawer,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useThemeContext } from "@common-ui/theme-provider";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import PsychologyIcon from "@mui/icons-material/Psychology";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { useAppContext } from "@common-ui/app-provider";
import LeftNavbar from "./LeftNavbar";

const sectionMeta = {
  about: { title: "About Me", icon: <PersonIcon fontSize="medium" /> },
  skills: { title: "Skills & Expertise", icon: <PsychologyIcon fontSize="medium" /> },
  projects: { title: "Projects", icon: <FolderOpenOutlinedIcon fontSize="medium" /> },
  resumeViewer: { title: "Resume Viewer", icon: <TextSnippetIcon fontSize="medium" /> },
  contact: { title: "Contact", icon: <MailOutlineIcon fontSize="medium" /> },
  portfolioArchitecture: {
    title: "Portfolio Architecture",
    icon: <AutoAwesomeIcon fontSize="medium" />,
  },
};

export default function HeaderBar() {
  const location = useLocation();
  const section = location.pathname.replace("/", "") || "about";

  const theme = useTheme();
  const navigate = useNavigate();
  const { toggleTheme } = useThemeContext();

  const { accounts, isSmallScreen } = useAppContext();
  const { socialLinks } = accounts;

  const isDark = theme.palette.mode === "dark";

  const { title, icon } = useMemo(() => {
    return (
      sectionMeta[section] || {
        title: "Portfolio",
        icon: <PersonIcon fontSize="small" />,
      }
    );
  }, [section]);

  // Drawer state
  const [openNav, setOpenNav] = useState(false);

  return (
    <Box
      sx={{
        top: 0,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 1.5,
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: "background-color 0.3s ease",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        {/* Mobile menu icon */}
        {isSmallScreen && (
          <IconButton
            onClick={() => setOpenNav(true)}
            color="inherit"
            size="small"
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              "&:hover": {
                bgcolor: isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Header Title */}
        <Tooltip title={title}>
          <IconButton
            onClick={() => navigate(`/${section || "about"}`)}
            color="inherit"
            size="small"
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              "&:hover": {
                bgcolor: isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)",
              },
            }}
          >
            {icon}
          </IconButton>
        </Tooltip>

        <motion.div
          key={title}
          initial={{ opacity: 0, y: section ? -10 : 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        </motion.div>
      </Stack>

      {/* Right Icons */}
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <IconButton
          component="a"
          href={socialLinks?.github}
          target="_blank"
          color="inherit"
          size="small"
        >
          <GitHubIcon fontSize="medium" />
        </IconButton>

        <IconButton
          component="a"
          href={socialLinks?.linkedin}
          target="_blank"
          color="inherit"
          size="small"
        >
          <LinkedInIcon fontSize="medium" />
        </IconButton>

        <IconButton
          onClick={(e) => toggleTheme(e)}
          color="inherit"
          size="small"
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: isDark
              ? "rgba(255,255,255,0.05)"
              : "rgba(0,0,0,0.05)",
            "&:hover": {
              bgcolor: isDark
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.1)",
            },
          }}
        >
          {isDark ? (
            <LightModeIcon fontSize="small" />
          ) : (
            <DarkModeIcon fontSize="small" />
          )}
        </IconButton>
      </Stack>

      {/* Drawer for mobile/tablets */}
      <Drawer
        anchor="left"
        open={openNav}
        onClose={() => setOpenNav(false)}
        PaperProps={{
          sx: {
            width: 240,
            bgcolor: theme.palette.background.default,
          },
        }}
      >
        <LeftNavbar onNavigate={() => setOpenNav(false)} />
      </Drawer>
    </Box>
  );
}
