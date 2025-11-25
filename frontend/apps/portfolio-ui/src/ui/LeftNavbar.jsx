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
  { label: "Resume Viewer", path: "/resumeViewer", icon: <TextSnippetIcon/> },
  { label: "Contact", path: "/contact", icon: <MailOutlineIcon/> },
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
      borderRadius: "0px",
      position: "relative",
      transition: "all 0.3s ease",
    }),
    []
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        p: 0,
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
      <Stack spacing={1} sx={{ width: "100%", px: 1 }}>
        {navItems.map((item) => {
          const activeColor = isDark ? "#38BDF8" : "#0284C7";
          const hoverBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
          const activeBg = isDark
            ? "rgba(56, 189, 248, 0.15)"
            : "rgba(56, 189, 248, 0.15)";

          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                ...navItemStyle,
                color: isActive ? activeColor : theme.palette.text.primary,
                backgroundColor: isActive ? activeBg : "transparent",
              })}
            >
              {({ isActive }) => (
                <motion.div
                  whileHover={!isActive ? {
                    scale: 1.08,
                    x: 3,
                    transition: { type: "spring", stiffness: 280/* , damping: 20 */ },
                  } : {}}
                  style={{
                    borderRadius: "12px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      px: 2,
                      py: 1.2,
                      borderRadius: "0px",
                      position: "relative",
                      
                      ...(isActive && {
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          top: 0,   
                          bottom: 0,
                          width: "3px",
                          height: "100%",
                          backgroundColor: activeColor,
                          borderRadius: "0px 0px 0px 0px",
                        }
                      }),

                      // Hover effect ONLY for non-active items
                      ...(!isActive && {
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: hoverBg,
                          color: activeColor,
                          transition: "all 0.25s ease",
                        },
                      }),
                    }}
                  >
                    {/* Icon */}
                    <Box
                      sx={{
                        fontSize: "20px",
                        display: "flex",
                        alignItems: "center",
                        minWidth: "24px",
                      }}
                    >
                      {item.icon}
                    </Box>

                    {/* Label */}
                    <Typography 
                      sx={{ 
                        fontWeight: isActive ? 600 : 500,
                        fontSize: "0.95rem",
                        transition: "font-weight 0.2s ease",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                </motion.div>
              )}
            </NavLink>
          );
        })}
      </Stack>

      {/* Footer */}
      <Box sx={{ width: "100%", textAlign: "center", mt: "auto", pt: 2, mr: 0, pb: 2 }}>
        <Divider
          sx={{
            mb: 2,
            mr: 0,
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
    </Box>
  );
}