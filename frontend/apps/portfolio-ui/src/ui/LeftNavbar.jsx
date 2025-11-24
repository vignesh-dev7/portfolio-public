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

const navItems = [
  { label: "About", path: "/about", icon: <PersonIcon/> },
  { label: "Skills", path: "/skills", icon:  <PsychologyIcon/> },
  { label: "Projects", path: "/projects", icon: <FolderOpenOutlinedIcon/> },
  { label: "Contact", path: "/contact", icon: <MailOutlineIcon/> },
  { label: "Resume Viewer", path: "/resumeViewer", icon: <TextSnippetIcon/> },
];

export default function LeftNavbar() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { toggleTheme } = useThemeContext();

  const navItemStyle = useMemo(
    () => ({
      textDecoration: "none",
      display: "block",
      fontWeight: 500,
      padding: "10px 14px",
      borderRadius: "12px",
      position: "relative",
      transition: "all 0.3s ease",
    }),
    []
  );

  return (
    <Box
      sx={{
        width: 260,
        height: "100%",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {/* Profile Section */}
      <Avatar
        src="/profile.jpg"
        alt="Vignesh P"
        sx={{
          width: 90,
          height: 90,
          mb: 2,
          border: `2px solid ${theme.palette.primary.main}`,
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.20)" },
        }}
      />
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.3 }}>
        Vignesh P
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          mb: 3,
          textAlign: "center",
        }}
      >
        MERN Stack Developer
      </Typography>

      {/* Navigation Links */}
      <Stack spacing={1.2} sx={{ width: "100%" }}>
        {navItems.map((item) => {
          const activeColor = isDark ? "#38BDF8" : "#0284C7";
          const hoverBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
          const activeBg = isDark
            ? "rgba(56, 189, 248, 0.12)"
            : "rgba(56, 189, 248, 0.15)";

          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                ...navItemStyle,
                color: isActive ? activeColor : theme.palette.text.primary,
                backgroundColor: isActive ? activeBg : "transparent",
                boxShadow: isActive ? `inset 2px 0 ${activeColor}` : "none",
              })}
            >
              <motion.div
                whileHover={{
                  scale: 1.08,
                  x: 6,
                  transition: { type: "spring", stiffness: 280 },
                }}
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                    px: 1.5,
                    py: 0.8,

                    borderRadius: "12px",
                    cursor: "pointer",

                    "&:hover": {
                      backgroundColor: hoverBg,
                      color: activeColor,
                      transition: "0.25s ease",
                    },
                  }}
                >
                  {/* Icon */}
                  {item.icon && (
                    <Box
                      sx={{
                        fontSize: "18px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {item.icon}
                    </Box>
                  )}

                  {/* Label */}
                  <Box sx={{ fontWeight: 500 }}>{item.label}</Box>
                </Box>
              </motion.div>
            </NavLink>
          );
        })}
      </Stack>

      {/* Footer */}
      <Box sx={{ width: "110%", textAlign: "center", mt: "auto" }}>
        <Divider
          sx={{
            my: 2,
            mr: 1,
            borderColor: theme.palette.divider,
            opacity: 0.6,
          }}
        />
        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary, mr: 2 }}
        >
          Developed by Vignesh P © {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
}
