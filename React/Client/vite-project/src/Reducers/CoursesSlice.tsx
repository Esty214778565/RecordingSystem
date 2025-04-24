import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Course } from '../Models/Course';

const apiUrl="https://localhost:7043/api";
// const apiUrl = "https://recordingsystem-server.onrender.com/api";

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async (_, thunkAPI) => {
    const token = sessionStorage.getItem("token");
    try {
        const res = await axios.get(`${apiUrl}/folder`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data as Course[];
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to fetch courses");
    }
});
export const fechcoursesKategories = createAsyncThunk('courses/fetchCoursesKategories', async (_, thunkAPI) => {

    const token = sessionStorage.getItem("token");
    try {
      
        const res = await axios.get(`${apiUrl}/folder/kategories`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("Response data:", res.data); // Log the response data
        return res.data as Course[];

    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to fetch course categories");
    }
});


// export const addCourse = createAsyncThunk('course/addCourse', async (courseData: Course, thunkAPI) => {
//     const token = sessionStorage.getItem("token");
// debugger;
//     try {
//         const res = await axios.post(`${apiUrl}/folder`, courseData, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         console.log("Response data in add cource slice:", res.data);

//         return res.data as Course;
//     } catch (error) {
//         return thunkAPI.rejectWithValue("Failed to add course");
//     }
// });
export const addCourse = createAsyncThunk('course/addCourse', async (courseData: Course, thunkAPI) => {
    const token = sessionStorage.getItem("token");
    const obj = {
        Name: courseData.name,
        ParentFolderId: courseData.parentFolderId,
        UserId: courseData.teacherId
    }
    debugger;
    try {
        const res = await axios.post(`${apiUrl}/folder`, obj, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log("Response data in addCourse slice:", res.data);
        return res.data as Course;
    } catch (error: any) {
        console.error("Error in addCourse:", error);
        if (error.response) {
            // Server responded with a status code outside the 2xx range
            return thunkAPI.rejectWithValue(error.response.data.message || "Failed to add course");
        } else if (error.request) {
            // Request was made but no response was received
            return thunkAPI.rejectWithValue("No response from server");
        } else {
            // Something else caused the error
            return thunkAPI.rejectWithValue(error.message || "An unknown error occurred");
        }
    }
});

export const updateCourse = createAsyncThunk('course/updateCourse', async (courseData: Course, thunkAPI) => {
    const token = sessionStorage.getItem("token");

    try {
        const res = await axios.put(`${apiUrl}/folder/${courseData.id}`, courseData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data as Course;
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to update course");
    }
});

export const deleteCourse = createAsyncThunk('course/deleteCourse', async (courseId: number, thunkAPI) => {
    const token = sessionStorage.getItem("token");

    try {
        await axios.delete(`${apiUrl}/folder/${courseId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return courseId;
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to delete course");
    }
});
export const fetchListOfTeachers = createAsyncThunk(
    'courses/fetchListOfTeachers',
    async (parentId: number, thunkAPI) => {
        debugger;
        const token = sessionStorage.getItem("token");
        try {
            console.log("in teachers list fech");

            const res = await axios.get(`${apiUrl}/folder/children/${parentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Response data teachers of course:", parentId, ": ", res.data); // Log the response data
         
            const lessonsArray = res.data;
            const mappedLessonsArray: Course[] = lessonsArray.map((course: any) => ({
                ...course, // כל השדות האחרים
                teacherId: course.userId, // החלפת userId ב-teacherId
            }));
            return mappedLessonsArray as Course[];
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch courses by parent ID");
        }
    }
);
const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        courses: [] as Course[],
        teachers: [] as Course[],
        //check if add category
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(fechcoursesKategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fechcoursesKategories.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload; // Store fetched categories
            })
            .addCase(fechcoursesKategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(fetchListOfTeachers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchListOfTeachers.fulfilled, (state, action) => {
                state.loading = false;
                state.teachers = action.payload; // Update courses with fetched data
            })
            .addCase(fetchListOfTeachers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(addCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.courses.push(action.payload);
            })
            .addCase(addCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(updateCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.courses.findIndex(course => course.id === action.payload.id);
                if (index !== -1) {
                    state.courses[index] = action.payload;
                }
            })
            .addCase(updateCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(deleteCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = state.courses.filter(course => course.id !== action.payload);
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            });
    },
});

export default coursesSlice.reducer;