
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../Reducers/AuthSlice';
import coursesReducer from '../Reducers/CoursesSlice';
import usersReducer from '../Reducers/UsersSlice';
import lessonsReducer from '../Reducers/LessonsSlice'; // Import lessonsReducer

// Create the Redux store
const store = configureStore({

    // reducer: combineReducers({
    //     auth: AuthSlice,
    //     courses: coursesReducer,
    //     users: usersReducer,
    //     lessons: lessonsReducer,
    // })
    reducer: {
        auth: AuthSlice,
        courses: coursesReducer, 
        users: usersReducer,
        lessons: lessonsReducer,
    }

});

// Export the store
export type RootState = ReturnType<typeof store.getState>
export type UserDispatch = typeof store.dispatch
export type AppDispatch = typeof store.dispatch
export default store;
