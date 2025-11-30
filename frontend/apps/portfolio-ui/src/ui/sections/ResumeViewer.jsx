import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  AppBar,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
  Modal,
  Skeleton
} from "@mui/material";

import {
  Download,
  Maximize2,
  X,
  Eye,
} from "lucide-react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { pdfToImages } from "../../util/pdfToImages";

const ResumeViewer = ({ socialLinks }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // UI States
  const [activeTab, setActiveTab] = useState(0);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  // Fullscreen zoom + drag
  const zoomSteps = [1, 1.5, 1.75]; // Adjusted steps
  const [zoomFS, setZoomFS] = useState(1);
  const [dragFS, setDragFS] = useState({ x: 0, y: 0 });
  
  // Refs for drag logic
  const draggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  const [docInfo, setDocInfo] = useState({
    fileName: "",
    fileSize: "",
    updatedAt: "",
    pages: "",
  });

  const viewerBg = isDark
    ? alpha(theme.palette.background.paper, 0.9)
    : "#F1F5F9";

  useEffect(() => {
    if (socialLinks?.resumeLink) {
      pdfToImages(socialLinks.resumeLink, 2.4).then(setPages).catch(err => {
        console.error("pdfToImages failed", err);
      });
    }
  }, [socialLinks]);

  const nextPage = () =>
    setCurrentPage((p) => (p < pages.length - 1 ? p + 1 : p));

  const prevPage = () =>
    setCurrentPage((p) => (p > 0 ? p - 1 : p));

  const openFullscreen = () => {
    setFullscreenOpen(true);
    resetZoomFS();
  };

  const closeFullscreen = () => {
    setFullscreenOpen(false);
    resetZoomFS();
  };

  // --- ZOOM LOGIC ---
  const stepZoom = (e) => {
    e.stopPropagation(); // Prevent clicking through to other elements
    const idx = zoomSteps.indexOf(zoomFS) >= 0 ? zoomSteps.indexOf(zoomFS) : 0;
    const nextIdx = idx + 1;
    
    if (nextIdx >= zoomSteps.length) {
      // Reset if max reached
      resetZoomFS();
    } else {
      setZoomFS(zoomSteps[nextIdx]);
    }
  };

  const resetZoomFS = () => {
    setZoomFS(1);
    setDragFS({ x: 0, y: 0 });
  };

  // --- DRAG LOGIC ---
  const onMouseDown = (e) => {
    // Only drag if zoomed in
    if (zoomFS <= 1) return;
    
    e.preventDefault(); // STOP browser native image dragging
    draggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.style.cursor = "grabbing";
  };

  const onMouseUp = (e) => {
    draggingRef.current = false;
    e.currentTarget.style.cursor = zoomFS > 1 ? "grab" : "zoom-in";
  };

  const onMouseMove = (e) => {
    if (!draggingRef.current) return;
    e.preventDefault();

    const deltaX = e.clientX - lastMouseRef.current.x;
    const deltaY = e.clientY - lastMouseRef.current.y;

    lastMouseRef.current = { x: e.clientX, y: e.clientY };

    setDragFS((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));
  };

  // Reset drag on mouse leave
  const onMouseLeave = () => {
    draggingRef.current = false;
  };

  // Swipe handlers (disabled when zoomed in to allow panning)
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (fullscreenOpen && zoomFS === 1) nextPage();
    },
    onSwipedRight: () => {
      if (fullscreenOpen && zoomFS === 1) prevPage();
    },
    trackMouse: true,
    preventScrollOnSwipe: true,
  });
  
  useEffect(() => {
    if (!fullscreenOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") closeFullscreen();
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") prevPage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [fullscreenOpen, pages.length]);

  const handleDownload = async () => {
    const url = socialLinks?.resumeLink;
    if (!url) return;
    const response = await fetch(url);
    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${decodeURIComponent(url.split("/").pop() || "resume.pdf")}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "Unknown";
    const kb = bytes / 1024;
    return kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(1)} MB`;
  };

  const loadDocumentInfo = async () => {
    const url = socialLinks?.resumeLink;
    if (!url) return;
    try {
      const fileName = decodeURIComponent(url.split("/").pop());
      const res = await fetch(url, {
        method: "GET",
        headers: { Range: "bytes=0-2048" },
      });
      const fileSize = res.headers.get("Content-Length");
      const updatedAt = res.headers.get("Last-Modified");
      setDocInfo({
        fileName,
        fileSize: formatFileSize(fileSize),
        updatedAt: updatedAt ? new Date(updatedAt).toDateString() : "Unknown",
        pages: pages.length,
      });
    } catch (err) {
      console.warn("Could not load document meta", err);
    }
  };

  useEffect(() => {
    loadDocumentInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages.length]);

  const overlayArrowStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    bgcolor: "rgba(0,0,0,0.45)",
    color: "white",
    "&:hover": { bgcolor: "rgba(0,0,0,0.65)" },
    zIndex: 2,
  };

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        viewport={{ once: true }}
      >
        <Box sx={{ maxWidth: "xl", mx: "auto", width: "95%", px: { xs: 1, sm: 3, md: 4 } }}>
          <Grid container spacing={6} justifyContent="center">
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  background: isDark
                    ? alpha(theme.palette.background.paper, 0.94)
                    : theme.palette.background.paper,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
                  boxShadow: `0 12px 36px ${alpha(theme.palette.primary.main, 0.25)}`,
                }}
              >
                <AppBar
                  position="static"
                  elevation={0}
                  sx={{
                    height: { xs: "auto", sm: 58 },
                    py: { xs: 1, sm: 0 },
                    display: "flex",
                    justifyContent: "center",
                    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                    background: isDark
                      ? `linear-gradient(90deg, #0f172a, #1e293b)`
                      : `linear-gradient(90deg, #ffffff, #f8fafc)`,
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    px={2}
                    flexWrap="wrap"
                    gap={1}
                  >
                    <Tabs
                      value={activeTab}
                      onChange={(e, v) => setActiveTab(v)}
                      textColor="inherit"
                      indicatorColor="secondary"
                      sx={{
                        minHeight: 40,
                        "& .MuiTabs-flexContainer": { gap: 0.5 },
                        "& .MuiTabs-indicator": { display: "none" },
                        "& .MuiTab-root": {
                          minHeight: 40,
                          paddingInline: { xs: 1, sm: 2 },
                          borderRadius: 2,
                          fontWeight: 700,
                          textTransform: "none",
                          fontSize: { xs: "0.8rem", sm: "0.875rem" },
                          color: isDark ? "#cbd5e1" : "#334155",
                        },
                        "& .Mui-selected": {
                          backgroundColor: isDark
                            ? alpha(theme.palette.primary.main, 0.25)
                            : alpha(theme.palette.primary.main, 0.15),
                          color: isDark ? "#fff" : theme.palette.primary.main,
                        },
                      }}
                    >
                      <Tab icon={<Eye size={16} />} iconPosition="start" label="Preview" />
                      <Tab label="Details" />
                    </Tabs>

                    <Box display="flex" gap={1.5}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleDownload}
                        sx={{
                          px: 1.8,
                          py: 0.7,
                          borderRadius: 2,
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          background: isDark
                            ? alpha(theme.palette.primary.light, 0.15)
                            : theme.palette.primary.main,
                          color: isDark ? "#e2e8f0" : "#fff",
                          "&:hover": {
                            background: isDark
                              ? alpha(theme.palette.primary.light, 0.25)
                              : theme.palette.primary.dark,
                          },
                        }}
                      >
                        <Download size={15} style={{ marginRight: 6 }} />
                        Download
                      </Button>
                    </Box>
                  </Box>
                </AppBar>

                {/* PREVIEW MODE */}
                {activeTab === 0 && (
                  <Box>
                    <Paper
                      sx={{
                        height: { xs: 400, sm: 600 },
                        overflow: "hidden",
                        background: viewerBg,
                        borderRadius: 2,
                        position: "relative",
                        display: 'flex',
                        alignItems: 'center',
                        pt: 3,
                        justifyContent: 'center'
                      }}
                    >
                      <Box 
                        display="flex" 
                        justifyContent="center" 
                        p={{ xs: 1, sm: 4 }}
                        position="relative" 
                        width="100%" 
                        height="100%"
                      >
                        {pages.length === 0 ? (
                          <Box
                            sx={{
                              width: "100%",
                              maxWidth: 800,
                              height: "100%",
                              mx: "auto",
                            }}
                          >
                            <Skeleton
                              variant="rectangular"
                              width="100%"
                              height="100%"
                              sx={{ borderRadius: 2 }}
                            />
                          </Box>
                        ) : (
                          <Box 
                            sx={{ 
                              position: "relative", 
                              width: "100%", 
                              maxWidth: 1000, 
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <IconButton
                              onClick={openFullscreen}
                              size="small"
                              sx={{
                                position: "absolute",
                                top: { xs: 8, sm: 12 },
                                right: { xs: 8, sm: 12 },
                                bgcolor: "rgba(0,0,0,0.4)",
                                color: "white",
                                "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
                                zIndex: 10,
                              }}
                            >
                              <Maximize2 size={18} />
                            </IconButton>

                            <Box
                              component="img"
                              src={pages[currentPage]}
                              alt="resume-page"
                              onClick={(e) => {
                                e.stopPropagation();
                                openFullscreen();
                              }}
                              sx={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                width: "auto",
                                height: "auto",
                                objectFit: "contain",
                                borderRadius: "8px",
                                userSelect: "none",
                                cursor: "zoom-in",
                                display: "block",
                                boxShadow: 3
                              }}
                            />

                            {pages.length > 1 && (
                              <>
                                <IconButton
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    prevPage();
                                  }}
                                  sx={{ ...overlayArrowStyle, left: 10 }}
                                >
                                  <ArrowBackIosNewIcon />
                                </IconButton>

                                <IconButton
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    nextPage();
                                  }}
                                  sx={{ ...overlayArrowStyle, right: 10 }}
                                >
                                  <ArrowForwardIosIcon />
                                </IconButton>
                              </>
                            )}

                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 8,
                                right: 12,
                                bgcolor: alpha(theme.palette.background.paper, 0.7),
                                px: 1.2,
                                py: 0.4,
                                borderRadius: 1,
                              }}
                            >
                              <Typography variant="caption" fontWeight={700}>
                                {currentPage + 1} / {pages.length}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Paper>
                  </Box>
                )}

                {activeTab === 1 && (
                  <Box p={4}>
                    <Grid container spacing={4} justifyContent="center">
                      <Grid item xs={12} md={6}>
                        <Card
                          sx={{
                            borderRadius: 3,
                            background: isDark ? "#020617" : "#F8FAFC",
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                          }}
                        >
                          <CardContent>
                            <Typography fontWeight={700} mb={2}>
                              Document Information
                            </Typography>
                            <Box display="flex" justifyContent="space-between" my={1}>
                              <Typography color="text.secondary">File Name:</Typography>
                              <Typography fontWeight={700} noWrap sx={{ maxWidth: "60%" }}>{docInfo.fileName}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={1}>
                              <Typography color="text.secondary">File Size:</Typography>
                              <Typography fontWeight={700}>{socialLinks?.rsSize || docInfo.fileSize}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={1}>
                              <Typography color="text.secondary">Last Updated:</Typography>
                              <Typography fontWeight={700}>{docInfo.updatedAt}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={1}>
                              <Typography color="text.secondary">Pages:</Typography>
                              <Typography fontWeight={700}>{docInfo.pages}</Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* FULLSCREEN MODAL VIEWER */}
        <Modal
          open={fullscreenOpen}
          onClose={closeFullscreen}
        >
          <Box
            {...swipeHandlers}
            sx={{
              position: "fixed",
              inset: 0,
              bgcolor: isDark ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.9)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden", // Prevent body scroll
              cursor: zoomFS > 1 ? "grab" : "default",
            }}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            {/* Fullscreen image */}
            <Box
              component="img"
              src={pages[currentPage]}
              alt={`resume-page-full-${currentPage}`}
              onClick={stepZoom} // Single click to zoom
              onDoubleClick={resetZoomFS} // Double click reset
              draggable={false} // Native drag disable
              sx={{
                // IMPORTANT: When zoomed, allow image to exceed container size
                maxWidth: zoomFS === 1 ? "100%" : "none",
                maxHeight: zoomFS === 1 ? "100%" : "none",
                height: zoomFS === 1 ? "auto" : "none",
                width: zoomFS === 1 ? "auto" : "none",
                
                objectFit: "contain",
                transform: `scale(${zoomFS}) translate(${dragFS.x}px, ${dragFS.y}px)`,
                // Use CSS transition only for scale, NOT drag (makes drag laggy)
                transition: draggingRef.current ? "none" : "transform 0.2s ease-out",
                userSelect: "none",
                cursor: zoomFS > 1 ? (draggingRef.current ? "grabbing" : "grab") : "zoom-in",
                borderRadius: 2,
                boxShadow: 4,
              }}
            />

            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                closeFullscreen();
              }}
              sx={{
                position: "fixed",
                top: 20,
                right: 20,
                bgcolor: "rgba(0,0,0,0.6)",
                color: "white",
                "&:hover": { bgcolor: "rgba(0,0,0,0.9)" },
                zIndex: 20
              }}
            >
              <X size={22} />
            </IconButton>

            {currentPage > 0 && zoomFS === 1 && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  prevPage();
                }}
                sx={{
                  position: "fixed",
                  left: 30,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(0,0,0,0.6)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.85)" },
                  zIndex: 20
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
            )}

            {currentPage < pages.length - 1 && zoomFS === 1 && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  nextPage();
                }}
                sx={{
                  position: "fixed",
                  right: 30,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(0,0,0,0.6)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.85)" },
                  zIndex: 20
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            )}
          </Box>
        </Modal>
      </motion.div>
    </section>
  );
};

export default ResumeViewer;
