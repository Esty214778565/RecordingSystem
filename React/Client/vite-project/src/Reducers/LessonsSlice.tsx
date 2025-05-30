import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Lesson } from '../Models/Lesson';

//const apiUrl = "https://localhost:7043/api/record";
 const apiUrl = "https://recordingsystem-server.onrender.com/api/record";

// Fetch lessons
export const fetchLessons = createAsyncThunk('lessons/fetchLessons', async (_, thunkAPI) => {
    const token = sessionStorage.getItem("token");
    try {
        const res = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data as Lesson[];
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to fetch lessons");
    }
});

// Add a lesson
export const addLesson = createAsyncThunk('lessons/addLesson', async (lessonData: Lesson, thunkAPI) => {
    const token = sessionStorage.getItem("token");
    const obj = {
        FileName: lessonData.fileName,
        Description: lessonData.description,
        S3Key: lessonData.s3Key,
        transcriptionS3Key: lessonData.transcriptionS3Key,
        transcriptionTextS3Key: lessonData.transcriptionTextS3Key,
        FileType: lessonData.fileType,
        Size: lessonData.size,
        FolderId: lessonData.folderId,
        Questions: lessonData.questions?.map((question) => ({
            Id: question.id,
            Text: question.text,
            Answers: question.answers,
        }))
    }
    try {

        const res = await axios.post(apiUrl, obj, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        // Map the response to ensure the updateDate field fits the Lesson model
        const addedLesson: Lesson = {
            ...lessonData,
            ...res.data,
            updateDate: res.data.updateDate ?? lessonData.updateDate // keep as string
        };
        return addedLesson;
    } catch (error: any) {
        console.error("Error adding lesson:", error.response?.data || error.message);
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to add lesson");
    }
});



//  console.log('get Lessons: -----------------------');

//     const fetchAndLogLessons = async () => {
//         debugger;
//         try {
//             const result = await dispatch(fetchLessons()); // Use `unwrap` to handle the resolved value
//             console.log("Lesson successfully saved:", result);
//             alert("Lesson uploaded successfully!");
//         } catch (error) {
//             console.error("Error saving lesson:", error);
//             alert("An error occurred while saving the lesson. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//    await fetchAndLogLessons();
//     alert("Lesson uploaded successfully!");



// Update a lesson
export const updateLesson = createAsyncThunk('lessons/updateLesson', async (lessonData: Lesson, thunkAPI) => {
    const token = sessionStorage.getItem("token");

    console.log("lessonData in update lesson slice:", lessonData);

    try {
        const res = await axios.put(`${apiUrl}/${lessonData.id}`, lessonData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        console.log("Response data in update lesson slice:", res.data);

        // Map the response to ensure the updateDate field fits the Lesson model
        const updatedLesson: Lesson = {
            ...lessonData,
            ...res.data,
            questions: res.data.questions ?? lessonData.questions,
            //  updateDate: res.data.updateDate ? new Date(res.data.updateDate) : lessonData.updateDate // prefer server value if present

            updateDate: res.data.updateDate
                ? new Date(res.data.updateDate).toISOString()
                : lessonData.updateDate // prefer server value if present

        };
        return updatedLesson;
    } catch (error: any) {
        console.error("Error updating lesson:", error.response?.data || error.message);
        console.log("Validation errors:", error.response?.data?.errors);
        return thunkAPI.rejectWithValue("Failed to update lesson");
    }
});


export const deleteLesson = createAsyncThunk('lessons/deleteLesson', async (lessonId: number, thunkAPI) => {
    const token = sessionStorage.getItem("token");

    try {
        await axios.delete(`${apiUrl}/${lessonId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return lessonId;
    } catch (error) {
        return thunkAPI.rejectWithValue("Failed to delete lesson");
    }
});

// Thunk to call TranscribeFromS3
export const transcribe = createAsyncThunk(
    'Transcription/transcribe',
    async ({ s3Url, recordId }: { s3Url: string; recordId: number }, thunkAPI) => {
        const token = sessionStorage.getItem("token");
        try {
            const res = await axios.post(

               //`https://localhost:7043/api/Transcription/transcribe/${recordId}`,
                `https://recordingsystem-server.onrender.com/api/Transcription/transcribe/${recordId}`,
                { s3Url },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );


            // const res = await axios.post(
            //     //  `https://recordingsystem-server.onrender.com/api/Transcription/transcribe`,
            //     `https://localhost:7043/api/Transcription/transcribe/${recordId}`, { s3Url: s3Url },
            //     {
            //         // params: { s3Url, recordId },
            //         headers: {
            //             'Authorization': `Bearer ${token}`
            //         }
            //     }
            // );
            //check if need to update the lesson after transcription
            await fetchLessons();
            console.log("Response data in transcribe slice:", res.data);
            
            return res.data;

        } catch (error: any) {
            debugger;
            console.error("Error in transcribeFromS3:", error.response?.data || error.message);
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to transcribe from S3");
        }
    }
);

interface LessonsState {
    lessons: Lesson[];
    loading: boolean;
    error: string | null;
}
const initialState: LessonsState = { lessons: [], loading: false, error: null };

const lessonsSlice = createSlice({
    name: 'lessons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLessons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLessons.fulfilled, (state, action) => {
                state.lessons = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchLessons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(addLesson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addLesson.fulfilled, (state, action) => {
                state.loading = false;
                state.lessons.push(action.payload);
            })
            .addCase(addLesson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(updateLesson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLesson.fulfilled, (state, action) => {
                debugger;
                state.loading = false;
                const index = state.lessons.findIndex(lesson => lesson.id === action.payload.id);
                if (index !== -1) {
                    state.lessons[index] = action.payload;
                }
            })
            .addCase(updateLesson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(deleteLesson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteLesson.fulfilled, (state, action) => {
                state.loading = false;
                state.lessons = state.lessons.filter(lesson => lesson.id !== action.payload);
            })
            .addCase(deleteLesson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            });
    },
});

export default lessonsSlice.reducer;
