
"use client"

import type React from "react"
import { useState } from "react"
import {
    Modal,
    TextField,
    Button,
    Typography,
    Box,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    InputAdornment,
    Card,
    CardContent,
    Chip,
    Divider,
    Paper,
} from "@mui/material"
import { useDispatch } from "react-redux"
import type { UserDispatch } from "../Store/Store"
import { registerUser } from "../Reducers/AuthSlice"
import type { User } from "../Models/User"
import { useNavigate } from "react-router-dom"
import {
    UserPlus,
    Mail,
    Lock,
    UserIcon,
    GraduationCap,
    BookOpen,
    Sparkles,
    Shield,
    Crown,
    Star,
    Zap,
} from "lucide-react"
import './Register.css'

const Register = () => {
    console.log("Register component rendered")

    const dispatch = useDispatch<UserDispatch>()
    const navigate = useNavigate()
    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        password: "",
        role: "user",
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value,
        })
    }

    const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            role: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res: any = await dispatch(registerUser(user))
            if (res.error) {
                alert("Registration failed")
                return
            }
            navigate("/courses")
        } catch (error) {
            console.error("Registration error:", error)
            alert("Registration failed")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal
            open={true}
            onClose={() => { }}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                overflow: "auto", // Add scrolling capability
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "600px", // Increase max width
                    maxHeight: "95vh", // Limit height to viewport
                    overflow: "auto", // Add scrolling
                    position: "relative",
                    outline: "none",
                    my: 2, // Add vertical margin
                }}
            >
                {/* Main Registration Card */}
                <Card
                    sx={{
                        borderRadius: "32px",
                        overflow: "hidden",
                        background: "rgba(255, 255, 255, 0.98)",
                        backdropFilter: "blur(20px)",
                        border: "2px solid rgba(139, 92, 246, 0.2)",
                        boxShadow: "0 24px 80px rgba(15, 23, 42, 0.15)",
                        position: "relative",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    className="register-main-card"
                >
                    {/* Header gradient overlay */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "6px",
                            background: "linear-gradient(90deg, #8b5cf6, #06b6d4, #f59e0b, #8b5cf6)",
                            backgroundSize: "200% 100%",
                        }}
                        className="register-gradient-bar"
                    />

                    <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                        {/* Header Section */}
                        <Box sx={{ textAlign: "center", mb: 5 }} className="register-header">
                            <Box
                                sx={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mx: "auto",
                                    mb: 3,
                                    boxShadow: "0 20px 50px rgba(139, 92, 246, 0.4)",
                                    position: "relative",
                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        inset: "-4px",
                                        background: "linear-gradient(135deg, #f59e0b, #8b5cf6, #06b6d4)",
                                        borderRadius: "50%",
                                        zIndex: -1,
                                        opacity: 0.6,
                                    },
                                }}
                                className="register-icon-pulse"
                            >
                                <UserPlus style={{ fontSize: "50px", color: "white" }} />
                            </Box>

                            <Chip
                                icon={<Crown style={{ color: "#f59e0b" }} />}
                                label="✨ Join Our Elite Learning Community"
                                sx={{
                                    background: "linear-gradient(135deg, #8b5cf620, #06b6d415)",
                                    color: "#0f172a",
                                    fontWeight: 800,
                                    fontSize: "1rem",
                                    mb: 3,
                                    border: "2px solid #8b5cf640",
                                    boxShadow: "0 12px 32px rgba(139, 92, 246, 0.25)",
                                    px: 3,
                                    py: 1.5,
                                }}
                                className="register-badge-glow"
                            />

                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 800,
                                    mb: 2,
                                    fontFamily: "'Playfair Display', serif",
                                    background: "linear-gradient(135deg, #0f172a, #8b5cf6)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    fontSize: { xs: "2rem", md: "2.5rem" },
                                }}
                                className="register-title-shimmer"
                            >
                                Create Your{" "}
                                <Box
                                    component="span"
                                    sx={{
                                        background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    Account
                                </Box>
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: "#64748b",
                                    fontWeight: 600,
                                    maxWidth: "400px",
                                    mx: "auto",
                                    lineHeight: 1.7,
                                    fontSize: "1.1rem",
                                }}
                            >
                                Begin your journey in our sophisticated learning ecosystem. Choose your path and unlock premium
                                educational experiences.
                            </Typography>
                        </Box>

                        {/* Registration Form */}
                        <form onSubmit={handleSubmit} className="register-form">
                            <Box sx={{ mb: 4 }}>
                                {/* Name Field */}
                                <Box sx={{ mb: 3 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "#0f172a",
                                            fontWeight: 700,
                                            mb: 1,
                                            fontSize: "0.9rem",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                        }}
                                    >
                                        Full Name
                                    </Typography>
                                    <TextField
                                        name="name"
                                        type="text"
                                        fullWidth
                                        value={user.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your full name"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Box
                                                        sx={{
                                                            width: 40,
                                                            height: 40,
                                                            borderRadius: "50%",
                                                            background: "linear-gradient(135deg, #8b5cf615, #06b6d410)",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            mr: 1,
                                                        }}
                                                    >
                                                        <UserIcon style={{ fontSize: "20px", color: "#8b5cf6" }} />
                                                    </Box>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "16px",
                                                background: "rgba(255, 255, 255, 0.8)",
                                                transition: "all 0.3s ease",
                                                "& fieldset": {
                                                    borderColor: "rgba(139, 92, 246, 0.2)",
                                                    borderWidth: "2px",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: "rgba(139, 92, 246, 0.4)",
                                                    boxShadow: "0 8px 24px rgba(139, 92, 246, 0.1)",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#8b5cf6",
                                                    boxShadow: "0 12px 32px rgba(139, 92, 246, 0.2)",
                                                },
                                            },
                                            "& .MuiInputBase-input": {
                                                fontSize: "1.1rem",
                                                fontWeight: 600,
                                                color: "#0f172a",
                                                py: 2,
                                            },
                                        }}
                                        className="register-input-glow"
                                    />
                                </Box>

                                {/* Email Field */}
                                <Box sx={{ mb: 3 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "#0f172a",
                                            fontWeight: 700,
                                            mb: 1,
                                            fontSize: "0.9rem",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                        }}
                                    >
                                        Email Address
                                    </Typography>
                                    <TextField
                                        name="email"
                                        type="email"
                                        fullWidth
                                        value={user.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your email address"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Box
                                                        sx={{
                                                            width: 40,
                                                            height: 40,
                                                            borderRadius: "50%",
                                                            background: "linear-gradient(135deg, #06b6d415, #10b98110)",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            mr: 1,
                                                        }}
                                                    >
                                                        <Mail style={{ fontSize: "20px", color: "#06b6d4" }} />
                                                    </Box>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "16px",
                                                background: "rgba(255, 255, 255, 0.8)",
                                                transition: "all 0.3s ease",
                                                "& fieldset": {
                                                    borderColor: "rgba(6, 182, 212, 0.2)",
                                                    borderWidth: "2px",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: "rgba(6, 182, 212, 0.4)",
                                                    boxShadow: "0 8px 24px rgba(6, 182, 212, 0.1)",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#06b6d4",
                                                    boxShadow: "0 12px 32px rgba(6, 182, 212, 0.2)",
                                                },
                                            },
                                            "& .MuiInputBase-input": {
                                                fontSize: "1.1rem",
                                                fontWeight: 600,
                                                color: "#0f172a",
                                                py: 2,
                                            },
                                        }}
                                        className="register-input-glow"
                                    />
                                </Box>

                                {/* Password Field */}
                                <Box sx={{ mb: 4 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "#0f172a",
                                            fontWeight: 700,
                                            mb: 1,
                                            fontSize: "0.9rem",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                        }}
                                    >
                                        Password
                                    </Typography>
                                    <TextField
                                        name="password"
                                        type="password"
                                        fullWidth
                                        value={user.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="Create a secure password"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Box
                                                        sx={{
                                                            width: 40,
                                                            height: 40,
                                                            borderRadius: "50%",
                                                            background: "linear-gradient(135deg, #f59e0b15, #ef444410)",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            mr: 1,
                                                        }}
                                                    >
                                                        <Lock style={{ fontSize: "20px", color: "#f59e0b" }} />
                                                    </Box>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "16px",
                                                background: "rgba(255, 255, 255, 0.8)",
                                                transition: "all 0.3s ease",
                                                "& fieldset": {
                                                    borderColor: "rgba(245, 158, 11, 0.2)",
                                                    borderWidth: "2px",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor: "rgba(245, 158, 11, 0.4)",
                                                    boxShadow: "0 8px 24px rgba(245, 158, 11, 0.1)",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#f59e0b",
                                                    boxShadow: "0 12px 32px rgba(245, 158, 11, 0.2)",
                                                },
                                            },
                                            "& .MuiInputBase-input": {
                                                fontSize: "1.1rem",
                                                fontWeight: 600,
                                                color: "#0f172a",
                                                py: 2,
                                            },
                                        }}
                                        className="register-input-glow"
                                    />
                                </Box>

                                {/* Role Selection */}
                                <Box sx={{ mb: 4 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "#0f172a",
                                            fontWeight: 700,
                                            mb: 2,
                                            fontSize: "0.9rem",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                        }}
                                    >
                                        Choose Your Role
                                    </Typography>

                                    <FormControl component="fieldset" fullWidth>
                                        <RadioGroup row value={user.role} onChange={handleRoleChange} sx={{ gap: 2 }}>
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    flex: 1,
                                                    p: 3,
                                                    borderRadius: "20px",
                                                    border: user.role === "student" ? "3px solid #8b5cf6" : "2px solid rgba(139, 92, 246, 0.2)",
                                                    background:
                                                        user.role === "student"
                                                            ? "linear-gradient(135deg, #8b5cf615, #06b6d410)"
                                                            : "rgba(255, 255, 255, 0.8)",
                                                    transition: "all 0.3s ease",
                                                    cursor: "pointer",
                                                    "&:hover": {
                                                        transform: "translateY(-2px)",
                                                        boxShadow: "0 12px 32px rgba(139, 92, 246, 0.2)",
                                                    },
                                                }}
                                                className="register-role-card"
                                                onClick={() => setUser({ ...user, role: "student" })}
                                            >
                                                <Box sx={{ textAlign: "center" }}>
                                                    <Box
                                                        sx={{
                                                            width: 60,
                                                            height: 60,
                                                            borderRadius: "50%",
                                                            background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            mx: "auto",
                                                            mb: 2,
                                                            boxShadow: "0 12px 32px rgba(139, 92, 246, 0.3)",
                                                        }}
                                                    >
                                                        <GraduationCap style={{ fontSize: "30px", color: "white" }} />
                                                    </Box>
                                                    <FormControlLabel
                                                        value="student"
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    color: "#8b5cf6",
                                                                    "&.Mui-checked": {
                                                                        color: "#8b5cf6",
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label={
                                                            <Box>
                                                                <Typography
                                                                    variant="h6"
                                                                    sx={{
                                                                        fontWeight: 800,
                                                                        color: "#0f172a",
                                                                        fontFamily: "'Playfair Display', serif",
                                                                    }}
                                                                >
                                                                    Student
                                                                </Typography>
                                                                <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                                                                    Learn & Explore
                                                                </Typography>
                                                            </Box>
                                                        }
                                                        sx={{ m: 0 }}
                                                    />
                                                </Box>
                                            </Paper>

                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    flex: 1,
                                                    p: 3,
                                                    borderRadius: "20px",
                                                    border: user.role === "teacher" ? "3px solid #06b6d4" : "2px solid rgba(6, 182, 212, 0.2)",
                                                    background:
                                                        user.role === "teacher"
                                                            ? "linear-gradient(135deg, #06b6d415, #10b98110)"
                                                            : "rgba(255, 255, 255, 0.8)",
                                                    transition: "all 0.3s ease",
                                                    cursor: "pointer",
                                                    "&:hover": {
                                                        transform: "translateY(-2px)",
                                                        boxShadow: "0 12px 32px rgba(6, 182, 212, 0.2)",
                                                    },
                                                }}
                                                className="register-role-card"
                                                onClick={() => setUser({ ...user, role: "teacher" })}
                                            >
                                                <Box sx={{ textAlign: "center" }}>
                                                    <Box
                                                        sx={{
                                                            width: 60,
                                                            height: 60,
                                                            borderRadius: "50%",
                                                            background: "linear-gradient(135deg, #06b6d4, #10b981)",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            mx: "auto",
                                                            mb: 2,
                                                            boxShadow: "0 12px 32px rgba(6, 182, 212, 0.3)",
                                                        }}
                                                    >
                                                        <BookOpen style={{ fontSize: "30px", color: "white" }} />
                                                    </Box>
                                                    <FormControlLabel
                                                        value="teacher"
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    color: "#06b6d4",
                                                                    "&.Mui-checked": {
                                                                        color: "#06b6d4",
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label={
                                                            <Box>
                                                                <Typography
                                                                    variant="h6"
                                                                    sx={{
                                                                        fontWeight: 800,
                                                                        color: "#0f172a",
                                                                        fontFamily: "'Playfair Display', serif",
                                                                    }}
                                                                >
                                                                    Teacher
                                                                </Typography>
                                                                <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                                                                    Teach & Inspire
                                                                </Typography>
                                                            </Box>
                                                        }
                                                        sx={{ m: 0 }}
                                                    />
                                                </Box>
                                            </Paper>
                                        </RadioGroup>
                                    </FormControl>
                                </Box>

                                <Divider sx={{ mb: 4, background: "linear-gradient(90deg, #8b5cf6, #06b6d4)" }} />

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    fullWidth
                                    disabled={isLoading}
                                    sx={{
                                        background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                                        color: "white",
                                        fontWeight: 800,
                                        fontSize: "1.2rem",
                                        py: 2.5,
                                        borderRadius: "20px",
                                        boxShadow: "0 20px 50px rgba(139, 92, 246, 0.4)",
                                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                        position: "relative",
                                        overflow: "hidden",
                                        "&:hover": {
                                            background: "linear-gradient(135deg, #7c3aed, #0891b2)",
                                            transform: "translateY(-4px)",
                                            boxShadow: "0 24px 60px rgba(139, 92, 246, 0.5)",
                                        },
                                        "&:disabled": {
                                            background: "#64748b",
                                            color: "white",
                                        },
                                        "&::before": {
                                            content: '""',
                                            position: "absolute",
                                            top: 0,
                                            left: "-100%",
                                            width: "100%",
                                            height: "100%",
                                            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                                            transition: "left 0.6s",
                                        },
                                        "&:hover::before": {
                                            left: "100%",
                                        },
                                    }}
                                    className="register-submit-button"
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        {isLoading ? (
                                            <>
                                                <Box
                                                    sx={{
                                                        width: 24,
                                                        height: 24,
                                                        border: "3px solid rgba(255, 255, 255, 0.3)",
                                                        borderTop: "3px solid white",
                                                        borderRadius: "50%",
                                                    }}
                                                    className="register-loading-spinner"
                                                />
                                                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                                                    Creating Account...
                                                </Typography>
                                            </>
                                        ) : (
                                            <>
                                                <Shield style={{ fontSize: "24px" }} />
                                                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                                                    Create Account
                                                </Typography>
                                                <Sparkles style={{ fontSize: "24px" }} />
                                            </>
                                        )}
                                    </Box>
                                </Button>
                            </Box>
                        </form>

                        {/* Features Section */}
                        <Box sx={{ mt: 4 }}>
                            <Divider sx={{ mb: 3, background: "linear-gradient(90deg, #8b5cf6, #06b6d4)" }} />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    color: "#0f172a",
                                    fontFamily: "'Playfair Display', serif",
                                    mb: 3,
                                    textAlign: "center",
                                }}
                            >
                                Why Join Our Platform?
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 2 }}>
                                <Box sx={{ textAlign: "center" }}>
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: "50%",
                                            background: "linear-gradient(135deg, #8b5cf615, #06b6d410)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            mx: "auto",
                                            mb: 1,
                                        }}
                                    >
                                        <Star style={{ fontSize: "24px", color: "#8b5cf6" }} />
                                    </Box>
                                    <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                                        Premium Content
                                    </Typography>
                                </Box>

                                <Box sx={{ textAlign: "center" }}>
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: "50%",
                                            background: "linear-gradient(135deg, #06b6d415, #10b98110)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            mx: "auto",
                                            mb: 1,
                                        }}
                                    >
                                        <Zap style={{ fontSize: "24px", color: "#06b6d4" }} />
                                    </Box>
                                    <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                                        AI-Powered
                                    </Typography>
                                </Box>

                                <Box sx={{ textAlign: "center" }}>
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: "50%",
                                            background: "linear-gradient(135deg, #10b98115, #f59e0b10)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            mx: "auto",
                                            mb: 1,
                                        }}
                                    >
                                        <Crown style={{ fontSize: "24px", color: "#f59e0b" }} />
                                    </Box>
                                    <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                                        Elite Community
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Modal>
    )
}

export default Register
