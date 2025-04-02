import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, List, ListItem, ListItemText, Typography, Container, CircularProgress } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { fechcoursesKategories } from '../../Reducers/CoursesSlice';
import { AppDispatch, RootState } from '../../Store/Store';
import { Download, Upload } from '@mui/icons-material';
import UpLoadS3 from '../UpLoadS3';
import DownLoadS3 from '../DownLoadS3';
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
        console.log("searching");
        setSearchTerm(e.target.value);
        console.log(filteredCourses);
        console.log("courss:" + courses);

    };

    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCourseClick = (courseId: number) => {

        navigate(`/courses/${courseId}`);
    };

    return (
        <><Container>
            <Typography variant="h4" gutterBottom>
                All Courses
            </Typography>
            <TextField
                label="Search Courses"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={handleSearchChange} />
            {sessionStorage.getItem('role') === 'teacher' && (
                <button onClick={() => navigate('/add-course')}>
                    Add Course
                </button>
            )}
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <><List>
                    list of courses
                    {filteredCourses.map((course) => (
                        <ListItem component="button" key={course.id} onClick={() => handleCourseClick(course.id)}>
                            <ListItemText primary={course.name} />
                        </ListItem>
                    ))}
                </List><Outlet /></>
            )}
            {/* <UpLoadS3 />
            <DownLoadS3 /> */}
            {sessionStorage.getItem('role') === 'teacher' && <AddLesson />}

        </Container><Outlet /></>
    );
};

export default AllCourses;