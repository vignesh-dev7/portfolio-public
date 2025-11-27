import React from "react";
import { 
  Typography, 
  Grid, 
  Link, 
  Stack, 
  Box,
  Button,
  Chip,
  Divider,
  useTheme,
  Card,
  CardContent,
  alpha
} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import LanguageIcon from '@mui/icons-material/Language';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CodeIcon from '@mui/icons-material/Code';
import CloudIcon from '@mui/icons-material/Cloud';
import SchoolIcon from '@mui/icons-material/School';
import { motion } from "framer-motion";
import { getSkillIcon } from "../../util/skillIcons.js";
import BadgeIcon from '@mui/icons-material/Badge';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';

const About = ({ about, socialLinks, contact, experiences, education }) => {

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.10,
      },
      duration: 0.6, 
      ease: "easeOut" 
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

  const cardHoverVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // Calculate years of experience dynamically
  const calculateExperience = (startDate) => {
    if (!startDate) return null;
    const start = new Date(startDate);
    const now = new Date();
    const years = now.getFullYear() - start.getFullYear();
    const months = now.getMonth() - start.getMonth();
    const totalMonths = years * 12 + months;
    const yearsPart = Math.floor(totalMonths / 12);
    const monthsPart = totalMonths % 12;

    if (yearsPart === 0) return `${monthsPart} months`;
    if (monthsPart === 0) return `${yearsPart}+ years`;
    return `${yearsPart}.${monthsPart}+ years`;
  };

  const experiencesStatic = 
    {
      technologies: ["React(TS/JS)", "Node.js", "MongoDB", "GraphQL", "AWS", "Docker", "Kubernetes"],
    };
  
  const experience = calculateExperience(about?.experienceStartDate);
  console.log(`calculateExperience: ${experience}`);

  return (
    <section>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Grid container spacing={4} alignItems="flex-start" p={1}>
          {/* About Content */}
          <Grid item xs={12} md={11} lg={10}>

            {/* Name & Role */}
            <motion.div variants={itemVariants}>
              <Typography
                variant="h3"
                gutterBottom
                fontWeight={800}
                sx={{
                  letterSpacing: "0.5px",
                  background: isDark
                    ? `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`
                    : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: isDark
                    ? "0px 3px 8px rgba(0,0,0,0.4)"
                    : "0px 3px 8px rgba(0,0,0,0.1)", // soft glow
                  transition: "all 0.3s ease",
                  "&:hover": {
                    letterSpacing: "1px",
                    textShadow: isDark
                      ? "0px 3px 12px rgba(255,255,255,0.15)"
                      : "0px 3px 12px rgba(0,0,0,0.2)",
                  }
                }}
              >
                Hi, I'm {about?.name}
              </Typography>
            </motion.div>


            <motion.div variants={itemVariants}>
              <Typography
                variant="h5"
                gutterBottom
                fontWeight={600}
                sx={{
                  mb: 2,
                  color: theme.palette.primary.main,
                  opacity: 0.9,
                  transition: "opacity 0.3s ease",
                  "&:hover": { opacity: 1 }
                }}
              >
                {about?.role}
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  pl: 2,
                  mb: 4,
                  py: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderLeftWidth: "6px",
                    pl: 2.5,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: isDark
                      ? theme.palette.text.secondary
                      : theme.palette.text.primary,
                    fontStyle: "italic",
                    fontWeight: 400,
                    lineHeight: 1.7,
                  }}
                >
                  "{about?.tagline}"
                </Typography>
              </Box>
            </motion.div>


            {/* Stats Cards */}
            <motion.div variants={itemVariants}>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                {experience && (
                  <Grid item xs={12} sm={4}>
                    <motion.div
                      variants={cardHoverVariants}
                      initial="rest"
                      whileHover="hover"
                    >
                      <Card 
                        sx={{ 
                          background: isDark
                            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.primary.dark, 0.25)} 100%)`
                            : `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.2)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          transition: 'border-color 0.3s ease',
                          '&:hover': {
                            borderColor: theme.palette.primary.main,
                            boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`
                          }
                        }}
                      >
                        <CardContent>
                          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                            <CalendarTodayIcon 
                              sx={{ 
                                color: theme.palette.primary.main,
                                fontSize: 24
                              }} 
                            />
                            <Typography variant="subtitle2" fontWeight={600}>
                              Experience
                            </Typography>
                          </Stack>
                          <Typography variant="h5" fontWeight={700} color="primary">
                            {experience}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Full Stack Development
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                )}
                
                <Grid item xs={12} sm={4}>
                  <motion.div
                    variants={cardHoverVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    <Card 
                      sx={{ 
                        background: isDark
                          ? `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.dark, 0.25)} 100%)`
                          : `linear-gradient(135deg, ${alpha(theme.palette.secondary.light, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                        border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                        transition: 'border-color 0.3s ease',
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        '&:hover': {
                          borderColor: theme.palette.secondary.main,
                          boxShadow: `0 8px 24px ${alpha(theme.palette.secondary.main, 0.15)}`
                        }
                      }}
                    >
                      <CardContent>
                        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                          <CodeIcon 
                            sx={{ 
                              color: theme.palette.secondary.main,
                              fontSize: 24
                            }} 
                          />
                          <Typography variant="subtitle2" fontWeight={600}>
                            Specialization
                          </Typography>
                        </Stack>
                        <Typography variant="h6" fontWeight={700} color="secondary">
                          MERN Stack
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Full Stack Expertise
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <motion.div
                    variants={cardHoverVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    <Card 
                      sx={{ 
                        background: isDark
                          ? `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.15)} 0%, ${alpha(theme.palette.success.dark, 0.25)} 100%)`
                          : `linear-gradient(135deg, ${alpha(theme.palette.success.light, 0.2)} 0%, ${alpha(theme.palette.success.main, 0.1)} 100%)`,
                        border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
                        transition: 'border-color 0.3s ease',
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        '&:hover': {
                          borderColor: theme.palette.success.main,
                          boxShadow: `0 8px 24px ${alpha(theme.palette.success.main, 0.15)}`
                        }
                      }}
                    >
                      <CardContent>
                        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                          <CloudIcon 
                            sx={{ 
                              color: theme.palette.success.main,
                              fontSize: 24
                            }} 
                          />
                          <Typography variant="subtitle2" fontWeight={600}>
                            Cloud & DevOps
                          </Typography>
                        </Stack>
                        <Typography variant="h6" fontWeight={700} color="success.main">
                          AWS & K8s
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Containerized Solutions
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              </Grid>
            </motion.div>

            {/* About Me Section */}
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  mb: 3,
                  background: isDark
                    ? alpha(theme.palette.background.paper, 0.6)
                    : alpha(theme.palette.background.paper, 0.8),
                  border: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",

                  transition: "all 0.3s ease",

                  "&:hover": {
                    boxShadow: isDark
                      ? "0 6px 22px rgba(0,0,0,0.35)"
                      : "0 6px 20px rgba(0,0,0,0.18)",     // smoother glow
                    transform: "translateY(-4px)",         // subtle lift
                    borderColor: alpha(theme.palette.primary.main, 0.4),
                  },
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <ChromeReaderModeIcon sx={{ color: theme.palette.primary.main }} />
                  <Typography variant="h6" fontWeight={600}>
                    About Me
                  </Typography>
                </Stack>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.8 }}
                >
                  {about?.description}
                </Typography>
              </Box>
            </motion.div>


            {/* Currently Looking For - Enhanced CTA */}
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  position: 'relative',
                  p: 4,
                  borderRadius: 3,
                  mb: 3,
                  overflow: 'hidden',
                  background: isDark
                    ? `linear-gradient(135deg, ${alpha('#06b6d4', 0.08)} 0%, ${alpha('#3b82f6', 0.08)} 100%)`
                    : `linear-gradient(135deg, ${alpha('#06b6d4', 0.03)} 0%, ${alpha('#3b82f6', 0.03)} 100%)`,
                  border: `1px solid ${isDark ? alpha('#06b6d4', 0.2) : alpha('#06b6d4', 0.15)}`,
                  backdropFilter: 'blur(10px)',
                  boxShadow: isDark
                    ? `0 8px 32px ${alpha('#000', 0.3)}`
                    : `0 8px 32px ${alpha('#06b6d4', 0.08)}`,
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: isDark
                      ? `0 12px 48px ${alpha('#000', 0.4)}`
                      : `0 12px 48px ${alpha('#06b6d4', 0.12)}`,
                    border: `1px solid ${alpha('#06b6d4', 0.4)}`,
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 3,
                    padding: '2px',
                    background: `linear-gradient(135deg, #06b6d4, #3b82f6)`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                  },
                  '&:hover::before': {
                    opacity: 0.6,
                  }
                }}
              >
                {/* Decorative background blur circles */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${alpha('#06b6d4', 0.15)} 0%, transparent 70%)`,
                    filter: 'blur(40px)',
                    pointerEvents: 'none',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -30,
                    left: -30,
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${alpha('#3b82f6', 0.15)} 0%, transparent 70%)`,
                    filter: 'blur(40px)',
                    pointerEvents: 'none',
                  }}
                />

                <Stack spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
                  <Stack direction="row" spacing={2.5} alignItems="center" flexWrap="wrap">
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        background: `linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 8px 24px ${alpha('#06b6d4', 0.3)}`,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'rotate(5deg) scale(1.05)',
                        }
                      }}
                    >
                      <BadgeIcon sx={{ color: '#fff', fontSize: 32 }} />
                    </Box>

                    <Box flex={1} sx={{ minWidth: 200 }}>
                      <Typography 
                        variant="h5" 
                        fontWeight={700}
                        sx={{ 
                          background: `linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          mb: 0.5
                        }}
                      >
                        Currently Looking For
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: theme.palette.text.primary,
                          fontWeight: 500,
                          lineHeight: 1.6
                        }}
                      >
                        {about?.lookingFor}
                      </Typography>
                    </Box>

                    {about?.availability && (
                      <Chip 
                        label={about?.availability} 
                        sx={{ 
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          height: 36,
                          px: 2,
                          background: `linear-gradient(135deg, ${alpha('#06b6d4', 0.15)} 0%, ${alpha('#3b82f6', 0.15)} 100%)`,
                          border: `1.5px solid ${alpha('#06b6d4', 0.3)}`,
                          color: '#06b6d4',
                          '&:hover': {
                            background: `linear-gradient(135deg, ${alpha('#06b6d4', 0.25)} 0%, ${alpha('#3b82f6', 0.25)} 100%)`,
                          }
                        }}
                      />
                    )}
                  </Stack>

                  {/* <Button
                    variant="contained"
                    size="large"
                    href={`mailto:${contact?.email}`}
                    startIcon={<EmailIcon />}
                    sx={{
                      alignSelf: 'flex-start',
                      fontWeight: 600,
                      fontSize: '1rem',
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      background: `linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)`,
                      color: '#fff',
                      textTransform: 'none',
                      boxShadow: `0 4px 16px ${alpha('#06b6d4', 0.4)}`,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-2px) scale(1.02)',
                        boxShadow: `0 8px 24px ${alpha('#06b6d4', 0.5)}`,
                        background: `linear-gradient(135deg, #0891b2 0%, #2563eb 100%)`,
                      },
                      '&:active': {
                        transform: 'translateY(0) scale(0.98)',
                      }
                    }}
                  >
                    Let's Connect
                  </Button> */}
                </Stack>
              </Box>
            </motion.div>

            {/* Experience & Education Timeline */}
            {((experiences && experiences?.length > 0) || (education && education?.length > 0)) && (
              <>
                <motion.div variants={itemVariants}>
                  <Typography 
                    variant="h5" 
                    fontWeight={700} 
                    gutterBottom
                    sx={{ 
                      mt: 4,
                      mb: 3,
                      color: theme.palette.primary.main 
                    }}
                  >
                    Professional Journey
                  </Typography>
                </motion.div>

                <Box sx={{ position: 'relative', pl: { xs: 2, md: 6 }, pb: 4 }}>
                  {/* Timeline Line */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: { xs: 8, md: 24 },
                      top: 0,
                      bottom: 0,
                      width: 2,
                      background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    }}
                  />

                  <Stack spacing={4}>
                    {/* Experience Section */}
                    {experiences && experiences?.length > 0 && (
                      <Box>
                        <motion.div variants={itemVariants}>
                          <Box sx={{ position: 'relative', mb: 3 }}>
                            <Chip
                              icon={<WorkIcon />}
                              label="Experience"
                              sx={{
                                px: 2,
                                py: 2,
                                fontSize: '1rem',
                                fontWeight: 700,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                color: 'white',
                                border: `2px solid ${alpha(theme.palette.primary.light, 0.3)}`,
                                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
                              }}
                            />
                          </Box>
                        </motion.div>

                        <Stack spacing={3}>
                          {experiences?.map((exp, index) => (
                            <motion.div key={index} variants={itemVariants}>
                              <Box sx={{ position: 'relative', pl: { xs: 3, md: 4 } }}>
                                {/* Timeline Dot */}
                                <Box
                                  sx={{
                                    position: 'absolute',
                                    left: { xs: -18, md: -34 },
                                    top: 85,
                                    width: 16,
                                    height: 16,
                                    borderRadius: '50%',
                                    bgcolor: theme.palette.primary.main,
                                    border: `3px solid ${theme.palette.background.default}`,
                                    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
                                    zIndex: 1
                                  }}
                                />

                                {/* Experience Card */}
                                <Box
                                  sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    background: isDark
                                      ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`
                                      : theme.palette.background.paper,
                                    border: `1px solid ${theme.palette.divider}`,
                                    transition: 'all 0.3s ease',
                                    boxShadow: theme.shadows[2],
                                    '&:hover': {
                                      borderColor: theme.palette.primary.main,
                                      transform: 'translateX(4px)',
                                      boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`
                                    }
                                  }}
                                >
                                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1} flexWrap="wrap" gap={1}>
                                    <Typography variant="h6" fontWeight={700} color="primary">
                                      {exp.position}
                                    </Typography>
                                    <Chip
                                      icon={<CalendarTodayIcon sx={{ fontSize: 16 }} />}
                                      label={`${exp.startDate} - ${exp.endDate}`}
                                      size="small"
                                      sx={{
                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                        color: theme.palette.primary.main,
                                        fontWeight: 600,
                                        px: 1,
                                        py: 0.5,
                                        "& .MuiChip-icon": {
                                          marginRight: 0.2,
                                          marginLeft: 0.5
                                        }
                                      }}
                                    />
                                  </Stack>
                                  <Typography variant="subtitle1" color="text.secondary" fontWeight={600} gutterBottom>
                                    {exp?.company}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mt: 1 }}>
                                    {exp?.description}
                                  </Typography>

                                  {/* Tech Stack Section */}
                                  
                                  <Box sx={{ mt: 2 }}>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mb: 1, display: 'block' }}>
                                      Technologies Used:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                      {experiencesStatic.technologies.map((tech, techIndex) => (
                                        <Chip
                                          key={techIndex}
                                          label={tech}
                                          icon ={
                                            <img
                                              src={getSkillIcon(tech)}
                                              alt={tech}
                                              style=
                                                {{ width: 20, height: 20,
                                                  filter: isDark
                                                    ? "brightness(1.7) drop-shadow(0 0 1px rgba(255,255,255,0.4))"
                                                    : "none"
                                                }}
                                            />
                                          }
                                          size="small"
                                          sx={{
                                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                                            color: theme.palette.primary.main,
                                            fontWeight: 500,
                                            fontSize: '0.75rem',
                                            '&:hover': {
                                              bgcolor: alpha(theme.palette.primary.main, 0.2),
                                            }
                                          }}
                                        />
                                      ))}
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            </motion.div>
                          ))}
                        </Stack>
                      </Box>
                    )}

                    {/* Education Section */}
                    {education && education?.length > 0 && (
                      <Box>
                        <motion.div variants={itemVariants}>
                          <Box sx={{ position: 'relative', mb: 3, mt: 2 }}>
                            <Chip
                              icon={<SchoolIcon />}
                              label="Education"
                              sx={{
                                px: 2,
                                py: 2,
                                fontSize: '1rem',
                                fontWeight: 700,
                                background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                                color: 'white',
                                border: `2px solid ${alpha(theme.palette.secondary.light, 0.3)}`,
                                boxShadow: `0 4px 12px ${alpha(theme.palette.secondary.main, 0.3)}`
                              }}
                            />
                          </Box>
                        </motion.div>

                        <Stack spacing={3}>
                          {education?.map((edu, index) => (
                            <motion.div key={index} variants={itemVariants}>
                              <Box sx={{ position: 'relative', pl: { xs: 3, md: 4 } }}>
                                {/* Timeline Dot */}
                                <Box
                                  sx={{
                                    position: 'absolute',
                                    left: { xs: -18, md: -34 },
                                    top: 46,
                                    width: 16,
                                    height: 16,
                                    borderRadius: '50%',
                                    bgcolor: theme.palette.secondary.main,
                                    border: `3px solid ${theme.palette.background.default}`,
                                    boxShadow: `0 0 0 2px ${theme.palette.secondary.main}`,
                                    zIndex: 1
                                  }}
                                />

                                {/* Education Card */}
                                <Box
                                  sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    background: isDark
                                      ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`
                                      : theme.palette.background.paper,
                                    border: `1px solid ${theme.palette.divider}`,
                                    transition: 'all 0.3s ease',
                                    boxShadow: theme.shadows[2],
                                    '&:hover': {
                                      borderColor: theme.palette.secondary.main,
                                      transform: 'translateX(4px)',
                                      boxShadow: `0 4px 20px ${alpha(theme.palette.secondary.main, 0.2)}`
                                    }
                                  }}
                                >
                                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1} flexWrap="wrap" gap={2}>
                                    <Typography variant="h6" fontWeight={700} color="secondary">
                                      {edu?.degree}
                                    </Typography>
                                    <Chip
                                      icon={<CalendarTodayIcon sx={{ fontSize: 10 }} />}
                                      label={`${edu?.startYear} - ${edu?.endYear}`}
                                      size="small"
                                      sx={{
                                        bgcolor: alpha(theme.palette.secondary.main, 0.1),
                                        color: theme.palette.secondary.main,
                                        fontWeight: 600,
                                        px: 1,
                                        py: 0.5, 
                                        // Icon spacing
                                        "& .MuiChip-icon": {
                                          marginRight: 0.2,
                                          marginLeft: 0.5
                                        }
                                      }}
                                    />

                                  </Stack>
                                  <Typography variant="subtitle1" color="text.secondary" fontWeight={600}>
                                    {edu?.institution}
                                  </Typography>
                                  <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    {edu?.cgpa && 
                                    <Chip
                                      label={`CGPA: ${edu?.cgpa}/${edu?.maxCgpa}`}
                                      size="small"
                                      sx={{
                                        bgcolor: alpha(theme.palette.success.main, 0.1),
                                        color: theme.palette.success.main,
                                        fontWeight: 600,
                                        fontSize: '0.8rem'
                                      }}
                                    />
                                    }
                                    {edu?.percent && 
                                      <Chip
                                        label={`Percentage: ${edu?.percent}`}
                                        size="small"
                                        sx={{
                                          bgcolor: alpha(theme.palette.success.main, 0.1),
                                          color: theme.palette.success.main,
                                          fontWeight: 600,
                                          fontSize: '0.8rem'
                                        }}
                                      />
                                    }
                                  </Box>
                                </Box>
                              </Box>
                            </motion.div>
                          ))}
                        </Stack>
                      </Box>
                    )}
                  </Stack>
                </Box>
              </>
            )}

            {/* Highlights */}
            {/* <motion.div variants={itemVariants}>
              <Stack direction="row" spacing={1} mb={3} mt= {4} flexWrap="wrap" useFlexGap>
                {about?.highlights?.map((highlight, index) => (
                  <Chip 
                    key={index}
                    label={highlight}
                    variant="outlined"
                    size="medium"
                    sx={{
                      borderColor: isDark 
                        ? alpha(theme.palette.primary.main, 0.5)
                        : theme.palette.primary.main,
                      color: isDark
                        ? theme.palette.primary.light
                        : theme.palette.primary.dark,
                      fontWeight: 500,
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        bgcolor: alpha(theme.palette.primary.main, 0.1)
                      }
                    }}
                  />
                ))}
              </Stack>
            </motion.div> */}

            <Divider sx={{ my: 3 }} />

            {/* Additional Info Grid */}
            <motion.div variants={itemVariants}>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {about?.languagesSpoken?.length > 0 && (
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 1.5,
                        bgcolor: alpha(theme.palette.info.main, 0.05),
                        border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                      }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <LanguageIcon 
                          sx={{ color: theme.palette.info.main }} 
                        />
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Languages
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {about?.languagesSpoken?.join(', ')}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>
                )}

                {about?.preferredWorkType?.length > 0 && (
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 1.5,
                        bgcolor: alpha(theme.palette.secondary.main, 0.05),
                        border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                      }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <HomeWorkIcon 
                          sx={{ color: theme.palette.secondary.main }} 
                        />
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Work Preference
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {about.preferredWorkType.join(' • ')}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </section>
  );
};

export default About;