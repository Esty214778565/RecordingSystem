import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Store/Store';
import { Outlet, useParams } from 'react-router-dom';
import { Typography, Container, CircularProgress } from '@mui/material';
import { RootState } from '../../Store/Store';
import { fetchCourses, fetchListOfTeachers } from '../../Reducers/CoursesSlice';
import { useNavigate } from 'react-router-dom';

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
    }, [dispatch, teachers, courseId]);//check if good course id


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
        <><Container>
            <Typography variant="h4" gutterBottom>
                {course.name}
            </Typography>
            <Typography variant="body1">
                Updated on: {new Date(course.updateDate).toLocaleDateString()}
            </Typography>
            {teachers.map(teacher => (
                <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <div key={teacher.id} onClick={() => navigate(`/courses/${courseId}/${teacher.id}`)}
                        style={{ cursor: 'pointer' }} >
                        <Typography variant="body1">
                            Name: {teacher.name}
                        </Typography>
                        <Typography variant="body1">
                            ID: {teacher.teacherId}
                        </Typography>
                        <Typography variant="body1">
                            Updated on: {new Date(teacher.updateDate).toLocaleDateString()}
                        </Typography>
                    </div>
                </div>
            ))}
        </Container><Outlet /></>
    );
};

export default CourseDetail;