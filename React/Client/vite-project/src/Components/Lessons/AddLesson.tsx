

"use client"

import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../Store/Store"
import { useEffect, useState } from "react"
import {
  addCourse,
  fechcoursesKategories as fechcoursesCategories,
  fetchListOfTeachers,
} from "../../Reducers/CoursesSlice"
import type { Course } from "../../Models/Course"
import FinishAddLesson from "./FinishAddLesson"
import {
  Box,
  Container,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  Stack,
  Divider,
} from "@mui/material"
import { Plus, BookOpen, Sparkles, GraduationCap, Folder, Zap, Star, Rocket, ChevronDown } from "lucide-react"
import './AddLesson.css'

const AddLesson = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { courses } = useSelector((state: RootState) => state.courses)
  const [showNewCourseInput, setShowNewCourseInput] = useState(false)
  const [newCourseName, setNewCourseName] = useState("")
  const [selectedCourseId, setSelectedCourseId] = useState(0)
  const [teacherFolderId, setTeacherFolderId] = useState(0)
  const [finishAddLesson, setFinishAddLesson] = useState(false)

  useEffect(() => {
    dispatch(fechcoursesCategories())
  }, [dispatch])

  const handleCourseSelection = (e: any) => {
    const selectedValue = e.target.value
    if (selectedValue === "new") {
      setShowNewCourseInput(true)
      setSelectedCourseId(0)
    } else {
      setShowNewCourseInput(false)
      setSelectedCourseId(Number(selectedValue))
    }
  }

  const handleSubmit = async () => {
    let courseId = selectedCourseId
    if (showNewCourseInput) {
      if (newCourseName.trim() === "") {
        alert("Please enter a course name.")
        return
      }
      courseId = await addNewCourse()
    } else {
      if (selectedCourseId === 0) {
        alert("Please select a course.")
        return
      }
    }
    await fetchTeachersAndAddLesson(courseId)
  }

  const addNewCourse = async () => {
    const course: Course = {
      id: 0,
      name: newCourseName,
      teacherId: Number(null),
      createDate: new Date(),
      updateDate: new Date(),
      isDeleted: false,
      parentFolderId: Number(null),
      records: [],
    }
    try {
      const res = await dispatch(addCourse(course))
      if ("payload" in res) {
        const payload: any = res?.payload
        const courseId = payload?.id
        setSelectedCourseId(courseId.toString())
        return courseId
      } else {
        alert("An error occurred while adding the course. Please try again.")
      }
    } catch (error) {
      alert("An error occurred while adding the course. Please try again.")
    }
  }

  const fetchTeachersAndAddLesson = async (courseId: number) => {
    try {
      const res = await dispatch(fetchListOfTeachers(courseId))
      if ("payload" in res && res.payload && Array.isArray(res.payload)) {
        const teachers = res.payload
        const userId = Number(sessionStorage.getItem("userId"))
        const teacher = teachers.find((teacher: { teacherId: number }) => teacher.teacherId === userId)
        if (teacher) {
          setTeacherFolderId(teacher.id)
          setFinishAddLesson(true)
        } else {
          addTeacherToCourse(userId, courseId)
        }
      } else {
        alert("An error occurred while fetching teachers. Please try again.")
      }
    } catch (error) {
      alert("An error occurred while fetching teachers. Please try again.")
    }
  }

  const addTeacherToCourse = async (userId: number, courseId: number) => {
    const teacher: Course = {
      id: 0,
      name: sessionStorage.getItem("userName") || "Unknown User",
      teacherId: userId,
      createDate: new Date(),
      updateDate: new Date(),
      isDeleted: false,
      parentFolderId: courseId,
      records: [],
    }
    try {
      const res2 = await dispatch(addCourse(teacher))
      if ("payload" in res2 && res2.payload && (res2.payload as Course).id) {
        setTeacherFolderId((res2.payload as Course).id)
        setFinishAddLesson(true)
      } else {
        alert("An error occurred while adding the teacher. Please try again.")
      }
    } catch (error) {
      alert("An error occurred while adding the teacher. Please try again.")
    }
  }

  if (finishAddLesson) {
    return <FinishAddLesson teacherFolderId={teacherFolderId} />
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
      <Box className="bg-animation-add-lesson" />

      <Container maxWidth="md">
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
          className="add-lesson-main-card"
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
            <Box sx={{ textAlign: "center", mb: 6 }} className="add-lesson-header">
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
                  mb: 4,
                  boxShadow: "0 20px 60px rgba(15, 23, 42, 0.3)",
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
                className="add-lesson-icon-pulse"
              >
                <Plus style={{ fontSize: "60px", color: "white" }} />
              </Box>

              <Chip
                icon={<Sparkles style={{ color: "#f59e0b" }} />}
                label="🚀 Create Educational Content"
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
                className="add-lesson-badge-glow"
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
                className="add-lesson-title-shimmer"
              >
                Add New{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(135deg, #f59e0b, #06b6d4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Lesson
                </Box>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.2rem",
                  color: "#64748b",
                  lineHeight: 1.7,
                  fontWeight: 500,
                  maxWidth: "600px",
                  mx: "auto",
                }}
              >
                Create exceptional educational content and share your knowledge with students worldwide through our
                sophisticated platform.
              </Typography>
            </Box>

            <Divider sx={{ mb: 6, background: "linear-gradient(90deg, #f59e0b, #06b6d4)" }} />

            {/* Form Section */}
            <Stack spacing={4} className="add-lesson-form">
              {/* Course Selection */}
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
                    <BookOpen style={{ fontSize: "24px", color: "#06b6d4" }} />
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
                      Select Course
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                      Choose an existing course or create a new one
                    </Typography>
                  </Box>
                </Box>

                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      color: "#64748b",
                      fontWeight: 600,
                      "&.Mui-focused": {
                        color: "#f59e0b",
                      },
                    }}
                  >
                    Course Selection
                  </InputLabel>
                  <Select
                    value={selectedCourseId === 0 ? "" : selectedCourseId}
                    onChange={handleCourseSelection}
                    label="Course Selection"
                    IconComponent={ChevronDown}
                    sx={{
                      borderRadius: "16px",
                      background: "rgba(255, 255, 255, 0.9)",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid rgba(245, 158, 11, 0.2)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid rgba(245, 158, 11, 0.4)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid #f59e0b",
                      },
                    }}
                    className="course-select-glow"
                  >
                    <MenuItem value="" disabled>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Folder style={{ fontSize: "20px", color: "#64748b" }} />
                        <Typography>Select a course</Typography>
                      </Box>
                    </MenuItem>
                    {courses.map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <GraduationCap style={{ fontSize: "20px", color: "#06b6d4" }} />
                          <Typography>{course.name}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                    <MenuItem value="new">
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Plus style={{ fontSize: "20px", color: "#f59e0b" }} />
                        <Typography sx={{ fontWeight: 700, color: "#f59e0b" }}>Create New Course</Typography>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* New Course Input */}
              {showNewCourseInput && (
                <Box className="new-course-input-animation">
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
                      <Star style={{ fontSize: "24px", color: "#f59e0b" }} />
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
                        New Course Name
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                        Enter a name for your new course
                      </Typography>
                    </Box>
                  </Box>

                  <TextField
                    fullWidth
                    placeholder="Enter course name..."
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                        background: "rgba(255, 255, 255, 0.9)",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        "& fieldset": {
                          border: "2px solid rgba(245, 158, 11, 0.2)",
                        },
                        "&:hover fieldset": {
                          border: "2px solid rgba(245, 158, 11, 0.4)",
                        },
                        "&.Mui-focused fieldset": {
                          border: "2px solid #f59e0b",
                        },
                      },
                    }}
                    className="new-course-input-glow"
                  />
                </Box>
              )}

              {/* Submit Button */}
              <Box sx={{ pt: 4 }}>
                <Button
                  fullWidth
                  onClick={handleSubmit}
                  sx={{
                    background: "linear-gradient(135deg, #0f172a, #8b5cf6)",
                    color: "white",
                    fontWeight: 800,
                    fontSize: "1.2rem",
                    py: 2.5,
                    borderRadius: "16px",
                    boxShadow: "0 16px 40px rgba(15, 23, 42, 0.3)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      background: "linear-gradient(135deg, #f59e0b, #06b6d4)",
                      transform: "translateY(-4px)",
                      boxShadow: "0 20px 60px rgba(245, 158, 11, 0.4)",
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
                  className="submit-button-glow"
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Rocket style={{ fontSize: "24px" }} />
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      Create Lesson
                    </Typography>
                    <Zap style={{ fontSize: "24px" }} />
                  </Box>
                </Button>
              </Box>

              {/* Stats Section */}
              <Box sx={{ pt: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        color: "#f59e0b",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {courses.length}+
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                      Active Courses
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        color: "#06b6d4",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      150+
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                      Expert Teachers
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        color: "#8b5cf6",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      2.5K+
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                      Students
                    </Typography>
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

export default AddLesson

