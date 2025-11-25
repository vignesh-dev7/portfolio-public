import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import {
  Download,
  Share2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";
import { pdfToImages } from "../../util/pdfToImages";


const ResumeViewer = ({ socialLinks }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [activeTab, setActiveTab] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [numPages, setNumPages] = useState(null);

  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [docInfo, setDocInfo] = useState({
    fileName: "",
    fileSize: "",
    updatedAt: "",
    pages: "",
  });

  const handleDownload = async () => {
    const url = socialLinks?.resumeLink;

    const response = await fetch(url);
    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "Vignesh_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(downloadUrl);
  };

  

  const handleShare = () => {
    alert("Share options coming soon!");
  };

  const nextPage = () =>
    setCurrentPage((p) => (p < pages.length - 1 ? p + 1 : p));

  const prevPage = () =>
    setCurrentPage((p) => (p > 0 ? p - 1 : p));

  const handleZoomChange = (delta) => {
    setZoom((prev) => {
      const next = prev + delta;
      if (next < 50) return 50;
      if (next > 200) return 200;
      return next;
    });
  };

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Animations (similar flavor to Projects)
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: i * 0.1 },
    }),
  };

  const viewerBg = isDark
    ? alpha(theme.palette.background.paper, 0.9)
    : "#F1F5F9";

  const pageShadow = isDark
    ? "0 0 24px rgba(0,0,0,0.9)"
    : "0 0 18px rgba(15,23,42,0.25)";

  const pdfWidth = 850 * (zoom / 100); // zoom applied to width

  useEffect(() => {
    if (socialLinks?.resumeLink) {
      pdfToImages(socialLinks.resumeLink, 2.4).then(setPages);
    }
  }, [socialLinks]);

  // Convert bytes to KB/MB
const formatFileSize = (bytes) => {
  if (!bytes) return "Unknown";
  const kb = bytes / 1024;
  return kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(1)} MB`;
};

const loadDocumentInfo = async () => {
    const url = socialLinks?.resumeLink;

    // File name from URL
    const fileName = decodeURIComponent(url.split("/").pop());

    // Fetch meta (NO CORS issue)
    const res = await fetch(url, {
      method: "GET",
      headers: { Range: "bytes=0-2048" }
    });

    const fileSize = res.headers.get("Content-Length");
    const updatedAt = res.headers.get("Last-Modified");

    // Fetch pages (PDF.js)
    let pages = 1;
    try {
      const fullRes = await fetch(url);
      const blob = await fullRes.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      pages = pdf.numPages;
    } catch (err) {
      console.error("PDF page read failed", err);
    }

    setDocInfo({
      fileName,
      fileSize: formatFileSize(fileSize),
      updatedAt: new Date(updatedAt).toDateString(),
      pages
    });
  };

  console.log(`META: PDF: ${JSON.stringify(docInfo)}`)
  useEffect(() => {
    loadDocumentInfo();
  }, []);
  return (
    <section>
        <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        >
            <Grid container spacing={6} sx={{ width: '95%', p: 1 }}>
                {/* Resume Viewer Card */}
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
                            p: 2,
                            borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        }}
                        >
                        <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                            {/* Tabs */}
                            <Tabs
                            value={activeTab}
                            onChange={(e, v) => setActiveTab(v)}
                            textColor="inherit"
                            indicatorColor="secondary"
                            sx={{
                                "& .MuiTab-root": { color: "white", fontWeight: 700, textTransform: "none" },
                                "& .Mui-selected": { textShadow: "0 0 12px rgba(15,23,42,0.8)" },
                            }}
                            >
                            <Tab icon={<Eye size={18} />} iconPosition="start" label="Preview" />
                            <Tab label="Details" />
                            </Tabs>

                            {/* Download / Share Buttons */}
                            <Box display="flex" gap={2}>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleDownload}
                                sx={{
                                backgroundColor: "white",
                                color: theme.palette.primary.main,
                                fontWeight: 700,
                                "&:hover": { backgroundColor: "#E2E8F0" },
                                borderRadius: 2,
                                }}
                            >
                                <Download size={18} style={{ marginRight: 5 }} />
                                Download PDF
                            </Button>

                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleShare}
                                sx={{
                                borderColor: "white",
                                color: "white",
                                fontWeight: 700,
                                "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
                                borderRadius: 2,
                                }}
                            >
                                <Share2 size={18} style={{ marginRight: 5 }} />
                                Share
                            </Button>
                            </Box>
                        </Box>
                        </AppBar>

                        {/* Tab Content */}
                        {activeTab === 0 ? (
                        /** ===================== PREVIEW ====================== */
                        <Box p={4}>
                            {/* Zoom Bar */}
                            <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            pb={2}
                            mb={2}
                            borderBottom={`1px solid ${alpha(theme.palette.divider, 0.9)}`}
                            >
                            <Box display="flex" alignItems="center" gap={2}>
                                <Typography variant="body2" color="text.secondary">
                                Zoom:
                                </Typography>

                                <IconButton size="small" onClick={() => handleZoomChange(-10)}>
                                <ZoomOut size={18} />
                                </IconButton>

                                <Typography fontWeight={700} width={38} textAlign="center">
                                {zoom}%
                                </Typography>

                                <IconButton size="small" onClick={() => handleZoomChange(10)}>
                                <ZoomIn size={18} />
                                </IconButton>
                            </Box>

                            <IconButton
                                onClick={() => setIsFullscreen(!isFullscreen)}
                                size="small"
                                sx={{
                                borderRadius: 2,
                                border: `1px solid ${alpha(theme.palette.text.primary, 0.3)}`,
                                "&:hover": { backgroundColor: alpha(theme.palette.background.default, 0.5) },
                                }}
                            >
                                {isFullscreen ? <X size={18} /> : <Maximize2 size={18} />}
                            </IconButton>
                            </Box>

                            {/* PDF */}
                            <Paper
                                sx={{
                                    height: isFullscreen ? "calc(100vh - 190px)" : 600,
                                    overflow: "auto",
                                    background: viewerBg,
                                    borderRadius: 2,
                                    border: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
                                }}
                            >
                                <Box display="flex" justifyContent="center" p={4}>
                                    {/* <Box
                                    sx={{
                                        backgroundColor: "white",
                                        width: pdfWidth,
                                        maxWidth: "100%",
                                        boxShadow: pageShadow,
                                        borderRadius: 2,
                                        overflow: "hidden",
                                        height: "100%",
                                        transform: `scale(${zoom / 100})`,
                                        transformOrigin: "top center",
                                    }}
                                    >
                                        <iframe
                                            src={`${socialLinks?.resumeLink}#view=FitH`}
                                            title="resume"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                border: "none",
                                            }}
                                        />
                                    </Box> */}
                                    <Box>
                                        {pages.length === 0 ? (
                                        <Typography>Loading PDF…</Typography>
                                        ) : (
                                        <>
                                            {/* Display Current Page */}
                                            <img
                                            src={pages[currentPage]}
                                            alt={`resume-page-${currentPage}`}
                                            style={{
                                                width: "100%",
                                                borderRadius: "8px",
                                                userSelect: "none",
                                                pointerEvents: "none",
                                            }}
                                            />

                                            {/* Page Controls */}
                                            <Box mt={2} display="flex" justifyContent="center" gap={2}>
                                            <Button variant="outlined" disabled={currentPage === 0} onClick={prevPage}>
                                                Previous
                                            </Button>

                                            <Typography fontWeight="bold">
                                                {currentPage + 1} / {pages.length}
                                            </Typography>

                                            <Button variant="outlined" disabled={currentPage === pages.length - 1} onClick={nextPage}>
                                                Next
                                            </Button>
                                            </Box>
                                        </>
                                        )}
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                        ) : (
                        /** ===================== DETAILS ====================== */
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
                                    {[
                                    ["File Name:", `${docInfo?.fileName}`],
                                    ["File Size:", `${docInfo?.fileSize}`],
                                    ["Last Updated:", `${docInfo?.updatedAt}`],
                                    ["Pages:", `${docInfo?.pages}` || "1"],
                                    ].map(([label, value], i) => (
                                    <Box justifyContent="space-between" display="flex" my={1} key={i}>
                                        <Typography color="text.secondary">{label}</Typography>
                                        <Typography fontWeight={700}>{value}</Typography>
                                    </Box>
                                    ))}
                                </CardContent>
                                </Card>
                            </Grid>
                            </Grid>
                        </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </motion.div>
    </section>
)};

export default ResumeViewer;
