import React, { useMemo } from "react";
import { Box, IconButton, Stack, Typography, useTheme, Tooltip } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useThemeContext, ThemeToggleButton } from "@common-ui/theme-provider";
// Icons
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PsychologyIcon from '@mui/icons-material/Psychology';
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DescriptionIcon from "@mui/icons-material/Description";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

const sectionMeta = {
  about: { title: "About Me", icon: <PersonIcon fontSize="medium" /> },
  skills: { title: "Skills & Expertise", icon: <PsychologyIcon fontSize="medium" /> },
  projects: { title: "Projects", icon: <FolderOpenOutlinedIcon fontSize="medium" /> },
  resumeViewer: { title: "Resume Viewer", icon: <TextSnippetIcon fontSize="medium" /> },
  education: { title: "Education", icon: <SchoolOutlinedIcon fontSize="medium" /> },
  contact: { title: "Contact", icon: <MailOutlineIcon fontSize="medium" /> },
};

export default function HeaderBar() {
  const location = useLocation();
  const section = location.pathname.replace("/", "") || "about";
  const theme = useTheme();
  const navigate = useNavigate();
  const isDark = theme.palette.mode === "dark";
  const { toggleTheme } = useThemeContext();
  const { title, icon } = useMemo(() => {
    return sectionMeta[section] || { title: "Portfolio", icon: <InfoOutlinedIcon fontSize="small" /> };
  }, [section]);

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

      <Stack direction="row" alignItems="center" spacing={1.5}>
        <IconButton component="a" href="https://github.com/vignesh" target="_blank" color="inherit" size="small">
          <GitHubIcon fontSize="medium" />
        </IconButton>

        <IconButton component="a" href="https://linkedin.com/in/vignesh" target="_blank" color="inherit" size="small">
          <LinkedInIcon fontSize="medium" />
        </IconButton>

        {/* <IconButton component="a" href="/resume.pdf" target="_blank" color="inherit" size="small">
          <DescriptionIcon fontSize="small" />
        </IconButton> */}

        <IconButton onClick={(e) => toggleTheme(e)} color="inherit" size="small"
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
    </Box>
  );
}
