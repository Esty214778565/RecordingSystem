import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './AppLayout'
import AllCourses from './Components/Courses/AllCourses'
import CourseDetail from './Components/Courses/CourseDetails'
import LessonTeacher from './Components/Lessons/LessonsTeacher'
import Login from './Components/Login'
import Register from './Components/Register'


export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      // {
      //     path: '/login',
      //     element: <Login />,
      //     errorElement: <h1>Not Found</h1>
      // },
      // {
      //     path: '/register',
      //     element: <Register />,
      //     errorElement: <h1>Not Found</h1>
      // }
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/courses',
        element: <AllCourses />,
        children: [
          {
            path: 'add-course',
            element: <CourseDetail />,
          }]
      },
      {
        path: '/courses/:courseId',
        element: <CourseDetail />,
        children: [
          {
            path: ':teacherId',
            element: <LessonTeacher />,
          },
        ]
      }
    ]
  }
])



export default Router
