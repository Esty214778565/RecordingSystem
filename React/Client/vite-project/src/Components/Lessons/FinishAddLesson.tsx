


"use client"

import type React from "react"

import { useState } from "react"
import FileUploader from "../UpLoadS3"
import type { Lesson } from "../../Models/Lesson"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../Store/Store"
import { addLesson, transcribe } from "../../Reducers/LessonsSlice"
import { fetchListOfTeachers } from "../../Reducers/CoursesSlice"
import {
  Box,
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  CircularProgress,
  LinearProgress,
} from "@mui/material"
import { Upload, FileAudio, Sparkles, BookOpen, Edit3, CheckCircle, Zap, Star, Clock, FileText } from "lucide-react"
import './FinishAddLesson.css'
import { useNavigate } from "react-router-dom"

const FinishAddLesson: React.FC<{ teacherFolderId: number }> = ({ teacherFolderId }) => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const [lessonName, setLessonName] = useState<string>("")
  const [lessonDescription, setLessonDescription] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleUploadSuccess = async (presignedUrl: string, fileType: string, fileSize: number) => {
    const lessonData: Lesson = {
      fileName: lessonName,
      description: lessonDescription,
      s3Key: presignedUrl,
      fileType: fileType,
      size: fileSize,
      folderId: Number(teacherFolderId),
      questions: [],
    }

    try {
      setLoading(true)
      setUploadProgress(25)
      const result = await dispatch(addLesson(lessonData))
      setUploadProgress(75)
      setUploadProgress(100)
      console.log("Lesson successfully saved:", result)
      dispatch(fetchListOfTeachers(Number(teacherFolderId)))
      // Safely extract id from payload if it exists
      const lessonId = (result.payload as { id?: number })?.id
      if (lessonId) {
        handletranscribe(presignedUrl, lessonId)
      }

    } catch (error) {
      console.error("Error saving lesson:", error)
      alert("An error occurred while saving the lesson. Please try again.")
    } finally {
      setLoading(false)
      setUploadProgress(0)
      navigate("/courses");
    }
  }
  const handletranscribe = async (s3Key: string, lessonId: number) => {

    const res: any = await dispatch(transcribe({ s3Url: s3Key, recordId: lessonId }))

    console.log("Transcription result:", res);

    console.log(res.payload.TranscriptionVttKey);
    console.log(res.payload.TranscriptionTextKey);

    if (res.error) {
      console.error("Error during transcription:", res.error.message);
    }
  }
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 30%, #f59e0b05 70%, #06b6d403 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
      }}
    >
      {/* Animated background elements */}
      <Box className="bg-animation-finish-lesson" />

      <Container maxWidth="lg">
        {/* Main Card */}
        <Card
          sx={{
            borderRadius: "32px",
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(30px)",
            border: "2px solid rgba(245, 158, 11, 0.1)",
            boxShadow: "0 25px 80px rgba(15, 23, 42, 0.15)",
            position: "relative",
          }}
          className="finish-lesson-main-card"
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

          <CardContent sx={{ p: { xs: 4, md: 6 } }}>
            {/* Header Section */}
            <Box sx={{ textAlign: "center", mb: 6 }} className="finish-lesson-header">
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 4,
                  boxShadow: "0 20px 60px rgba(139, 92, 246, 0.3)",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: "-4px",
                    background: "linear-gradient(135deg, #f59e0b, #06b6d4)",
                    borderRadius: "50%",
                    zIndex: -1,
                    opacity: 0.7,
                  },
                }}
                className="finish-lesson-icon-pulse"
              >
                <Upload style={{ fontSize: "60px", color: "white" }} />
              </Box>

              <Chip
                icon={<Sparkles style={{ color: "#f59e0b" }} />}
                label="🎯 Final Step - Upload Your Lesson"
                sx={{
                  background: "linear-gradient(135deg, #f59e0b15, #06b6d410)",
                  color: "#0f172a",
                  fontWeight: 700,
                  fontSize: "1rem",
                  mb: 3,
                  border: "2px solid #f59e0b30",
                  boxShadow: "0 8px 24px rgba(245, 158, 11, 0.2)",
                  px: 2,
                  py: 1,
                }}
                className="finish-lesson-badge-glow"
              />

              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: 900,
                  mb: 3,
                  fontFamily: "'Playfair Display', serif",
                  background: "linear-gradient(135deg, #0f172a, #8b5cf6, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1.2,
                }}
                className="finish-lesson-title-shimmer"
              >
                Complete Your{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(135deg, #f59e0b, #06b6d4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Masterpiece
                </Box>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.2rem",
                  color: "#64748b",
                  lineHeight: 1.7,
                  fontWeight: 500,
                  maxWidth: "700px",
                  mx: "auto",
                }}
              >
                Add the finishing touches to your educational content. Provide details and upload your lesson to share
                knowledge with students worldwide.
              </Typography>
            </Box>

            <Divider sx={{ mb: 6, background: "linear-gradient(90deg, #f59e0b, #06b6d4)" }} />

            {/* Progress Bar */}
            {loading && (
              <Box sx={{ mb: 4 }} className="upload-progress-section">
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <CircularProgress size={24} sx={{ color: "#f59e0b" }} className="progress-spinner" />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: "#0f172a",
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    Uploading Your Lesson...
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "rgba(245, 158, 11, 0.1)",
                    "& .MuiLinearProgress-bar": {
                      background: "linear-gradient(90deg, #f59e0b, #06b6d4)",
                      borderRadius: 4,
                    },
                  }}
                  className="progress-bar-glow"
                />
                <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600, mt: 1, textAlign: "center" }}>
                  {uploadProgress}% Complete
                </Typography>
              </Box>
            )}

            {/* Form Section */}
            <Stack spacing={4} className="finish-lesson-form">
              {/* Lesson Name */}
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #06b6d415, #8b5cf610)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Edit3 style={{ fontSize: "24px", color: "#06b6d4" }} />
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
                      Lesson Title
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                      Give your lesson a compelling and descriptive name
                    </Typography>
                  </Box>
                </Box>

                <TextField
                  fullWidth
                  placeholder="Enter lesson title..."
                  value={lessonName}
                  onChange={(e) => setLessonName(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                      background: "rgba(255, 255, 255, 0.9)",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      "& fieldset": {
                        border: "2px solid rgba(6, 182, 212, 0.2)",
                      },
                      "&:hover fieldset": {
                        border: "2px solid rgba(6, 182, 212, 0.4)",
                      },
                      "&.Mui-focused fieldset": {
                        border: "2px solid #06b6d4",
                      },
                    },
                  }}
                  className="lesson-name-input-glow"
                />
              </Box>

              {/* Lesson Description */}
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #8b5cf615, #f59e0b10)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FileText style={{ fontSize: "24px", color: "#8b5cf6" }} />
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
                      Lesson Description
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                      Provide a detailed description of what students will learn
                    </Typography>
                  </Box>
                </Box>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Describe your lesson content, objectives, and key learning outcomes..."
                  value={lessonDescription}
                  onChange={(e) => setLessonDescription(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                      background: "rgba(255, 255, 255, 0.9)",
                      fontSize: "1.1rem",
                      fontWeight: 500,
                      "& fieldset": {
                        border: "2px solid rgba(139, 92, 246, 0.2)",
                      },
                      "&:hover fieldset": {
                        border: "2px solid rgba(139, 92, 246, 0.4)",
                      },
                      "&.Mui-focused fieldset": {
                        border: "2px solid #8b5cf6",
                      },
                    },
                  }}
                  className="lesson-description-input-glow"
                />
              </Box>

              {/* File Upload Section */}
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #f59e0b15, #ef444410)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FileAudio style={{ fontSize: "24px", color: "#f59e0b" }} />
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
                      Upload Content
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                      Upload your audio, video, or document files
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    background: "linear-gradient(135deg, #f59e0b08, #06b6d405)",
                    borderRadius: "20px",
                    p: 4,
                    border: "2px dashed rgba(245, 158, 11, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      border: "2px dashed rgba(245, 158, 11, 0.6)",
                      background: "linear-gradient(135deg, #f59e0b12, #06b6d408)",
                    },
                  }}
                  className="file-upload-zone"
                >
                  <FileUploader onUploadSuccess={handleUploadSuccess} />
                </Box>
              </Box>

              {/* Stats Section */}
              <Box sx={{ pt: 4 }}>
                <Box
                  sx={{
                    background: "linear-gradient(135deg, #0f172a08, #8b5cf605)",
                    borderRadius: "20px",
                    p: 4,
                    border: "1px solid rgba(15, 23, 42, 0.1)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <Star style={{ fontSize: "24px", color: "#f59e0b" }} />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#0f172a",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      Lesson Impact Preview
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 3 }}>
                    <Box sx={{ textAlign: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
                        <BookOpen style={{ fontSize: "20px", color: "#06b6d4" }} />
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            color: "#06b6d4",
                            fontFamily: "'Playfair Display', serif",
                          }}
                        >
                          Premium
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                        Quality Content
                      </Typography>
                    </Box>

                    <Box sx={{ textAlign: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
                        <Clock style={{ fontSize: "20px", color: "#8b5cf6" }} />
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            color: "#8b5cf6",
                            fontFamily: "'Playfair Display', serif",
                          }}
                        >
                          24/7
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                        Available Access
                      </Typography>
                    </Box>

                    <Box sx={{ textAlign: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
                        <Zap style={{ fontSize: "20px", color: "#f59e0b" }} />
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            color: "#f59e0b",
                            fontFamily: "'Playfair Display', serif",
                          }}
                        >
                          Instant
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                        Global Reach
                      </Typography>
                    </Box>

                    <Box sx={{ textAlign: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
                        <CheckCircle style={{ fontSize: "20px", color: "#10b981" }} />
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            color: "#10b981",
                            fontFamily: "'Playfair Display', serif",
                          }}
                        >
                          Verified
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                        Expert Content
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default FinishAddLesson


