import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, TextField, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { AppDispatch, RootState } from '../../Store/Store';
import { fechcoursesKategories } from '../../Reducers/CoursesSlice';
import './CoursesPage.css';

const CoursesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { courses, loading, error } = useSelector((state: RootState) => state.courses);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    dispatch(fechcoursesKategories());
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCourseClick = (courseId: number) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <Container className="courses-page">
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
      {sessionStorage.getItem('role') === 'teacher' && (
        <button onClick={() => navigate('/courses/add-course')} className="add-course-button">
          Add Course
        </button>
      )}
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <List>
          {filteredCourses.map((course) => (
            <ListItem component="button" key={course.id} onClick={() => handleCourseClick(course.id)}>
              <ListItemText primary={course.name} />
            </ListItem>
          ))}
        </List>
      )}
      <Outlet />
    </Container>
  );
}

export default CoursesPage;