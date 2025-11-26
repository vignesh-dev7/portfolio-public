// ResumeViewer.jsx (updated - paste over your current file)
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
  Share2,
  Maximize2,
  X,
  Eye,
} from "lucide-react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { pdfToImages } from "../../util/pdfToImages";

/**
 * ResumeViewer
 * - Normal preview: overlay left/right arrow icons (no bottom Prev/Next buttons)
 * - Fullscreen: click cycles zoom in steps (1 -> 1.25 -> 1.5 ... -> max -> reset)
 * - Double-click resets zoom to 1
 * - Drag-to-pan when zoom > 1
 * - Swipe/keyboard navigation in fullscreen
 */
const ResumeViewer = ({ socialLinks }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // UI States
  const [activeTab, setActiveTab] = useState(0);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  // Fullscreen zoom + drag
  const zoomSteps = [1, 1.12, 1.25, 1.45, 1.65, 1.85, 2];
  const [zoomFS, setZoomFS] = useState(1);
  const [dragFS, setDragFS] = useState({ x: 0, y: 0 });
  const draggingRef = useRef(false);

  const [docInfo, setDocInfo] = useState({
    fileName: "",
    fileSize: "",
    updatedAt: "",
    pages: "",
  });

  const viewerBg = isDark
    ? alpha(theme.palette.background.paper, 0.9)
    : "#F1F5F9";

  // Load PDF pages -> pdfToImages returns array of image URLs
  useEffect(() => {
    if (socialLinks?.resumeLink) {
      pdfToImages(socialLinks.resumeLink, 2.4).then(setPages).catch(err => {
        console.error("pdfToImages failed", err);
      });
    }
  }, [socialLinks]);

  // Page navigation
  const nextPage = () =>
    setCurrentPage((p) => (p < pages.length - 1 ? p + 1 : p));

  const prevPage = () =>
    setCurrentPage((p) => (p > 0 ? p - 1 : p));

  // Fullscreen open/close
  const openFullscreen = () => {
    setFullscreenOpen(true);
    resetZoomFS();
  };

  const closeFullscreen = () => {
    setFullscreenOpen(false);
    resetZoomFS();
  };

  // Zoom: stepwise increase on single click, reset on double-click
  const stepZoom = () => {
    // find current index in steps
    const idx = zoomSteps.indexOf(Number(zoomFS)) >= 0 ? zoomSteps.indexOf(Number(zoomFS)) : 0;
    const nextIdx = idx + 1;
    if (nextIdx >= zoomSteps.length) {
      // cycle back to 1
      setZoomFS(1);
      setDragFS({ x: 0, y: 0 });
    } else {
      setZoomFS(zoomSteps[nextIdx]);
    }
  };

  const resetZoomFS = () => {
    setZoomFS(1);
    setDragFS({ x: 0, y: 0 });
  };

  // Drag inside zoom
  const onMouseDown = (e) => {
    if (zoomFS === 1) return;
    draggingRef.current = true;
    e.currentTarget.style.cursor = "grabbing";
  };

  const onMouseUp = (e) => {
    draggingRef.current = false;
    e.currentTarget.style.cursor = zoomFS === 1 ? "zoom-in" : "grab";
  };

  const onMouseMove = (e) => {
    if (!draggingRef.current) return;
    // movementX/movementY are available on native mouse events; if using synthetic,
    // ensure this handler receives nativeEvent or attach to element via ref.
    const mvX = e.movementX ?? (e.nativeEvent && e.nativeEvent.movementX) ?? 0;
    const mvY = e.movementY ?? (e.nativeEvent && e.nativeEvent.movementY) ?? 0;
    setDragFS((d) => ({ x: d.x + mvX, y: d.y + mvY }));
  };

  // Swipe left/right (mobile) for fullscreen
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (fullscreenOpen) nextPage();
    },
    onSwipedRight: () => {
      if (fullscreenOpen) prevPage();
    },
    trackMouse: true,
  });
  
  // Keyboard navigation inside fullscreen
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

  // Download PDF
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

  // File Meta loader
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

  // --- Styles for overlay arrows (used in preview) ---
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
        <Grid container spacing={6} sx={{ width: "95%", p: 1 }}>
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
              {/* TOP TOOLBAR */}
              <AppBar
                position="static"
                elevation={0}
                sx={{
                  height: 58,
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
                  px={4}
                >
                  {/* Tabs */}
                  <Tabs
                    value={activeTab}
                    onChange={(e, v) => setActiveTab(v)}
                    textColor="inherit"
                    indicatorColor="secondary"
                    sx={{
                      minHeight: 40,
                      "& .MuiTabs-flexContainer": { gap: 0.5 },
                      "& .MuiTabs-indicator": { display: "none" }, // remove underline
                      "& .MuiTab-root": {
                        minHeight: 40,
                        paddingInline: 8,
                        borderRadius: 2,
                        fontWeight: 700,
                        textTransform: "none",
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

                  {/* Action Buttons */}
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
                  {/* Flex container WITHOUT divider line */}
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    
                  />

                  {/* PDF Display */}
                  <Paper
                    sx={{
                      height: 600,
                      overflow: "auto",
                      background: viewerBg,
                      borderRadius: 2,
                      position: "relative",
                    }}
                  >
                    <Box display="flex" justifyContent="center" p={4} position="relative">
                      {pages.length === 0 ? (
                        /* Skeleton Loader */
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: 800,
                            height: 500,
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
                        <Box sx={{ position: "relative", width: "100%", maxWidth: 1000 }}>
                          {/* Expand Icon (TOP RIGHT) */}
                          <IconButton
                            onClick={openFullscreen}
                            size="small"
                            sx={{
                              position: "absolute",
                              top: 12,
                              right: 12,
                              bgcolor: "rgba(0,0,0,0.4)",
                              color: "white",
                              "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
                              zIndex: 10,
                            }}
                          >
                            <Maximize2 size={18} />
                          </IconButton>

                          {/* Resume Page */}
                          <Box
                            component="img"
                            src={pages[currentPage]}
                            alt="resume-page"
                            onClick={(e) => {
                              e.stopPropagation();
                              openFullscreen();
                            }}
                            sx={{
                              width: "100%",
                              borderRadius: "8px",
                              userSelect: "none",
                              cursor: "zoom-in",
                              display: "block",
                            }}
                          />

                          {/* Navigation Arrows */}
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

                          {/* Page Counter */}
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

              {/* DETAILS MODE */}
              {activeTab === 1 && (
                <Box p={4}>
                  <Grid container spacing={4}>
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
                            <Typography fontWeight={700}>{docInfo.fileName}</Typography>
                          </Box>

                          <Box display="flex" justifyContent="space-between" my={1}>
                            <Typography color="text.secondary">File Size:</Typography>
                            <Typography fontWeight={700}>{docInfo.fileSize}</Typography>
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

        {/* FULLSCREEN MODAL VIEWER */}
        <Modal
          open={fullscreenOpen}
          onClose={() => {
            closeFullscreen();
          }}
        >
          <Box
            {...swipeHandlers}
            sx={{
              position: "fixed",
              inset: 0,
              bgcolor: isDark ? "rgba(0,0,0,0.92)" : "rgba(0,0,0,0.88)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            // prevent clicks on background from triggering zoom toggle
            onClick={(e) => {
              // clicking on background closes (handled by Modal)
            }}
          >
            {/* Fullscreen image: click -> step zoom; double click -> reset */}
            <Box
              component="img"
              src={pages[currentPage]}
              alt={`resume-page-full-${currentPage}`}
              
              sx={{
                maxWidth: zoomFS === 1 ? "90%" : "none",
                maxHeight: zoomFS === 1 ? "90%" : "none",
                transform: `scale(${zoomFS}) translate(${dragFS.x}px, ${dragFS.y}px)`,
                transition: "transform 0.18s ease",
                userSelect: "none",
                borderRadius: 2,
                boxShadow: 4,
              }}
            />

            {/* CLOSE BUTTON */}
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
              }}
            >
              <X size={22} />
            </IconButton>

            {/* PREVIOUS PAGE (fullscreen) */}
            {currentPage > 0 && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  prevPage();
                  resetZoomFS();
                }}
                sx={{
                  position: "fixed",
                  left: 30,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(0,0,0,0.6)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.85)" },
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
            )}

            {/* NEXT PAGE (fullscreen) */}
            {currentPage < pages.length - 1 && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  nextPage();
                  resetZoomFS();
                }}
                sx={{
                  position: "fixed",
                  right: 30,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(0,0,0,0.6)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.85)" },
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
