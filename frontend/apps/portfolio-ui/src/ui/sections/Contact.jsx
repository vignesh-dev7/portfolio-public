import React, { useState } from "react";
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
  TextField,
  CircularProgress
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
import { useForm } from "react-hook-form";
import { sendContactMail } from '@libs/api';
import { useAppContext } from "@common-ui/app-provider";

const Contact = ({ contact, socialLinks }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState(false);
  const { isSmallScreen } = useAppContext();

  // Hardcoded additional info
  const additionalInfo = {
    availability: {
      status: "Open to SDE / Full-Stack roles",
      responseTime: "Usually responds within 24 hours"
    },
    timezone: "IST (GMT+5:30)",
    bestTime: "Mon-Fri, 9 AM - 6 PM IST"
  };


  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMsg("");
    try {
      const res = await sendContactMail(data);
      if (res.success) {
        setError(false);
        setSuccessMsg("Thanks! I received your message — I’ll get back to you soon.");
        reset();
      }
    } catch (err) {
      console.error(err);
      setError(true);
      setSuccessMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
        // Changed amount to 0.1 and added margin to trigger earlier on mobile
        viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }} 
      >
        {/* CHANGED: Main Container Constraints & Overflow handling */}
        <Box sx={{ maxWidth: "xl", mx: "auto", width: "95%", px: { xs: 2, sm: 3, md: 4 }, overflowY: "hidden" }}>
          
          {/* CHANGED: Removed fixed width and added center alignment */}
          <Grid container spacing={4} alignItems="flex-start" justifyContent="center" sx={{ ...isSmallScreen && {width: "100vw"}}}>
            <Grid item xs={12}>
              {/* Section Header */}
              <motion.div variants={itemVariants}>
                {/* CHANGED: Centered header on mobile */}
                <Stack direction="row" spacing={2} alignItems="center" mb={4} justifyContent="flex-start">
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      background: theme.palette.mode === "light" ? "linear-gradient(135deg, #1A73E8 0%, #6A4FE7 100%)" : "linear-gradient(135deg, #2962FF 0%, #7C4DFF 100%)",
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
              {/* CHANGED: justifyContent="center" */}
              <Grid container spacing={4} alignItems="stretch" justifyContent="center">
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
                          width: 'fit-content',
                          // CHANGED: Center on mobile if desired, or keep left
                          mx: { xs: "auto", lg: 0 } 
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
                            <Box flex={1} minWidth={0}> {/* Prevent flex overflow */}
                              <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                                Email
                              </Typography>
                              <Link
                                href={`mailto:${contact.email}`}
                                underline="hover"
                                sx={{
                                  color: isDark ? theme.palette.text.primary : theme.palette.text.primary,
                                  fontWeight: 600,
                                  fontSize: { xs: '0.9rem', sm: '1rem' }, // responsive font size
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
                            <Box flex={1} minWidth={0}>
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
                            <Box flex={1} minWidth={0}>
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


                      {/* Work Preferences Card */}
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

                          <Box flex={1} minWidth={0}>
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
                      mt: 0,
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
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      <Stack spacing={2.8} maxWidth="600px">


                        {/* Name */}
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
                            Name
                          </Typography>


                          <TextField
                            fullWidth
                            placeholder="How should I address you"
                            variant="outlined"
                            error={!!errors.name}
                            disabled={loading}
                            helperText={errors.name?.message}
                            {...register("name", {
                              required: "Name is required",
                              minLength: {
                                value: 2,
                                message: "Name must be at least 2 characters",
                              },
                            })}
                          />
                        </Box>


                        {/* Email */}
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
                            Email Address
                          </Typography>


                          <TextField
                            fullWidth
                            placeholder="your@email.com"
                            variant="outlined"
                            disabled={loading}
                            InputProps={{
                              endAdornment: <EmailIcon sx={{ opacity: 0.4, mr: 1 }} />,
                            }}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address",
                              },
                            })}
                          />
                        </Box>


                        {/* Message */}
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
                            Message
                          </Typography>


                          <TextField
                            fullWidth
                            multiline
                            minRows={4}
                            disabled={loading}
                            placeholder="Let's talk! Type your message..."
                            variant="outlined"
                            error={!!errors.message}
                            helperText={errors.message?.message}
                            {...register("message", {
                              required: "Message is required",
                              minLength: {
                                value: 10,
                                message: "Message must be at least 10 characters",
                              },
                            })}
                          />
                        </Box>


                        {/* Buttons */}
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={2}
                          mt={2}
                          sx={{ justifyContent: "flex-end" }}
                        >
                          {successMsg && (
                            <Typography 
                              sx={{ 
                                color: error ? "error.main" : "success.main", 
                                fontWeight: 600,
                                fontSize: "0.9rem"
                              }}
                            >
                              {successMsg}
                            </Typography>
                          )}


                          <Button
                            type="submit"
                            variant="outlined"
                            disabled={loading}
                            sx={{
                              py: 1.3,
                              px: 4,
                              borderRadius: 2,
                              fontWeight: 600,
                              textTransform: "none",
                              opacity: loading ? 0.6 : 1,
                            }}
                          >
                            {loading ? <CircularProgress size={22} /> : "Submit"}
                          </Button>
                        </Stack>
                      </Stack>
                    </form>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </section>
  );
};


export default Contact;