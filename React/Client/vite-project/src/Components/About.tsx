"use client"

import { Box, Container, Typography, Card, Grid } from "@mui/material"
import {
    GraduationCap,
    Users,
    BookOpen,
    Award,
    Heart,
    Globe,
    Target,
    Lightbulb,
    Shield
} from "lucide-react"
import { useTheme } from "@mui/material/styles"

const features = [
    {
        icon: <BookOpen size={32} />,
        title: "Free Courses",
        description: "Access thousands of high-quality courses across various subjects, completely free of charge.",
        color: "#4F46E5",
    },
    {
        icon: <Users size={32} />,
        title: "Community Learning",
        description: "Join a vibrant community of learners and educators from around the world.",
        color: "#7C3AED",
    },
    {
        icon: <Award size={32} />,
        title: "Certificates",
        description: "Earn certificates upon course completion to showcase your new skills and knowledge.",
        color: "#F59E0B",
    },
    {
        icon: <Target size={32} />,
        title: "Personalized Learning",
        description: "Adaptive learning paths tailored to your pace and learning style.",
        color: "#10B981",
    },
]

const values = [
    {
        icon: <Globe size={40} />,
        title: "Accessibility",
        description: "Education should be available to everyone, everywhere, at no cost.",
    },
    {
        icon: <Lightbulb size={40} />,
        title: "Innovation",
        description: "We continuously improve our platform with cutting-edge technology.",
    },
    {
        icon: <Users size={40} />,
        title: "Community",
        description: "Learning is better together. We foster collaboration and support.",
    },
    {
        icon: <Shield size={40} />,
        title: "Quality",
        description: "We maintain the highest standards in educational content and delivery.",
    },
]



const milestones = [
    {
        year: "2021",
        title: "Foundation",
        description: "Learnix was founded with a vision to democratize education worldwide.",
        icon: <Lightbulb size={24} />,
    },
    {
        year: "2022",
        title: "First 1000 Students",
        description: "Reached our first milestone of 1000 active learners across 20 countries.",
        icon: <Users size={24} />,
    },
    {
        year: "2023",
        title: "100 Courses",
        description: "Expanded our catalog to include 100+ comprehensive courses.",
        icon: <BookOpen size={24} />,
    },
    {
        year: "2024",
        title: "Global Recognition",
        description: "Received international recognition for educational innovation.",
        icon: <Award size={24} />,
    },
    {
        year: "2025",
        title: "50K+ Community",
        description: "Built a thriving community of over 50,000 learners worldwide.",
        icon: <Globe size={24} />,
    },
]

export default function AboutPage() {
    const theme = useTheme()

    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "#fafafa", pt: 12 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.secondary})`,
                    color: "white",
                    py: 12,
                    mb: 10,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Decorative Elements */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "10%",
                        right: "15%",
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.1)",
                        animation: "float 8s ease-in-out infinite",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "20%",
                        left: "10%",
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.08)",
                        animation: "float 6s ease-in-out infinite reverse",
                    }}
                />

                <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                    <Box sx={{ textAlign: "center", maxWidth: "900px", mx: "auto" }}>
                        <GraduationCap size={80} style={{ marginBottom: "32px" }} />
                        <Typography
                            variant="h1"
                            sx={{
                                fontWeight: 900,
                                fontSize: { xs: "2.5rem", md: "4.5rem" },
                                mb: 4,
                                background: "linear-gradient(45deg, #ffffff, #f0f0f0)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            About Learnix
                        </Typography>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 400,
                                opacity: 0.9,
                                lineHeight: 1.6,
                                mb: 2,
                            }}
                        >
                            Democratizing Education for Everyone
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 300,
                                opacity: 0.8,
                                lineHeight: 1.6,
                            }}
                        >
                            Free, high-quality online learning experiences that break down barriers and unlock potential worldwide.
                        </Typography>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg">
                {/* Mission Section */}
                <Box sx={{ mb: 12 }}>
                    <Grid container spacing={8} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    p: 6,
                                    borderRadius: "24px",
                                    background: `linear-gradient(135deg, ${theme.palette.custom.secondary}15, ${theme.palette.custom.vibrant}15)`,
                                    border: `1px solid ${theme.palette.custom.accent}20`,
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <Heart size={48} color={theme.palette.custom.main} style={{ marginBottom: "24px" }} />
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 3,
                                        color: theme.palette.custom.main,
                                    }}
                                >
                                    Our Mission
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        lineHeight: 1.7,
                                        color: "text.secondary",
                                        fontWeight: 400,
                                    }}
                                >
                                    At Learnix, we believe that quality education should be accessible to everyone, regardless of their
                                    financial situation or geographical location. We're breaking down barriers and creating opportunities
                                    for learners worldwide.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 700,
                                    mb: 4,
                                    color: theme.palette.custom.main,
                                }}
                            >
                                Why We Exist
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: "1.2rem",
                                    lineHeight: 1.8,
                                    color: "text.secondary",
                                    mb: 4,
                                }}
                            >
                                Education is the most powerful tool for changing the world. Yet millions of people lack access to
                                quality learning opportunities due to financial constraints, geographic limitations, or other barriers.
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: "1.2rem",
                                    lineHeight: 1.8,
                                    color: "text.secondary",
                                    mb: 4,
                                }}
                            >
                                Learnix was created to change this reality. We provide completely free courses and lessons across
                                diverse subjects, empowering learners to achieve their goals and unlock their potential through
                                knowledge.
                            </Typography>
                            <Box
                                sx={{
                                    p: 3,
                                    borderRadius: "16px",
                                    background: `linear-gradient(135deg, ${theme.palette.custom.main}10, ${theme.palette.custom.secondary}10)`,
                                    border: `2px solid ${theme.palette.custom.accent}30`,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        color: theme.palette.custom.main,
                                        fontStyle: "italic",
                                    }}
                                >
                                    "Knowledge belongs to everyone. Our mission is to make sure it reaches everyone."
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/* Stats Section */}
                {/* <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.custom.secondary}08, ${theme.palette.custom.vibrant}08)`,
            borderRadius: "32px",
            p: 8,
            mb: 12,
            border: `1px solid ${theme.palette.custom.accent}20`,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              mb: 8,
              color: theme.palette.custom.main,
            }}
          >
            Our Impact in Numbers
          </Typography>
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Card
                  sx={{
                    textAlign: "center",
                    p: 4,
                    borderRadius: "20px",
                    boxShadow: "0 12px 32px rgba(139, 92, 246, 0.1)",
                    border: `1px solid ${theme.palette.custom.accent}15`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 20px 50px rgba(139, 92, 246, 0.15)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: theme.palette.custom.main,
                      mb: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 900,
                      color: theme.palette.custom.main,
                      mb: 1,
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "text.secondary",
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box> */}

                {/* Features Section */}
                <Box sx={{ mb: 12 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            textAlign: "center",
                            mb: 8,
                            color: theme.palette.custom.main,
                        }}
                    >
                        What Makes Us Different
                    </Typography>
                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Card
                                    sx={{
                                        p: 5,
                                        height: "100%",
                                        borderRadius: "24px",
                                        boxShadow: "0 12px 32px rgba(139, 92, 246, 0.1)",
                                        border: `1px solid ${theme.palette.custom.accent}15`,
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-6px)",
                                            boxShadow: "0 20px 50px rgba(139, 92, 246, 0.15)",
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: "20px",
                                            background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: feature.color,
                                            mb: 3,
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 3,
                                            color: theme.palette.custom.main,
                                        }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: "text.secondary",
                                            lineHeight: 1.7,
                                            fontSize: "1.1rem",
                                        }}
                                    >
                                        {feature.description}
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Timeline Section */}
                <Box sx={{ mb: 12 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            textAlign: "center",
                            mb: 8,
                            color: theme.palette.custom.main,
                        }}
                    >
                        Our Journey
                    </Typography>
                    <Box sx={{ position: "relative" }}>
                        {milestones.map((milestone, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 4,
                                    position: "relative",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: "50%",
                                        background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "white",
                                        mr: 4,
                                        flexShrink: 0,
                                    }}
                                >
                                    {milestone.icon}
                                </Box>
                                <Card
                                    sx={{
                                        p: 4,
                                        flex: 1,
                                        borderRadius: "16px",
                                        boxShadow: "0 8px 24px rgba(139, 92, 246, 0.1)",
                                        border: `1px solid ${theme.palette.custom.accent}15`,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: theme.palette.custom.accent,
                                            mb: 1,
                                        }}
                                    >
                                        {milestone.year}
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 2,
                                            color: theme.palette.custom.main,
                                        }}
                                    >
                                        {milestone.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: "text.secondary",
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {milestone.description}
                                    </Typography>
                                </Card>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Values Section */}
                <Box
                    sx={{
                        background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.secondary})`,
                        color: "white",
                        borderRadius: "32px",
                        p: 10,
                        mb: 8,
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            mb: 8,
                        }}
                    >
                        Our Core Values
                    </Typography>
                    <Grid container spacing={6}>
                        {values.map((value, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Box sx={{ mb: 4 }}>{value.icon}</Box>
                                <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                                    {value.title}
                                </Typography>
                                <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.7, fontSize: "1.1rem" }}>
                                    {value.description}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}
