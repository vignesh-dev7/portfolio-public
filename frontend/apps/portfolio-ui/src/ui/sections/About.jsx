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
import { motion } from "framer-motion";

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
                fontWeight={700}
                sx={{
                  background: isDark 
                    ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                    : `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Hi, I'm {about?.name}
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography 
                variant="h5" 
                color="primary" 
                gutterBottom
                fontWeight={600}
                sx={{ mb: 2 }}
              >
                {about?.role}
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  pl: 2,
                  mb: 4
                }}
              >
                <Typography 
                  variant="h6" 
                  sx={{
                    color: isDark ? theme.palette.text.secondary : theme.palette.text.primary,
                    fontStyle: "italic",
                    fontWeight: 400
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
                          backdropFilter: "blur(12px)",        // ⬅ blurred glass
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
                        backdropFilter: "blur(12px)",        // ⬅ blurred glass
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
                        backdropFilter: "blur(12px)",        // ⬅ blurred glass
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
                  border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <WorkIcon sx={{ color: theme.palette.primary.main }} />
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
                  p: 3,
                  borderRadius: 2,
                  mb: 3,
                  border: `2px solid`,
                  borderColor: theme.palette.success.main,
                  bgcolor: isDark 
                    ? alpha(theme.palette.success.main, 0.15)
                    : alpha(theme.palette.success.main, 0.08),
                  boxShadow: isDark
                    ? `0 0 20px ${alpha(theme.palette.success.main, 0.1)}`
                    : `0 0 20px ${alpha(theme.palette.success.main, 0.15)}`,
                  transition: "all 0.3s ease",
                  '&:hover': {
                    boxShadow: isDark
                      ? `0 0 30px ${alpha(theme.palette.success.main, 0.2)}`
                      : `0 0 30px ${alpha(theme.palette.success.main, 0.25)}`,
                  }
                }}
              >
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 1.5,
                        bgcolor: alpha(theme.palette.success.main, 0.8),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <WorkIcon sx={{ color: theme.palette.success.secondary, fontSize: 32 }} />
                    </Box>
                    <Box flex={1}>
                      <Typography 
                        variant="h6" 
                        fontWeight={700}
                        sx={{ color: theme.palette.success.main }}
                        gutterBottom
                      >
                        Currently Looking For
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: isDark 
                            ? theme.palette.text.primary 
                            : theme.palette.text.secondary 
                        }}
                      >
                        {about?.lookingFor}
                      </Typography>
                    </Box>
                    {about?.availability && (
                      <Chip 
                        label={about?.availability} 
                        color="success"
                        sx={{ 
                          fontWeight: 600,
                          fontSize: '0.875rem'
                        }}
                      />
                    )}
                  </Stack>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    href={`mailto:${contact?.email}`}
                    startIcon={<EmailIcon />}
                    sx={{
                      alignSelf: 'flex-start',
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        transform: 'scale(1.05)',
                        transition: 'transform 0.2s ease'
                      }
                    }}
                  >
                    Let's Connect
                  </Button>
                </Stack>
              </Box>
            </motion.div>

            {/* Highlights */}
            <motion.div variants={itemVariants}>
              <Stack direction="row" spacing={1} mb={3} flexWrap="wrap" useFlexGap>
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
            </motion.div>

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

            <Divider sx={{ my: 3 }} />

            {/* Action Buttons */}
            {/* <motion.div variants={itemVariants}>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                mb={2}
              >
                <Button
                  variant="contained"
                  size="large"
                  href={`mailto:${contact?.email}`}
                  sx={{
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[8],
                      transition: 'all 0.3s ease'
                    }
                  }}
                >
                  Let's Connect
                </Button>
              </Stack>
            </motion.div> */}
          </Grid>
        </Grid>
      </motion.div>
    </section>
  );
};

export default About;