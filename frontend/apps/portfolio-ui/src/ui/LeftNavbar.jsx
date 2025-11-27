import {
  Box,
  Avatar,
  Typography,
  Stack,
  Divider,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useThemeContext } from "@common-ui/theme-provider";
import { useMemo } from "react";

import PersonIcon from '@mui/icons-material/Person';
import PsychologyIcon from '@mui/icons-material/Psychology';
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

// ---------------- Animations ---------------- //
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.10 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 60, damping: 12 },
  },
};

// ---------------- Nav Items ---------------- //
const navItems = [
  { label: "About", path: "/about", icon: <PersonIcon /> },
  { label: "Skills", path: "/skills", icon: <PsychologyIcon /> },
  { label: "Projects", path: "/projects", icon: <FolderOpenOutlinedIcon /> },
  { label: "Resume Viewer", path: "/resumeViewer", icon: <TextSnippetIcon /> },
  { label: "Contact", path: "/contact", icon: <MailOutlineIcon /> },
];

// ---------------- Component ---------------- //
export default function LeftNavbar() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const lightProfileImg = "https://works-stuffs.s3.ap-southeast-2.amazonaws.com/ProfileImg.png";
  const darkProfileImg = "https://works-stuffs.s3.ap-southeast-2.amazonaws.com/ProfileImg.png";

  const profileImage = isDark ? darkProfileImg : lightProfileImg;

  const navItemStyle = useMemo(
    () => ({
      textDecoration: "none",
      display: "block",
      fontWeight: 500,
      borderRadius: "0px",
      position: "relative",
      transition: "all 0.3s ease",
    }),
    []
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* MAIN CONTENT AREA (GROWS) */}
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          p: 0,
          mt: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Profile */}
        <motion.div variants={itemVariants}>
          <Avatar
            src={profileImage}
            alt="Vignesh P"
            imgProps={{
              style: {
                objectFit: "cover",
                transform: "scale(1.15)",
              },
            }}
            sx={{
              width: 100,
              height: 100,
              mb: 2,
              border: `2px solid ${theme.palette.primary.main}`,
              overflow: "hidden",
              transition: "all 0.3s ease",
              boxShadow: `0 0 12px ${theme.palette.primary.main}55`,
              "&:hover": {
                transform: "scale(1.20)",
                boxShadow: `0 0 18px ${theme.palette.primary.main}88`,
              },
            }}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 0.3,
              letterSpacing: "0.5px",
              transition: "all 0.3s ease",
              textShadow: isDark
                ? "0px 2px 6px rgba(0,0,0,0.5)"
                : "0px 2px 6px rgba(0,0,0,0.15)",
              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            Vignesh P
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Box
            sx={{
              mt: 1,
              mb: 2,
              px: 1.4,
              py: 0.5,
              fontSize: "0.75rem",
              fontWeight: 600,
              borderRadius: "8px",
              display: "inline-block",
              backgroundColor: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.05)",
              color: theme.palette.primary.main,
              backdropFilter: "blur(6px)",
              border: `1px solid ${theme.palette.primary.main}20`,
              letterSpacing: "0.3px",
            }}
          >
            Available for Hire
          </Box>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              mb: 3,
              textAlign: "center",
              letterSpacing: "0.3px",
              opacity: 0.9,
              transition: "opacity 0.3s ease",
              "&:hover": { opacity: 1 },
            }}
          >
            Software Engineer | MERN + AWS
          </Typography>
        </motion.div>

        {/* NAV ITEMS */}
        <Stack spacing={1} sx={{ width: "100%", px: 1, pt: 1 }}>
          {navItems.map((item) => {
            const activeColor = isDark ? "#38BDF8" : "#0284C7";
            const hoverBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
            const activeBg = "rgba(56, 189, 248, 0.15)";

            return (
              <motion.div key={item.path} variants={itemVariants}>
                <NavLink
                  to={item.path}
                  style={({ isActive }) => ({
                    ...navItemStyle,
                    color: isActive ? activeColor : theme.palette.text.primary,
                    backgroundColor: isActive ? activeBg : "transparent",
                  })}
                >
                  {({ isActive }) => (
                    <motion.div
                      whileHover={
                        !isActive
                          ? {
                              scale: 1.08,
                              x: 3,
                              transition: { type: "spring", stiffness: 260 },
                            }
                          : {}
                      }
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          px: 2,
                          py: 1.2,
                          position: "relative",

                          ...(isActive && {
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              left: 0,
                              top: 0,
                              bottom: 0,
                              width: "3px",
                              backgroundColor: activeColor,
                            },
                          }),

                          ...(!isActive && {
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: hoverBg,
                              color: activeColor,
                            },
                          }),
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            minWidth: "24px",
                          }}
                        >
                          {item.icon}
                        </Box>

                        <Typography
                          sx={{
                            fontWeight: isActive ? 600 : 500,
                            fontSize: "0.95rem",
                          }}
                        >
                          {item.label}
                        </Typography>
                      </Box>
                    </motion.div>
                  )}
                </NavLink>
              </motion.div>
            );
          })}
        </Stack>
      </Box>

      {/* FOOTER — Sticks to Bottom */}
      <motion.div variants={itemVariants}>
        <Box sx={{ textAlign: "center", mt: "auto", py: 2 }}>
          <Divider
            sx={{
              mb: 2,
              borderColor: theme.palette.divider,
              opacity: 0.6,
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: "0.75rem",
            }}
          >
            Developed by Vignesh P © {new Date().getFullYear()}
          </Typography>
        </Box>
      </motion.div>
    </motion.div>
  );
}
