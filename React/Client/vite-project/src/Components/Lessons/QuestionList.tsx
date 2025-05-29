
import type { Lesson } from "../../Models/Lesson"
import AddAnswer from "./AddAnswer"

import AddQuestion from "./AddQuestion"
import { Brain, MessageCircle, Users, Clock, CheckCircle2, HelpCircle } from "lucide-react"
import './QuestionList.css'
import { useLocation, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchListOfTeachers } from "../../Reducers/CoursesSlice"
import { fetchLessons, updateLesson } from "../../Reducers/LessonsSlice"
import { AppDispatch } from "../../Store/Store"
import type { RootState } from "../../Store/Store"
import { useEffect } from "react"
const QuestionList = () => {
    const location = useLocation();
    const folder = location.state?.folder;

    const dispatch = useDispatch<AppDispatch>();
    const { courseId } = useParams<{ courseId: string }>()

    const { lessonId } = useParams<{ lessonId: string }>();
    const lessons = useSelector((state: RootState) => state.lessons.lessons);
    const lesson = useSelector((state: RootState) => state.lessons.lessons.find(l => l.id === Number(lessonId)));

    console.log("lesson in QuestionList:", lesson);
    useEffect(() => {
        if (lessons.length === 0) {
            dispatch(fetchLessons());
        }
    }, [dispatch, lessons.length]);
    //     function createCleanLesson(lesson: Lesson) {
    //         const updatedQuestions:Question = (lesson.questions || []).map(q => ({
    //   ...q,
    //   record: {
    //     ...q.record,
    //     folder: folder
    //   }
    // }));
    //   return {
    //     id: lesson.id,
    //     fileName: lesson.fileName,
    //     description: lesson.description,
    //     fileType: lesson.fileType,
    //     folderId: lesson.folderId, // שימי לב - לא להעביר folder מלא
    //     s3Key: lesson.s3Key,
    //     size: lesson.size,
    //     questions: updatedQuestions || [], 
    //     folder:folder// Ensure questions is always an array
    //     // questions: lesson.questions.map((q: any) => ({
    //     //   id: q.id,
    //     //   text: q.text,
    //     //   recordEntityId: q.recordEntityId,
    //     //   record: {
    //     //     id: q.record.id,
    //     //     fileName: q.record.fileName,
    //     //     description: q.record.description,
    //     //     folderId: q.record.folderId,
    //     //     folder: {
    //     //       id: q.record.folder?.id,
    //     //       name: q.record.folder?.name,
    //     //       parentFolderId: q.record.folder?.parentFolderId
    //     //     }
    //     //   }
    //     // }))
    //   };
    // }
    const handleEdit = async (lesson: Lesson) => {
        const updatedLesson = { ...lesson, folder };
        debugger;
        const res = await dispatch(updateLesson(updatedLesson));
        const res2 = await dispatch(fetchListOfTeachers(Number(courseId)))

        console.log("updatedLesson in handleEdit:", updatedLesson);
        console.log("res in handleEdit:", res);
        console.log("res2 in handleEdit:", res2);
    }

    if (!lesson) {
        return (
            <div className="question-list-container">
                <div className="empty-state">
                    <h3>Lesson not found</h3>
                    <p>The requested lesson could not be found.</p>
                </div>
            </div>
        );
    }
    return (
        <div className="question-list-container">

            <div className="question-list-header">
                <div className="header-content">
                    <div className="header-icon">
                        <Brain className="brain-icon" />
                    </div>
                    <div className="header-text">
                        <h1 className="main-title">
                            <span className="shimmer-text">Interactive Q&A Session</span>
                        </h1>
                        <p className="subtitle">Engage with Knowledge & Expand Understanding</p>
                    </div>
                </div>

                <div className="header-badges">
                    <div className="badge primary-badge">
                        <MessageCircle size={16} />
                        <span>Knowledge Exchange</span>
                    </div>
                    <div className="badge secondary-badge">
                        <Users size={16} />
                        <span>Academic Discussion</span>
                    </div>
                </div>

                <div className="gradient-bar"></div>
            </div>


            <div className="questions-section">
                <div className="section-header">
                    <div className="section-title">
                        <HelpCircle className="section-icon" />
                        <h3>Discussion Questions</h3>
                    </div>
                    <div className="questions-count">{lesson.questions?.length || 0} Questions</div>
                </div>

                {lesson.questions && lesson.questions.length > 0 ? (
                    <div className="questions-grid">
                        {lesson.questions.map((q, idx) => (
                            <div key={idx} className="question-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                                <div className="question-header">
                                    <div className="question-number">Q{idx + 1}</div>
                                    <div className="question-status">
                                        {q.answers && q.answers.length > 0 ? (
                                            <div className="status-badge answered">
                                                <CheckCircle2 size={14} />
                                                <span>Answered</span>
                                            </div>
                                        ) : (
                                            <div className="status-badge pending">
                                                <Clock size={14} />
                                                <span>Pending</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="question-content">
                                    <p className="question-text">{q.text}</p>
                                </div>

                                <div className="answers-section">
                                    <div className="answers-header">
                                        <MessageCircle size={16} />
                                        <span>Responses ({q.answers?.length || 0})</span>
                                    </div>

                                    {q.answers && q.answers.length > 0 ? (
                                        <div className="answers-list">
                                            {q.answers.map((a, i) => (
                                                <div key={i} className="answer-item" style={{ animationDelay: `${idx * 0.1 + i * 0.05}s` }}>
                                                    <div className="answer-number">{i + 1}</div>
                                                    <div className="answer-text">{a.text}</div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="no-answers">
                                            <MessageCircle size={20} className="no-answers-icon" />
                                            <span>No responses yet. Be the first to answer!</span>
                                        </div>
                                    )}
                                </div>

                                <div className="question-actions">
                                    <AddAnswer question={q} record={lesson} setRecord={handleEdit} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <HelpCircle size={48} />
                        </div>
                        <h3>No Questions Yet</h3>
                        <p>Start the discussion by adding your first question!</p>
                        <div className="empty-features">
                            <div className="empty-feature">
                                <Brain size={20} />
                                <span>Stimulate Critical Thinking</span>
                            </div>
                            <div className="empty-feature">
                                <MessageCircle size={20} />
                                <span>Encourage Participation</span>
                            </div>
                            <div className="empty-feature">
                                <Users size={20} />
                                <span>Build Community</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="add-question-section">
                    <AddQuestion record={lesson} setRecord={handleEdit} />
                </div>
            </div>
        </div>
    )
}

export default QuestionList

