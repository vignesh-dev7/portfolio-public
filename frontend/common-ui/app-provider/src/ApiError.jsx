import { Box, Button, Typography } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { motion } from "framer-motion";

export const ApiError = ({ onRetry }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        px: 3,
        position: "relative",
        background: "linear-gradient(180deg, #000 0%, #0a0a0a 100%)",
      }}
    >

      {/* subtle glow background */}
      <Box
        sx={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,211,238,0.12), transparent 70%)",
          filter: "blur(60px)",
          top: "20%",
          zIndex: 0,
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ zIndex: 10 }}
      >
        {/* error icon glow */}
        <motion.div
          animate={{ rotate: [0, -6, 6, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{
            width: 80,
            height: 80,
            margin: "0 auto 18px",
            borderRadius: "50%",
            border: "3px solid #ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ef4444",
            fontSize: 40,
            fontWeight: 900,
            filter: "drop-shadow(0 0 12px rgba(239,68,68,0.35))",
          }}
        >
          !
        </motion.div>

        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            mb: 1,
            color: "#ef4444",
            textShadow: "0 0 10px rgba(239,68,68,0.3)",
          }}
        >
          Server Unreachable
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: "#bbb", mb: 3, maxWidth: 360 }}
        >
          We’re unable to connect to the server at the moment.  
          This might be due to maintenance or temporary network issues.
        </Typography>

        <Button
          variant="contained"
          startIcon={<ReplayIcon />}
          onClick={onRetry}
          sx={{
            bgcolor: "#2563eb",
            "&:hover": { bgcolor: "#1d4ed8" },
            px: 3,
            py: 1,
            fontWeight: 700,
            borderRadius: "10px",
            boxShadow: "0 0 18px rgba(37, 99, 235, 0.45)",
          }}
        >
          Retry
        </Button>
      </motion.div>
    </Box>
  );
};
