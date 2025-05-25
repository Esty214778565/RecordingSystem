// // import { ChangeEvent, useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { TextField, List, ListItem, ListItemText, Typography, Container, CircularProgress } from '@mui/material';
// // import { Outlet, useNavigate } from 'react-router-dom';
// // import { fechcoursesKategories } from '../../Reducers/CoursesSlice';
// // import { AppDispatch, RootState } from '../../Store/Store';

// // import AddLesson from '../Lessons/AddLesson';

// // const AllCourses = () => {
// //     const dispatch = useDispatch<AppDispatch>();
// //     const navigate = useNavigate();
// //     const { courses, loading, error } = useSelector((state: RootState) => state.courses);
// //     const [searchTerm, setSearchTerm] = useState('');


// //     useEffect(() => {
// //         dispatch(fechcoursesKategories());
// //     }, [dispatch]);

// //     // useEffect(() => {
// //     //     if (courses.length > 0) {
// //     //         dispatch(fechcoursesKategories());
// //     //     }
// //     // }, [courses]);

// //     if (!courses || courses.length === 0) {
// //         return <div>Loading...</div>;
// //     }
// //     const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
// //         console.log("searching");
// //         setSearchTerm(e.target.value);
// //         console.log(filteredCourses);
// //         console.log("courss:" + courses);

// //     };

// //     const filteredCourses = courses.filter(course =>
// //         course.name.toLowerCase().includes(searchTerm.toLowerCase())
// //     );

// //     const handleCourseClick = (courseId: number) => {

// //         navigate(`/courses/${courseId}`);
// //     };

// //     return (
// //         <><Container>
// //             <Typography variant="h4" gutterBottom>
// //                 All Courses
// //             </Typography>
// //             <TextField
// //                 label="Search Courses"
// //                 variant="outlined"
// //                 fullWidth
// //                 margin="normal"
// //                 value={searchTerm}
// //                 onChange={handleSearchChange} />
// //             {sessionStorage.getItem('role') === 'teacher' && (
// //                 <button onClick={() => navigate('/add-course')}>
// //                     Add Course
// //                 </button>
// //             )}
// //             {loading ? (
// //                 <CircularProgress />
// //             ) : error ? (
// //                 <Typography color="error">{error}</Typography>
// //             ) : (
// //                 <><List>
// //                     list of courses
// //                     {filteredCourses.map((course) => (
// //                         <ListItem component="button" key={course.id} onClick={() => handleCourseClick(course.id)}>
// //                             <ListItemText primary={course.name} />
// //                         </ListItem>
// //                     ))}
// //                 </List><Outlet /></>
// //             )}
// //             {/* <UpLoadS3 />
// //             <DownLoadS3 /> */}
// //             {sessionStorage.getItem('role') === 'teacher' && <AddLesson />}

// //         </Container><Outlet /></>
// //     );
// // };

// // export default AllCourses;

// import { ChangeEvent, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, Typography, CircularProgress, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
// import { Outlet, useNavigate } from 'react-router-dom';
// import { fechcoursesKategories } from '../../Reducers/CoursesSlice';
// import { AppDispatch, RootState } from '../../Store/Store';


// const AllCourses = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();
//     const { courses, loading, error } = useSelector((state: RootState) => state.courses);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         dispatch(fechcoursesKategories());
//     }, [dispatch]);

//     if (!courses || courses.length === 0) {
//         return <div>Loading...</div>;
//     }

//     const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(e.target.value);
//     };

//     const filteredCourses = courses.filter(course =>
//         course.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const handleCourseClick = (courseId: number) => {
//         navigate(`/courses/${courseId}`);
//     };

//     const DEFAULT_IMAGE_URL = './../../../public/Images/img1.jpg'; // Default image

//     // Example courses with images (replace or integrate with your data)
//     const coursesWithImages = filteredCourses.map(course => ({
//         ...course,
//         image: DEFAULT_IMAGE_URL, // Add image property if not already present
//     }));
//     // const getRandomImageUrl = (): string => {
//     //     const randomNumber=  Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
//     //  return randomNumber.toString();// Adjust the path as needed
//     // };
//     const getRandomImageUrl = (): string => {
//         const randomNumber = Math.floor(Math.random() * 16) + 1; // Random number between 1 and 10
//         return `./../../../public/Images/img${randomNumber}.jpg`; // Adjust the path as needed
//     };
//     return (
//         <Box sx={{ width: '100%', height: '100%', backgroundColor: '#f9f9f9' }}>
//             {/* Full Width Image with Button */}


//             <Box sx={{ width: '100%', px: 2 }}>
//                 <Typography variant="h4" gutterBottom>
//                     All Courses
//                 </Typography>
//                 <TextField
//                     label="Search Courses"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                 />
//                 {loading ? (
//                     <CircularProgress />
//                 ) : error ? (
//                     <Typography color="error">{error}</Typography>
//                 ) : (
//                     <Grid container spacing={4}>
//                         {coursesWithImages.map((course) => (
//                             <Grid item xs={12} sm={6} md={3} key={course.id}>
//                                 <Card
//                                     onClick={() => handleCourseClick(course.id)}
//                                     style={{ cursor: 'pointer' }}
//                                 >
//                                     <CardMedia
//                                         component="img"
//                                         height="140"
//                                         // image={course.image} // Use the image property
//                                         image={getRandomImageUrl()} // Use the image property
//                                         alt={course.name}
//                                     />
//                                     <CardContent>
//                                         <Typography variant="h6" component="div" align="center">
//                                             {course.name}
//                                         </Typography>
//                                     </CardContent>
//                                 </Card>
//                             </Grid>
//                         ))}
//                     </Grid>
//                 )}


//                 <Outlet />

//             </Box>
//         </Box>
//     );
// };

// export default AllCourses;



"use client"

import { type ChangeEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  TextField,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  InputAdornment,
} from "@mui/material"
import { Outlet, useNavigate } from "react-router-dom"
import { Search, BookOpen, Users, Clock, Star, Zap, TrendingUp } from "lucide-react"
import { fechcoursesKategories } from "../../Reducers/CoursesSlice"
import type { AppDispatch, RootState } from "../../Store/Store"
import './AllCourses.css'


const AllCourses = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { courses, loading, error } = useSelector((state: RootState) => state.courses)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    dispatch(fechcoursesKategories())
  }, [dispatch])

  if (!courses || courses.length === 0) {
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
        className="loading-container"
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
            className="loading-pulse"
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
            Loading Courses...
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#64748b",
              fontSize: "1.1rem",
            }}
          >
            Preparing your educational journey
          </Typography>
        </Box>
      </Box>
    )
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredCourses = courses.filter((course) => course.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleCourseClick = (courseId: number) => {
    navigate(`/courses/${courseId}`)
  }

  const DEFAULT_IMAGE_URL = "./../../../public/Images/img1.jpg"

  const coursesWithImages = filteredCourses.map((course) => ({
    ...course,
    image: DEFAULT_IMAGE_URL,
  }))

  const getRandomImageUrl = (): string => {
    const randomNumber = Math.floor(Math.random() * 16) + 1
    return `./../../../public/Images/img${randomNumber}.jpg`
  }

  // Mock data for enhanced course display
  const getRandomStats = () => ({
    students: Math.floor(Math.random() * 500) + 50,
    duration: Math.floor(Math.random() * 20) + 5,
    rating: (Math.random() * 2 + 3).toFixed(1),
    level: ["Beginner", "Intermediate", "Advanced"][Math.floor(Math.random() * 3)],
    category: ["Technology", "Business", "Design", "Science", "Arts"][Math.floor(Math.random() * 5)],
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "#10b981"
      case "Intermediate":
        return "#f59e0b"
      case "Advanced":
        return "#ef4444"
      default:
        return "#06b6d4"
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
      }}
    >
      {/* Animated background elements */}
      <Box className="bg-animation-courses" />

      {/* Hero Section */}
      <Box
        sx={{
          pt: 8,
          pb: 6,
          px: { xs: 2, md: 4 },
          position: "relative",
          textAlign: "center",
        }}
        className="hero-section-courses"
      >
        <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
          <Chip
            icon={<TrendingUp style={{ color: "#f59e0b" }} />}
            label="🎓 Premium Course Collection"
            sx={{
              background: "linear-gradient(135deg, #f59e0b15, #06b6d410)",
              color: "#0f172a",
              fontWeight: 700,
              fontSize: "1rem",
              py: 3,
              px: 3,
              mb: 4,
              border: "2px solid #f59e0b30",
              boxShadow: "0 8px 24px rgba(245, 158, 11, 0.2)",
            }}
            className="chip-glow-courses"
          />

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "3rem", md: "4.5rem", lg: "5rem" },
              fontWeight: 900,
              mb: 3,
              fontFamily: "'Playfair Display', serif",
              background: "linear-gradient(135deg, #0f172a, #8b5cf6, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.1,
            }}
            className="title-shimmer"
          >
            Discover Your Next{" "}
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
              fontSize: "1.3rem",
              color: "#64748b",
              mb: 6,
              maxWidth: "700px",
              mx: "auto",
              lineHeight: 1.7,
              fontWeight: 500,
            }}
          >
            Explore our curated collection of premium courses designed by world-class educators and industry experts.
          </Typography>

          {/* Enhanced Search Field */}
          <Box sx={{ maxWidth: "600px", mx: "auto", mb: 4 }}>
            <TextField
              label="Search Your Perfect Course"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search style={{ color: "#f59e0b", fontSize: "24px" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(20px)",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  py: 1,
                  border: "2px solid transparent",
                  boxShadow: "0 12px 40px rgba(15, 23, 42, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    border: "2px solid #f59e0b30",
                    boxShadow: "0 16px 50px rgba(245, 158, 11, 0.2)",
                    transform: "translateY(-2px)",
                  },
                  "&.Mui-focused": {
                    border: "2px solid #f59e0b",
                    boxShadow: "0 20px 60px rgba(245, 158, 11, 0.3)",
                    transform: "translateY(-4px)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#64748b",
                  fontWeight: 600,
                  "&.Mui-focused": {
                    color: "#f59e0b",
                  },
                },
              }}
              className="search-field-glow"
            />
          </Box>

          {/* Course Stats */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#f59e0b",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {courses.length}+
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                Premium Courses
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#06b6d4",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                50K+
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                Active Students
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: "#8b5cf6",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                4.9★
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                Average Rating
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Courses Grid */}
      <Box sx={{ px: { xs: 2, md: 4 }, pb: 8 }}>
        <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <Box sx={{ textAlign: "center" }}>
                <CircularProgress
                  size={60}
                  thickness={4}
                  sx={{
                    color: "#f59e0b",
                    mb: 3,
                  }}
                  className="loading-spinner"
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: "#0f172a",
                    fontWeight: 600,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Loading Premium Content...
                </Typography>
              </Box>
            </Box>
          ) : error ? (
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
                variant="h5"
                sx={{
                  color: "#ef4444",
                  fontWeight: 700,
                  fontFamily: "'Playfair Display', serif",
                  mb: 2,
                }}
              >
                Oops! Something went wrong
              </Typography>
              <Typography color="#64748b" sx={{ fontSize: "1.1rem" }}>
                {error}
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {coursesWithImages.map((course, index) => {
                const stats = getRandomStats()
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                    <Card
                      onClick={() => handleCourseClick(course.id)}
                      sx={{
                        cursor: "pointer",
                        borderRadius: "24px",
                        overflow: "hidden",
                        background: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(20px)",
                        border: "2px solid transparent",
                        boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        "&:hover": {
                          transform: "translateY(-16px) scale(1.02)",
                          boxShadow: "0 25px 80px rgba(15, 23, 42, 0.15)",
                          border: "2px solid #f59e0b30",
                        },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "4px",
                          background: `linear-gradient(90deg, ${getLevelColor(stats.level)}, ${getLevelColor(stats.level)}80)`,
                          zIndex: 1,
                        },
                      }}
                      className={`course-card-${index % 3}`}
                    >
                      <Box sx={{ position: "relative" }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={getRandomImageUrl()}
                          alt={course.name}
                          sx={{
                            transition: "transform 0.4s ease",
                            "&:hover": {
                              transform: "scale(1.1)",
                            },
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "linear-gradient(45deg, rgba(15, 23, 42, 0.1), rgba(245, 158, 11, 0.1))",
                          }}
                        />

                        {/* Level Badge */}
                        <Chip
                          label={stats.level}
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            background: getLevelColor(stats.level),
                            color: "white",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                          }}
                        />

                        {/* Rating Badge */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            background: "rgba(255, 255, 255, 0.9)",
                            borderRadius: "12px",
                            px: 1.5,
                            py: 0.5,
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                        >
                          <Star style={{ fontSize: "14px", color: "#f59e0b", fill: "#f59e0b" }} />
                          <Typography variant="caption" sx={{ fontWeight: 700, color: "#0f172a" }}>
                            {stats.rating}
                          </Typography>
                        </Box>
                      </Box>

                      <CardContent sx={{ p: 3 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: "#0f172a",
                            mb: 2,
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.2rem",
                            lineHeight: 1.3,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {course.name}
                        </Typography>

                        <Chip
                          label={stats.category}
                          size="small"
                          sx={{
                            background: "linear-gradient(135deg, #06b6d415, #8b5cf610)",
                            color: "#06b6d4",
                            fontWeight: 600,
                            mb: 2,
                            fontSize: "0.75rem",
                          }}
                        />

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <Users style={{ fontSize: "16px", color: "#64748b" }} />
                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                              {stats.students}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <Clock style={{ fontSize: "16px", color: "#64748b" }} />
                            <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                              {stats.duration}h
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              background: "linear-gradient(135deg, #f59e0b, #06b6d4)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
                              transition: "transform 0.3s ease",
                              "&:hover": {
                                transform: "scale(1.1)",
                              },
                            }}
                            className="course-action-button"
                          >
                            <Zap style={{ fontSize: "16px", color: "white" }} />
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          )}
        </Box>
      </Box>

      <Outlet />
    </Box>
  )
}

export default AllCourses

