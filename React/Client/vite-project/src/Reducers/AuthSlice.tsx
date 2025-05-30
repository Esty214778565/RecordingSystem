import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserLogin } from '../Models/User';
import axios from 'axios';
const apiUrl="https://localhost:7043/api";
//const apiUrl = "https://recordingsystem-server.onrender.com/api";

export const loginUser = createAsyncThunk('auth/login', async (userData: UserLogin, thunkAPI) => {

    console.log("in loginUser in sendLoginRequest");

    try {

        const res = await axios.post(`${apiUrl}/auth/login`, userData);

        console.log("after login in sendLoginRequest");
        console.log(res.data);

        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("userId", res.data.id.toString());
        sessionStorage.setItem("userName", res.data.name);
        sessionStorage.setItem("role", res.data.role);

        try {
            const newUser = await axios.get(`${apiUrl}/user/${res.data.id}`, { headers: { Authorization: `Bearer ${res.data.token}` } });
            console.log(newUser.data as User);

            return newUser.data as User;//check in server if likeuser login 
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to get by id  user");
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue("Failed to login user");
    }

});

export const registerUser = createAsyncThunk('auth/register', async (userData: User, thunkAPI) => {
    try {
        const res = await axios.post(`${apiUrl}/auth/register`, userData);
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("userId", res.data.id.toString());
        sessionStorage.setItem("userName", res.data.name);
        sessionStorage.setItem("role", res.data.role);

        try {
            const newUser = await axios.get(`${apiUrl}/user/${res.data.id}`, { headers: { Authorization: `Bearer ${res.data.token}` } });
            return newUser.data as User;//check in server if likeuser login 
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to get by id  user");
        }
    }
    catch (error) {
        return thunkAPI.rejectWithValue("Failed to register user");
    }
});

export const fetchUser = createAsyncThunk('', async (_, thunkAPI) => {
    try {
        const res = await axios.get(`${apiUrl}/user`);
        return res.data as User[]
    }
    catch (error) {
        return thunkAPI.rejectWithValue("Failed to fetch recipes");
    }
});

export const updateUser = createAsyncThunk('auth/updateUser', async (userData: User, thunkAPI) => {
    try {
        const res = await axios.put(`${apiUrl}/user/${userData.id}`, userData);
        return res.data as User;
    }
    catch (error) {
        return thunkAPI.rejectWithValue("Failed to update user");
    }
});
export const trygetusers = createAsyncThunk('auth/trygetusers', async (_, thunkAPI) => {
    const token = sessionStorage.getItem("token"); // or sessionStorage.getItem("authToken");
    console.log(token);

    try {
        const res = await axios.get(`${apiUrl}/user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(res.data);
        return res.data as User[];

    }
    catch (error) {
        return thunkAPI.rejectWithValue("Failed to update user");
    }


});
// Create a slice of the state
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null as User | null,
        users: [] as User[],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
                //   state.user = action.payload; 
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload; // Update user data in state
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            });
    },
});


export default authSlice.reducer;
