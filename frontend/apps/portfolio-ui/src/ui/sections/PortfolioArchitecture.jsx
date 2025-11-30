import React from "react";
import {
  Typography,
  Grid,
  Stack,
  Box,
  Chip,
  Card,
  CardContent,
  Divider,
  useTheme,
  alpha,
  Button,
  Container,
  Paper,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import CloudIcon from "@mui/icons-material/Cloud";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import DevicesIcon from "@mui/icons-material/Devices";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { motion } from "framer-motion";
import { getSkillIcon } from "../../util/skillIcons.js";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};


const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};


const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -4,
    transition: { duration: 0.3, ease: "easeOut" } 
  },
};


const defaultTech = [
  "ReactJS",
  "Vite",
  "Material UI",
  "Node.js",
  "Express",
  "MongoDB",
  "AWS EC2",
  "AWS SES",
  "AWS Route53",
];


const FeatureCard = ({ icon, title, items = [], theme, isDark, color }) => (
  <motion.div variants={itemVariants} style={{ height: "100%" }}>
    <Card
      component={motion.div}
      initial="rest"
      whileHover="hover"
      variants={cardHoverVariants}
      sx={{
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
        background: isDark
          ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.paper, 0.6)} 100%)`
          : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.grey[50], 0.8)} 100%)`,
        border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.2 : 0.1)}`,
        boxShadow: isDark 
          ? `0 4px 20px ${alpha(theme.palette.common.black, 0.4)}`
          : `0 4px 20px ${alpha(theme.palette.grey[400], 0.15)}`,
        "&:hover": { 
          boxShadow: isDark
            ? `0 12px 40px ${alpha(color, 0.3)}`
            : `0 12px 40px ${alpha(color, 0.2)}`,
          borderColor: alpha(color, 0.4),
        },
        transition: "all 0.3s ease",
      }}
    >
      <Box
        sx={{
          height: 5,
          background: `linear-gradient(90deg, ${color} 0%, ${alpha(color, 0.6)} 100%)`,
        }}
      />
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" mb={2.5}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${alpha(color, 0.2)} 0%, ${alpha(color, 0.05)} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
            src={getSkillIcon(title)}
            alt={title}
            style=
                {{ width: 20, height: 20,
                filter: isDark
                    ? "brightness(1.7) drop-shadow(0 0 1px rgba(255,255,255,0.4))"
                    : "none"
                }}
            />
          </Box>
          <Typography variant="h6" fontWeight={700} sx={{ 
            background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.7)} 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            {title}
          </Typography>
        </Stack>


        <Stack spacing={1.5}>
          {items.map((item, i) => (
            <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: color,
                  transform: "translateY(9px)",
                  flexShrink: 0,
                }}
              />
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ lineHeight: 1.7, flex: 1 }}
              >
                {item}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </CardContent>
    </Card>
  </motion.div>
);


const PortfolioArchitecture = ({ portfolioInfo = {} }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";


  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        pt: 0
      }}
    >
      {/* CHANGED: Removed Container wrapper and used Box with maxWidth="xl" for consistency */}
      <Box sx={{ maxWidth: "xl", mx: "auto", px: { xs: 2, sm: 3, md: 4 }, position: "relative", zIndex: 1 }}>
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            // Changed amount to 0.1 and added margin to trigger earlier on mobile
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }} 
          >
          {/* Header Section */}
            <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
              <Stack 
                direction="row" 
                alignItems="center" 
                justifyContent="center" 
                spacing={1.5} 
                sx={{ mb: 2 }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.2)} 100%)`,
                  }}
                >
                  <AutoAwesomeIcon 
                    sx={{ 
                      fontSize: 32,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }} 
                  />
                </Box>
              </Stack>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ 
                  maxWidth: 800, 
                  mx: "auto", 
                  lineHeight: 1.8,
                  fontWeight: 400,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                }}
              >
                A modern, scalable architecture built with industry-leading technologies.
                Designed for performance, security, and seamless user experience.
              </Typography>
            </Box>
          </motion.div>


          {/* Feature Cards Grid */}
          {/* CHANGED: Added justifyContent="center" for better layout on large screens */}
          <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
            <Grid item xs={12} md={4}>
              <FeatureCard
                theme={theme}
                isDark={isDark}
                icon={<DevicesIcon />}
                title="Frontend"
                color={theme.palette.primary.main}
                items={[
                  "React 18 with Vite for lightning-fast HMR",
                  "TypeScript for robust type safety",
                  "Material UI v5 with custom theming",
                  "Framer Motion for fluid animations",
                  "Fully responsive with light/dark mode support",
                ]}
              />
            </Grid>


            <Grid item xs={12} md={4}>
              <FeatureCard
                theme={theme}
                isDark={isDark}
                icon={<StorageIcon />}
                title="Backend"
                color={theme.palette.secondary.main}
                items={[
                  "Node.js + Express for RESTful APIs",
                  "MongoDB Atlas for scalable data storage",
                  "AWS SES integration for email services"
                ]}
              />
            </Grid>


            <Grid item xs={12} md={4}>
              <FeatureCard
                theme={theme}
                isDark={isDark}
                icon={<CloudIcon />}
                title="Cloud & DevOps"
                color={theme.palette.success.main}
                items={[
                  "Docker containers for consistency",
                  "AWS S3 + CloudFront CDN",
                  "EC2 instances with auto-scaling",
                  "Route53 DNS with SSL certificates",
                  "CI/CD pipelines for automated deployment",
                ]}
              />
            </Grid>
          </Grid>


          {/* Architecture Details */}
          {/* CHANGED: Added justifyContent="center" */}
          <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
            <Grid item xs={12} md={7}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    p: 3,
                    height: "100%",
                    background: isDark
                      ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.paper, 0.6)} 100%)`
                      : theme.palette.background.paper,
                    border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.2 : 0.1)}`,
                    boxShadow: isDark 
                      ? `0 4px 20px ${alpha(theme.palette.common.black, 0.4)}`
                      : `0 4px 20px ${alpha(theme.palette.grey[400], 0.15)}`,
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center" mb={2.5}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.2)} 0%, ${alpha(theme.palette.info.main, 0.05)} 100%)`,
                      }}
                    >
                      <SettingsEthernetIcon sx={{ color: theme.palette.info.main, fontSize: 28 }} />
                    </Box>
                    <Typography variant="h6" fontWeight={700}>
                      System Architecture
                    </Typography>
                  </Stack>


                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    sx={{ mb: 3, lineHeight: 1.8 }}
                  >
                    Built on a modern microservices architecture, this portfolio leverages 
                    a React SPA served via CloudFront for global edge delivery. The backend 
                    API runs on containerized Node.js services with MongoDB for persistent 
                    storage. All components communicate through secure REST endpoints.
                  </Typography>


                  <Divider sx={{ my: 2 }} />


                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={0.5}>
                        <Typography 
                          variant="overline" 
                          fontWeight={700}
                          sx={{ color: theme.palette.primary.main }}
                        >
                          Email Integration
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                          Contact forms route through AWS SES with verified domain authentication. 
                          All submissions are logged in MongoDB for tracking.
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={0.5}>
                        <Typography 
                          variant="overline" 
                          fontWeight={700}
                          sx={{ color: theme.palette.secondary.main }}
                        >
                          Asset Delivery
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                          Images and media stored in S3 buckets, distributed globally through 
                          CloudFront CDN for optimal load times.
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              </motion.div>
            </Grid>


            <Grid item xs={12} md={5}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    p: 3,
                    height: "100%",
                    background: isDark
                      ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.paper, 0.6)} 100%)`
                      : theme.palette.background.paper,
                    border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.2 : 0.1)}`,
                    boxShadow: isDark 
                      ? `0 4px 20px ${alpha(theme.palette.common.black, 0.4)}`
                      : `0 4px 20px ${alpha(theme.palette.grey[400], 0.15)}`,
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center" mb={2.5}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.2)} 0%, ${alpha(theme.palette.warning.main, 0.05)} 100%)`,
                      }}
                    >
                      <SecurityIcon sx={{ color: theme.palette.warning.main, fontSize: 28 }} />
                    </Box>
                    <Typography variant="h6" fontWeight={700}>
                      Security First
                    </Typography>
                  </Stack>


                  <Stack spacing={2}>
                    {[
                      "HTTPS enforced with ACM SSL certificates",
                      "DKIM/SPF email authentication configured",
                      "IAM roles with least-privilege access",
                      "Environment variables for secret management",
                      "CORS policies and API rate limiting",
                      "Optional WAF integration for DDoS protection",
                    ].map((item, i) => (
                      <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
                        <SecurityIcon 
                          sx={{ 
                            fontSize: 16, 
                            color: theme.palette.warning.main,
                            pt: 0.4,
                            flexShrink: 0,
                          }} 
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                          {item}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>


          {/* Tech Stack */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                p: 3,
                mb: 4,
                background: isDark
                  ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.paper, 0.6)} 100%)`
                  : theme.palette.background.paper,
                border: `1px solid ${alpha(theme.palette.divider, isDark ? 0.2 : 0.1)}`,
                boxShadow: isDark 
                  ? `0 4px 20px ${alpha(theme.palette.common.black, 0.4)}`
                  : `0 4px 20px ${alpha(theme.palette.grey[400], 0.15)}`,
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center" mb={2.5}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.secondary.main, 0.2)} 100%)`,
                  }}
                >
                  <CodeIcon 
                    sx={{ 
                      fontSize: 28,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }} 
                  />
                </Box>
                <Typography variant="h6" fontWeight={700}>
                  Technologies & Tools
                </Typography>
              </Stack>


              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                {defaultTech.map((tech, i) => (
                  <Chip
                    key={i}
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
                    sx={{
                      px: 1,
                      py: 2.5,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      background: isDark
                        ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`
                        : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                      color: theme.palette.text.primary,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.25)} 0%, ${alpha(theme.palette.secondary.main, 0.2)} 100%)`,
                        transform: "translateY(-2px)",
                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                      },
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </motion.div>
        </motion.div>
      </Box>
    </Box>
  );
};


export default PortfolioArchitecture;
