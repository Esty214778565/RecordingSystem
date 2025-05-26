
"use client"

import { useDispatch, useSelector } from "react-redux"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import type { AppDispatch, RootState } from "../../Store/Store"
import { useEffect, useState } from "react"
import { fetchListOfTeachers } from "../../Reducers/CoursesSlice"
import { deleteLesson, updateLesson } from "../../Reducers/LessonsSlice"
import { Box, Button, TextField, Typography, Card, CardContent, Chip, Stack, Container, Divider } from "@mui/material"
import {
  Play,
  Edit3,
  Trash2,
  Save,
  X,
  Calendar,
  FileAudio,
  User,
  BookOpen,
  Headphones,
  Clock,
  Star,
} from "lucide-react"
import type { Lesson } from "../../Models/Lesson"
import QuestionList from "./QuestionList"
import './LessonTeacher.css'

const LessonsTeacher = () => {
  console.log("enter to LessonTeacher")

  const [editingRecord, setEditingRecord] = useState<{ id: number; fileName: string } | null>(null)
  const [updatedFileName, setUpdatedFileName] = useState<string>("")

  const dispatch = useDispatch<AppDispatch>()
  useSelector((state: RootState) => state.courses)
  const { courseId } = useParams<{ courseId: string }>()
  const { teacherId } = useParams<{ teacherId: string }>()

  const teacher = useSelector((state: RootState) =>
    state.courses.teachers.find((teacher) => teacher.id === Number(teacherId)),
  )
  const navigate = useNavigate()

  const handleDelete = async (recordId: number) => {
    await dispatch(deleteLesson(recordId))

    if (teacher?.records.length === 1) {
      window.location.pathname = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/"))
    }
    await dispatch(fetchListOfTeachers(Number(teacherId)))
  }

  useEffect(() => {
    const fetchTeachers = async () => {
      if (!teacher) {
        await dispatch(fetchListOfTeachers(Number(teacherId)))
      }
    }
    fetchTeachers()
  }, [dispatch, teacher, teacherId])

  const handleUpdate = async (record: Lesson) => {
    if (updatedFileName.trim()) {
      const updatedRecord = { ...record, fileName: updatedFileName, questions: record.questions || [] }
      const res = await dispatch(updateLesson(updatedRecord))
      console.log("res in handleUpdate:", res)
      setEditingRecord(null)
      setUpdatedFileName("")
      await dispatch(fetchListOfTeachers(Number(teacherId)))
    }
  }

  const handleEdit = async (record: Lesson) => {
    const res = await dispatch(updateLesson(record))
    const res2 = await dispatch(fetchListOfTeachers(Number(teacherId)))
    console.log("res in handleEdit:", res)
    console.log("res2 in handleEdit:", res2)
  }

  const handleLessonClick = (record: any) => {
    const urlPrefix = "https://s3.amazonaws.com/my-first-records-bucket.testpnoren/"
    const relativeUrl = record.s3Key.startsWith(urlPrefix) ? record.s3Key.substring(urlPrefix.length) : record.s3Key
    console.log("relativeUrl:", relativeUrl)
    navigate(`/courses/${courseId}/${teacherId}/${relativeUrl}`)
  }

  const getRandomStats = () => ({
    duration: Math.floor(Math.random() * 45) + 15,
    views: Math.floor(Math.random() * 500) + 50,
    rating: (Math.random() * 2 + 3).toFixed(1),
  })

  if (!teacher) {
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
        className="loading-container-lessons"
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
            className="loading-pulse-lessons"
          >
            <Headphones style={{ fontSize: "60px", color: "white" }} />
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
            Loading Lessons...
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#64748b",
              fontSize: "1.1rem",
            }}
          >
            Preparing your educational content
          </Typography>
        </Box>
      </Box>
    )
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
      <Box className="bg-animation-lessons" />

      <Container maxWidth="xl" sx={{ pt: 6, pb: 8 }}>
        {/* Header Section */}
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
          </Box>
        </Box>

        {/* Lessons Grid */}
        <Stack spacing={4}>
          {teacher?.records?.map((record, index) => {
            const stats = getRandomStats()
            return (
              <Card
                key={index}
                sx={{
                  borderRadius: "24px",
                  overflow: "hidden",
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(20px)",
                  border: "2px solid transparent",
                  boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 25px 80px rgba(15, 23, 42, 0.15)",
                    border: "2px solid rgba(245, 158, 11, 0.3)",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: `linear-gradient(90deg, #f59e0b, #06b6d4, #8b5cf6)`,
                    zIndex: 1,
                  },
                }}
                className={`lesson-card-${index % 3}`}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
                    {/* Audio Icon */}
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "20px",
                        background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 12px 32px rgba(139, 92, 246, 0.3)",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 16px 40px rgba(139, 92, 246, 0.5)",
                        },
                      }}
                      className="lesson-play-button"
                      onClick={() => handleLessonClick(record)}
                    >
                      <Play style={{ fontSize: "36px", color: "white", marginLeft: "4px" }} />
                    </Box>

                    {/* Lesson Content */}
                    <Box sx={{ flex: 1 }}>
                      {editingRecord && editingRecord.id === record.id ? (
                        <Box sx={{ mb: 3 }}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            value={updatedFileName}
                            onChange={(e) => setUpdatedFileName(e.target.value)}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "16px",
                                background: "rgba(255, 255, 255, 0.9)",
                                fontSize: "1.1rem",
                                fontWeight: 600,
                                border: "2px solid #f59e0b30",
                                "&:hover": {
                                  border: "2px solid #f59e0b50",
                                },
                                "&.Mui-focused": {
                                  border: "2px solid #f59e0b",
                                },
                              },
                            }}
                          />
                        </Box>
                      ) : (
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
                          onClick={() => handleLessonClick(record)}
                          className="lesson-title-hover"
                        >
                          {record.fileName}
                        </Typography>
                      )}

                      {/* Lesson Stats */}
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
                          }}
                        />
                      </Box>

                      {/* Action Buttons */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                        {editingRecord && editingRecord.id === record.id ? (
                          <>
                            <Button
                              variant="contained"
                              startIcon={<Save style={{ fontSize: "18px" }} />}
                              onClick={() => record.id !== undefined && handleUpdate(record)}
                              sx={{
                                background: "linear-gradient(135deg, #10b981, #06b6d4)",
                                color: "white",
                                fontWeight: 700,
                                borderRadius: "12px",
                                px: 3,
                                py: 1,
                                boxShadow: "0 8px 24px rgba(16, 185, 129, 0.3)",
                                "&:hover": {
                                  background: "linear-gradient(135deg, #059669, #0891b2)",
                                  transform: "translateY(-2px)",
                                  boxShadow: "0 12px 32px rgba(16, 185, 129, 0.4)",
                                },
                              }}
                              className="save-button-glow"
                            >
                              Save Changes
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<X style={{ fontSize: "18px" }} />}
                              onClick={() => setEditingRecord(null)}
                              sx={{
                                borderColor: "#64748b",
                                color: "#64748b",
                                fontWeight: 700,
                                borderRadius: "12px",
                                px: 3,
                                py: 1,
                                borderWidth: 2,
                                "&:hover": {
                                  borderColor: "#ef4444",
                                  color: "#ef4444",
                                  backgroundColor: "rgba(239, 68, 68, 0.05)",
                                  transform: "translateY(-2px)",
                                },
                              }}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          teacher?.teacherId === Number(sessionStorage.getItem("userId")) && (
                            <>
                              <Button
                                variant="contained"
                                startIcon={<Edit3 style={{ fontSize: "18px" }} />}
                                onClick={() =>
                                  record.id !== undefined &&
                                  setEditingRecord({ id: record.id, fileName: record.fileName })
                                }
                                sx={{
                                  background: "linear-gradient(135deg, #f59e0b, #06b6d4)",
                                  color: "white",
                                  fontWeight: 700,
                                  borderRadius: "12px",
                                  px: 3,
                                  py: 1,
                                  boxShadow: "0 8px 24px rgba(245, 158, 11, 0.3)",
                                  "&:hover": {
                                    background: "linear-gradient(135deg, #d97706, #0891b2)",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 12px 32px rgba(245, 158, 11, 0.4)",
                                  },
                                }}
                                className="edit-button-glow"
                              >
                                Edit Lesson
                              </Button>
                              <Button
                                variant="outlined"
                                startIcon={<Trash2 style={{ fontSize: "18px" }} />}
                                onClick={() => record.id !== undefined && handleDelete(record.id)}
                                sx={{
                                  borderColor: "#ef4444",
                                  color: "#ef4444",
                                  fontWeight: 700,
                                  borderRadius: "12px",
                                  px: 3,
                                  py: 1,
                                  borderWidth: 2,
                                  "&:hover": {
                                    backgroundColor: "#ef4444",
                                    color: "white",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 12px 32px rgba(239, 68, 68, 0.4)",
                                  },
                                }}
                                className="delete-button-glow"
                              >
                                Delete
                              </Button>
                            </>
                          )
                        )}
                      </Box>

                      {/* Question List */}
                      <Divider sx={{ mb: 3, background: "linear-gradient(90deg, #f59e0b, #06b6d4)" }} />
                      <QuestionList record={record} setRecord={handleEdit} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            )
          })}
        </Stack>
      </Container>

      <Outlet />
    </Box>
  )
}

export default LessonsTeacher
