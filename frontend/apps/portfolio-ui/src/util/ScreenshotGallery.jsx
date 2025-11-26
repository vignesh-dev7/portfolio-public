import { useEffect, useState, useRef } from "react";
import { Box, IconButton, Skeleton, Modal } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

export default function ScreenshotGallery({ images, interval = 5000 }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  const timerRef = useRef(null);
  if (!images || images.length === 0) return null;

  const next = () => {
    setLoaded(false);
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setLoaded(false);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-slide timer
  useEffect(() => {
    timerRef.current = setInterval(next, interval);
    return () => clearInterval(timerRef.current);
  }, []);

  // Reset timer on user navigation
  const handleManualNav = (action) => {
    clearInterval(timerRef.current);
    action();
    timerRef.current = setInterval(next, interval);
  };

  return (
    <>
      {/* MAIN CAROUSEL */}
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 350,
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {!loaded && (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
            />
          )}

          {/* CLICK TO OPEN FULLSCREEN */}
          <Box
            component="img"
            src={images[index]}
            alt={`Screenshot ${index + 1}`}
            onLoad={() => setLoaded(true)}
            onClick={() => {setLightbox(true); clearInterval(timerRef.current)}}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              cursor: "zoom-in",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.4s ease-in-out",
            }}
          />

          {/* Prev Button */}
          <IconButton
            onClick={() => handleManualNav(prev)}
            sx={{
              position: "absolute",
              top: "50%",
              left: 15,
              transform: "translateY(-50%)",
              bgcolor: "rgba(0,0,0,0.45)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.65)" },
              zIndex: 2,
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          {/* Next Button */}
          <IconButton
            onClick={() => handleManualNav(next)}
            sx={{
              position: "absolute",
              top: "50%",
              right: 10,
              transform: "translateY(-50%)",
              bgcolor: "rgba(0,0,0,0.45)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.65)" },
              zIndex: 2,
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        {/* DOTS */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 1.5,
            gap: 1,
          }}
        >
          {images.map((_, i) => (
            <Box
              key={i}
              onClick={() => handleManualNav(() => setIndex(i))}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                cursor: "pointer",
                bgcolor:
                  i === index
                    ? theme.palette.primary.main
                    : isDark
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(0,0,0,0.35)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* FULLSCREEN LIGHTBOX */}
      <Modal open={lightbox} onClose={() => {setLightbox(false); timerRef.current = setInterval(next, interval)} }>
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: isDark
              ? "rgba(0,0,0,0.9)"
              : "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          {/* FULLSCREEN IMAGE */}
          <Box
            component="img"
            src={images[index]}
            sx={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: 4,
            }}
          />

          {/* Close Button */}
          <IconButton
            onClick={() => {setLightbox(false); timerRef.current = setInterval(next, interval)}}
            sx={{
              position: "fixed",
              top: 20,
              right: 20,
              bgcolor: "rgba(0,0,0,0.7)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.9)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Fullscreen Prev */}
          <IconButton
            onClick={prev}
            sx={{
              position: "fixed",
              left: 30,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          {/* Fullscreen Next */}
          <IconButton
            onClick={next}
            sx={{
              position: "fixed",
              right: 30,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Modal>
    </>
  );
}
