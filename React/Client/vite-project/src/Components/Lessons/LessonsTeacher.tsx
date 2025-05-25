
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../Store/Store';
import { useEffect, useState } from 'react';
import { fetchListOfTeachers } from '../../Reducers/CoursesSlice';
import { deleteLesson, updateLesson } from '../../Reducers/LessonsSlice';
import { Box, Button, List, ListItem, TextField, Typography } from '@mui/material';
import { Lesson } from '../../Models/Lesson';
import QuestionList from './QuestionList';

const LessonsTeacher = () => {
    console.log("enter to LessonTeacher");

    //const [audioPlayer, setAudioPlayer] = useState<{ fileType: string; link: string } | null>(null);
    const [editingRecord, setEditingRecord] = useState<{ id: number; fileName: string } | null>(null);
    const [updatedFileName, setUpdatedFileName] = useState<string>('');

    const dispatch = useDispatch<AppDispatch>();
    useSelector((state: RootState) => state.courses); // check if needed
    const { courseId } = useParams<{ courseId: string }>();
    const { teacherId } = useParams<{ teacherId: string }>();

    const teacher = useSelector((state: RootState) => state.courses.teachers.find(teacher => teacher.id === Number(teacherId)));
    const navigate = useNavigate();
    const handleDelete = async (recordId: number) => {
        await dispatch(deleteLesson(recordId));
        //check if needed

        if (teacher?.records.length === 1) {
            window.location.pathname = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
        }
        await dispatch(fetchListOfTeachers(Number(teacherId))); // Refetch teacher's data
    };

    useEffect(() => {
        const fetchTeachers = async () => {
            if (!teacher) {

                await dispatch(fetchListOfTeachers(Number(teacherId)));
            }
        };
        fetchTeachers();
    }, [dispatch, teacher, teacherId]);

    /*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Handles the update of a lesson record in the database
     * @param recordId The ID of the lesson record to be updated
     */
    const handleUpdate = async (record: Lesson) => {

        if (updatedFileName.trim()) {
            //check if map on questions
            const updatedRecord = { ...record, fileName: updatedFileName, questions: record.questions || [] };

            const res = await dispatch(updateLesson(updatedRecord));
            debugger;
            console.log("res in handleUpdate!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!:", res);

            setEditingRecord(null);
            setUpdatedFileName('');
            //check if needed
            await dispatch(fetchListOfTeachers(Number(teacherId))); // Refetch teacher's data
        }

    };
    const handleEdit = async (record: Lesson) => {
        const res = await dispatch(updateLesson(record));
        const res2 = await dispatch(fetchListOfTeachers(Number(teacherId))); // Refetch teacher's data
        console.log("res in handleEdit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!:", res);
        console.log("res2 in handleEdit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!:", res2);

    }

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
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    display: 'inline-block',
                                    marginRight: '16px',
                                }}
                                onClick={() => {
                                    const urlPrefix = "https://s3.amazonaws.com/my-first-records-bucket.testpnoren/";
                                    const relativeUrl = record.s3Key.startsWith(urlPrefix)
                                        ? record.s3Key.substring(urlPrefix.length)
                                        : record.s3Key;
                                    console.log("relativeUrl:", relativeUrl);
                                    debugger;
                                    navigate(`/courses/${courseId}/${teacherId}/${relativeUrl}`);
                                    // const urlPrefix = "https://s3.amazonaws.com/my-first-records-bucket.testpnoren/";
                                    // const relativeUrl = record.s3Key.startsWith(urlPrefix) ? record.s3Key.substring(urlPrefix.length) : record.s3Key;
                                    // // setAudioPlayer({ fileType: 'audio/mpeg', link: record.s3Key });
                                    // debugger;
                                    // console.log("Navigating to relative URL:", relativeUrl);
                                    // navigate(`/courses/${courseId}/${teacherId}/${relativeUrl}`);
                                    // //  navigate(existsurl + "/" + relativeUrl, { state: { relativeUrl } });
                                }}
                            >
                                {record.fileName}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: 'inline-block', marginLeft: '8px' }}
                            >
                                {record.updateDate
                                    ? `Updated: ${new Date(record.updateDate).toLocaleDateString()}`
                                    : ''}
                            </Typography>
                        </Box>
                        {editingRecord && editingRecord.id === record.id ? (
                            <>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    value={updatedFileName}
                                    onChange={(e) => setUpdatedFileName(e.target.value)}
                                    sx={{ marginRight: '16px', width: '200px' }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => record.id !== undefined && handleUpdate(record)}
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
                                {teacher?.teacherId === Number(sessionStorage.getItem("userId")) && (
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
                            </>
                        )}


                        <QuestionList record={record} setRecord={handleEdit} />

                    </ListItem>))}
            </List>
            <Outlet />
        </Box>
    );
};

export default LessonsTeacher;