import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../Store/Store";
import { use, useEffect, useState } from "react";
import { addCourse, fechcoursesKategories as fechcoursesCategories, fetchListOfTeachers } from "../../Reducers/CoursesSlice";
import { Course } from "../../Models/Course";
import FinishAddLesson from "./FinishAddLesson";

const AddLesson = () => {
    const dispatch = useDispatch<AppDispatch>();
    //const navigate = useNavigate();
    const { courses } = useSelector((state: RootState) => state.courses);
    const [showNewCourseInput, setShowNewCourseInput] = useState(false);
    const [newCourseName, setNewCourseName] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [teacherFolderId, setTeacherFolderId] = useState(0);
    const [finishAddLesson, setFinishAddLesson] = useState(false);

    useEffect(() => {
        dispatch(fechcoursesCategories());
    }, [dispatch]);

    const handleCourseSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        if (selectedValue === "new") {
            setShowNewCourseInput(true);
            setSelectedCourseId("");
        } else {
            setShowNewCourseInput(false);
            setSelectedCourseId(selectedValue);
        }
    };

    const handleSubmit = async () => {
        if (showNewCourseInput) {
            if (newCourseName.trim() === "") {
                alert("Please enter a course name.");
                return;
            }
            await addNewCourse();
        } else {
            if (selectedCourseId === "") {
                alert("Please select a course.");
                return;
            }
            await fetchTeachersAndAddLesson();
        }
    };

    const addNewCourse = async () => {

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
            if ('payload' in res && res.payload && (res.payload as Course).id) {
                setSelectedCourseId((res.payload as Course).id.toString());
            } else {
                alert("An error occurred while adding the course. Please try again.");
            }
        } catch (error) {
            alert("An error occurred while adding the course. Please try again.");
        }
    };

    const fetchTeachersAndAddLesson = async () => {
        try {
            const res = await dispatch(fetchListOfTeachers(Number(selectedCourseId)));
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
                    await addTeacherToCourse(userId);
                }
            } else {
                alert("An error occurred while fetching teachers. Please try again.");
            }
        } catch (error) {
            alert("An error occurred while fetching teachers. Please try again.");
        }
    };

    const addTeacherToCourse = async (userId: number) => {
        //  const teacher1 = teachers.find((teacher: { teacherid: number }) => teacher.teacherid === userId);

        const teacher: Course = {
            id: 0,
            name: sessionStorage.getItem("userName") || "Unknown User",
            teacherId: userId,
            createDate: new Date(),
            updateDate: new Date(),
            isDeleted: false,
            parentFolderId: Number(selectedCourseId),
            records: []
        };
        try {
            const res2 = await dispatch(addCourse(teacher));
            if ('payload' in res2 && res2.payload && (res2.payload as Course).id) {
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
