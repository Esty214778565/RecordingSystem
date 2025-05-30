import type { Lesson } from "../../Models/Lesson"
// import AddAnswer from "./AddAnswer"
// import AddQuestion from "./AddQuestion"
// import { Brain, MessageCircle, Users, Clock, CheckCircle2, HelpCircle } from "lucide-react"
// import './QuestionList.css'
// import { useLocation, useParams } from "react-router-dom"
// import { useDispatch, useSelector } from "react-redux"
// import { fetchListOfTeachers } from "../../Reducers/CoursesSlice"
// import { fetchLessons, updateLesson } from "../../Reducers/LessonsSlice"
// import { AppDispatch } from "../../Store/Store"
// import type { RootState } from "../../Store/Store"
// import { useEffect, useState } from "react"

// const QuestionList = () => {
//   const location = useLocation();
//   const folder = location.state?.folder;
//   const dispatch = useDispatch<AppDispatch>();
//   const { courseId } = useParams<{ courseId: string }>()
//   const { lessonId } = useParams<{ lessonId: string }>();

//   const lessons = useSelector((state: RootState) => state.lessons.lessons);
//   const lesson = useSelector((state: RootState) =>
//     state.lessons.lessons.find(l => l.id === Number(lessonId))
//   );

//   const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);

//   useEffect(() => {
//     if (lessons.length === 0) {
//       dispatch(fetchLessons());
//     }
//   }, [dispatch, lessons.length]);

//   const handleEdit = async (lesson: Lesson) => {
//     const ls: Lesson = {
//       id: lesson.id,
//       fileName: lesson.fileName,
//       description: lesson.description,
//       s3Key: lesson.s3Key,
//       transcriptionS3Key: lesson.transcriptionS3Key,
//       transcriptionTextS3Key: lesson.transcriptionTextS3Key,
//       fileType: lesson.fileType,
//       size: lesson.size,
//       folderId: lesson.folderId,
//       questions: lesson.questions?.map(q => ({
//         id: q.id,
//         text: q.text,
//         recordEntityId: q.recordEntityId,
//         answers: q.answers?.map(a => ({
//           id: a.id,
//           text: a.text,
//           questionId: a.questionId
//         }))
//       }))
//     };

//     const updatedLesson = { ...lesson, folder };
//     await dispatch(updateLesson(ls));
//     await dispatch(fetchListOfTeachers(Number(courseId)));
//   };

//   const toggleQuestion = (index: number) => {
//     setOpenQuestionIndex(openQuestionIndex === index ? null : index);
//   };

//   if (!lesson) {
//     return (
//       <div className="question-list-container">
//         <div className="empty-state">
//           <h3>Lesson not found</h3>
//           <p>The requested lesson could not be found.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="question-list-container">
//       <div className="question-list-header">
//         <div className="header-content">
//           <div className="header-icon">
//             <Brain className="brain-icon" />
//           </div>
//           <div className="header-text">
//             <h1 className="main-title">
//               <span className="shimmer-text">Interactive Q&A Session</span>
//             </h1>
//             <p className="subtitle">Engage with Knowledge & Expand Understanding</p>
//           </div>
//         </div>

//         <div className="header-badges">
//           <div className="badge primary-badge">
//             <MessageCircle size={16} />
//             <span>Knowledge Exchange</span>
//           </div>
//           <div className="badge secondary-badge">
//             <Users size={16} />
//             <span>Academic Discussion</span>
//           </div>
//         </div>

//         <div className="gradient-bar"></div>
//       </div>

//       <div className="questions-section">
//         <div className="section-header">
//           <div className="section-title">
//             <HelpCircle className="section-icon" />
//             <h3>Discussion Questions</h3>
//           </div>
//           <div className="questions-count">{lesson.questions?.length || 0} Questions</div>
//         </div>

//         {/* New Flex Layout Section */}
//         <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
//           {/* Left - AddQuestion */}
//           <div style={{ flex: 1 }}>
//             <AddQuestion record={lesson} setRecord={handleEdit} />
//           </div>

//           {/* Right - Questions List */}
//           <div style={{ flex: 2 }}>
//             <h2 className="header-title" style={{ paddingLeft: 8, paddingRight: 8 }}>
//               Interactive Q&A
//             </h2>
//             {lesson.questions && lesson.questions.length > 0 ? (
//               <div className="questions-grid">
//                 {lesson.questions.map((q, idx) => (
//                   <div key={idx} className="question-card">
//                     <button className="collapsible-header" onClick={() => toggleQuestion(idx)}>
//                       <h3 className="header3-title">
//                         <span className={`arrow-icon ${openQuestionIndex === idx ? "open" : ""}`}>▶</span>
//                         <span className="question-title">Q{idx + 1}. {q.text}</span>
//                       </h3>
//                     </button>

//                     {openQuestionIndex === idx && (
//                       <div className="question-body">
//                         <div className="question-status">
//                           {q.answers && q.answers.length > 0 ? (
//                             <div className="status-badge answered">
//                               <CheckCircle2 size={14} />
//                               <span>Answered</span>
//                             </div>
//                           ) : (
//                             <div className="status-badge pending">
//                               <Clock size={14} />
//                               <span>Pending</span>
//                             </div>
//                           )}
//                         </div>

//                         <div className="answers-section">
//                           <div className="answers-header">
//                             <MessageCircle size={16} />
//                             <span>Responses ({q.answers?.length || 0})</span>
//                           </div>

//                           {q.answers && q.answers.length > 0 ? (
//                             <div className="answers-list">
//                               {q.answers.map((a, i) => (
//                                 <div key={i} className="answer-item">
//                                   <div className="answer-number">{i + 1}</div>
//                                   <div className="answer-text">{a.text}</div>
//                                 </div>
//                               ))}
//                             </div>
//                           ) : (
//                             <div className="no-answers">
//                               <MessageCircle size={20} className="no-answers-icon" />
//                               <span>No responses yet. Be the first to answer!</span>
//                             </div>
//                           )}
//                         </div>

//                         <div className="question-actions">
//                           <AddAnswer question={q} record={lesson} setRecord={handleEdit} />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="empty-state">
//                 <HelpCircle size={48} />
//                 <h3>No Questions Yet</h3>
//                 <p>Start the discussion by adding your first question!</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuestionList;

import AddAnswer from "./AddAnswer"
import AddQuestion from "./AddQuestion"
import { Brain, MessageCircle, Users, Clock, CheckCircle2, HelpCircle } from "lucide-react"
import './QuestionList.css'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchListOfTeachers } from "../../Reducers/CoursesSlice"
import { fetchLessons, updateLesson } from "../../Reducers/LessonsSlice"
import { AppDispatch } from "../../Store/Store"
import type { RootState } from "../../Store/Store"
import { useEffect, useState } from "react"

const QuestionList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { courseId } = useParams<{ courseId: string }>()
    const { lessonId } = useParams<{ lessonId: string }>();

    const lessons = useSelector((state: RootState) => state.lessons.lessons);
    const lesson = useSelector((state: RootState) =>
        state.lessons.lessons.find(l => l.id === Number(lessonId))
    );

    const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);

    useEffect(() => {
        if (lessons.length === 0) {
            dispatch(fetchLessons());
        }
    }, [dispatch, lessons.length]);

    const handleEdit = async (lesson: Lesson) => {
        const ls: Lesson = {
            id: lesson.id,
            fileName: lesson.fileName,
            description: lesson.description,
            s3Key: lesson.s3Key,
            transcriptionS3Key: lesson.transcriptionS3Key,
            transcriptionTextS3Key: lesson.transcriptionTextS3Key,
            fileType: lesson.fileType,
            size: lesson.size,
            folderId: lesson.folderId,
            questions: lesson.questions?.map(q => ({
                id: q.id,
                text: q.text,
                recordEntityId: q.recordEntityId,
                answers: q.answers?.map(a => ({
                    id: a.id,
                    text: a.text,
                    questionId: a.questionId
                }))
            }))
        };

        await dispatch(updateLesson(ls));
        await dispatch(fetchListOfTeachers(Number(courseId)));
    };

    const toggleQuestion = (index: number) => {
        setOpenQuestionIndex(openQuestionIndex === index ? null : index);
    };

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

                <div className="add-question-section">
                    <AddQuestion record={lesson} setRecord={handleEdit} />
                </div>

                <h2 className="header-title" style={{ paddingLeft: 55, paddingRight: 8 }}>
                    Interactive Q&A
                </h2>
                {lesson.questions && lesson.questions.length > 0 ? (
                    <div className="questions-grid">
                        {lesson.questions.map((q, idx) => (
                            <div key={idx} className="question-card">
                                <button className="collapsible-header" onClick={() => toggleQuestion(idx)}>
                                    <h3 className="header3-title">
                                        <span className={`arrow-icon ${openQuestionIndex === idx ? "open" : ""}`}>▶</span>
                                        <span className="question-title">Q{idx + 1}. {q.text}</span>
                                    </h3>
                                </button>

                                {openQuestionIndex === idx && (
                                    <div className="question-body">
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

                                        <div className="answers-section">
                                            <div className="answers-header">
                                                <MessageCircle size={16} />
                                                <span>Responses ({q.answers?.length || 0})</span>
                                            </div>

                                            {q.answers && q.answers.length > 0 ? (
                                                <div className="answers-list">
                                                    {q.answers.map((a, i) => (
                                                        <div key={i} className="answer-item">
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
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <HelpCircle size={48} />
                        <h3>No Questions Yet</h3>
                        <p>Start the discussion by adding your first question!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionList;


