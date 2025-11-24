import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Fab, Zoom, useTheme } from "@mui/material";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark"; 


  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);  // show when scrolled 300px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={show}>
      <Fab
        onClick={goTop}
        sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            color: isDark ? "#fff" : "#000000ff",
            background: isDark
            ? "linear-gradient(180deg, #3f3f61ff 0%, #222228ff 50%, #1e1e25ff 100%)"
            : "linear-gradient(180deg, #f9f0f0ff 0%, #8989d4ff 100%)",

            boxShadow: isDark
            ? "0 4px 12px rgba(0,0,0,0.6)"
            : "0 4px 12px rgba(0,0,0,0.2)",

            "&:hover": {
            background: isDark
                ? "linear-gradient(180deg, #40405aff 0%, #3d3d68ff 50%, #1a1a20 100%)"
                : "linear-gradient(180deg, #f9e7e7ff 0%, #a2a2d7ff 100%)",

            boxShadow: isDark
                ? "0 6px 16px rgba(0,0,0,0.75)"
                : "0 6px 16px rgba(0,0,0,0.3)",
            },

            zIndex: 1000,
        }}
        >
            <KeyboardArrowUpIcon />
        </Fab>
    </Zoom>
  );
}
