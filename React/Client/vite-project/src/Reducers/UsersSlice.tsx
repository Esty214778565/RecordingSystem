import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../Models/User';

const apiUrl = "https://localhost:7043/api";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) => {
    const token = sessionStorage.getItem("token");
    try {
        const res = await axios.get(`${apiUrl}/user`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        });
        return res.data as User[];
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to fetch users");
    }
});

export const addUser = createAsyncThunk('users/addUser', async (userData: User, thunkAPI) => {
    const token = sessionStorage.getItem("token");
    try {
        const res = await axios.post(`${apiUrl}/user`, userData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data as User;
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to add user");
    }
});

export const updateUser = createAsyncThunk('users/updateUser', async (userData: User, thunkAPI) => {
    const token = sessionStorage.getItem("token");
    try {
        const res = await axios.put(`${apiUrl}/user/${userData.id}`, userData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data as User;
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to update user");
    }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId: number, thunkAPI) => {
    const token = sessionStorage.getItem("token");
    try {
        await axios.delete(`${apiUrl}/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return userId;
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to delete user");
    }
});

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [] as User[],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            });
    },
});

export default usersSlice.reducer;

