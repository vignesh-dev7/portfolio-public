import React, { useState } from "react";
import { 
  Typography, 
  Grid, 
  Box, 
  Stack,
  Button,
  Chip,
  Tabs,
  Tab,
  useTheme,
  alpha,
  Collapse,
  IconButton
} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CodeIcon from '@mui/icons-material/Code';
import LayersIcon from '@mui/icons-material/Layers';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { motion, AnimatePresence } from "framer-motion";
import { getSkillIcon } from "../../util/skillIcons.js";
import { getProjectImages } from "../../util/getProjectImages";
import ScreenshotGallery from "../../util/ScreenshotGallery";
import { useAppContext } from "@common-ui/app-provider";

const Projects = ({ projects }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  
  const [expandedProject, setExpandedProject] = useState(null);
  const [activeTab, setActiveTab] = useState({});
  const { isSmallScreen } = useAppContext();
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.10,
        duration: 0.6,
        ease: "easeOut"
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12,
      },
    },
  };

  const extractFirstColor = (gradient) => {
    const match = gradient.match(/#([0-9A-Fa-f]{6})/); // first hex color
    return match ? `#${match[1]}` : "rgba(0,0,0,0.1)";
  };

  const cardStyles = (darkBg, lightBg) => {
    const darkShadowColor = extractFirstColor(darkBg);
    const lightShadowColor = extractFirstColor(lightBg);

    return {
      p: 3,
      borderRadius: 3,
      height: "100%",
      background: isDark ? darkBg : lightBg,
      border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.12)"}`,
      transition: "all 0.35s ease",

      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: isDark
          ? `0 8px 24px ${darkShadowColor}80` // 80 = opacity
          : `0 8px 24px ${lightShadowColor}80`,
        border: `1px solid ${
          isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)"
        }`
      }
    }
  };

  const toggleProject = (projectId) => {
    if (expandedProject === projectId) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectId);
      setActiveTab({ ...activeTab, [projectId]: 0 });
    }
  };

  const handleTabChange = (projectId, newValue) => {
    setActiveTab({ ...activeTab, [projectId]: newValue });
  };

  const getStatusColor = (status) => {
    if (!status) return theme.palette.grey[500];
    switch (status.toLowerCase()) {
      case 'completed':
      case 'live':
        return theme.palette.success.main;
      case 'in production':
        return theme.palette.info.main;
      case 'maintained':
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getStatusIcon = (status) => {
    if (!status) return null;
    return <CheckCircleIcon sx={{ fontSize: 16 }} />;
  };

  // Calculate stats
  const totalProjects = projects?.length || 0;
  const completedProjects = projects?.filter(p => (p?.status?.toLowerCase() === 'completed' || p?.status?.toLowerCase() === 'live'))?.length || 0;
  const activeProjects = projects?.filter(p => {
    const status = p?.status?.toLowerCase() || '';
    return status.includes('active') || status.includes('progress');
  })?.length || 0;
  const allTechStack = projects ? [...new Set(projects.flatMap(p => p?.techStack || []))] : [];

  // Group projects by year
  const getYear = (duration) => {
    if (!duration) return 'Unknown';
    const match = duration.match(/\d{4}/);
    return match ? match[0] : 'Unknown';
  };

  const projectsByYear = projects ? projects.reduce((acc, project) => {
    if (!project) return acc;
    const year = getYear(project.duration);
    if (!acc[year]) acc[year] = [];
    acc[year].push(project);
    return acc;
  }, {}) : {};

  const years = Object.keys(projectsByYear).sort((a, b) => b.localeCompare(a));

  // Early return if no projects
  if (!projects || projects.length === 0) {
    return (
      <section>
        <Typography variant="h4" fontWeight={700} gutterBottom align="center">
          Projects
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          No projects available.
        </Typography>
      </section>
    );
  }

  return (
    <section>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        // Changed amount to 0.1 and added margin to trigger earlier on mobile
        viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }} 
      >
        {/* Main Container: Fixed padding to prevent overflow on mobile */}
        {/* CHANGED: px: { xs: 1, sm: 3, md: 4 } -> Minimal horizontal padding on mobile */}
        <Box sx={{ maxWidth: "xl", mx: "auto", width: "95%", px: { xs: 1, sm: 3, md: 4 }, overflowX: "hidden" }}>
            
            <Grid container spacing={4} justifyContent="center" sx={{ ...isSmallScreen && {width: "100vw"}}}>
            
            {/* Stats Section */}
            <Grid container item spacing={3} xs={12} justifyContent="center" sx={{ pb: 4, pt: 4 }}>
                {/* Total Projects */}
                <Grid item xs={12} sm={6} md={3}>
                <motion.div variants={itemVariants}>
                    <Box
                    sx={cardStyles(
                        "linear-gradient(135deg, #0A1A3A 0%, #0f2d4fff 100%)",
                        "linear-gradient(135deg, #E8F1FF 0%, #9fc1f0ff 100%)"
                    )}
                    >
                    <Stack direction="row" alignItems="center" spacing={2} justifyContent="center">
                        <Box
                        sx={{
                            p: 1.4,
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: alpha("#61A0FF", 0.15),
                            color: "#61A0FF"
                        }}
                        >
                        <LayersIcon style={{ fontSize: 28 }} />
                        </Box>
                        <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            {totalProjects}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Total Projects
                        </Typography>
                        </Box>
                    </Stack>
                    </Box>
                </motion.div>
                </Grid>

                {/* Completed Projects */}
                <Grid item xs={12} sm={6} md={3}>
                <motion.div variants={itemVariants}>
                    <Box
                    sx={cardStyles(
                        "linear-gradient(135deg, #002B1E 0%, #002115 100%)",
                        "linear-gradient(135deg, #D7FFF0 0%, #C8FFE9 100%)"
                    )}
                    >
                    <Stack direction="row" alignItems="center" spacing={2} justifyContent="center">
                        <Box
                        sx={{
                            p: 1.4,
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: alpha("#00FF8C", 0.15),
                            color: "#00FF8C"
                        }}
                        >
                        <TaskAltIcon style={{ fontSize: 28 }} />
                        </Box>
                        <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            {completedProjects}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Completed
                        </Typography>
                        </Box>
                    </Stack>
                    </Box>
                </motion.div>
                </Grid>

                {/* Active Projects */}
                <Grid item xs={12} sm={6} md={3}>
                <motion.div variants={itemVariants}>
                    <Box
                    sx={cardStyles(
                        "linear-gradient(135deg, #2D0A3A 0%, #1B092A 100%)",
                        "linear-gradient(135deg, #F4E6FF 0%, #EDD6FF 100%)"
                    )}
                    >
                    <Stack direction="row" alignItems="center" spacing={2} justifyContent="center">
                        <Box
                        sx={{
                            p: 1.4,
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: alpha("#C168FF", 0.15),
                            color: "#C168FF"
                        }}
                        >
                        <QueryBuilderIcon style={{ fontSize: 28 }} />
                        </Box>
                        <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            {activeProjects}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Active Projects
                        </Typography>
                        </Box>
                    </Stack>
                    </Box>
                </motion.div>
                </Grid>

                {/* Technologies */}
                <Grid item xs={12} sm={6} md={3}>
                <motion.div variants={itemVariants}>
                    <Box
                    sx={cardStyles(
                        "linear-gradient(135deg, #3A1F00 0%, #2A1500 100%)",
                        "linear-gradient(135deg, #FFECD1 0%, #FFE3BD 100%)"
                    )}
                    >
                    <Stack direction="row" alignItems="center" spacing={2} justifyContent="center">
                        <Box
                        sx={{
                            p: 1.4,
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: alpha("#FF9500", 0.15),
                            color: "#FF9500"
                        }}
                        >
                        <CodeIcon style={{ fontSize: 28 }} />
                        </Box>
                        <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            {allTechStack?.length}+
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Technologies
                        </Typography>
                        </Box>
                    </Stack>
                    </Box>
                </motion.div>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                {/* Timeline Container */}
                {/* CHANGED: pl: { xs: 2, md: 8 } -> Reduced padding for mobile */}
                <Box sx={{ position: 'relative', pl: { xs: 2, md: 8 }, pb: 5 }}>
                
                {/* Timeline Line */}
                <Box
                    sx={{
                    position: 'absolute',
                    // CHANGED: Fixed left position for mobile line
                    left: { xs: 6, md: 32 },
                    top: 0,
                    bottom: 0,
                    width: 2,
                    background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 50%, ${theme.palette.error.main} 100%)`,
                    }}
                />

                {/* Projects grouped by year */}
                <Stack spacing={6}>
                    {years.map((year, yearIndex) => (
                    <Box key={year}>
                        {/* Year Divider */}
                        <motion.div variants={itemVariants}>
                        <Box sx={{ position: 'relative', mb: 4, pl: { xs: 2, md: 0 } }}>
                            <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                '&::before, &::after': {
                                content: '""',
                                flex: 1,
                                height: 2,
                                background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0)} 0%, ${alpha(theme.palette.primary.main, 0.5)} 50%, ${alpha(theme.palette.primary.main, 0)} 100%)`
                                }
                            }}
                            >
                            <Chip
                                label={year}
                                sx={{
                                px: 3,
                                py: 2.5,
                                fontSize: '1.2rem',
                                fontWeight: 700,
                                background: theme.palette.mode === "light" ? "linear-gradient(135deg, #1A73E8 0%, #6A4FE7 100%)" : "linear-gradient(135deg, #2962FF 0%, #7C4DFF 100%)",
                                color: 'white',
                                border: `2px solid ${alpha(theme.palette.primary.light, 0.3)}`,
                                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
                                }}
                            />
                            </Box>
                        </Box>
                        </motion.div>

                        {/* Projects for this year */}
                        <Stack spacing={4}>
                        {projectsByYear[year]?.map((project, index) => {
                            if (!project) return null;
                            
                            const isExpanded = expandedProject === project._id?.$oid || expandedProject === project._id;
                            const currentTab = activeTab[project._id?.$oid || project._id] || 0;
                            const projectId = project._id?.$oid || project._id || `project-${index}`;
                            const statusColor = getStatusColor(project.status);

                            return (
                            <motion.div key={projectId} variants={itemVariants}>
                                {/* CHANGED: Adjusted padding left for the card wrapper to prevent cut-off */}
                                <Box sx={{ position: 'relative', pl: { xs: 2, md: 5 }, pr: { xs: 0, md: 0 } }}>
                                
                                {/* Timeline Dot */}
                                <Box
                                    sx={{
                                    position: 'absolute',
                                    // CHANGED: Align dot exactly on the line
                                    left: { xs: -22, md: -45 },
                                    top: 32,
                                    width: 20,
                                    height: 20,
                                    borderRadius: '50%',
                                    bgcolor: statusColor,
                                    border: `4px solid ${theme.palette.background.default}`,
                                    boxShadow: `0 0 0 2px ${statusColor}`,
                                    transition: 'all 0.3s ease',
                                    transform: isExpanded ? 'scale(1)' : 'scale(0.8)',
                                    zIndex: 1
                                    }}
                                />

                                {/* Project Card */}
                                <Box
                                    sx={{
                                    background: isDark
                                        ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`
                                        : theme.palette.background.paper,
                                    borderRadius: 3,
                                    border: `1px solid ${isExpanded ? theme.palette.primary.main : theme.palette.divider}`,
                                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                    boxShadow: isExpanded 
                                        ? `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`
                                        : theme.shadows[2],
                                    '&:hover': {
                                        borderColor: alpha(theme.palette.primary.main, 0.5),
                                    },
                                    // CHANGED: Ensure card width is controlled and doesn't overflow
                                    width: '100%',
                                    maxWidth: '100%',
                                    overflow: 'hidden'
                                    }}
                                >
                                    {/* Card Header - Always Visible */}
                                    <Box
                                    sx={{ 
                                        p: { xs: 2, sm: 3 },
                                        cursor: 'pointer',
                                        transition: 'background 0.3s ease',
                                        '&:hover': {
                                        bgcolor: alpha(theme.palette.action.hover, 0.05)
                                        }
                                    }}
                                    onClick={() => toggleProject(projectId)}
                                    >
                                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                        {/* CHANGED: Added minWidth: 0 to allow text truncation/wrapping inside flex item */}
                                        <Box flex={1} minWidth={0}>
                                        
                                        {/* Category & Status Badges */}
                                        <Stack direction="row" spacing={1} mb={2} flexWrap="wrap" useFlexGap>
                                            {project.category && (
                                            <Chip
                                                label={project.category}
                                                size="small"
                                                sx={{
                                                bgcolor: alpha(theme.palette.primary.main, 0.15),
                                                color: theme.palette.primary.main,
                                                fontWeight: 600,
                                                border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                                mb: 1
                                                }}
                                            />
                                            )}
                                            {project.status && (
                                            <Chip
                                                icon={getStatusIcon(project.status)}
                                                label={project.status}
                                                size="small"
                                                sx={{
                                                bgcolor: alpha(statusColor, 0.15),
                                                color: statusColor,
                                                fontWeight: 600,
                                                mb: 1,
                                                '& .MuiChip-icon': {
                                                    color: statusColor
                                                }
                                                }}
                                            />
                                            )}
                                        </Stack>

                                        {/* Title */}
                                        <Typography 
                                            variant="h5" 
                                            fontWeight={700} 
                                            gutterBottom
                                            sx={{
                                            color: isDark ? theme.palette.text.primary : theme.palette.text.primary,
                                            transition: 'color 0.3s ease',
                                            wordBreak: 'break-word', // CHANGED: Prevent overflow for long words
                                            fontSize: { xs: '1.1rem', sm: '1.5rem' } // CHANGED: Adjust font size for mobile
                                            }}
                                        >
                                            {project.title || 'Untitled Project'}
                                        </Typography>

                                        {/* Description */}
                                        <Typography 
                                            variant="body1" 
                                            color="text.secondary" 
                                            paragraph
                                            sx={{ mb: 2 }}
                                        >
                                            {project.description || 'No description available.'}
                                        </Typography>

                                        {/* Quick Info */}
                                        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                                            {project.role && (
                                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                                <WorkIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
                                                <Typography variant="body2" color="text.secondary">
                                                {project.role}
                                                </Typography>
                                            </Stack>
                                            )}
                                            {project.duration && (
                                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                                <CalendarTodayIcon sx={{ fontSize: 18, color: theme.palette.secondary.main }} />
                                                <Typography variant="body2" color="text.secondary">
                                                {project.duration}
                                                </Typography>
                                            </Stack>
                                            )}
                                            {project.teamSize && (
                                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                                <GroupIcon sx={{ fontSize: 18, color: theme.palette.success.main }} />
                                                <Typography variant="body2" color="text.secondary">
                                                {project.teamSize}
                                                </Typography>
                                            </Stack>
                                            )}
                                        </Stack>

                                        {/* Action Buttons (when collapsed) */}
                                        {!isExpanded && (
                                            <Stack direction="row" spacing={1} mt={2} flexWrap="wrap" useFlexGap>
                                            {project.githubLink && (
                                                <Button
                                                variant="outlined"
                                                size="small"
                                                startIcon={<GitHubIcon />}
                                                href={project.githubLink}
                                                target="_blank"
                                                onClick={(e) => e.stopPropagation()}
                                                sx={{ mb: 1 }}
                                                >
                                                GitHub
                                                </Button>
                                            )}
                                            {project.liveDemo && (
                                                <Button
                                                variant="contained"
                                                size="small"
                                                startIcon={<LaunchIcon />}
                                                href={project.liveDemo}
                                                target="_blank"
                                                onClick={(e) => e.stopPropagation()}
                                                sx={{ mb: 1 }}
                                                >
                                                Live Demo
                                                </Button>
                                            )}
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="secondary"
                                                sx={{ mb: 1 }}
                                            >
                                                View Details
                                            </Button>
                                            </Stack>
                                        )}
                                        </Box>

                                        {/* Expand Icon */}
                                        <IconButton
                                        size="small"
                                        sx={{
                                            ml: 1,
                                            color: isExpanded ? theme.palette.primary.main : theme.palette.text.secondary,
                                            transition: 'all 0.3s ease'
                                        }}
                                        >
                                        {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </IconButton>
                                    </Stack>
                                    </Box>

                                    {/* Expanded Content */}
                                    <Collapse in={isExpanded} timeout={500}>
                                    <Box sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
                                        {/* Tabs */}
                                        <Box sx={{ bgcolor: alpha(theme.palette.action.hover, 0.05), px: { xs: 1, sm: 2 } }}>
                                        <Tabs
                                            value={currentTab}
                                            onChange={(e, newValue) => handleTabChange(projectId, newValue)}
                                            variant="scrollable"
                                            scrollButtons="auto"
                                            sx={{
                                            '& .MuiTab-root': {
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                fontSize: '0.9rem',
                                                minWidth: 'auto', // CHANGED: Allow tabs to shrink if needed
                                                px: 2
                                            }
                                            }}
                                        >
                                            <Tab label="Overview" />
                                            {project.keyFeatures && project.keyFeatures.length > 0 && <Tab label="Features" />}
                                            {project.techStack && project.techStack.length > 0 && <Tab label="Tech Stack" />}
                                            {project.impact && <Tab label="Impact" />}
                                        </Tabs>
                                        </Box>

                                        {/* Tab Panels */}
                                        <Box sx={{ p: { xs: 2, sm: 3 } }}>
                                        <AnimatePresence mode="wait">
                                            {/* Overview Tab */}
                                            {currentTab === 0 && (
                                            <motion.div
                                                key="overview"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Stack spacing={3}>
                                                {project.detailedDescription && (
                                                    <Box>
                                                    <Typography variant="h6" fontWeight={700} color="primary" gutterBottom>
                                                        Project Overview
                                                    </Typography>
                                                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                                        {project.detailedDescription}
                                                    </Typography>
                                                    </Box>
                                                )}

                                                {/* Screenshots */}
                                                {project?.s3Folder && (
                                                    <Box sx={{ mt: 3 }}>
                                                    <Typography variant="h6" fontWeight={600} gutterBottom>
                                                        Screenshots
                                                    </Typography>
                                                    <ScreenshotGallery images={getProjectImages(project?.s3Folder, project?.imageCount)}/>
                                                    </Box>
                                                )}
                                                {/* Challenges */}
                                                {project.challenges && (
                                                    <Box
                                                    sx={{
                                                        p: 2,
                                                        borderRadius: 2,
                                                        bgcolor: alpha(theme.palette.warning.main, 0.1),
                                                        border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}`
                                                    }}
                                                    >
                                                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                                                        <EmojiEventsIcon sx={{ color: theme.palette.warning.main }} />
                                                        <Typography variant="h6" fontWeight={700} sx={{ color: theme.palette.warning.main }}>
                                                        Challenges & Solutions
                                                        </Typography>
                                                    </Stack>
                                                    <Typography variant="body1" color="text.secondary">
                                                        {project.challenges}
                                                    </Typography>
                                                    </Box>
                                                )}
                                                </Stack>
                                            </motion.div>
                                            )}

                                            {/* Features Tab */}
                                            {currentTab === 1 && project.keyFeatures && project.keyFeatures.length > 0 && (
                                            <motion.div
                                                key="features"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Typography variant="h6" fontWeight={700} color="primary" gutterBottom>
                                                Key Features
                                                </Typography>
                                                <Stack spacing={2} mt={2}>
                                                {project.keyFeatures.map((feature, i) => (
                                                    <Stack key={i} direction="row" spacing={2} alignItems="flex-start">
                                                    <CheckCircleIcon sx={{ color: theme.palette.success.main, fontSize: 24, mt: 0.5 }} />
                                                    <Typography variant="body1" color="text.secondary" sx={{ flex: 1 }}>
                                                        {feature}
                                                    </Typography>
                                                    </Stack>
                                                ))}
                                                </Stack>
                                            </motion.div>
                                            )}

                                            {/* Tech Stack Tab */}
                                            {currentTab === (project.keyFeatures && project.keyFeatures.length > 0 ? 2 : 1) && 
                                            project.techStack && project.techStack.length > 0 && (
                                            <motion.div
                                                key="tech"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Typography variant="h6" fontWeight={700} color="primary" gutterBottom>
                                                Technology Stack
                                                </Typography>
                                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mt={2}>
                                                {project.techStack.map((tech, i) => (
                                                    <Chip
                                                    key={i}
                                                    label={tech}
                                                    icon ={
                                                        <img
                                                        src={getSkillIcon(tech)}
                                                        alt={tech}
                                                        style=
                                                            {{ width: 16, height: 16,
                                                            filter: isDark
                                                                ? "brightness(1.7) drop-shadow(0 0 1px rgba(255,255,255,0.4))"
                                                                : "none"
                                                            }}
                                                        />
                                                    }
                                                    sx={{
                                                        px: 1.5,
                                                        py: 2,
                                                        mb: 1,
                                                        fontWeight: 600,
                                                        fontSize: '0.85rem',
                                                        background: isDark
                                                        ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.2)} 100%)`
                                                        : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                        borderColor: theme.palette.primary.main,
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
                                                        }
                                                    }}
                                                    />
                                                ))}
                                                </Stack>
                                            </motion.div>
                                            )}

                                            {/* Impact Tab */}
                                            {project.impact && currentTab === (
                                            (project.keyFeatures && project.keyFeatures.length > 0 ? 1 : 0) +
                                            (project.techStack && project.techStack.length > 0 ? 1 : 0) +
                                            1
                                            ) && (
                                            <motion.div
                                                key="impact"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Box
                                                sx={{
                                                    p: 3,
                                                    borderRadius: 2,
                                                    bgcolor: alpha(theme.palette.success.main, 0.1),
                                                    border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`
                                                }}
                                                >
                                                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                                                    <EmojiEventsIcon sx={{ color: theme.palette.success.main, fontSize: 28 }} />
                                                    <Typography variant="h5" fontWeight={700} sx={{ color: theme.palette.success.main }}>
                                                    Impact & Results
                                                    </Typography>
                                                </Stack>
                                                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', lineHeight: 1.8 }}>
                                                    {project.impact}
                                                </Typography>
                                                </Box>
                                            </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Action Buttons in Expanded View */}
                                        <Stack 
                                            direction="row" 
                                            spacing={1} 
                                            mt={4} 
                                            pt={3} 
                                            sx={{ borderTop: `1px solid ${theme.palette.divider}` }}
                                            flexWrap="wrap"
                                            useFlexGap
                                        >
                                            {project.githubLink && (
                                            <Button
                                                variant="outlined"
                                                startIcon={<GitHubIcon />}
                                                href={project.githubLink}
                                                target="_blank"
                                                size="medium"
                                                sx={{ mb: 1 }}
                                            >
                                                GitHub
                                            </Button>
                                            )}
                                            {project.liveDemo && (
                                            <Button
                                                variant="contained"
                                                startIcon={<LaunchIcon />}
                                                href={project.liveDemo}
                                                target="_blank"
                                                size="medium"
                                                sx={{ mb: 1 }}
                                            >
                                                Live Demo
                                            </Button>
                                            )}
                                            {project.videoDemo && (
                                            <Button
                                                variant="contained"
                                                color="error"
                                                startIcon={<PlayArrowIcon />}
                                                href={project.videoDemo}
                                                target="_blank"
                                                size="medium"
                                                sx={{ mb: 1 }}
                                            >
                                                Watch Demo
                                            </Button>
                                            )}
                                        </Stack>
                                        </Box>
                                    </Box>
                                    </Collapse>
                                </Box>
                                </Box>
                            </motion.div>
                            )})}
                        </Stack>
                    </Box>
                    ))}
                </Stack>
                </Box>
            </Grid>
            </Grid>
        </Box>
      </motion.div>
    </section>
  );
};

export default Projects;
