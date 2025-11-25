import React from "react";
import { 
  Typography, 
  Grid, 
  Box, 
  Stack,
  Button,
  useTheme,
  alpha,
  Link,
  IconButton,
  TextField 
} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import MessageIcon from '@mui/icons-material/Message';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PublicIcon from '@mui/icons-material/Public';
import { motion } from "framer-motion";
import WorkIcon from '@mui/icons-material/Work';

const Contact = ({ contact, socialLinks }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Hardcoded additional info
  const additionalInfo = {
    availability: {
      status: "Open to SDE / Full-Stack roles",
      responseTime: "Usually responds within 24 hours"
    },
    timezone: "IST (GMT+5:30)",
    bestTime: "Mon-Fri, 9 AM - 6 PM IST"
  };

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

  // Early return if no contact data
  if (!contact) {
    return (
      <section>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Contact
        </Typography>
        <Typography variant="body1" color="text.secondary">
          No contact information available.
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
        viewport={{ once: true, amount: 0.2 }}
      >
        <Grid container spacing={4} alignItems="flex-start" sx={{ p: 1, width: '95%' }}>
          <Grid item xs={12}>
            {/* Section Header */}
            <motion.div variants={itemVariants}>
              <Stack direction="row" spacing={2} alignItems="center" mb={4}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <MessageIcon sx={{ color: 'white', fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight={700}>
                    Let's Connect
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Whether you’re hiring or exploring collaboration
                  </Typography>
                </Box>
              </Stack>
            </motion.div>

            {/* Split Layout */}
            <Grid container spacing={4} alignItems="stretch">
              {/* Left Side - Contact Info */}
              <Grid item xs={12} lg={6}>
                <motion.div variants={itemVariants}>
                  <Stack spacing={2}>
                    {/* Availability Badge */}
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 2,
                        px: 3,
                        py: 1.5,
                        background: isDark
                          ? alpha(theme.palette.success.main, 0.15)
                          : alpha(theme.palette.success.main, 0.1),
                        border: `1px solid ${alpha(theme.palette.success.main, 0.4)}`,
                        borderRadius: 50,
                        width: 'fit-content'
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: theme.palette.success.main,
                          animation: 'pulse 2s ease-in-out infinite',
                          '@keyframes pulse': {
                            '0%, 100%': { opacity: 1 },
                            '50%': { opacity: 0.5 }
                          }
                        }}
                      />
                      <Typography 
                        variant="body2" 
                        fontWeight={600}
                        sx={{ color: theme.palette.success.main }}
                      >
                        {additionalInfo.availability.status}
                      </Typography>
                    </Box>

                    {/* Email Card */}
                    {contact.email && (
                      <Box
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          background: isDark
                            ? alpha(theme.palette.background.paper, 0.6)
                            : alpha(theme.palette.background.paper, 0.9),
                          backdropFilter: 'blur(20px)',
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: isDark
                              ? alpha(theme.palette.background.paper, 0.8)
                              : theme.palette.background.paper,
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`
                          }
                        }}
                      >
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 1.5,
                              background: alpha(theme.palette.primary.main, 0.15),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 24 }} />
                          </Box>
                          <Box flex={1}>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                              Email
                            </Typography>
                            <Link
                              href={`mailto:${contact.email}`}
                              underline="hover"
                              sx={{
                                color: isDark ? theme.palette.text.primary : theme.palette.text.primary,
                                fontWeight: 600,
                                fontSize: '1rem',
                                wordBreak: 'break-all',
                                '&:hover': {
                                  color: theme.palette.primary.main
                                }
                              }}
                            >
                              {contact.email}
                            </Link>
                            <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                              {additionalInfo.availability.responseTime}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    )}

                    {/* Phone Card */}
                    {contact.phone && (
                      <Box
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          background: isDark
                            ? alpha(theme.palette.background.paper, 0.6)
                            : alpha(theme.palette.background.paper, 0.9),
                          backdropFilter: 'blur(20px)',
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: isDark
                              ? alpha(theme.palette.background.paper, 0.8)
                              : theme.palette.background.paper,
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 24px ${alpha(theme.palette.success.main, 0.15)}`
                          }
                        }}
                      >
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 1.5,
                              background: alpha(theme.palette.success.main, 0.15),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            <PhoneIcon sx={{ color: theme.palette.success.main, fontSize: 24 }} />
                          </Box>
                          <Box flex={1}>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                              Phone
                            </Typography>
                            <Link
                              href={`tel:${contact.phone}`}
                              underline="hover"
                              sx={{
                                color: isDark ? theme.palette.text.primary : theme.palette.text.primary,
                                fontWeight: 600,
                                fontSize: '1rem',
                                '&:hover': {
                                  color: theme.palette.success.main
                                }
                              }}
                            >
                              {contact.phone}
                            </Link>
                            <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                              {additionalInfo.bestTime}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    )}

                    {/* Location Card */}
                    {contact.address && (
                      <Box
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          background: isDark
                            ? alpha(theme.palette.background.paper, 0.6)
                            : alpha(theme.palette.background.paper, 0.9),
                          backdropFilter: 'blur(20px)',
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: isDark
                              ? alpha(theme.palette.background.paper, 0.8)
                              : theme.palette.background.paper,
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 24px ${alpha(theme.palette.secondary.main, 0.15)}`
                          }
                        }}
                      >
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 1.5,
                              background: alpha(theme.palette.secondary.main, 0.15),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            <LocationOnIcon sx={{ color: theme.palette.secondary.main, fontSize: 24 }} />
                          </Box>
                          <Box flex={1}>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                              Location
                            </Typography>
                            <Typography
                              variant="body1"
                              fontWeight={600}
                              color="text.primary"
                            >
                              {contact.address}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                              {additionalInfo.timezone}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    )}

                    {/* social Card */}
                    {socialLinks && (
                      <Box
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          background: isDark
                            ? alpha(theme.palette.background.paper, 0.6)
                            : alpha(theme.palette.background.paper, 0.9),
                          backdropFilter: 'blur(20px)',
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: isDark
                              ? alpha(theme.palette.background.paper, 0.8)
                              : theme.palette.background.paper,
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 24px ${alpha(theme.palette.warning.main, 0.15)}`
                          }
                        }}
                      >
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 1.5,
                              background: alpha(theme.palette.warning.main, 0.15),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            <WorkIcon sx={{ color: theme.palette.warning.main, fontSize: 24 }} />
                          </Box>

                          <Box flex={1}>
                            <Typography variant="caption" color="text.secondary" display="block" mb={0}>
                              Work Preferences
                            </Typography>

                            <Typography
                              variant="body1"
                              fontWeight={600}
                              color="text.primary"
                            >
                              Onsite | Remote
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    )}

                    {/* Social Links */}
                    {/* <Stack direction="row" spacing={2} pt={2}>
                      {socialLinks?.github && (
                        <Button
                          variant="outlined"
                          startIcon={<GitHubIcon />}
                          href={socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            px: 3,
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 600,
                            textTransform: 'none',
                            borderColor: alpha(theme.palette.divider, 0.3),
                            '&:hover': {
                              borderColor: theme.palette.text.primary,
                              background: alpha(theme.palette.text.primary, 0.05)
                            }
                          }}
                        >
                          GitHub
                        </Button>
                      )}
                      {socialLinks?.linkedin && (
                        <Button
                          variant="contained"
                          startIcon={<LinkedInIcon />}
                          href={socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            px: 3,
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 600,
                            textTransform: 'none',
                            background: '#0A66C2',
                            '&:hover': {
                              background: '#004182'
                            }
                          }}
                        >
                          LinkedIn
                        </Button>
                      )}
                    </Stack> */}
                  </Stack>
                </motion.div>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  sx={{
                    mt: 7.5,
                    p: 3,
                    borderRadius: 3,
                    maxWidth: "900px",
                    mx: "auto",
                    background: isDark
                      ? alpha(theme.palette.background.paper, 0.6)
                      : alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.15)}`
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight={800}
                    gutterBottom
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Say Hello!
                  </Typography>

                  <Typography variant="body1" color="text.secondary" mb={4} maxWidth="600px">
                    I'm quick to respond and always happy to discuss new opportunities, collaborations, or ideas. 
                    Feel free to drop me a message anytime.
                  </Typography>


                  {/* Form */}
                  <Stack spacing={2.8} maxWidth="600px">
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
                        Name
                      </Typography>
                      <TextField fullWidth placeholder="How should I address you" variant="outlined" />
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
                        Email Address
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="your@email.com"
                        variant="outlined"
                        InputProps={{
                          endAdornment: <EmailIcon sx={{ opacity: 0.4, mr: 1 }} />,
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
                        Message
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        minRows={4}
                        placeholder="Let's talk! Type your message..."
                        variant="outlined"
                      />
                    </Box>

                    {/* Buttons */}
                    <Stack direction="row" spacing={2} mt={2} sx={{ justifyContent: "flex-end" }}>
                      <Button
                        variant="outlined"
                        sx={{
                          py: 1.3,
                          px: 4,
                          borderRadius: 2,
                          fontWeight: 600,
                          textTransform: "none",
                        }}
                      >
                        Submit
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </motion.div>
    </section>
  );
};

export default Contact;