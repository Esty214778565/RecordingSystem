

const LessonTeacher = () => {
    console.log("enter to LessonTeacher");

    const [audioPlayer, setAudioPlayer] = useState<{ fileType: string; link: string } | null>(null);

    const dispatch = useDispatch<AppDispatch>();
    useSelector((state: RootState) => state.courses); // check if needed
    const { teacherId } = useParams<{ teacherId: string }>();
    const teacher = useSelector((state: RootState) => state.courses.teachers.find((teacher: { id: number; records: { id: number; fileName: string; s3Key: string }[] }) => teacher.id === Number(teacherId)));

    useEffect(() => {
        if (!teacher) {
            dispatch(fetchListOfTeachers(Number(teacherId)));
        }
    }, [dispatch, teacher, teacherId]);

    console.log(teacherId); // Use teacherId as needed
    console.log(teacher?.records);

    return (
        <div className="lessons-teacher">
            <h1>Lessons</h1>
            <div className="teacher-details">
                <h2>Teacher ID: {teacherId}</h2>
                {teacher?.records?.map((record: { id: number; fileName: string; s3Key: string }, index) => (
                    <div key={index} className="record">
                        <p>Record ID: {record.id}</p>
                        <p
                            className="audio-link"
                            onClick={() => {
                                console.log("Audio file clicked:", record.fileName, record.s3Key);
                                setAudioPlayer({ fileType: 'audio/mpeg', link: record.s3Key });
                            }}
                        >
                            {record.fileName}
                        </p>

                        {audioPlayer?.link && <AudioPlayer audioUrl={record.s3Key} />}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LessonTeacher;