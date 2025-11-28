import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { ApiError } from "./ApiError";

export const AppLoader = ({ children, loading, apiFailed, onRetry }) => {
  const [showLoader, setShowLoader] = useState(true);

  // WORD-BY-WORD TYPING EFFECT
  const welcomeText = "Crafting digital experiences with precision".split(" ");
  const taglineText = "Full Stack Logic. Frontend Magic. Backend Power.".split(" ");
  const signatureText = "- Vignesh P".split("");

  const [welcomeIndex, setWelcomeIndex] = useState(0);
  const [tagIndex, setTagIndex] = useState(0);
  const [signIndex, setSignIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 3800);
    return () => clearTimeout(timer);
  }, []);

  // Welcome typing (word-by-word)
  useEffect(() => {
    if (welcomeIndex < welcomeText.length) {
      const t = setTimeout(() => setWelcomeIndex((i) => i + 1), 160);
      return () => clearTimeout(t);
    }
  }, [welcomeIndex]);

  useEffect(() => {
    document.body.style.margin = "0";
    document.documentElement.style.margin = "0";
    document.body.style.background = "#000";
    document.documentElement.style.background = "#000";

    return () => {
      document.body.style.background = "";
      document.documentElement.style.background = "";
    };
  }, []);

  // Tagline typing (word-by-word) — starts after welcome done
  useEffect(() => {
    if (welcomeIndex === welcomeText.length && tagIndex < taglineText.length) {
      const t = setTimeout(() => setTagIndex((i) => i + 1), 150);
      return () => clearTimeout(t);
    }
  }, [tagIndex, welcomeIndex]);

  // Signature typing (letter-by-letter)
  useEffect(() => {
    if (tagIndex === taglineText.length && signIndex < signatureText.length) {
      const t = setTimeout(() => setSignIndex((i) => i + 1), 120);
      return () => clearTimeout(t);
    }
  }, [signIndex, tagIndex]);

  if (showLoader || loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        minHeight="100vh"
        sx={{
          background: "linear-gradient(to bottom right, #000, #0a0a0a, #000)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <motion.svg
            width="90"
            height="90"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginBottom: 24, filter: "drop-shadow(0 0 18px rgba(34,211,238,0.25))" }}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {/* OUTER HEX — FAST ROTATION */}
            <motion.polygon
              points="80,8 146,44 146,116 80,152 14,116 14,44"
              stroke="url(#hexNeon)"
              strokeWidth="4"
              fill="transparent"
              strokeLinejoin="round"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* INNER HEX — REVERSE SLOW ROTATION */}
            <motion.polygon
              points="80,24 130,54 130,106 80,136 30,106 30,54"
              stroke="#22d3ee77"
              strokeWidth="3"
              fill="transparent"
              strokeLinejoin="round"
              animate={{ rotate: -360 }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            />

            {/* Initial Letter */}
            <text
              x="50%"
              y="58%"
              textAnchor="middle"
              fontSize="34"
              fontWeight="bold"
              fill="#22d3ee"
              style={{ letterSpacing: "3px", filter: "drop-shadow(0 0 14px rgba(34,211,238,0.35))" }}
            >
              VP
            </text>

            <defs>
              <linearGradient id="hexNeon" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* === Welcome Text (MUI Typography) === */}
          <Typography color="#ccc" fontSize={18} mt={3} fontWeight={300} letterSpacing={2} textAlign="center">
            {welcomeText.slice(0, welcomeIndex).join(" ")}
          </Typography>

          {/* === Tagline === */}
          <Typography color="#aaa" fontSize={14} mt={1.5} fontWeight={300} textAlign="center">
            {taglineText.slice(0, tagIndex).join(" ")}
          </Typography>

          {/* === Signature === */}
          <Typography color="#888" fontSize={12} mt={2} textAlign="center" sx={{ opacity: 0.8, letterSpacing: 3 }}>
            {signatureText.slice(0, signIndex).join("")}
          </Typography>
        </motion.div>

        {/* Soft Glow BG */}
        <Box
          className="pointer-events-none"
          sx={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at center, rgba(120,119,198,0.08), transparent 70%)",
          }}
        />
      </Box>
    );
  }

  // CONDITION 2 → API failed AFTER loader animation
  if (apiFailed) {
    return <ApiError onRetry={onRetry} />;
  }

  return <>{children}</>;
}
