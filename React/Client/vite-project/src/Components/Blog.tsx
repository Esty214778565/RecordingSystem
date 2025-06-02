"use client"

import { Box, Container, Typography, Card, Chip, Button } from "@mui/material"
import { Calendar, User, ArrowRight, Clock, BookOpen, TrendingUp, Lightbulb, Target, Brain, Zap } from "lucide-react"
import { useTheme } from "@mui/material/styles"

const blogPosts = [
  {
    id: 1,
    title: "The Future of Online Learning: Trends to Watch in 2024",
    excerpt: "Discover the latest innovations in educational technology and how they're reshaping the way we learn.",
    author: "Sarah Johnson",
    date: "December 15, 2024",
    readTime: "5 min read",
    category: "Education Technology",
    icon: <TrendingUp size={24} />,
    featured: true,
  },
  {
    id: 2,
    title: "10 Effective Study Techniques for Better Learning",
    excerpt: "Evidence-based methods to improve your learning efficiency and retention rates.",
    author: "Dr. Michael Chen",
    date: "December 12, 2024",
    readTime: "7 min read",
    category: "Study Tips",
    icon: <Brain size={24} />,
  },
  {
    id: 3,
    title: "Building a Growth Mindset: The Key to Lifelong Learning",
    excerpt: "Learn how to develop resilience and embrace challenges in your educational journey.",
    author: "Emma Rodriguez",
    date: "December 10, 2024",
    readTime: "6 min read",
    category: "Personal Development",
    icon: <Target size={24} />,
  },
  {
    id: 4,
    title: "Free Resources Every Student Should Know About",
    excerpt: "A comprehensive guide to the best free educational tools and platforms available online.",
    author: "Alex Thompson",
    date: "December 8, 2024",
    readTime: "8 min read",
    category: "Resources",
    icon: <BookOpen size={24} />,
  },
  {
    id: 5,
    title: "The Science Behind Effective Learning",
    excerpt: "Understanding how your brain processes information can revolutionize your study habits.",
    author: "Dr. Lisa Park",
    date: "December 5, 2024",
    readTime: "9 min read",
    category: "Learning Science",
    icon: <Lightbulb size={24} />,
  },
  {
    id: 6,
    title: "Creating Your Perfect Study Environment",
    excerpt: "Tips and tricks to optimize your physical and digital learning spaces for maximum productivity.",
    author: "James Wilson",
    date: "December 3, 2024",
    readTime: "4 min read",
    category: "Productivity",
    icon: <Zap size={24} />,
  },
]

export default function BlogPage() {
  const theme = useTheme()

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fafafa", pt: 12 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.secondary})`,
          color: "white",
          py: 10,
          mb: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Elements */}
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "30%",
            left: "5%",
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            animation: "float 4s ease-in-out infinite reverse",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", maxWidth: "800px", mx: "auto" }}>
            <BookOpen size={64} style={{ marginBottom: "24px" }} />
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.5rem", md: "4rem" },
                mb: 3,
                background: "linear-gradient(45deg, #ffffff, #f0f0f0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Learnix Blog
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 400,
                opacity: 0.9,
                lineHeight: 1.6,
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              Insights, tips, and inspiration for your learning journey. Discover new ways to enhance your education and
              unlock your potential.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Featured Post */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 4,
              color: theme.palette.custom.main,
              textAlign: "center",
            }}
          >
            Featured Article
          </Typography>
          <Card
            sx={{
              p: 6,
              boxShadow: "0 20px 60px rgba(139, 92, 246, 0.15)",
              borderRadius: "24px",
              background: `linear-gradient(135deg, ${theme.palette.custom.secondary}08, ${theme.palette.custom.vibrant}08)`,
              border: `1px solid ${theme.palette.custom.accent}20`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "16px",
                  background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  mr: 3,
                }}
              >
                {blogPosts[0].icon}
              </Box>
              <Chip
                label={blogPosts[0].category}
                sx={{
                  backgroundColor: theme.palette.custom.accent,
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  px: 2,
                  py: 1,
                }}
              />
            </Box>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: theme.palette.custom.main,
                lineHeight: 1.2,
              }}
            >
              {blogPosts[0].title}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                mb: 4,
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              {blogPosts[0].excerpt}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 4, mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <User size={18} color={theme.palette.custom.main} />
                <Typography variant="body1" color="text.secondary" fontWeight={600}>
                  {blogPosts[0].author}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Calendar size={18} color={theme.palette.custom.main} />
                <Typography variant="body1" color="text.secondary">
                  {blogPosts[0].date}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Clock size={18} color={theme.palette.custom.main} />
                <Typography variant="body1" color="text.secondary">
                  {blogPosts[0].readTime}
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              endIcon={<ArrowRight size={20} />}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                fontWeight: 700,
                px: 4,
                py: 2,
                borderRadius: "16px",
                fontSize: "1.1rem",
                "&:hover": {
                  background: `linear-gradient(135deg, ${theme.palette.custom.vibrant}, ${theme.palette.custom.accent})`,
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 32px rgba(139, 92, 246, 0.3)",
                },
              }}
            >
              Read Full Article
            </Button>
          </Card>
        </Box>

        {/* Blog Grid */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 6,
            color: theme.palette.custom.main,
            textAlign: "center",
          }}
        >
          Latest Articles
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
            gap: 4,
            mb: 8,
          }}
        >
          {blogPosts.slice(1).map((post) => (
            <Card
              key={post.id}
              sx={{
                p: 4,
                borderRadius: "20px",
                boxShadow: "0 12px 32px rgba(139, 92, 246, 0.1)",
                transition: "all 0.3s ease",
                border: `1px solid ${theme.palette.custom.accent}15`,
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 20px 50px rgba(139, 92, 246, 0.2)",
                  borderColor: theme.palette.custom.accent,
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "12px",
                    background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    mr: 2,
                  }}
                >
                  {post.icon}
                </Box>
                <Chip
                  label={post.category}
                  size="small"
                  sx={{
                    backgroundColor: `${theme.palette.custom.accent}20`,
                    color: theme.palette.custom.accent,
                    fontWeight: 600,
                  }}
                />
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: theme.palette.custom.main,
                  lineHeight: 1.3,
                }}
              >
                {post.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mb: 3,
                  lineHeight: 1.5,
                }}
              >
                {post.excerpt}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  {post.author}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {post.readTime}
                </Typography>
              </Box>

              <Typography variant="caption" color="text.secondary">
                {post.date}
              </Typography>
            </Card>
          ))}
        </Box>

        {/* Call to Action */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.secondary})`,
            color: "white",
            borderRadius: "24px",
            p: 8,
            mb: 8,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 3,
            }}
          >
            Ready to Start Learning?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              mb: 4,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Join thousands of learners who are already transforming their lives through free, high-quality education on
            Learnix.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: theme.palette.custom.main,
              fontWeight: 700,
              px: 6,
              py: 2,
              borderRadius: "16px",
              fontSize: "1.1rem",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                transform: "translateY(-2px)",
              },
            }}
          >
            Explore Courses
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
