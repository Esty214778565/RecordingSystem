import { Typography, Chip, Divider, Box } from "@mui/material";
import { Clock, Headphones, Star } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Lesson } from "../../Models/Lesson";


import VideoPlayer from "../VideoPlayer";

const DisplayLesson = () => {
    const location = useLocation();
    const record = location.state?.record;
    const stats = location.state?.stats;
    const navigate = useNavigate();

    const handlePlayClick = (record: Lesson) => {
        const urlPrefix = "https://s3.amazonaws.com/my-first-records-bucket.testpnoren/"
        const relativeUrl = record.s3Key.startsWith(urlPrefix) ? record.s3Key.substring(urlPrefix.length) : record.s3Key
        console.log("relativeUrl:", relativeUrl)
        return relativeUrl;
    }


    return (
        <>



            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
                <VideoPlayer url={handlePlayClick(record)} />


                <Box sx={{ flex: 1 }}>

                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            color: "#0f172a",
                            fontFamily: "'Playfair Display', serif",
                            mb: 2,
                            cursor: "pointer",
                            transition: "color 0.3s ease",
                            "&:hover": {
                                color: "#f59e0b",
                            },
                        }}
                    >
                        {record.fileName}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3, flexWrap: "wrap" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Clock style={{ fontSize: "16px", color: "#64748b" }} />
                            <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                                {stats.duration} min
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Headphones style={{ fontSize: "16px", color: "#64748b" }} />
                            <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                                {stats.views} plays
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Star style={{ fontSize: "16px", color: "#f59e0b", fill: "#f59e0b" }} />
                            <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                                {stats.rating}
                            </Typography>
                        </Box>
                        <Chip
                            label={record.updateDate ? new Date(record.updateDate).toLocaleDateString() : ""}
                            size="small"
                            sx={{
                                background: "linear-gradient(135deg, #06b6d415, #8b5cf610)",
                                color: "#06b6d4",
                                fontWeight: 600,
                                fontSize: "0.75rem",
                            }} />
                    </Box>



                    <Divider sx={{ mb: 3, background: "linear-gradient(90deg, #f59e0b, #06b6d4)" }} />
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                        <button
                            style={{
                                background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                                color: "white",
                                fontWeight: 700,
                                border: "none",
                                borderRadius: "12px",
                                padding: "8px 20px",
                                cursor: "pointer",
                                fontSize: "1rem",
                                boxShadow: "0 4px 16px rgba(139, 92, 246, 0.15)",
                                transition: "background 0.3s, transform 0.2s"
                            }}
                            onClick={() => {

                                navigate('questions', { state: { record } });
                            }}
                        >
                            Go to Question
                        </button>
                    </Box>

                </Box>
            </Box>

        </>
    );
};

export default DisplayLesson;