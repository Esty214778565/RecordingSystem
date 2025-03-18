// actions/authActions.ts
import axios from 'axios';
import { User } from '../Models/User';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

export interface LoginAction {
    type: typeof LOGIN;
    payload: User;
}

export interface LogoutAction {
    type: typeof LOGOUT;
}

export interface RegisterAction {
    type: typeof REGISTER;
    payload: User;
}

export type AuthActionTypes = LoginAction | LogoutAction | RegisterAction;

// export interface User {
//     email: string;
//     password: string; 
// }

// API base URL
const API_URL = 'http://your-server-url/api'; // Replace with your server URL

export const login = (userData: User) => async (dispatch: any) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        dispatch({
            type: LOGIN,
            payload: response.data, // Assuming the server returns user data
        });
    } catch (error) {
        console.error("Login failed", error);
    }
};

export const register = (userData: User) => async (dispatch: any) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        dispatch({
            type: REGISTER,
            payload: response.data, // Assuming the server returns user data
        });
    } catch (error) {
        console.error("Registration failed", error);
    }
};

export const logout = (): LogoutAction => ({
    type: LOGOUT,
});
