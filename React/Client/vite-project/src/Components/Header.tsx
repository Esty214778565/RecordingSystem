
"use client"

import { useNavigate } from "react-router-dom"
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material"
import { LogIn, Play, PlusCircle } from "lucide-react"
import { useTheme } from "@mui/material/styles"

import "./Register.css"

export default function Header() {
    const navigate = useNavigate()
    const theme = useTheme()

    return (
        <AppBar
            position="fixed"
            className="register-gradient-bar"
            sx={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(20px)",
                width: "100%",
                borderBottom: "1px solid rgba(139, 92, 246, 0.2)",
                boxShadow: "0 12px 32px rgba(139, 92, 246, 0.08)",
                zIndex: 1000,
            }}
        >
            <Toolbar
                sx={{
                    maxWidth: "1400px",
                    width: "100%",
                    margin: "0 auto",
                    px: { xs: 2, md: 4 },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {/* Logo Section */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                        className="register-icon-pulse"
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: "16px",
                            background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                            // background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.accent})`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 20px 50px rgba(139, 92, 246, 0.4)",
                            position: "relative",
                        }}
                    >
                        <Play style={{ color: "white", fontSize: "28px" }} />
                    </Box>
                    <Box>
                        <Typography
                            variant="h4"
                            className="register-title-shimmer"
                            sx={{
                                fontWeight: 900,
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "2.5rem",
                                background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,

                                // background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.secondary})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                backgroundSize: "200% auto",
                            }}
                        >
                            Learnix
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{

                                color: theme.palette.custom.accent,
                                fontSize: "0.9rem",
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

                {/* Center Navigation - Only show when logged in */}
                {/* {typeof sessionStorage !== "undefined" && sessionStorage.userId !== undefined && ( */}
                <Box
                    component="nav"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                    }}
                >
                    <Typography
                        component="a"
                        onClick={() => navigate("/")}
                        sx={{
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: theme.palette.custom.main,
                            textDecoration: "none",
                            cursor: "pointer",
                            position: "relative",
                            transition: "color 0.3s ease",
                            "&:hover": {
                                color: theme.palette.custom.secondary,
                                textDecoration: "underline",
                                textUnderlineOffset: "4px",
                                textDecorationThickness: "2px",
                                textDecorationColor: theme.palette.custom.secondary,
                            },
                        }}
                    >
                        Home
                    </Typography>
                    <Typography
                        component="a"
                        onClick={() => navigate("/blog")}
                        sx={{
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: theme.palette.custom.main,
                            textDecoration: "none",
                            cursor: "pointer",
                            position: "relative",
                            transition: "color 0.3s ease",
                            "&:hover": {
                                color: theme.palette.custom.secondary,
                                textDecoration: "underline",
                                textUnderlineOffset: "4px",
                                textDecorationThickness: "2px",
                                textDecorationColor: theme.palette.custom.secondary,
                            },
                        }}
                    >
                        Blog
                    </Typography>
                    <Typography
                        component="a"
                        onClick={() => navigate("/about")}
                        sx={{
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: theme.palette.custom.main,
                            textDecoration: "none",
                            cursor: "pointer",
                            position: "relative",
                            transition: "color 0.3s ease",
                            "&:hover": {
                                color: theme.palette.custom.secondary,
                                textDecoration: "underline",
                                textUnderlineOffset: "4px",
                                textDecorationThickness: "2px",
                                textDecorationColor: theme.palette.custom.secondary,
                            },
                        }}
                    >
                        About
                    </Typography>
                    {typeof sessionStorage !== "undefined" && sessionStorage.userId !== undefined && (
                        <Typography
                            component="a"
                            onClick={() => navigate("/courses")}
                            sx={{
                                fontSize: "1rem",
                                fontWeight: 600,
                                color: theme.palette.custom.main,
                                textDecoration: "none",
                                cursor: "pointer",
                                position: "relative",
                                transition: "color 0.3s ease",
                                "&:hover": {
                                    color: theme.palette.custom.secondary,
                                    textDecoration: "underline",
                                    textUnderlineOffset: "4px",
                                    textDecorationThickness: "2px",
                                    textDecorationColor: theme.palette.custom.secondary,
                                },
                            }}
                        >
                            Courses
                        </Typography>
                    )}
                    {typeof sessionStorage !== "undefined" && sessionStorage.userId !== undefined && sessionStorage.role !== "user" && (
                        <Typography
                            component="a"
                            onClick={() => navigate("/add-lesson")}
                            sx={{
                                fontSize: "1rem",
                                fontWeight: 600,
                                color: theme.palette.custom.main,
                                textDecoration: "none",
                                cursor: "pointer",
                                position: "relative",
                                transition: "color 0.3s ease",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                "&:hover": {
                                    color: theme.palette.custom.secondary,
                                    textDecoration: "underline",
                                    textUnderlineOffset: "4px",
                                    textDecorationThickness: "2px",
                                    textDecorationColor: theme.palette.custom.secondary,
                                },
                            }}
                        >
                            <PlusCircle size={18} />
                            Create Masterpiece
                        </Typography>
                    )}
                </Box>

                {/* Right Side - Auth Buttons Only */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {typeof sessionStorage !== "undefined" && sessionStorage.userId !== undefined ? (
                        <>
                            {/* Logout Button */}
                            <Button
                                variant="outlined"
                                sx={{
                                    px: 3,
                                    py: 1.2,
                                    borderRadius: "12px",
                                    fontWeight: 700,
                                    fontSize: "0.95rem",
                                    borderColor: theme.palette.custom.accent,
                                    color: theme.palette.custom.accent,
                                    textTransform: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    "&:hover": {
                                        backgroundColor: theme.palette.custom.accent,
                                        color: "#fff",
                                        borderColor: theme.palette.custom.accent,
                                        transform: "translateY(-1px)",
                                    },
                                }}
                                onClick={() => {
                                    sessionStorage.clear()
                                    navigate("/")
                                }}
                            >
                                <LogIn size={18} />
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            {/* Sign Up Button */}
                            <Button
                                variant="contained"
                                sx={{
                                    px: 4,
                                    py: 1.2,
                                    borderRadius: "12px",
                                    fontWeight: 700,
                                    fontSize: "0.95rem",
                                    background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                                    color: "white",
                                    textTransform: "none",
                                    boxShadow: "0 8px 24px rgba(139, 92, 246, 0.3)",
                                    "&:hover": {
                                        background: `linear-gradient(135deg, ${theme.palette.custom.vibrant}, ${theme.palette.custom.accent})`,
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 12px 32px rgba(139, 92, 246, 0.4)",
                                    },
                                }}
                                onClick={() => navigate("/register")}
                            >
                                Get Started
                            </Button>

                            {/* Sign In Button */}
                            <Button
                                variant="outlined"
                                sx={{
                                    px: 4,
                                    py: 1.2,
                                    borderRadius: "12px",
                                    fontWeight: 700,
                                    fontSize: "0.95rem",
                                    borderColor: theme.palette.custom.accent,
                                    color: theme.palette.custom.accent,
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor: theme.palette.custom.accent,
                                        color: "#fff",
                                        borderColor: theme.palette.custom.accent,
                                        transform: "translateY(-1px)",
                                    },
                                }}
                                onClick={() => navigate("/login")}
                            >
                                Sign In
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}
