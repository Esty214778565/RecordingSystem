

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../Store/Store';
import { useEffect, useState } from 'react';
import { fetchListOfTeachers } from '../../Reducers/CoursesSlice';
import AudioPlayer from '../AudioPlayer';
import { deleteLesson, updateLesson } from '../../Reducers/LessonsSlice';
const LessonsTeacher = () => {
    console.log("enter to LessonTeacher");

    const [audioPlayer, setAudioPlayer] = useState<{ fileType: string; link: string } | null>(null);
    const [editingRecord, setEditingRecord] = useState<{ id: number; fileName: string } | null>(null);
    const [updatedFileName, setUpdatedFileName] = useState<string>('');

    const dispatch = useDispatch<AppDispatch>();
    useSelector((state: RootState) => state.courses); // check if needed
    const { teacherId } = useParams<{ teacherId: string }>();
    const teacher = useSelector((state: RootState) => state.courses.teachers.find(teacher => teacher.id === Number(teacherId)));

    // useEffect(() => {
    //     if (!teacher) {
    //         dispatch(fetchListOfTeachers(Number(teacherId)));
    //     }
    // }, [dispatch, teacher, teacherId]);

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
    };

    const handleUpdate = async (recordId: number) => {
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
        <div className="lessons-teacher">
            <h1>Lessons</h1>
            <div className="teacher-details">
                <h2>Teacher ID: {teacherId}</h2>
                {teacher?.records?.map((record, index) => (
                    <div key={index} className="record">
                        <p>Record ID: {record.id}</p>
                        {editingRecord && editingRecord.id === record.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={updatedFileName}
                                    onChange={(e) => setUpdatedFileName(e.target.value)}
                                />
                                <button onClick={() => record.id !== undefined && handleUpdate(record.id)}>Save</button>
                                <button onClick={() => setEditingRecord(null)}>Cancel</button>
                            </div>
                        ) : (
                            <>
                                <p
                                    className="audio-link"
                                    onClick={() => {
                                        setAudioPlayer({ fileType: 'audio/mpeg', link: record.s3Key });
                                    }}
                                >
                                    {record.fileName}
                                </p>
                                <button onClick={() => record.id !== undefined && setEditingRecord({ id: record.id, fileName: record.fileName })}>Edit</button>
                                <button onClick={() => record.id !== undefined && handleDelete(record.id)}>Delete</button>
                            </>
                        )}
                        {audioPlayer?.link && <AudioPlayer audioUrl={record.s3Key} />}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LessonsTeacher;


// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { AppDispatch, RootState } from '../../Store/Store';
// import { useEffect, useState } from 'react';
// import { fetchListOfTeachers } from '../../Reducers/CoursesSlice';
// import AudioPlayer from '../AudioPlayer';
// import { deleteLesson, updateLesson } from '../../Reducers/LessonsSlice';

// const LessonsTeacher = () => {
//     const [audioPlayer, setAudioPlayer] = useState<{ fileType: string; link: string } | null>(null);
//     const [editingRecord, setEditingRecord] = useState<{ id: number; fileName: string } | null>(null);
//     const [updatedFileName, setUpdatedFileName] = useState<string>('');

//     const dispatch = useDispatch<AppDispatch>();
//     const { teacherId } = useParams<{ teacherId: string }>();
//     const teacher = useSelector((state: RootState) => state.courses.teachers.find(teacher => teacher.id === Number(teacherId)));

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
//                 id: recordId,
//                 fileName: updatedFileName,
//                 description: '',
//                 s3Key: '',
//                 fileType: '',
//                 size: 0,
//                 folderId: 0
//             }));

//             // Update local state immediately
//             if (teacher) {
//                 const updatedRecords = teacher.records.map(record =>
//                     record.id === recordId ? { ...record, fileName: updatedFileName } : record
//                 );
//                 // Assuming you have a way to update the local state of the teacher
//                 // This might require a state management approach or a local state update
//                 // Since you are using Redux, you may need to dispatch an action to update the teacher's records in the store.
//                 // Example: dispatch(updateTeacherRecords({ id: teacherId, records: updatedRecords }));

//                 // For now, we're just resetting the editing state
//                 setEditingRecord(null);
//                 setUpdatedFileName('');
//             }
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
