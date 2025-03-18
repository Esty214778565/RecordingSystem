import { createBrowserRouter } from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import AppLayout from './AppLayout'


export const Router = createBrowserRouter([
    {
        path: '/',
        element:  <AppLayout />,
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
        ]
    }
])



export default Router
