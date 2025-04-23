

// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { AppDispatch, RootState } from '../../Store/Store';
// import { useEffect, useState } from 'react';
// import { fetchListOfTeachers } from '../../Reducers/CoursesSlice';
// import AudioPlayer from '../AudioPlayer';
// import { deleteLesson, updateLesson } from '../../Reducers/LessonsSlice';
// const LessonsTeacher = () => {
//     console.log("enter to LessonTeacher");

//     const [audioPlayer, setAudioPlayer] = useState<{ fileType: string; link: string } | null>(null);
//     const [editingRecord, setEditingRecord] = useState<{ id: number; fileName: string } | null>(null);
//     const [updatedFileName, setUpdatedFileName] = useState<string>('');

//     const dispatch = useDispatch<AppDispatch>();
//     useSelector((state: RootState) => state.courses); // check if needed
//     const { teacherId } = useParams<{ teacherId: string }>();
//     const teacher = useSelector((state: RootState) => state.courses.teachers.find(teacher => teacher.id === Number(teacherId)));

//     // useEffect(() => {
//     //     if (!teacher) {
//     //         dispatch(fetchListOfTeachers(Number(teacherId)));
//     //     }
//     // }, [dispatch, teacher, teacherId]);

//     useEffect(() => {
//         const fetchTeachers = async () => {
//             if (!teacher) {
//                 await dispatch(fetchListOfTeachers(Number(teacherId)));
//             }
//         };

//         fetchTeachers();
//     }, [dispatch, teacher, teacherId]);

//     const handleDelete = async (recordId: number) => {
//         await dispatch(deleteLesson(recordId));
//     };

//     const handleUpdate = async (recordId: number) => {
//         if (updatedFileName.trim()) {
//             await dispatch(updateLesson({
//                 id: recordId, fileName: updatedFileName,
//                 description: '',
//                 s3Key: '',
//                 fileType: '',
//                 size: 0,
//                 folderId: 0
//             }));
//             setEditingRecord(null);
//             setUpdatedFileName('');
//         }
//     };

//     return (
//         <div className="lessons-teacher">
//             <h1>Lessons</h1>
//             <div className="teacher-details">
//                 <h2>Teacher ID: {teacherId}</h2>
//                 {teacher?.records?.map((record, index) => (
//                     <div key={index} className="record">
//                         <p>Record ID: {record.id}</p>
//                         {editingRecord && editingRecord.id === record.id ? (
//                             <div>
//                                 <input
//                                     type="text"
//                                     value={updatedFileName}
//                                     onChange={(e) => setUpdatedFileName(e.target.value)}
//                                 />
//                                 <button onClick={() => record.id !== undefined && handleUpdate(record.id)}>Save</button>
//                                 <button onClick={() => setEditingRecord(null)}>Cancel</button>
//                             </div>
//                         ) : (
//                             <>
//                                 <p
//                                     className="audio-link"
//                                     onClick={() => {
//                                         setAudioPlayer({ fileType: 'audio/mpeg', link: record.s3Key });
//                                     }}
//                                 >
//                                     {record.fileName}
//                                 </p>
//                                 <button onClick={() => record.id !== undefined && setEditingRecord({ id: record.id, fileName: record.fileName })}>Edit</button>
//                                 <button onClick={() => record.id !== undefined && handleDelete(record.id)}>Delete</button>
//                             </>
//                         )}
//                         {audioPlayer?.link && <AudioPlayer audioUrl={record.s3Key} />}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default LessonsTeacher;



import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../Store/Store';
import { useEffect, useState } from 'react';
import { fetchListOfTeachers } from '../../Reducers/CoursesSlice';
import AudioPlayer from '../AudioPlayer';
import { deleteLesson, updateLesson } from '../../Reducers/LessonsSlice';
import { Box, Button, List, ListItem, TextField, Typography } from '@mui/material';

const LessonsTeacher = () => {
    console.log("enter to LessonTeacher");

    const [audioPlayer, setAudioPlayer] = useState<{ fileType: string; link: string } | null>(null);
    const [editingRecord, setEditingRecord] = useState<{ id: number; fileName: string } | null>(null);
    const [updatedFileName, setUpdatedFileName] = useState<string>('');

    const dispatch = useDispatch<AppDispatch>();
    useSelector((state: RootState) => state.courses); // check if needed
    const { teacherId } = useParams<{ teacherId: string }>();
    const teacher = useSelector((state: RootState) => state.courses.teachers.find(teacher => teacher.id === Number(teacherId)));

    useEffect(() => {
        const fetchTeachers = async () => {
            if (!teacher) {

                await dispatch(fetchListOfTeachers(Number(teacherId)));
            }
        };

        fetchTeachers();
    }, [dispatch, teacher, teacherId]);

    const handleDelete = async (recordId: number) => {
        await dispatch(deleteLesson(recordId));

        // await dispatch(fetchListOfTeachers(Number(teacherId)));

    };

/*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Handles the update of a lesson record in the database
     * @param recordId The ID of the lesson record to be updated
     */
/*******  e61e6bcb-acae-436d-9a1b-b74b2d04135b  *******/    const handleUpdate = async (recordId: number) => {

        if (updatedFileName.trim()) {
            await dispatch(updateLesson({
                id: recordId, fileName: updatedFileName,
                description: '',
                s3Key: '',
                fileType: '',
                size: 0,
                folderId: 0
            }));
            setEditingRecord(null);
            setUpdatedFileName('');
        }
    };

    return (
        <Box sx={{ padding: '16px' }}>

            <List sx={{ padding: 0 }}>
                {teacher?.records?.map((record, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 16px',
                            borderBottom: '1px solid #ccc',
                        }}
                    >
                        {editingRecord && editingRecord.id === record.id ? (
                            <>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    value={updatedFileName}
                                    onChange={(e) => setUpdatedFileName(e.target.value)}
                                    sx={{ flexGrow: 1, marginRight: '16px', width: '200px' }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => record.id !== undefined && handleUpdate(record.id)}
                                    sx={{ marginRight: '8px' }}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    size="small"
                                    onClick={() => setEditingRecord(null)}
                                >
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        flexGrow: 1,
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                    }}
                                    onClick={() => {

                                        setAudioPlayer({ fileType: 'audio/mpeg', link: record.s3Key });
                                    }}
                                >
                                    {record.fileName}
                                </Typography>
                                {
                                    teacher?.teacherId === Number(sessionStorage.getItem("userId")) && (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                onClick={() => record.id !== undefined && setEditingRecord({ id: record.id, fileName: record.fileName })}
                                                sx={{ marginRight: '8px' }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                size="small"
                                                onClick={() => record.id !== undefined && handleDelete(record.id)}
                                            >
                                                Delete
                                            </Button>
                                        </>
                                    )}
                                {/* <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => record.id !== undefined && setEditingRecord({ id: record.id, fileName: record.fileName })}
                                    sx={{ marginRight: '8px' }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    size="small"
                                    onClick={() => record.id !== undefined && handleDelete(record.id)}
                                >
                                    Delete
                                </Button> */}
                            </>
                        )}
                        {audioPlayer?.link && <AudioPlayer audioUrl={record.s3Key} />}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default LessonsTeacher;