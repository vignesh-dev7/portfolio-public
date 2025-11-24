import React, { createContext, useContext, useMemo, useState, useRef } from "react";
import { ThemeProvider, createTheme, CssBaseline, GlobalStyles, Box } from "@mui/material";

const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProviderContext = ({ children }) => {
  const [mode, setMode] = useState("dark");
  const [isSwitching, setIsSwitching] = useState(false);
  const [rippleOrigin, setRippleOrigin] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleTheme = (event) => {
    const rect = event?.currentTarget?.getBoundingClientRect() || { 
      left: window.innerWidth - 50, 
      top: 50 
    };
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    setRippleOrigin({ x, y });
    setIsAnimating(true);
    setIsSwitching(true);
    setTimeout(() => {
      setMode((prev) => (prev === "light" ? "dark" : "light"));
    }, 50);
    setTimeout(() => {
      setIsAnimating(false);
      setIsSwitching(false);
    }, 800);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
        transitions: {
          create: () => (isSwitching ? "none" : "all 0.3s ease"),
        },
      }),
    [mode, isSwitching]
  );

  const getMaxDistance = () => {
    const { x, y } = rippleOrigin;
    const maxX = Math.max(x, window.innerWidth - x);
    const maxY = Math.max(y, window.innerHeight - y);
    return Math.sqrt(maxX * maxX + maxY * maxY);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles
          styles={{
            html: {
              height: "auto",
              backgroundColor: theme.palette.background.default,
            },
            body: {
              minHeight: "100%",
              margin: 0,
              padding: 0,
              overflowX: "hidden",
              
              backgroundColor: theme.palette.background.default,
              transition: isSwitching ? "none" : "background-color 0.3s ease",
            },
            "#root": { 
              //minHeight: "100%",
              position: "relative",
              backgroundColor: theme.palette.background.default,
            },

            /* Scrollbar styles */
            "*::-webkit-scrollbar": { width: "8px" },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(0,0,0,0.2)",
              borderRadius: "8px",
            },
            "*::-webkit-scrollbar-thumb:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(0,0,0,0.3)",
            },

            /* Ripple Animation */
            "@keyframes rippleExpand": {
              "0%": {
                transform: "translate(-50%, -50%) scale(0.2)",
                opacity: 0.35,
                filter: "blur(0px)",
              },
              "40%": {
                opacity: 0.45,
                filter: "blur(4px)",
              },
              "100%": {
                transform: "translate(-50%, -50%) scale(1)",
                opacity: 0,
                filter: "blur(12px)",
              },
            }
          }}
        />

        {/* Ripple Animation Overlay */}
        {isAnimating && (
          <Box
            sx={{
              position: "fixed",
              top: rippleOrigin.y,
              left: rippleOrigin.x,
              width: getMaxDistance() * 2,
              height: getMaxDistance() * 2,
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 9999,
              transform: "translate(-50%, -50%) scale(0)",
              animation: "rippleExpand 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
              //mixBlendMode: "normal",
              backgroundColor:
                mode === "dark"
                  ? "rgba(255,255,255,0.85)"
                  : theme.palette.text.primary + "1F",   // uses primary text, 12% opacity
              mixBlendMode: mode === "dark" ? "screen" : "multiply",
           
            }}
          />
        )}

        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderContext;