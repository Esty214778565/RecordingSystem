// import { Typography, Chip, Divider, Box } from "@mui/material";
// import { Clock, Headphones, Star } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Lesson } from "../../Models/Lesson";


// import VideoPlayer from "../VideoPlayer";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { fetchLessons } from "../../Reducers/LessonsSlice";
// import { AppDispatch } from "../../Store/Store";



// const DisplayLesson = () => {
//     const location = useLocation();
//     const record = location.state?.record;
//    console.log("record from state in display lesson:", record);


//     const stats = location.state?.stats;
//     const navigate = useNavigate();

//     const handlePlayClick = (record: Lesson) => {
//         const urlPrefix = "https://s3.amazonaws.com/my-first-records-bucket.testpnoren/"
//         const relativeUrl = record.s3Key.startsWith(urlPrefix) ? record.s3Key.substring(urlPrefix.length) : record.s3Key
//         console.log("relativeUrl:", relativeUrl)
//         return relativeUrl;
//     }
//     const dispatch = useDispatch<AppDispatch>();

//     useEffect(() => {
//         dispatch(fetchLessons());
//     }, [dispatch]);


//     return (
//         <>

//             <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
//                 <VideoPlayer url={handlePlayClick(record)} vttUrl={record.transcriptionS3Key} />


//                 <Box sx={{ flex: 1 }}>

//                     <Typography
//                         variant="h5"
//                         sx={{
//                             fontWeight: 700,
//                             color: "#0f172a",
//                             fontFamily: "'Playfair Display', serif",
//                             mb: 2,
//                             cursor: "pointer",
//                             transition: "color 0.3s ease",
//                             "&:hover": {
//                                 color: "#f59e0b",
//                             },
//                         }}
//                     >
//                         {record.fileName}
//                     </Typography>

//                     <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3, flexWrap: "wrap" }}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                             <Clock style={{ fontSize: "16px", color: "#64748b" }} />
//                             <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
//                                 {stats.duration} min
//                             </Typography>
//                         </Box>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                             <Headphones style={{ fontSize: "16px", color: "#64748b" }} />
//                             <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
//                                 {stats.views} plays
//                             </Typography>
//                         </Box>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                             <Star style={{ fontSize: "16px", color: "#f59e0b", fill: "#f59e0b" }} />
//                             <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
//                                 {stats.rating}
//                             </Typography>
//                         </Box>
//                         <Chip
//                             label={record.updateDate ? new Date(record.updateDate).toLocaleDateString() : ""}
//                             size="small"
//                             sx={{
//                                 background: "linear-gradient(135deg, #06b6d415, #8b5cf610)",
//                                 color: "#06b6d4",
//                                 fontWeight: 600,
//                                 fontSize: "0.75rem",
//                             }} />
//                     </Box>



//                     <Divider sx={{ mb: 3, background: "linear-gradient(90deg, #f59e0b, #06b6d4)" }} />
//                     <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
//                         <button
//                             style={{
//                                 background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
//                                 color: "white",
//                                 fontWeight: 700,
//                                 border: "none",
//                                 borderRadius: "12px",
//                                 padding: "8px 20px",
//                                 cursor: "pointer",
//                                 fontSize: "1rem",
//                                 boxShadow: "0 4px 16px rgba(139, 92, 246, 0.15)",
//                                 transition: "background 0.3s, transform 0.2s"
//                             }}
//                             onClick={() => {

//                                 //dispatch(updateLesson(fixedLesson));
//                                 console.log("before go questions",record);
//                                 const folder=record.folder;
//                                 navigate(`${record.id}/questions`, { state: { folder } });
//                             }}
//                         >
//                             Go to Question
//                         </button>
//                     </Box>

//                 </Box>
//             </Box>

//         </>
//     );
// };

// export default DisplayLesson;
"use client"

import { Typography, Chip, Box, Button, Container, Paper, Avatar } from "@mui/material"
import { Headphones, Star, ArrowRight, MessageCircle, Users, Mic, HelpCircle } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import type { Lesson } from "../../Models/Lesson"
import VideoPlayer from "../VideoPlayer"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchLessons } from "../../Reducers/LessonsSlice"
import type { AppDispatch } from "../../Store/Store"
import { useTheme } from "@mui/material/styles"

const DisplayLesson = () => {
    const location = useLocation()
    const record = location.state?.record
    const stats = location.state?.stats
    const navigate = useNavigate()
    const theme = useTheme()

    console.log("record from state in display lesson:", record)

    const handlePlayClick = (record: Lesson) => {
        const urlPrefix = "https://s3.amazonaws.com/my-first-records-bucket.testpnoren/"
        const relativeUrl = record.s3Key.startsWith(urlPrefix) ? record.s3Key.substring(urlPrefix.length) : record.s3Key
        console.log("relativeUrl:", relativeUrl)
        return relativeUrl
    }

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchLessons())
    }, [dispatch])

    return (
        <Box sx={{ backgroundColor: "#f1f5f9", minHeight: "100vh", pt: 12 }}>
            <Container maxWidth="xl">
                {/* Header Section - Above Everything */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900,
                            fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                            background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,

                            //background: `linear-gradient(135deg, ${theme.palette.custom.main}, ${theme.palette.custom.secondary})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            mb: 3,
                            fontFamily: "'Playfair Display', serif",
                            lineHeight: 1.2,
                        }}
                    >
                        {record.fileName}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Headphones size={20} color={theme.palette.custom.main} />
                            <Typography variant="body1" sx={{ color: "text.secondary", fontWeight: 600 }}>
                                {stats.views} students watched
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Star size={20} color="#f59e0b" fill="#f59e0b" />
                            <Typography variant="body1" sx={{ color: "text.secondary", fontWeight: 600 }}>
                                {stats.rating} rating
                            </Typography>
                        </Box>

                        <Chip
                            label={record.updateDate ? new Date(record.updateDate).toLocaleDateString() : ""}
                            sx={{
                                backgroundColor: `${theme.palette.custom.accent}15`,
                                color: theme.palette.custom.accent,
                                fontWeight: 600,
                            }}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
                    {/* Main Content Area */}
                    <Box sx={{ flex: 3 }}>
                        {/* Video Section */}
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: "20px",
                                overflow: "hidden",
                                mb: 4,
                                background: "transparent",
                                border: "none", // Hide the border
                                boxShadow: "none", // Remove any shadow if present
                            }}
                        >
                            <VideoPlayer url={handlePlayClick(record)} vttUrl={record.transcriptionS3Key} />
                        </Paper>

                        {/* Features Section */}
                        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 3, mb: 4 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    borderRadius: "16px",
                                    background: "white",
                                    border: `1px solid ${theme.palette.custom.accent}20`,
                                    textAlign: "center",
                                }}
                            >
                                <Mic size={40} color={theme.palette.custom.secondary} style={{ marginBottom: "16px" }} />
                                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.custom.main, mb: 2 }}>
                                    Automatic Transcription
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                                    AI-powered transcription available for better accessibility and note-taking
                                </Typography>
                            </Paper>

                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    borderRadius: "16px",
                                    background: "white",
                                    border: `1px solid ${theme.palette.custom.accent}20`,
                                    textAlign: "center",
                                }}
                            >
                                <HelpCircle size={40} color={theme.palette.custom.vibrant} style={{ marginBottom: "16px" }} />
                                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.custom.main, mb: 2 }}>
                                    Ask Questions
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                                    Get help from fellow students and instructors in our collaborative learning environment
                                </Typography>
                            </Paper>

                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    borderRadius: "16px",
                                    background: "white",
                                    border: `1px solid ${theme.palette.custom.accent}20`,
                                    textAlign: "center",
                                }}
                            >
                                <Users size={40} color={theme.palette.custom.accent} style={{ marginBottom: "16px" }} />
                                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.custom.main, mb: 2 }}>
                                    Student Support
                                </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                                    Connect with other learners and help each other succeed through shared knowledge
                                </Typography>
                            </Paper>
                        </Box>
                    </Box>

                    {/* Sidebar */}
                    <Box sx={{ flex: 1, position: "sticky", top: 100 }}>
                        {/* Quiz Action */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                borderRadius: "20px",
                                background: `linear-gradient(135deg, ${theme.palette.custom.main}08, ${theme.palette.custom.secondary}08)`,
                                border: `2px solid ${theme.palette.custom.accent}20`,
                                mb: 4,
                                textAlign: "center",
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    color: theme.palette.custom.main,
                                    mb: 3,
                                }}
                            >
                                Test Your Knowledge
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: "text.secondary",
                                    mb: 4,
                                    lineHeight: 1.6,
                                }}
                            >
                                Join the shared question session where students help each other learn and grow together.
                            </Typography>

                            <Button
                                variant="contained"
                                fullWidth
                                endIcon={<ArrowRight size={20} />}
                                sx={{
                                    background: `linear-gradient(135deg, ${theme.palette.custom.secondary}, ${theme.palette.custom.vibrant})`,
                                    color: "white",
                                    fontWeight: 700,
                                    py: 2.5,
                                    borderRadius: "16px",
                                    fontSize: "1.1rem",
                                    textTransform: "none",
                                    boxShadow: "0 8px 24px rgba(139, 92, 246, 0.3)",
                                    "&:hover": {
                                        background: `linear-gradient(135deg, ${theme.palette.custom.vibrant}, ${theme.palette.custom.accent})`,
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 12px 32px rgba(139, 92, 246, 0.4)",
                                    },
                                }}
                                onClick={() => {
                                    console.log("before go questions", record)
                                    const folder = record.folder
                                    navigate(`${record.id}/questions`, { state: { folder } })
                                }}
                            >
                                Join Question Session
                            </Button>
                        </Paper>

                        {/* Community Section */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                borderRadius: "20px",
                                background: "white",
                                border: `1px solid ${theme.palette.custom.accent}20`,
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    color: theme.palette.custom.main,
                                    mb: 3,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                }}
                            >
                                <MessageCircle size={24} color={theme.palette.custom.accent} />
                                Learning Community
                            </Typography>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Avatar sx={{ width: 32, height: 32, backgroundColor: theme.palette.custom.secondary }}>S</Avatar>
                                    <Box>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.custom.main }}>
                                            Sarah M.
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                            "Great explanation! Really helped me understand."
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Avatar sx={{ width: 32, height: 32, backgroundColor: theme.palette.custom.vibrant }}>A</Avatar>
                                    <Box>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.custom.main }}>
                                            Alex K.
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                            "Anyone need help with the practice questions?"
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Avatar sx={{ width: 32, height: 32, backgroundColor: theme.palette.custom.accent }}>M</Avatar>
                                    <Box>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.custom.main }}>
                                            Maria L.
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                            "Thanks everyone for the support! 🎉"
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    mt: 3,
                                    p: 2,
                                    borderRadius: "12px",
                                    background: `${theme.palette.custom.accent}08`,
                                    textAlign: "center",
                                }}
                            >
                                <Typography variant="body2" sx={{ color: theme.palette.custom.accent, fontWeight: 600 }}>
                                    Join the conversation and help others learn!
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default DisplayLesson
