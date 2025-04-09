import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/Store";
import { useEffect, useState } from "react";
import { addCourse, fechcoursesKategories as fechcoursesCategories, fetchListOfTeachers } from "../../Reducers/CoursesSlice";
import { Course } from "../../Models/Course";
import FinishAddLesson from "./FinishAddLesson";

const AddLesson = () => {
    const dispatch = useDispatch<AppDispatch>();
    //const navigate = useNavigate();
    const { courses } = useSelector((state: RootState) => state.courses);
    const [showNewCourseInput, setShowNewCourseInput] = useState(false);
    const [newCourseName, setNewCourseName] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState(0);
    const [teacherFolderId, setTeacherFolderId] = useState(0);
    const [finishAddLesson, setFinishAddLesson] = useState(false);

    useEffect(() => {
        dispatch(fechcoursesCategories());
    }, [dispatch,]);

    useEffect(() => {
        console.log("Selected Course ID:", selectedCourseId);
    }, [selectedCourseId]);

    const handleCourseSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        if (selectedValue === "new") {
            debugger;
            setShowNewCourseInput(true);
            setSelectedCourseId(0);
        } else {
            setShowNewCourseInput(false);
            console.log("in select selectedvalue" + selectedValue);

            setSelectedCourseId(Number(selectedValue));
        }
    };

    const handleSubmit = async () => {
        let courseId = selectedCourseId;
        if (showNewCourseInput) {
            if (newCourseName.trim() === "") {
                alert("Please enter a course name.");
                return;
            }

            courseId = await addNewCourse();
        }
        else {
            if (selectedCourseId === 0) {
                alert("Please select a course.");
                return;
            }
        }
        //check
        await fetchTeachersAndAddLesson(courseId);

    };

    const addNewCourse = async () => {
        debugger;
        const course: Course = {
            id: 0,
            name: newCourseName,
            teacherId: Number(null),
            createDate: new Date(),
            updateDate: new Date(),
            isDeleted: false,
            parentFolderId: Number(null),
            records: []
        };
        try {
            const res = await dispatch(addCourse(course));
            if ('payload' in res) {
                // const payload = res.payload;

                const payload: any = res?.payload;
                const courseId = payload?.id;
                setSelectedCourseId(courseId.toString());
                return courseId;
            } else {
                alert("An error occurred while adding the course. Please try again.");
            }
        } catch (error) {
            alert("An error occurred while adding the course. Please try again.");
        }
    };

    const fetchTeachersAndAddLesson = async (courseId: number) => {
        debugger;
        console.log("****************" + courseId);
        try {
            const res = await dispatch(fetchListOfTeachers(courseId));
            if ('payload' in res && res.payload && Array.isArray(res.payload)) {
                const teachers = res.payload;
                const userId = Number(sessionStorage.getItem("userId"));
                const teacher = teachers.find((teacher: { teacherid: number }) => teacher.teacherid === userId);
                if (teacher) {
                    console.log("User is one of the teachers for this course.");
                    setTeacherFolderId(teacher.id);
                    setFinishAddLesson(true);
                    debugger;
                    // Proceed with adding the lesson
                } else {
                    addTeacherToCourse(userId, courseId);
                }
            } else {
                alert("An error occurred while fetching teachers. Please try again.");
            }
        } catch (error) {
            alert("An error occurred while fetching teachers. Please try again.");
        }
    };

    const addTeacherToCourse = async (userId: number, courseId: number) => {
        //  const teacher1 = teachers.find((teacher: { teacherid: number }) => teacher.teacherid === userId);
        debugger;
        const teacher: Course = {
            id: 0,
            name: sessionStorage.getItem("userName") || "Unknown User",
            teacherId: userId,
            createDate: new Date(),
            updateDate: new Date(),
            isDeleted: false,
            parentFolderId: courseId,
            records: []
        };
        try {
            debugger;
            const res2 = await dispatch(addCourse(teacher));
            if ('payload' in res2 && res2.payload && (res2.payload as Course).id) {
                const x = (res2.payload as Course).id;
                console.log("Teacher added successfully with ID:", x);
                setTeacherFolderId((res2.payload as Course).id);
                debugger;
                setFinishAddLesson(true);
                // Proceed with adding the lesson
            } else {
                alert("An error occurred while adding the teacher. Please try again.");
            }
        } catch (error) {
            alert("An error occurred while adding the teacher. Please try again.");
        }
    };

    return (
        <>
            <div>
                <h1>Add Lesson</h1>
                <div>
                    <select onChange={handleCourseSelection}>
                        <option value="" disabled selected>Select a course</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.name}
                            </option>
                        ))}
                        <option value="new">New Course</option>
                    </select>
                    {showNewCourseInput && (
                        <input
                            type="text"
                            placeholder="New Course Name"
                            value={newCourseName}
                            onChange={(e) => setNewCourseName(e.target.value)}
                        />
                    )}
                    <button onClick={handleSubmit}>Add</button>
                </div>
            </div>
            {finishAddLesson && <FinishAddLesson teacherFolderId={teacherFolderId} />}
        </>
    );
};

export default AddLesson;
