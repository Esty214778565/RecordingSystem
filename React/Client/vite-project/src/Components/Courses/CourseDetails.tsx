
"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "../../Store/Store"
import { useParams } from "react-router-dom"
import {
    Typography,
    Container,
    Grid,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Avatar,
    Stack,
    Paper,
    Divider,
    Chip,
} from "@mui/material"
import { BookOpen, Users, Calendar, Mail, Star, ChevronDown, GraduationCap, TrendingUp } from "lucide-react"
import type { RootState } from "../../Store/Store"
import { fetchCourses, fetchListOfTeachers } from "../../Reducers/CoursesSlice"
import './CourseDetails.css'
import DisplayCourse from "./DisplayCourse"
import { Course } from "../../Models/Course"


const CourseDetail = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { teachers, loading, error } = useSelector((state: RootState) => state.courses)
    const { courseId } = useParams<{ courseId: string }>()
    const course = useSelector((state: RootState) =>
        state.courses.courses.find((course) => course.id === Number(courseId)),
    )

    const [teachersend, setTeachersend] = useState<Course>(teachers[0]);

    useEffect(() => {
        if (!course) {
            dispatch(fetchCourses())
        }
    }, [dispatch, course])

    useEffect(() => {
        if (!teachers || teachers.length === 0) {
            dispatch(fetchListOfTeachers(Number(courseId)))
        }
    }, [dispatch, teachers, courseId])

    if (loading) {
        return (
            <Box
                sx={{
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 30%, #f59e0b08 70%, #06b6d405 100%)",
                }}
                className="loading-container-detail"
            >
                <Box sx={{ textAlign: "center" }}>
                    <Box
                        sx={{
                            width: 120,
                            height: 120,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #0f172a, #8b5cf6)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 3,
                            boxShadow: "0 20px 60px rgba(15, 23, 42, 0.3)",
                        }}
                        className="loading-pulse-detail"
                    >
                        <BookOpen style={{ fontSize: "60px", color: "white" }} />
                    </Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            color: "#0f172a",
                            fontFamily: "'Playfair Display', serif",
                            mb: 2,
                        }}
                    >
                        Loading Course Details...
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "#64748b",
                            fontSize: "1.1rem",
                        }}
                    >
                        Preparing your learning experience
                    </Typography>
                </Box>
            </Box>
        )
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ mt: 8 }}>
                <Box
                    sx={{
                        textAlign: "center",
                        py: 8,
                        background: "linear-gradient(135deg, #ef444415, #ef444410)",
                        borderRadius: "24px",
                        border: "2px solid #ef444420",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            color: "#ef4444",
                            fontWeight: 800,
                            fontFamily: "'Playfair Display', serif",
                            mb: 2,
                        }}
                    >
                        Oops! Something went wrong
                    </Typography>
                    <Typography color="#64748b" sx={{ fontSize: "1.2rem", fontWeight: 500 }}>
                        {error}
                    </Typography>
                </Box>
            </Container>
        )
    }

    if (!course) {
        return (
            <Container maxWidth="lg" sx={{ mt: 8 }}>
                <Box
                    sx={{
                        textAlign: "center",
                        py: 8,
                        background: "linear-gradient(135deg, #64748b15, #64748b10)",
                        borderRadius: "24px",
                        border: "2px solid #64748b20",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            color: "#64748b",
                            fontWeight: 800,
                            fontFamily: "'Playfair Display', serif",
                            mb: 2,
                        }}
                    >
                        Course Not Found
                    </Typography>
                    <Typography color="#64748b" sx={{ fontSize: "1.2rem", fontWeight: 500 }}>
                        The course you're looking for doesn't exist or has been removed.
                    </Typography>
                </Box>
            </Container>
        )
    }

    const getTeacherColor = (teacherId: number | string, name: string) => {
        const hash = (teacherId || name).toString()
        let color = 0
        for (let i = 0; i < hash.length; i++) {
            color = hash.charCodeAt(i) + ((color << 5) - color)
        }
        color = Math.abs(color)
        for (let i = 0; i < hash.length; i++) {
            color = hash.charCodeAt(i) + ((color << 5) - color)
        }
        return (color & 0x00ffffff).toString(16).padStart(6, "0")
    }

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 30%, #f59e0b05 70%, #06b6d403 100%)",
                position: "relative",
                overflow: "hidden",
                
            }}
        >
            {/* Animated background elements */}
            <Box className="bg-animation-detail" />

            <Container maxWidth="xl" sx={{ pt: 6, pb: 8 }}>
                {/* Course Header Section */}
                <Box
                    sx={{
                        background: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(20px)",
                        borderRadius: "32px",
                        p: { xs: 4, md: 6 },
                        mb: 6,
                        border: "2px solid rgba(245, 158, 11, 0.1)",
                        boxShadow: "0 20px 60px rgba(15, 23, 42, 0.1)",
                        position: "relative",
                        overflow: "hidden",
                         // Add horizontal margin for equal space on sides
                    }}
                    className="course-header-section"
                >
                    {/* Header gradient overlay */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "6px",
                            background: "linear-gradient(90deg, #f59e0b, #06b6d4, #8b5cf6)",
                        }}
                    />

                    <Box sx={{ position: "relative", zIndex: 1 }}>
                        <Chip
                            icon={<TrendingUp style={{ color: "#f59e0b" }} />}
                            label="🎓 Premium Course"
                            sx={{
                                background: "linear-gradient(135deg, #f59e0b15, #06b6d410)",
                                color: "#0f172a",
                                fontWeight: 700,
                                fontSize: "0.9rem",
                                mb: 3,
                                border: "2px solid #f59e0b30",
                                boxShadow: "0 8px 24px rgba(245, 158, 11, 0.2)",
                            }}
                            className="course-badge-glow"
                        />

                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                                fontWeight: 900,
                                mb: 3,
                                fontFamily: "'Playfair Display', serif",
                                background: "linear-gradient(135deg, #0f172a, #8b5cf6, #f59e0b)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                lineHeight: 1.2,
                            }}
                            className="course-title-shimmer"
                        >
                            {course.name}
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap", mb: 4 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: "50%",
                                        background: "linear-gradient(135deg, #06b6d415, #8b5cf610)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Calendar style={{ fontSize: "20px", color: "#06b6d4" }} />
                                </Box>
                                <Box>
                                    <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                                        Last Updated
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: "#0f172a", fontWeight: 700 }}>
                                        {new Date(course.updateDate).toLocaleDateString()}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: "50%",
                                        background: "linear-gradient(135deg, #f59e0b15, #ef444410)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Users style={{ fontSize: "20px", color: "#f59e0b" }} />
                                </Box>
                                <Box>
                                    <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                                        Expert Teachers
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: "#0f172a", fontWeight: 700 }}>
                                        {teachers.length} Instructors
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: "50%",
                                        background: "linear-gradient(135deg, #10b98115, #06b6d410)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Star style={{ fontSize: "20px", color: "#10b981", fill: "#10b981" }} />
                                </Box>
                                <Box>
                                    <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                                        Course Rating
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: "#0f172a", fontWeight: 700 }}>
                                        4.9 ★ Premium
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: "1.2rem",
                                color: "#64748b",
                                lineHeight: 1.7,
                                fontWeight: 500,
                                maxWidth: "800px",
                            }}
                        >
                            Immerse yourself in this carefully curated educational experience, designed by world-class educators to
                            elevate your knowledge and skills to new heights.
                        </Typography>
                    </Box>
                </Box>

                {/* Main Layout: Audio Player and Teachers List */}
                <Grid container spacing={4}>
                    {/* Left Side: Audio Player */}
                    {/* <Grid item xs={12} md={8}>
                        <Paper
                            elevation={0}
                            sx={{
                                background: "rgba(255, 255, 255, 0.9)",
                                backdropFilter: "blur(20px)",
                                borderRadius: "24px",
                                p: { xs: 3, md: 4 },
                                border: "2px solid rgba(245, 158, 11, 0.1)",
                                boxShadow: "0 16px 50px rgba(15, 23, 42, 0.08)",
                                position: "relative",
                                overflow: "hidden",
                            }}
                            className="audio-player-section"
                        >
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: "4px",
                                    background: "linear-gradient(90deg, #8b5cf6, #06b6d4, #f59e0b)",
                                }}
                            />

                            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                                <Box
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: "50%",
                                        background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: "0 12px 32px rgba(139, 92, 246, 0.3)",
                                    }}
                                    className="audio-icon-pulse"
                                >
                                    <Play style={{ fontSize: "28px", color: "white", marginLeft: "2px" }} />
                                </Box>
                                <Box>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 700,
                                            color: "#0f172a",
                                            fontFamily: "'Playfair Display', serif",
                                            mb: 0.5,
                                        }}
                                    >
                                        Course Audio Content
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                                        High-quality educational recordings
                                    </Typography>
                                </Box>
                            </Box>

                            <AudioPlayer />
                        </Paper>
                    </Grid> */}

                    {/* Right Side: Teachers List */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ position: "sticky", top: 24 }}>
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 800,
                                        color: "#0f172a",
                                        fontFamily: "'Playfair Display', serif",
                                        mb: 1,
                                        fontSize: { xs: "1.8rem", md: "2.2rem" },
                                    }}
                                >
                                    Expert{" "}
                                    <Box
                                        component="span"
                                        sx={{
                                            background: "linear-gradient(135deg, #f59e0b, #06b6d4)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            backgroundClip: "text",
                                        }}
                                    >
                                        Instructors
                                    </Box>
                                </Typography>
                                <Typography variant="body1" sx={{ color: "#64748b", fontWeight: 500 }}>
                                    Learn from distinguished educators
                                </Typography>
                            </Box>

                            <Stack spacing={3}>
                                {teachers.map((teacher, index) => (
                                    <Accordion
                                        key={teacher.id}
                                        onClick={() => setTeachersend(teacher)}
                                        // onClick={() => navigate(`/courses/${courseId}/${teacher.id}`)}
                                        sx={{
                                            borderRadius: "20px !important",
                                            overflow: "hidden",
                                            background: "#ffffff", // Solid white background
                                            backdropFilter: "blur(20px)",
                                            border: "2px solid transparent",
                                            boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
                                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                            "&:hover": {
                                                transform: "translateY(-8px)",
                                                boxShadow: "0 20px 60px rgba(15, 23, 42, 0.15)",
                                                border: "2px solid rgba(245, 158, 11, 0.3)",
                                            },
                                            "&::before": {
                                                display: "none",
                                            },
                                        }}
                                        className={`teacher-card-${index % 3}`}
                                    >
                                        <AccordionSummary
                                            expandIcon={
                                                <Box
                                                    sx={{
                                                        width: 32,
                                                        height: 32,
                                                        borderRadius: "50%",
                                                        background: "linear-gradient(135deg, #f59e0b, #06b6d4)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        transition: "transform 0.3s ease",
                                                    }}
                                                    className="expand-icon-hover"
                                                >
                                                    <ChevronDown style={{ fontSize: "18px", color: "white" }} />
                                                </Box>
                                            }
                                            aria-controls={`panel-${teacher.id}-content`}
                                            id={`panel-${teacher.id}-header`}
                                            sx={{
                                                p: 2,
                                                "& .MuiAccordionSummary-content": {
                                                    margin: 0,
                                                },
                                            }}
                                        >
                                            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                                                <Avatar
                                                    sx={{
                                                        width: 64,
                                                        height: 64,
                                                        mr: 2,
                                                        background: `linear-gradient(135deg, #${getTeacherColor(teacher.id, teacher.name)}, #${getTeacherColor(teacher.id, teacher.name)}80)`,
                                                        color: "#ffffff",
                                                        fontSize: "1.5rem",
                                                        fontWeight: 800,
                                                        border: "3px solid white",
                                                        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                                                    }}
                                                    className="teacher-avatar-hover"
                                                >
                                                    {teacher.name.charAt(0).toUpperCase()}
                                                </Avatar>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 700,
                                                            color: "#0f172a",
                                                            fontFamily: "'Playfair Display', serif",
                                                            mb: 0.5,
                                                        }}
                                                    >
                                                        {teacher.name}
                                                    </Typography>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                                                        <Chip
                                                            icon={<GraduationCap style={{ fontSize: "14px" }} />}
                                                            label={`${teacher.records?.length ?? 0} Lessons`}
                                                            size="small"
                                                            sx={{
                                                                background: "linear-gradient(135deg, #06b6d415, #8b5cf610)",
                                                                color: "#06b6d4",
                                                                fontWeight: 600,
                                                                fontSize: "0.75rem",
                                                            }}
                                                        />
                                                    </Box>
                                                    <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                                                        Updated: {new Date(teacher.updateDate).toLocaleDateString()}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ p: 3, pt: 0 }}>
                                            <Divider sx={{ mb: 3, background: "linear-gradient(90deg, #f59e0b, #06b6d4)" }} />
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    background: "#ffffff", // Solid white background
                                                    borderRadius: "16px",
                                                    p: 3,
                                                    border: "1px solid rgba(245, 158, 11, 0.1)",
                                                }}
                                            >
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                                                    <Box
                                                        sx={{
                                                            width: 40,
                                                            height: 40,
                                                            borderRadius: "50%",
                                                            background: "linear-gradient(135deg, #f59e0b15, #06b6d410)",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <Mail style={{ fontSize: "20px", color: "#f59e0b" }} />
                                                    </Box>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 700,
                                                            color: "#0f172a",
                                                            fontFamily: "'Playfair Display', serif",
                                                        }}
                                                    >
                                                        Contact Instructor
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" sx={{ color: "#64748b", mb: 2, fontWeight: 500 }}>
                                                    Have questions? Reach out to your instructor directly for personalized guidance.
                                                </Typography>
                                                <a
                                                    href={`mailto:8578397@gmail.com?subject=${encodeURIComponent("שאלה למורה")}&body=${encodeURIComponent("תוכן גוף ההודעה")}`}
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: "8px",
                                                        padding: "12px 20px",
                                                        background: "linear-gradient(135deg, #f59e0b, #06b6d4)",
                                                        color: "white",
                                                        textDecoration: "none",
                                                        borderRadius: "12px",
                                                        fontWeight: 600,
                                                        fontSize: "0.9rem",
                                                        transition: "all 0.3s ease",
                                                        boxShadow: "0 8px 24px rgba(245, 158, 11, 0.3)",
                                                    }}
                                                    className="contact-link-hover"
                                                >
                                                    <Mail style={{ fontSize: "16px" }} />
                                                    שלח מייל עם נושא ותוכן
                                                </a>
                                            </Paper>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        {/* /////// */}
                        <DisplayCourse teacher={teachersend} />
                        {/* <Outlet /> */}
                    </Grid></Grid>

            </Container>


        </Box>
    )
}

export default CourseDetail
