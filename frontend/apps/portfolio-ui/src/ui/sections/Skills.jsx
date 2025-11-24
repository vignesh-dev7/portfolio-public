import React, { useState, useMemo, useId  } from "react";
import { 
  Typography, 
  Box, 
  Stack,
  Chip,
  useTheme,
  Grid,
  alpha
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { motion } from "framer-motion";
import { getSkillIcon } from "../../util/skillIcons.js";

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

const Skills = ({ skills }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [selectedCategories, setSelectedCategories] = useState([ 'frontend', 'backend', 'devops', 'other' ]);

  const getLevelInfo = (level) => {
    const levels = {
      Expert: { color: theme.palette.success.main, size: 140, label: 'Expert', borderWidth: 1 },
      Advanced: { color: theme.palette.info.main, size: 140, label: 'Advanced', borderWidth: 1 },
      Intermediate: { color: theme.palette.warning.main, size: 140, label: 'Intermediate', borderWidth: 1 },
      Beginner: { color: theme.palette.error.main, size: 140, label: 'Beginner', borderWidth: 1 }
    };
    return levels[level] || levels.Intermediate;
  };

  const getCategoryInfo = (categoryId) => {
    const categories = {
      frontend: { color: theme.palette.primary.main, label: 'Frontend', count: skills?.frontend?.length || 0 },
      backend: { color: theme.palette.secondary.main, label: 'Backend', count: skills?.backend?.length || 0 },
      devops: { color: theme.palette.success.main, label: 'DevOps & Cloud', count: skills?.devops?.length || 0 },
      other: { color: theme.palette.info.main, label: 'Other Skills', count: skills?.other?.length || 0 }
    };
    return categories[categoryId] || { color: theme.palette.info.main, label: 'Other', count: 0 };
  };

  const getCategoryColor = (skillName) => {
    if (!skillName) return theme.palette.info.main;
    if (skills?.frontend?.some(s => s.name === skillName)) return theme.palette.primary.main;
    if (skills?.backend?.some(s => s.name === skillName)) return theme.palette.secondary.main;
    if (skills?.devops?.some(s => s.name === skillName)) return theme.palette.success.main;
    return theme.palette.info.main;
  };

  const toggleCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter(c => c !== categoryId));
      }
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  // ------------------------------------------------------------
  // Filtered Skills (Memoized)
  // ------------------------------------------------------------
  const filteredSkills = useMemo(() => {
    if (!skills) return [];
    let all = [];
    selectedCategories.forEach(cat => {
      const data = skills?.[cat];
      if (data) all = [...all, ...data.map(s => ({ ...s, category: cat }))];
    });
    return all;
  }, [skills, selectedCategories]);

  //console.log(`filteredSkills: ${JSON.stringify(filteredSkills, null, 2)}`);
  
  // ------------------------------------------------------------
  // Hexagon Component
  // ------------------------------------------------------------
  const HexagonBadge = ({ skill }) => {
    const level = getLevelInfo(skill?.level);
    const color = getCategoryColor(skill?.name);
    const icon = getSkillIcon(skill?.name);

    const [isHovered, setIsHovered] = useState(false);
    const uniqueId = useId();
    const gradientId = `grad-${skill._id}-${uniqueId}`;
  
    //console.log(`skill: ${JSON.stringify(skill, null, 2)}`);
    return (
        <Box
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            width: level.size,
            height: level.size,
            position: "relative",
            cursor: "info",
            transition: "0.3s",
            transform: isHovered ? "scale(1.20)" : "scale(1)",
            filter: isHovered ? `drop-shadow(0 0 5px ${color}88)` : "none",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "16px",
              background: isHovered
                ? `radial-gradient(circle, ${level.color}33, transparent 70%)`
                : "transparent",
              filter: "blur(10px)",
              opacity: isHovered ? 1 : 0,
              transition: "0.3s"
            }
          }}
        > 
          {isHovered && (
            <Box
              sx={{
                position: "absolute",
                top: "-40px",
                left: "50%",
                transform: "translateX(-50%)",
                bgcolor: "rgba(30, 30, 30, 0.95)",
                color: "#fff",
                px: 1.5,
                py: 1,
                borderRadius: "4px",
                fontSize: "0.75rem",
                fontWeight: 600,
                whiteSpace: "nowrap",
                zIndex: 20,
                border: `2px solid ${level.color}`,
                pointerEvents: "none",
              }}
            >
              {skill?.name} - {level?.label}

              {/* Tooltip arrow */}
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderTop: `8px solid ${level.color}`,
                }}
              />
            </Box>
        )}

          <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.25 }} />
                <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.25 }} />
              </linearGradient>
            </defs>

            <polygon
              points="50 3, 95 25, 95 75, 50 97, 5 75, 5 25"
              fill={`url(#${gradientId})`}
              stroke={color}
              strokeWidth={level.borderWidth}
            />
          </svg>

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {icon && (
              <img
                src={icon}
                alt={skill?.name}
                style=
                {{ 
                  width: 25, 
                  height: 25, 
                  marginBottom: 4,
                  filter: isDark
                  ? "brightness(1.7) drop-shadow(0 0 0.5px rgba(255,255,255,0.5))"
                  : "none"
                }}
              />
            )}

            <Typography variant="caption" fontWeight={700}>
              {skill?.name}
            </Typography>

            <Typography 
              variant="caption" 
              sx={{ 
                color: alpha(isDark ? theme.palette.text.secondary : theme.palette.text.primary, 0.7),
                fontSize: '0.6rem',
                lineHeight: 1,
                mb: 0.5,
                fontStyle: 'italic',
                fontWeight: 500,
                opacity: 0.9
              }}
            >
              v{skill?.version}
            </Typography>

            <Chip
              label={level.label}
              size="small"
              sx={{
                mt: 0.2,
                bgcolor: alpha(level.color, 0.15),
                color: level.color,
                "& .MuiChip-label": {
                  fontSize: "0.70rem",
                  fontWeight: 500
                }
              }}
            />
          </Box>
        </Box>
    );
  };


  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  if (!skills || Object.keys(skills).length === 0) {
    return (
      <section>
        <Stack direction="row" spacing={2} alignItems="center" mb={4}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.15)
            }}
          >
            <StarIcon sx={{ color: theme.palette.primary.main, fontSize: 32 }} />
          </Box>
          <Box>
            <Typography variant="h4" fontWeight={700}>
              Skills & Expertise
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No skills data available
            </Typography>
          </Box>
        </Stack>
      </section>
    );
  }

  return (
    <section>
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible">
        {/* Category Badges */}
        <Grid container spacing={4} sx={{ width: '95%' }}>
          <Grid item xs={12}>
            <motion.div  initial="hidden" animate="visible" variants={itemVariants}>
              <Stack direction="row" spacing={1.5} flexWrap="wrap" justifyContent="center" mb={4}>
                {["frontend", "backend", "devops", "other"].map((cat) => {
                  const info = getCategoryInfo(cat);
                  if (info.count === 0) return null;
                  const selected = selectedCategories.includes(cat);
                  const IconSrc = getSkillIcon(cat); // returns SVG URL
                  return (
                    <>
                      <Chip
                        key={cat}
                        icon={
                          <img
                            src={IconSrc}
                            alt={cat}
                            style=
                              {{ width: 20, height: 20,
                                filter: isDark
                                  ? "brightness(1.7) drop-shadow(0 0 1px rgba(255,255,255,0.4))"
                                  : "none"
                              }}
                          />
                        }
                        label={`${info.label} (${info.count})`}
                        onClick={() => toggleCategory(cat)}
                        sx={{
                          px: 2,
                          py: 2,
                          fontWeight: 600,
                          bgcolor: selected ? alpha(info.color, 0.2) : alpha(theme.palette.action.hover, 0.05),
                          color: selected ? info.color : theme.palette.text.secondary,
                          border: selected ? `2px solid ${info.color}` : "2px solid transparent",
                          cursor: "pointer",
                          "& .MuiChip-icon": {
                            
                          },
                        }}
                      />
                    </>
                    
                  );
                })}
              </Stack>
            </motion.div>

            {/* Hexagon Grid (Corrected & Stable) */}
            <Grid container spacing={3} justifyContent="center" alignItems="center">
              {filteredSkills?.length > 0 ? (
                filteredSkills.map((skill) => (
                  <Grid key={skill._id} item xs="auto">
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <HexagonBadge skill={skill} />
                    </motion.div>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography>No skills found</Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>

      </motion.div>
    </section>
  );
};

export default Skills;
