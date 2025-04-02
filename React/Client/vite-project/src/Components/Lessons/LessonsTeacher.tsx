import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../Store/Store';
import { use, useEffect, useState } from 'react';
import { fetchListOfTeachers } from '../../Reducers/CoursesSlice';
import AudioPlayer from '../AudioPlayer';

const LessonTeacher = () => {
    console.log("enter to LessonTeacher");

    const [audioPlayer, setAudioPlayer] = useState<{ fileType: string; link: string } | null>(null);

    const dispatch = useDispatch<AppDispatch>();
    useSelector((state: RootState) => state.courses);//check if need
    const { teacherId } = useParams<{ teacherId: string }>();
    const teacher = useSelector((state: RootState) => state.courses.teachers.find(teacher => teacher.id === Number(teacherId)));

    useEffect(() => {
        if (!teacher) {
            dispatch(fetchListOfTeachers(Number(teacherId)));
        }
    }, [dispatch, teacher, teacherId]);

    console.log(teacherId); // Use teacherid as needed
    console.log(teacher?.records);

    return (
        <>
            Lessons
            <div>
                {teacherId}
                {teacher?.records?.map((record, index) => (
                    <div key={index}>
                        <p>Record id: {record.id}:</p>
                        <p
                            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                            onClick={() => {
                                console.log("Audio file clicked:", record.fileName, record.s3Key);
                                debugger;
                                setAudioPlayer({ fileType: 'audio/mpeg', link: record.s3Key });
                            }}
                        >
                            {record.fileName}
                        </p>

                        {audioPlayer?.link && <AudioPlayer audioUrl={record.s3Key} />}
                    </div>
                ))}

            </div>
        </>
    );

}
export default LessonTeacher