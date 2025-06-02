"use client"

import { useState, useEffect } from "react"


import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  CardMedia,
  Chip,
} from "@mui/material"
import {
  Play,
  Rocket,
  PlusCircle,
  School,
  Users,
  BookOpen,
  PlayCircle,
  Mic,
  Folder,
  Tablet,
  Award,
  MessageSquare,
  BarChart3,
  UserPlus,
  Upload,
  Share2,
  PlayIcon,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Star,
  Zap,
  Globe,
  Heart,
} from "lucide-react"
import "./styles.css"
import { Outlet, useNavigate } from "react-router-dom"

// Modern Aristocratic color scheme - more vibrant and lively
declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      main: string
      secondary: string
      accent: string
      light: string
      vibrant: string
      success: string
    }
  }
  interface PaletteOptions {
    custom?: {
      main: string
      secondary: string
      accent: string
      light: string
      vibrant: string
      success: string
    }
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#0f172a", // Rich Dark Navy
      light: "#1e293b",
      dark: "#020617",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f59e0b", // Vibrant Gold
      light: "#fbbf24",
      dark: "#d97706",
      contrastText: "#0f172a",
    },
    background: {
      default: "#fafbfc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },
    custom: {
      main: "#0f172a", // Rich Dark Navy
      secondary: "#f59e0b", // Vibrant Gold
      accent: "#8b5cf6", // Royal Purple
      light: "#f8fafc",
      vibrant: "#06b6d4", // Cyan
      success: "#10b981", // Emerald
    },
  },
  typography: {
    fontFamily: "'Inter', 'Playfair Display', serif",
    h1: {
      fontWeight: 900,
      fontFamily: "'Playfair Display', serif",
    },
    h2: {
      fontWeight: 800,
      fontFamily: "'Playfair Display', serif",
    },
    h3: {
      fontWeight: 700,
      fontFamily: "'Playfair Display', serif",
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "16px",
          fontWeight: 700,
          boxShadow: "none",
          padding: "14px 36px",
          fontSize: "1rem",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(15, 23, 42, 0.08)",
          border: "1px solid rgba(245, 158, 11, 0.1)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          "&:hover": {
            transform: "translateY(-16px) scale(1.02)",
            boxShadow: "0 25px 80px rgba(15, 23, 42, 0.15)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 8px 40px rgba(15, 23, 42, 0.12)",
          backdropFilter: "blur(20px)",
        },
      },
    },
  },
})

export default function HomePage() {
  const navigate = useNavigate();
  const [animatedStats, setAnimatedStats] = useState({ teachers: 0, students: 0, courses: 0, lessons: 0 })
  const DEFAULT_IMAGE_URL = '/Images/img1.jpg';

  // Platform statistics
  const stats = {
    teachers: 150,
    students: 2500,
    courses: 75,
    lessons: 1200,
  }

  // Animate stats on mount
  useEffect(() => {
    const animateValue = (start: number, end: number, duration: number, callback: (value: number) => void) => {
      let startTimestamp: number | null = null
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        callback(Math.floor(progress * (end - start) + start))
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
    }

    setTimeout(() => {
      animateValue(0, stats.teachers, 2000, (value) => setAnimatedStats((prev) => ({ ...prev, teachers: value })))
      animateValue(0, stats.students, 2500, (value) => setAnimatedStats((prev) => ({ ...prev, students: value })))
      animateValue(0, stats.courses, 1800, (value) => setAnimatedStats((prev) => ({ ...prev, courses: value })))
      animateValue(0, stats.lessons, 2200, (value) => setAnimatedStats((prev) => ({ ...prev, lessons: value })))
    }, 1000)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          width: "100%",
          borderBottom: "1px solid rgba(245, 158, 11, 0.1)",
        }}
        className="app-bar"
      >
        <Toolbar sx={{ maxWidth: "1400px", width: "100%", margin: "0 auto", px: { xs: 2, md: 4 } }}>
          <Box sx={{ display: "flex", alignItems: "center", mr: 3 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "16px",
                background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.accent})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
                boxShadow: "0 12px 32px rgba(15, 23, 42, 0.3)",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: "-2px",
                  background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                  borderRadius: "18px",
                  zIndex: -1,
                  opacity: 0.7,
                },
              }}
              className="logo-pulse"
            >
              <Play style={{ color: "white", fontSize: "28px" }} />
            </Box>
            <Box>
              <Typography
                variant="h4"
                className="logo gradient-text"
                sx={{
                  fontWeight: 900,
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.8rem",
                  background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Learnix
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.custom.accent,
                  fontSize: "0.7rem",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  fontWeight: 600,
                  display: "block",
                  lineHeight: 1,
                }}
              >
                Educational Excellence
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="h6"
            className="tagline"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              color: theme.palette.text.secondary,
              display: { xs: "none", md: "block" },
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            "Elevating Education Through Innovation"
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="outlined"
              className="button-glow"
              sx={{
                borderColor: theme.palette.custom.main,
                color: theme.palette.custom.main,
                borderWidth: 2,
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: theme.palette.custom.main,
                  color: "white",
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 32px rgba(15, 23, 42, 0.3)",
                },
              }}
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              className="button-vibrant"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                fontWeight: 700,
                "&:hover": {
                  background: `linear-gradient(135deg, ${theme.palette.custom.vibrant}, ${theme.palette.custom.accent})`,
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 32px rgba(245, 158, 11, 0.4)",
                },
              }}
              onClick={() => navigate("/register")}
            >
              Get Started
            </Button>
          </Box>
        </Toolbar>
      </AppBar> */}

      {/* Hero Section */}
      <Box
        className="hero-section fade-in"
        sx={{
          pt: 16,
          pb: 12,
          background: `linear-gradient(135deg, ${theme.palette.custom.light} 0%, #ffffff 30%, ${theme.palette.custom.secondary}08 70%, ${theme.palette.custom.vibrant}05 100%)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background elements */}
        <Box className="bg-animation" />

        <Container maxWidth="xl">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6} className="slide-in-left">
              <Box sx={{ mb: 4 }}>
                <Chip
                  icon={<Zap style={{ color: theme.palette.custom.secondary }} />}
                  label="🚀  Educational Recording Platform"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.custom.secondary}15, ${theme.palette.custom.vibrant}10)`,
                    color: theme.palette.custom.main,
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    py: 3,
                    px: 2,
                    mb: 4,
                    border: `2px solid ${theme.palette.custom.secondary}30`,
                    boxShadow: "0 8px 24px rgba(245, 158, 11, 0.2)",
                  }}
                  className="chip-glow"
                />
              </Box>

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "3rem", md: "4.5rem", lg: "5.5rem" },
                  fontWeight: 900,
                  mb: 4,
                  lineHeight: 1.1,
                  fontFamily: "'Playfair Display', serif",
                  background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.accent}, ${theme.palette.custom.secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                className="hero-title"
              >
                The Future of{" "}
                <Box
                  component="span"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  className="text-shimmer"
                >
                  Educational
                </Box>{" "}
                Excellence
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.4rem",
                  color: theme.palette.text.secondary,
                  mb: 6,
                  maxWidth: "600px",
                  lineHeight: 1.7,
                  fontWeight: 500,
                }}
              >
                Learnix empowers educators to create, curate, and share premium educational content with unparalleled
                sophistication and cutting-edge technology.
              </Typography>

              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 3, mb: 6 }}>
                <Button
                  variant="contained"
                  size="large"
                  className="hero-cta-primary"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.accent})`,
                    px: 6,
                    py: 2.5,
                    fontSize: "1.2rem",
                    fontWeight: 800,
                    borderRadius: "20px",
                    boxShadow: "0 16px 40px rgba(15, 23, 42, 0.3)",
                    "&:hover": {
                      background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                      transform: "translateY(-4px)",
                      boxShadow: "0 20px 60px rgba(245, 158, 11, 0.4)",
                    },
                  }}
                  onClick={() => navigate("/register")}
                >
                  <Rocket style={{ marginRight: "12px", fontSize: "24px" }} />
                  Begin Your Journey
                </Button>

                {typeof window !== "undefined" && sessionStorage.getItem("role") === "teacher" && (
                  <Button
                    variant="outlined"
                    size="large"
                    className="hero-cta-secondary"
                    sx={{
                      borderColor: theme.palette.custom.secondary,
                      color: theme.palette.custom.secondary,
                      borderWidth: 3,
                      px: 6,
                      py: 2.5,
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      borderRadius: "20px",
                      "&:hover": {
                        backgroundColor: theme.palette.custom.secondary,
                        color: "white",
                        transform: "translateY(-4px)",
                        boxShadow: "0 20px 60px rgba(245, 158, 11, 0.4)",
                      },
                    }}
                    onClick={() => navigate("/add-lesson")}
                  >
                    <PlusCircle style={{ marginRight: "12px", fontSize: "24px" }} />
                    Create Masterpiece
                  </Button>
                )}
              </Box>

              {/* Trust indicators */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Star style={{ color: theme.palette.custom.secondary, fontSize: "20px" }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                    4.9/5 Rating
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Globe style={{ color: theme.palette.custom.vibrant, fontSize: "20px" }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                    50+ Countries
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Heart style={{ color: "#ef4444", fontSize: "20px" }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.secondary }}>
                    99% Satisfaction
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} className="slide-in-right">
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: "32px",
                    overflow: "hidden",
                    boxShadow: "0 40px 100px rgba(15, 23, 42, 0.25)",
                    border: `4px solid transparent`,
                    background: `linear-gradient(135deg, ${theme.palette.custom.secondary}20, ${theme.palette.custom.vibrant}15)`,
                    "&:hover": {
                      transform: "translateY(-20px) rotateY(8deg)",
                      transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    },
                  }}
                  className="hero-image-container"
                >
                  <CardMedia
                    component="img"
                    height="550"
                    image={DEFAULT_IMAGE_URL}
                    alt="Educational Platform"
                    sx={{ width: "100%", objectFit: "cover" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(45deg, ${theme.palette.custom.main}20, ${theme.palette.custom.secondary}15, ${theme.palette.custom.vibrant}10)`,
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                      borderRadius: "50%",
                      width: 100,
                      height: 100,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.4s ease",
                      boxShadow: "0 16px 40px rgba(245, 158, 11, 0.4)",
                      "&:hover": {
                        transform: "translate(-50%, -50%) scale(1.2)",
                        boxShadow: "0 24px 60px rgba(245, 158, 11, 0.6)",
                      },
                    }}
                    className="play-button-pulse"
                  >
                    <PlayIcon style={{ fontSize: "50px", color: "white", marginLeft: "4px" }} />
                  </Box>
                </Box>

                {/* Enhanced floating elements */}
                <Box
                  className="floating-card"
                  sx={{
                    position: "absolute",
                    top: 40,
                    right: -40,
                    background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                    borderRadius: "20px",
                    p: 3,
                    boxShadow: "0 20px 50px rgba(245, 158, 11, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    color: "white",
                    minWidth: "200px",
                  }}
                >
                  <Users style={{ fontSize: "28px" }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1 }}>
                      2,500+
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Active Students
                    </Typography>
                  </Box>
                </Box>

                <Box
                  className="floating-card"
                  sx={{
                    position: "absolute",
                    bottom: 40,
                    left: -40,
                    background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.accent})`,
                    borderRadius: "20px",
                    p: 3,
                    boxShadow: "0 20px 50px rgba(15, 23, 42, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    color: "white",
                    minWidth: "200px",
                  }}
                >
                  <School style={{ fontSize: "28px" }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1 }}>
                      150+
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Expert Teachers
                    </Typography>
                  </Box>
                </Box>

                <Box
                  className="floating-card"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: -60,
                    background: `linear-gradient(135deg, ${theme.palette.custom.success}, ${theme.palette.custom.vibrant})`,
                    borderRadius: "20px",
                    p: 2,
                    boxShadow: "0 20px 50px rgba(16, 185, 129, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "white",
                  }}
                >
                  <Award style={{ fontSize: "24px" }} />
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Premium Quality
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Outlet />
      {/* Statistics Section */}
      <Box
        className="stats-section"
        sx={{
          py: 10,
          background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.accent})`,
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background pattern */}
        <Box className="stats-bg-pattern" />

        <Container maxWidth="xl">
          <Grid container spacing={6} justifyContent="center">
            {[
              {
                icon: <School />,
                value: animatedStats.teachers,
                label: "Expert Educators",
                suffix: "+",
                color: theme.palette.custom.secondary,
                bgColor: `${theme.palette.custom.secondary}20`,
              },
              {
                icon: <Users />,
                value: animatedStats.students,
                label: "Active Students",
                suffix: "+",
                color: theme.palette.custom.vibrant,
                bgColor: `${theme.palette.custom.vibrant}20`,
              },
              {
                icon: <BookOpen />,
                value: animatedStats.courses,
                label: "Premium Courses",
                suffix: "+",
                color: theme.palette.custom.success,
                bgColor: `${theme.palette.custom.success}20`,
              },
              {
                icon: <PlayCircle />,
                value: animatedStats.lessons,
                label: "Video Lessons",
                suffix: "+",
                color: "#ef4444",
                bgColor: "#ef444420",
              },
            ].map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box
                  className="stat-item"
                  sx={{
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      background: stat.bgColor,
                      mb: 3,
                      boxShadow: `0 16px 40px ${stat.color}30`,
                      border: `3px solid ${stat.color}40`,
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: "-3px",
                        background: `linear-gradient(135deg, ${stat.color}, ${stat.color}80)`,
                        borderRadius: "50%",
                        zIndex: -1,
                        opacity: 0.3,
                      },
                    }}
                    className="stat-icon-pulse"
                  >
                    <Box sx={{ fontSize: "40px", color: stat.color }}>{stat.icon}</Box>
                  </Box>
                  <Typography
                    variant="h2"
                    className="counter"
                    sx={{
                      fontWeight: 900,
                      mb: 1,
                      color: "white",
                      fontFamily: "'Playfair Display', serif",
                      fontSize: { xs: "2.5rem", md: "3rem" },
                      textShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    }}
                  >
                    {stat.value.toLocaleString()}
                    {stat.suffix}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      opacity: 0.9,
                      fontWeight: 600,
                      fontSize: "1.1rem",
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box className="section fade-in-up" sx={{ py: 12 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Chip
              label="✨ POWERFUL FEATURES"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.custom.secondary}15, ${theme.palette.custom.vibrant}10)`,
                color: theme.palette.custom.main,
                fontWeight: 700,
                fontSize: "0.9rem",
                mb: 3,
                px: 3,
                py: 1,
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "3rem", md: "4rem" },
                fontWeight: 900,
                mb: 3,
                color: theme.palette.custom.main,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Everything You Need for{" "}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Educational Excellence
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: "800px",
                mx: "auto",
                fontSize: "1.3rem",
                lineHeight: 1.7,
                fontWeight: 500,
              }}
            >
              Our platform provides cutting-edge tools designed for the most discerning educators and institutions.
            </Typography>
          </Box>

          <Grid container spacing={6}>
            {[
              {
                icon: <Mic />,
                title: "Crystal Clear Recording",
                description:
                  "Professional-grade recording with AI-powered noise cancellation and crystal-clear audio quality.",
                gradient: `linear-gradient(135deg, ${theme.palette.custom.secondary}15, ${theme.palette.custom.vibrant}10)`,
                iconColor: theme.palette.custom.secondary,
              },
              {
                icon: <Folder />,
                title: "Smart Organization",
                description:
                  "AI-powered content categorization that adapts to your teaching style and curriculum needs.",
                gradient: `linear-gradient(135deg, ${theme.palette.custom.vibrant}15, ${theme.palette.custom.accent}10)`,
                iconColor: theme.palette.custom.vibrant,
              },
              {
                icon: <Tablet />,
                title: "Universal Access",
                description:
                  "Seamless cross-platform experience with offline capabilities and real-time synchronization.",
                gradient: `linear-gradient(135deg, ${theme.palette.custom.accent}15, ${theme.palette.custom.success}10)`,
                iconColor: theme.palette.custom.accent,
              },
              {
                icon: <Award />,
                title: "Premium Quality",
                description: "4K video support with adaptive streaming and automatic quality optimization.",
                gradient: `linear-gradient(135deg, ${theme.palette.custom.success}15, #ef444415)`,
                iconColor: theme.palette.custom.success,
              },
              {
                icon: <MessageSquare />,
                title: "Interactive Learning",
                description: "Real-time Q&A, live polls, and collaborative features for enhanced engagement.",
                gradient: `linear-gradient(135deg, #ef444415, ${theme.palette.custom.secondary}10)`,
                iconColor: "#ef4444",
              },
              {
                icon: <BarChart3 />,
                title: "Advanced Analytics",
                description: "Comprehensive insights with AI-powered recommendations and performance tracking.",
                gradient: `linear-gradient(135deg, ${theme.palette.custom.main}15, ${theme.palette.custom.vibrant}10)`,
                iconColor: theme.palette.custom.main,
              },
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  className="feature-card-modern"
                  sx={{
                    height: "100%",
                    background: feature.gradient,
                    border: `2px solid ${feature.iconColor}20`,
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: `linear-gradient(90deg, ${feature.iconColor}, ${feature.iconColor}80)`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 6, textAlign: "center" }}>
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "28px",
                        background: `linear-gradient(135deg, ${feature.iconColor}20, ${feature.iconColor}10)`,
                        border: `3px solid ${feature.iconColor}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 4,
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          inset: "-3px",
                          background: `linear-gradient(135deg, ${feature.iconColor}, ${feature.iconColor}60)`,
                          borderRadius: "31px",
                          zIndex: -1,
                          opacity: 0.1,
                        },
                      }}
                      className="feature-icon-hover"
                    >
                      <Box sx={{ color: feature.iconColor, fontSize: "44px" }}>{feature.icon}</Box>
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 3,
                        color: theme.palette.custom.main,
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.4rem",
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.7,
                        fontSize: "1.05rem",
                        fontWeight: 500,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box
        className="section fade-in-up"
        sx={{
          py: 12,
          background: `linear-gradient(135deg, ${theme.palette.custom.light} 0%, #ffffff 30%, ${theme.palette.custom.secondary}05 70%, ${theme.palette.custom.vibrant}03 100%)`,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Chip
              label="🎯 SIMPLE PROCESS"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.custom.main}15, ${theme.palette.custom.accent}10)`,
                color: theme.palette.custom.main,
                fontWeight: 700,
                fontSize: "0.9rem",
                mb: 3,
                px: 3,
                py: 1,
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "3rem", md: "4rem" },
                fontWeight: 900,
                mb: 3,
                color: theme.palette.custom.main,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Simple Process,{" "}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Powerful Results
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: "800px",
                mx: "auto",
                fontSize: "1.3rem",
                lineHeight: 1.7,
                fontWeight: 500,
              }}
            >
              Transform your educational content creation with our streamlined three-step process.
            </Typography>
          </Box>

          <Grid container spacing={6} justifyContent="center">
            {[
              {
                step: "01",
                icon: <UserPlus />,
                title: "Join the Elite",
                description:
                  "Create your account and join our exclusive community of distinguished educators and learners.",
                color: theme.palette.custom.secondary,
              },
              {
                step: "02",
                icon: <Upload />,
                title: "Create & Upload",
                description:
                  "Use our advanced tools to record or upload your educational content with professional quality.",
                color: theme.palette.custom.vibrant,
              },
              {
                step: "03",
                icon: <Share2 />,
                title: "Share & Impact",
                description:
                  "Distribute your knowledge globally and track your educational impact with detailed analytics.",
                color: theme.palette.custom.accent,
              },
            ].map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  className="step-card-modern"
                  sx={{
                    height: "100%",
                    position: "relative",
                    textAlign: "center",
                    pt: 12, // Increased padding to make space for the step number
                    background: `linear-gradient(135deg, ${step.color}08, ${step.color}05)`,
                    border: `2px solid ${step.color}20`,
                    overflow: "visible", // Ensure overflow is visible
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: `linear-gradient(90deg, ${step.color}, ${step.color}80)`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: -48, // Move the step number higher so it's fully visible
                      left: "calc(50% - 40px)",
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${step.color}, ${step.color}80)`,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: "1.8rem",
                      boxShadow: `0 16px 40px ${step.color}40`,
                      fontFamily: "'Playfair Display', serif",
                      border: "6px solid white",
                      zIndex: 2, // Ensure the step number is above the card
                    }}
                    className="step-number-pulse"
                  >
                    {step.step}
                  </Box>
                  <CardContent sx={{ p: 6 }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${step.color}15, ${step.color}25)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 4,
                        border: `3px solid ${step.color}30`,
                      }}
                    >
                      <Box sx={{ color: step.color, fontSize: "36px" }}>{step.icon}</Box>
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 3,
                        color: theme.palette.custom.main,
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.5rem",
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.7,
                        fontSize: "1.05rem",
                        fontWeight: 500,
                      }}
                    >
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box className="section fade-in-up" sx={{ py: 12 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Chip
              label="💬 SUCCESS STORIES"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.custom.success}15, ${theme.palette.custom.vibrant}10)`,
                color: theme.palette.custom.main,
                fontWeight: 700,
                fontSize: "0.9rem",
                mb: 3,
                px: 3,
                py: 1,
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "3rem", md: "4rem" },
                fontWeight: 900,
                mb: 3,
                color: theme.palette.custom.main,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              What Our{" "}
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Community
              </Box>{" "}
              Says
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: "800px",
                mx: "auto",
                fontSize: "1.3rem",
                lineHeight: 1.7,
                fontWeight: 500,
              }}
            >
              Hear from educators and students who have transformed their learning experience.
            </Typography>
          </Box>

          <Grid container spacing={6} justifyContent="center">
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "Mathematics Professor",
                avatar: "SJ",
                testimonial:
                  "Learnix has revolutionized my teaching methodology. The AI-powered analytics help me understand exactly where my students need more support, and the recording quality is absolutely pristine.",
                rating: 5,
                avatarColor: theme.palette.custom.secondary,
                school: "Stanford University",
                verified: true,
              },
              {
                name: "Michael Chen",
                role: "Computer Science Student",
                avatar: "MC",
                testimonial:
                  "The interactive features and ability to replay complex concepts at my own pace has been a game-changer. The Q&A system is incredibly intuitive and helps me learn more effectively.",
                rating: 5,
                avatarColor: theme.palette.custom.vibrant,
                school: "MIT",
                verified: true,
              },
              {
                name: "Prof. Emily Rodriguez",
                role: "Physics Department Head",
                avatar: "ER",
                testimonial:
                  "The platform's sophisticated analytics and content organization tools have streamlined our entire department's approach to digital education. Absolutely remarkable technology.",
                rating: 5,
                avatarColor: theme.palette.custom.accent,
                school: "Harvard University",
                verified: true,
              },
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  className="testimonial-card-modern"
                  sx={{
                    height: "100%",
                    background: `linear-gradient(135deg, ${testimonial.avatarColor}08, ${testimonial.avatarColor}05)`,
                    border: `2px solid ${testimonial.avatarColor}20`,
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: `linear-gradient(90deg, ${testimonial.avatarColor}, ${testimonial.avatarColor}80)`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 6 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          sx={{
                            bgcolor: testimonial.avatarColor,
                            mr: 3,
                            width: 60,
                            height: 60,
                            fontSize: "1.5rem",
                            fontWeight: 800,
                            border: "3px solid white",
                            boxShadow: `0 8px 24px ${testimonial.avatarColor}40`,
                          }}
                        >
                          {testimonial.avatar}
                        </Avatar>
                        <Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                color: theme.palette.custom.main,
                                fontFamily: "'Playfair Display', serif",
                              }}
                            >
                              {testimonial.name}
                            </Typography>
                            {testimonial.verified && (
                              <Box
                                sx={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: "50%",
                                  background: theme.palette.custom.success,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Typography sx={{ color: "white", fontSize: "12px", fontWeight: 800 }}>✓</Typography>
                              </Box>
                            )}
                          </Box>
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
                            {testimonial.role}
                          </Typography>
                          <Typography variant="caption" sx={{ color: testimonial.avatarColor, fontWeight: 700 }}>
                            {testimonial.school}
                          </Typography>
                        </Box>
                      </Box>
                      <Rating
                        value={testimonial.rating}
                        readOnly
                        precision={0.5}
                        sx={{
                          color: theme.palette.custom.secondary,
                          "& .MuiRating-iconFilled": {
                            color: theme.palette.custom.secondary,
                          },
                        }}
                      />
                    </Box>
                    {/* <Typography
                      variant="body1"
                      sx={{
                        fontStyle: "italic",
                        color: theme.palette.text.secondary,
                        lineHeight: 1.7,
                        position: "relative",
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        pl: 3,
                        "&::before": {
                          content: '"',
                          position: "absolute",
                          left: 0,
                          top: -10,
                          fontSize: "3rem",
                          color: testimonial.avatarColor,
                          fontFamily: "'Playfair Display', serif",
                          opacity: 0.7,
                        },
                      }}
                    >
                      {testimonial.testimonial}
                    </Typography> */}
                    <Typography
                      variant="body1"
                      sx={{
                        fontStyle: "italic",
                        color: theme.palette.text.secondary,
                        lineHeight: 1.7,
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        pl: 0,
                      }}
                    >
                      “{testimonial.testimonial}”
                    </Typography>

                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          py: 12,
          background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.accent})`,
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background */}
        <Box className="cta-bg-animation" />

        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  mb: 3,
                  fontFamily: "'Playfair Display', serif",
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                }}
              >
                Ready to Transform Your{" "}
                <Box
                  component="span"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Educational Journey?
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mb: 4, fontSize: "1.3rem", fontWeight: 500 }}>
                Join thousands of educators and students already using Learnix to revolutionize their learning
                experience.
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Star style={{ color: theme.palette.custom.secondary, fontSize: "24px" }} />
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    4.9/5 Rating
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Users style={{ color: theme.palette.custom.vibrant, fontSize: "24px" }} />
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    2,500+ Users
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Award style={{ color: theme.palette.custom.success, fontSize: "24px" }} />
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    Award Winning
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
              <Button
                variant="contained"
                size="large"
                className="cta-button-glow"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                  color: "white",
                  px: 6,
                  py: 2.5,
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  borderRadius: "20px",
                  boxShadow: "0 16px 40px rgba(245, 158, 11, 0.4)",
                  "&:hover": {
                    background: `linear-gradient(135deg, ${theme.palette.custom.vibrant}, ${theme.palette.custom.secondary})`,
                    transform: "translateY(-4px)",
                    boxShadow: "0 20px 60px rgba(245, 158, 11, 0.6)",
                  },
                }}
                onClick={() => navigate("/register")}
              >
                <Rocket style={{ marginRight: "12px", fontSize: "28px" }} />
                Start Your Journey
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 12, backgroundColor: theme.palette.custom.main, color: "white" }}>
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "16px",
                    background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 3,
                    boxShadow: "0 12px 32px rgba(245, 158, 11, 0.3)",
                  }}
                >
                  <Play style={{ color: "white", fontSize: "28px" }} />
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 900,
                      fontFamily: "'Playfair Display', serif",
                      background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Learnix
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.custom.secondary,
                      fontSize: "0.7rem",
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    Educational Excellence
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1" sx={{ opacity: 0.8, mb: 4, lineHeight: 1.7, fontSize: "1.1rem" }}>
                Transforming education through innovative recording technology and aristocratic design principles.
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                {[
                  { icon: <Facebook />, name: "facebook", color: "#1877f2" },
                  { icon: <Twitter />, name: "twitter", color: "#1da1f2" },
                  { icon: <Linkedin />, name: "linkedin", color: "#0077b5" },
                  { icon: <Instagram />, name: "instagram", color: "#e4405f" },
                ].map((social) => (
                  <Box
                    key={social.name}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${social.color}20, ${social.color}10)`,
                      border: `2px solid ${social.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: social.color,
                        transform: "translateY(-4px)",
                        boxShadow: `0 12px 32px ${social.color}40`,
                      },
                    }}
                  >
                    {social.icon}
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  color: theme.palette.custom.secondary,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Platform
              </Typography>
              {["Features", "How It Works", "Pricing", "FAQ"].map((item) => (
                <Typography
                  key={item}
                  variant="body1"
                  sx={{
                    opacity: 0.8,
                    mb: 2,
                    cursor: "pointer",
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      opacity: 1,
                      color: theme.palette.custom.secondary,
                      transform: "translateX(8px)",
                    },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  color: theme.palette.custom.secondary,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Company
              </Typography>
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <Typography
                  key={item}
                  variant="body1"
                  sx={{
                    opacity: 0.8,
                    mb: 2,
                    cursor: "pointer",
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      opacity: 1,
                      color: theme.palette.custom.secondary,
                      transform: "translateX(8px)",
                    },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  color: theme.palette.custom.secondary,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Get In Touch
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${theme.palette.custom.secondary}20, ${theme.palette.custom.vibrant}10)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 3,
                  }}
                >
                  <Mail style={{ color: theme.palette.custom.secondary, fontSize: "20px" }} />
                </Box>
                <Typography variant="body1" sx={{ opacity: 0.8, fontWeight: 500 }}>
                  support@recordwise.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${theme.palette.custom.vibrant}20, ${theme.palette.custom.accent}10)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 3,
                  }}
                >
                  <Phone style={{ color: theme.palette.custom.vibrant, fontSize: "20px" }} />
                </Box>
                <Typography variant="body1" sx={{ opacity: 0.8, fontWeight: 500 }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${theme.palette.custom.accent}20, ${theme.palette.custom.success}10)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 3,
                  }}
                >
                  <MapPin style={{ color: theme.palette.custom.accent, fontSize: "20px" }} />
                </Box>
                <Typography variant="body1" sx={{ opacity: 0.8, fontWeight: 500 }}>
                  123 Innovation Drive, Tech Valley
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 8, pt: 6, borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
            <Typography variant="body1" sx={{ opacity: 0.7, fontSize: "1.1rem" }}>
              © {new Date().getFullYear()} Learnix. All rights reserved. Crafted with ❤️ for educators worldwide.
            </Typography>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}
