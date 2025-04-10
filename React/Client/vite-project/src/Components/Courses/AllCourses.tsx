// import { ChangeEvent, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { TextField, List, ListItem, ListItemText, Typography, Container, CircularProgress } from '@mui/material';
// import { Outlet, useNavigate } from 'react-router-dom';
// import { fechcoursesKategories } from '../../Reducers/CoursesSlice';
// import { AppDispatch, RootState } from '../../Store/Store';

// import AddLesson from '../Lessons/AddLesson';

// const AllCourses = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();
//     const { courses, loading, error } = useSelector((state: RootState) => state.courses);
//     const [searchTerm, setSearchTerm] = useState('');


//     useEffect(() => {
//         dispatch(fechcoursesKategories());
//     }, [dispatch]);

//     // useEffect(() => {
//     //     if (courses.length > 0) {
//     //         dispatch(fechcoursesKategories());
//     //     }
//     // }, [courses]);

//     if (!courses || courses.length === 0) {
//         return <div>Loading...</div>;
//     }
//     const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
//         console.log("searching");
//         setSearchTerm(e.target.value);
//         console.log(filteredCourses);
//         console.log("courss:" + courses);

//     };

//     const filteredCourses = courses.filter(course =>
//         course.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const handleCourseClick = (courseId: number) => {

//         navigate(`/courses/${courseId}`);
//     };

//     return (
//         <><Container>
//             <Typography variant="h4" gutterBottom>
//                 All Courses
//             </Typography>
//             <TextField
//                 label="Search Courses"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={searchTerm}
//                 onChange={handleSearchChange} />
//             {sessionStorage.getItem('role') === 'teacher' && (
//                 <button onClick={() => navigate('/add-course')}>
//                     Add Course
//                 </button>
//             )}
//             {loading ? (
//                 <CircularProgress />
//             ) : error ? (
//                 <Typography color="error">{error}</Typography>
//             ) : (
//                 <><List>
//                     list of courses
//                     {filteredCourses.map((course) => (
//                         <ListItem component="button" key={course.id} onClick={() => handleCourseClick(course.id)}>
//                             <ListItemText primary={course.name} />
//                         </ListItem>
//                     ))}
//                 </List><Outlet /></>
//             )}
//             {/* <UpLoadS3 />
//             <DownLoadS3 /> */}
//             {sessionStorage.getItem('role') === 'teacher' && <AddLesson />}

//         </Container><Outlet /></>
//     );
// };

// export default AllCourses;

import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Typography, CircularProgress, Grid, Card, CardContent, CardMedia, Button, Box, Container } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { fechcoursesKategories } from '../../Reducers/CoursesSlice';
import { AppDispatch, RootState } from '../../Store/Store';
import AddLesson from '../Lessons/AddLesson';

const AllCourses = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { courses, loading, error } = useSelector((state: RootState) => state.courses);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fechcoursesKategories());
    }, [dispatch]);

    if (!courses || courses.length === 0) {
        return <div>Loading...</div>;
    }

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCourseClick = (courseId: number) => {
        navigate(`/courses/${courseId}`);
    };

    const DEFAULT_IMAGE_URL = './../../../public/Images/img1.jpg'; // Default image

    // Example courses with images (replace or integrate with your data)
    const coursesWithImages = filteredCourses.map(course => ({
        ...course,
        image: DEFAULT_IMAGE_URL, // Add image property if not already present
    }));

    return (
        <Box sx={{ width: '100%', height: '100%', backgroundColor: '#f9f9f9' }}>
            {/* Full Width Image with Button */}


            <Box sx={{ width: '100%', px: 2 }}>
                <Typography variant="h4" gutterBottom>
                    All Courses
                </Typography>
                <TextField
                    label="Search Courses"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <Grid container spacing={4}>
                        {coursesWithImages.map((course) => (
                            <Grid item xs={12} sm={6} md={3} key={course.id}>
                                <Card
                                    onClick={() => handleCourseClick(course.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={course.image} // Use the image property
                                        alt={course.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div" align="center">
                                            {course.name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
               
               
                    <Outlet />

            </Box>
        </Box>
    );
};

export default AllCourses;
