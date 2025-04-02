// LessonUploader.tsx

import { useState } from "react";
import FileUploader from "../UpLoadS3";
import { Lesson } from "../../Models/Lesson";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Store/Store";
import { addLesson, fetchLessons } from "../../Reducers/LessonsSlice";
import { useParams } from "react-router-dom";


const LessonUploader: React.FC<{ teacherFolderId: number }> = ({ teacherFolderId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [lessonName, setLessonName] = useState<string>('');
    const [lessonDescription, setLessonDescription] = useState<string>('');
    // const { courseId } = useParams<{ courseId: string }>();
    const [uploadedFileData, setUploadedFileData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const handleUploadSuccess = async (presignedUrl: string, fileName: string, fileType: string, fileSize: number) => {
        
        console.log("persigned url in finish add lesson:" + presignedUrl);

        const lessonData: Lesson = {
            fileName: fileName,
            description: lessonDescription,
            s3Key: presignedUrl,
            fileType: fileType,
            size: fileSize,

            folderId: Number(teacherFolderId),
        };

        // כאן תוכל להוסיף את הלוגיקה לשמור את הנתונים או לשלוח לשרת

        console.log('Lesson Data:', lessonData);
        try {
            debugger;
            setLoading(true);
            const result = await dispatch(addLesson(lessonData)); // Use `unwrap` to handle the resolved value
            console.log("Lesson successfully saved:", result);
            alert("Lesson uploaded successfully!");
        } catch (error) {
            console.error("Error saving lesson:", error);
            alert("An error occurred while saving the lesson. Please try again.");
        } finally {
            setLoading(false);
        }
    };






    //     console.log('get Lessons: -----------------------');

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






    return (
        <div>
            <h2>העלאת שיעור חדש</h2>
            <input
                type="text"
                placeholder="שם השיעור"
                value={lessonName}
                onChange={(e) => setLessonName(e.target.value)}
            />
            <textarea
                placeholder="תיאור השיעור"
                value={lessonDescription}
                onChange={(e) => setLessonDescription(e.target.value)}
            />
            <input
                type="text"
                placeholder="מזהה קורס (אופציונלי)"
                // value={courseId || ''}
                readOnly
            />
            <FileUploader onUploadSuccess={handleUploadSuccess} />
        </div>
    );
};

export default LessonUploader;
