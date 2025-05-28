import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './AppLayout'
import AllCourses from './Components/Courses/AllCourses'
import LessonTeacher from './Components/Lessons/LessonsTeacher'
import Login from './Components/Login'
import Register from './Components/Register'
import AddLesson from './Components/Lessons/AddLesson'
import AudioPlayer from './Components/AudioPlayer'
import HomePage from './Components/HomePage'
import CourseDetail from './Components/Courses/CourseDetails'



export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '', // <-- this matches "/"
        element: <HomePage />
      },
      {
        path: 'homePage',
        element: <HomePage />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'add-lesson',
        element: <AddLesson />,
      },
      {
        path: 'courses',
        element: <AllCourses />,
        children: [
          {
            path: 'add-course',
            element: <CourseDetail />,
          }]
      },
      {
        path: 'courses/:courseId',
        element: <CourseDetail />,

      },
      {
        path: 'courses/:courseId/:teacherId',
        element: <LessonTeacher />,
        children: [
          {
            path: ':url',
            element: <AudioPlayer />,
          },
        ],
      },
    ]
  }
])



export default Router
