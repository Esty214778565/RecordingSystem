
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../Reducers/AuthSlice';

// Create the Redux store
const store = configureStore({
    reducer: combineReducers({ auth: AuthSlice })
});

// Export the store
export type RootState = ReturnType<typeof store.getState>
export type UserDispatch = typeof store.dispatch
export default store;