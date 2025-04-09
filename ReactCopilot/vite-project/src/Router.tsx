import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './AppLayout';
import HomePage from './components1/HomePage';
import CoursesPage from './components1/CoursesPage';
import LessonsPage from './components1/LessonsPage';
import PersonalArea from './components1/PersonalArea';
import LoginPage from './components1/LoginPage';
import CourseDetail from './components1/Courses/CourseDetail';
import LessonTeacher from './components1/Lessons/LessonTeacher';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/courses',
        element: <CoursesPage />,
        children: [
          {
            path: 'add-course',
            element: <CourseDetail />,
          },
        ],
      },
      {
        path: '/courses/:courseId',
        element: <CourseDetail />,
        children: [
          {
            path: ':teacherId',
            element: <LessonTeacher />,
          },
        ],
      },
      {
        path: '/lessons',
        element: <LessonsPage />,
      },
      {
        path: '/personal-area',
        element: <PersonalArea />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);

export default Router;