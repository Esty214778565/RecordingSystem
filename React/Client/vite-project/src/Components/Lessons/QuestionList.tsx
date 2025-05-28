// // // QuestionList.tsx
// // import React from 'react';
// // import { Lesson } from '../../Models/Lesson';


// // const QuestionList: React.FC<{ record: Lesson }> = ({ record }) => {
// //     console.log("record in QuestionList:", record);

// //     return (
// //         <div>
// //             <h2>שאלות להקלטה {record.id}</h2>
// //     {record.questions && record.questions.length > 0 ? (
// //         <ul>
// //             {record.questions.map(q => (
// //                 <li key={q.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //                     <span>{q.text}</span>
// //                     {q.answers && q.answers.length > 0 && (
// //                         <ul style={{ marginLeft: 'auto', listStyle: 'none', display: 'flex', gap: '8px' }}>
// //                             {q.answers.map((a, idx) => (
// //                                 <li key={idx}>{a.Text}</li>
// //                             ))}
// //                         </ul>
// //                     )}

// //                 </li>
// //             ))}
// //         </ul>
// //     ) : (
// //         <div>No questions yet.</div>
// //     )}
// //         </div>
// //     );
// // };

// // export default QuestionList;

// // QuestionList.tsx

// import { Lesson } from '../../Models/Lesson';
// import AddAnswer from './AddAnswer';
// import AddQuestion from './AddQuestion';

// const QuestionList = ({ record, setRecord }: { record: Lesson; setRecord: any }) => (


//     <div>
//         <h3>Questions</h3>
//         {record.questions?.map((q, idx) => (
//             <div key={idx} style={{ marginBottom: 16, border: '1px solid #ccc', padding: 8 }}>
//                 <div><b>{q.text}</b></div>
//                 <ul>
//                     {q.answers?.length === 0 && <li>No answers yet.</li>}

//                     {q.answers?.map((a, i) => <li key={i}>{a.text}</li>)}
//                 </ul>
//                 <AddAnswer question={q} record={record} setRecord={setRecord} />
//             </div>
//         ))}
//         <AddQuestion record={record} setRecord={setRecord} />
//     </div>
// );
// export default QuestionList;
import type { Lesson } from "../../Models/Lesson"
import AddAnswer from "./AddAnswer"

import AddQuestion from "./AddQuestion"
import { Brain, MessageCircle, Users, Clock, CheckCircle2, HelpCircle } from "lucide-react"
import './QuestionList.css'
import { useLocation, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchListOfTeachers } from "../../Reducers/CoursesSlice"
import { updateLesson } from "../../Reducers/LessonsSlice"
import { AppDispatch } from "../../Store/Store"

const QuestionList = () => {
    const location = useLocation();
    const record: Lesson = location.state?.record;
    // const setRecord:any = location.state?.setRecord;

    const dispatch = useDispatch<AppDispatch>();
   // const { courseId } = useParams<{ courseId: string }>()
    const { teacherId } = useParams<{ teacherId: string }>()

    const handleEdit = async (record: Lesson) => {
        const res = await dispatch(updateLesson(record))
        const res2 = await dispatch(fetchListOfTeachers(Number(teacherId)))
        console.log("res in handleEdit:", res)
        console.log("res2 in handleEdit:", res2)
    }
    return (
        <div className="question-list-container">
            {/* Header Section */}
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

            {/* Questions Section */}
            <div className="questions-section">
                <div className="section-header">
                    <div className="section-title">
                        <HelpCircle className="section-icon" />
                        <h3>Discussion Questions</h3>
                    </div>
                    <div className="questions-count">{record.questions?.length || 0} Questions</div>
                </div>

                {record.questions && record.questions.length > 0 ? (
                    <div className="questions-grid">
                        {record.questions.map((q, idx) => (
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
                                    <AddAnswer question={q} record={record} setRecord={handleEdit} />
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
                    <AddQuestion record={record} setRecord={handleEdit} />
                </div>
            </div>
        </div>
    )
}

export default QuestionList

