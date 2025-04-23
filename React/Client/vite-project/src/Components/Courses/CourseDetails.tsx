

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Store/Store';
import { Outlet, useParams } from 'react-router-dom';
import {
    Typography,
    Container,
    CircularProgress,
    Grid,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Avatar,
    Stack,
    Paper,
    Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RootState } from '../../Store/Store';
import { fetchCourses, fetchListOfTeachers } from '../../Reducers/CoursesSlice';
import { useNavigate } from 'react-router-dom';
import AudioPlayer from '../AudioPlayer';

const CourseDetail = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { teachers, loading, error } = useSelector((state: RootState) => state.courses);
    const { courseId } = useParams<{ courseId: string }>();
    const course = useSelector((state: RootState) => state.courses.courses.find(course => course.id === Number(courseId)));
    const navigate = useNavigate();

    useEffect(() => {
        if (!course) {
            dispatch(fetchCourses());
        }
    }, [dispatch, course]);

    useEffect(() => {
        if (!teachers || teachers.length === 0) {
            dispatch(fetchListOfTeachers(Number(courseId)));
        }
    }, [dispatch, teachers, courseId]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!course) {
        return <Typography>No course found</Typography>;
    }

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            {/* Course Header Section */}
            <Box
                sx={{
                    backgroundColor: '#f5f5f5',
                    padding: '24px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    marginBottom: '24px',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    {course.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Updated on: {new Date(course.updateDate).toLocaleDateString()}
                </Typography>


                {/* Main Layout: Teachers List and Outlet */}
                <Grid container spacing={3}>
                    {/* Left Side: Outlet */}
                    <Grid item xs={12} md={8}>
                        <Paper
                            elevation={3}
                            sx={{
                                padding: '24px',
                                borderRadius: '8px',
                                backgroundColor: '#ffffff',
                            }}
                        >
                            <Typography variant="h5" gutterBottom>
                                <AudioPlayer audioUrl={""} />
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Right Side: Teacher List */}
                    <Grid item xs={12} md={4}>
                        {/* <Paper
                        elevation={3}
                        sx={{
                            padding: '16px',
                            borderRadius: '8px',
                            backgroundColor: '#f9f9f9',
                            maxHeight: '500px',
                            overflowY: 'auto',
                        }}
                    > */}
                        <Typography variant="h6" gutterBottom>
                            Teachers
                        </Typography>
                        <Stack spacing={2}>
                            {teachers.map(teacher => (
                                <Accordion key={teacher.id}
                                    onClick={() => navigate(`/courses/${courseId}/${teacher.id}`)}
                                    sx={{ borderRadius: '8px' }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel-${teacher.id}-content`}
                                        id={`panel-${teacher.id}-header`}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                            <Avatar
                                                sx={{
                                                    width: 56,
                                                    height: 56,
                                                    marginRight: '16px',
                                                    backgroundColor: `#${(() => {
                                                        const hash = (teacher.id || teacher.name).toString();
                                                        let color = 0;
                                                        for (let i = 0; i < hash.length; i++) {
                                                            color = hash.charCodeAt(i) + ((color << 5) - color);
                                                        }
                                                        color = Math.abs(color); // Ensure the color value is positive
                                                        for (let i = 0; i < hash.length; i++) {
                                                            color = hash.charCodeAt(i) + ((color << 5) - color);
                                                        }
                                                        return ((color & 0x00ffffff).toString(16).padStart(6, '0'));
                                                    })()}`,
                                                    color: '#ffffff',
                                                }}
                                            >
                                                {teacher.name.charAt(0).toUpperCase()}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="body1" fontWeight="bold">
                                                    {teacher.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Updated on: {new Date(teacher.updateDate).toLocaleDateString()}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Divider sx={{ mb: 2 }} />
                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                            Updated on: {new Date(teacher.updateDate).toLocaleDateString()}
                                        </Typography>
                                        <Paper
                                            elevation={2}
                                            sx={{
                                                padding: '16px',
                                                borderRadius: '8px',
                                                backgroundColor: '#f5f5f5',
                                            }}
                                        >

                                            <Outlet />
                                        </Paper>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Stack>
                        {/* </Paper> */}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default CourseDetail;