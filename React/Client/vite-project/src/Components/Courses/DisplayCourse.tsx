import { Box, Button, Chip, Typography } from "@mui/material";
import { BookOpen, FileAudio, Calendar, User } from "lucide-react";
import { Course } from "../../Models/Course";
import { useNavigate, useParams } from "react-router-dom";

const DisplayCourse = ({ teacher }: { teacher: Course }) => {
    const navigate = useNavigate();
    const { courseId } = useParams<{ courseId: string }>();
    if (!teacher) {
        return null;
    }
    return (
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
            }}
            className="lessons-header-section"
        >
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
                    icon={<BookOpen style={{ color: "#f59e0b" }} />}
                    label="🎧 Teacher's Audio Library"
                    sx={{
                        background: "linear-gradient(135deg, #f59e0b15, #06b6d410)",
                        color: "#0f172a",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        mb: 3,
                        border: "2px solid #f59e0b30",
                        boxShadow: "0 8px 24px rgba(245, 158, 11, 0.2)",
                    }}
                    className="lessons-badge-glow"
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
                    className="lessons-title-shimmer"
                >
                    {teacher.name}'s{" "}
                    <Box
                        component="span"
                        sx={{
                            background: "linear-gradient(135deg, #f59e0b, #06b6d4)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Lessons
                    </Box>
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
                            <FileAudio style={{ fontSize: "20px", color: "#06b6d4" }} />
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                                Total Lessons
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#0f172a", fontWeight: 700 }}>
                                {teacher.records?.length || 0} Recordings
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
                            <Calendar style={{ fontSize: "20px", color: "#f59e0b" }} />
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                                Last Updated
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#0f172a", fontWeight: 700 }}>
                                {new Date(teacher.updateDate).toLocaleDateString()}
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
                            <User style={{ fontSize: "20px", color: "#10b981" }} />
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                                Instructor
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#0f172a", fontWeight: 700 }}>
                                Expert Educator
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
                    Explore this comprehensive collection of educational audio content, carefully crafted to enhance your
                    learning experience.
                </Typography>

                {/* View Lessons Button */}
                <Box sx={{ mt: 4 }}>
                    <Button
                        variant="contained"
                        sx={{
                            background: "linear-gradient(90deg, #f59e0b, #06b6d4)",
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: "1rem",
                            borderRadius: "24px",
                            px: 4,
                            py: 1.5,
                            boxShadow: "0 4px 16px rgba(245, 158, 11, 0.15)",
                            textTransform: "none",
                            "&:hover": {
                                background: "linear-gradient(90deg, #06b6d4, #f59e0b)",
                            },
                        }}
                        onClick={() => navigate(`/courses/${courseId}/${teacher.id}`)}
                    >
                        View Lessons
                    </Button>
                </Box>
            </Box>
        </Box>

    );
};

export default DisplayCourse;