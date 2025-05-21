// // LessonUploader.tsx

// import { useState } from "react";
// import FileUploader from "../UpLoadS3";
// import { Lesson } from "../../Models/Lesson";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../Store/Store";
// import { addLesson } from "../../Reducers/LessonsSlice";


// const LessonUploader: React.FC<{ teacherFolderId: number }> = ({ teacherFolderId }) => {
//     const dispatch = useDispatch<AppDispatch>();
//     const [lessonName, setLessonName] = useState<string>('');
//     const [lessonDescription, setLessonDescription] = useState<string>('');
//     // const { courseId } = useParams<{ courseId: string }>();
//     // const [uploadedFileData, setUploadedFileData] = useState<any>(null);
//     const [loading, setLoading] = useState(false);
//     const handleUploadSuccess = async (presignedUrl: string, fileType: string, fileSize: number) => {

//         console.log("persigned url in finish add lesson:" + presignedUrl);
//         console.log("presigned url" + presignedUrl);

//         const lessonData: Lesson = {
//             fileName: lessonName,//chack if good
//             description: lessonDescription,
//             s3Key: presignedUrl,
//             fileType: fileType,
//             size: fileSize,
//             folderId: Number(teacherFolderId),
//         };
//         console.log('Lesson Data:', lessonData);
//         try {

//             setLoading(true);
//             debugger;
//             const result = await dispatch(addLesson(lessonData)); // Use `unwrap` to handle the resolved value
//             console.log("Lesson successfully saved:", result);
//             alert("Lesson uploaded successfully!");
//         } catch (error) {
//             console.error("Error saving lesson:", error);
//             alert("An error occurred while saving the lesson. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <h2>העלאת שיעור חדש</h2>
//             <input
//                 type="text"
//                 placeholder="שם השיעור"
//                 value={lessonName}
//                 onChange={(e) => setLessonName(e.target.value)}
//             />
//             <textarea
//                 placeholder="תיאור השיעור"
//                 value={lessonDescription}
//                 onChange={(e) => setLessonDescription(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="מזהה קורס (אופציונלי)"
//                 // value={courseId || ''}
//                 readOnly
//             />
//             <FileUploader onUploadSuccess={handleUploadSuccess} />
//         </div>
//     );
// };

// export default LessonUploader;

import { useState } from "react";
import FileUploader from "../UpLoadS3";
import { Lesson } from "../../Models/Lesson";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Store/Store";
import { addLesson } from "../../Reducers/LessonsSlice";
import styles from "./LessonUploader.module.css"; // Adjust the path as necessary
import { fetchListOfTeachers } from "../../Reducers/CoursesSlice";

const LessonUploader: React.FC<{ teacherFolderId: number }> = ({ teacherFolderId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [lessonName, setLessonName] = useState<string>('');
    const [lessonDescription, setLessonDescription] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleUploadSuccess = async (presignedUrl: string, fileType: string, fileSize: number) => {
        const lessonData: Lesson = {
            
            fileName: lessonName,
            description: lessonDescription,
            s3Key: presignedUrl,
            fileType: fileType,
            size: fileSize,
            folderId: Number(teacherFolderId),
            questions: [], 
        };
    
        try {
            setLoading(true);
            const result = await dispatch(addLesson(lessonData));
            console.log("Lesson successfully saved:", result);
            alert("Lesson uploaded successfully!");
            dispatch(fetchListOfTeachers(Number(teacherFolderId)));
        } catch (error) {
            console.error("Error saving lesson:", error);
            alert("An error occurred while saving the lesson. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Save Lesson</h2>
            <div className={styles.form}>
                <label className={styles.label} htmlFor="lessonName">Name</label>
                <input
                    id="lessonName"
                    className={styles.input}
                    type="text"
                    placeholder="Name"
                    value={lessonName}
                    onChange={(e) => setLessonName(e.target.value)}
                />
                <label className={styles.label} htmlFor="lessonDescription">Description</label>
                <textarea
                    id="lessonDescription"
                    className={styles.textarea}
                    placeholder="Description"
                    value={lessonDescription}
                    onChange={(e) => setLessonDescription(e.target.value)}
                />
                <FileUploader onUploadSuccess={handleUploadSuccess} />
                {loading && <p className={styles.loading}>Uploading...</p>}
            </div>
        </div>
    );
};

export default LessonUploader;
