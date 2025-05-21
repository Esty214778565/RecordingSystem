// // QuestionList.tsx
// import React from 'react';
// import { Lesson } from '../../Models/Lesson';


// const QuestionList: React.FC<{ record: Lesson }> = ({ record }) => {
//     console.log("record in QuestionList:", record);

//     return (
//         <div>
//             <h2>שאלות להקלטה {record.id}</h2>
//     {record.questions && record.questions.length > 0 ? (
//         <ul>
//             {record.questions.map(q => (
//                 <li key={q.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <span>{q.text}</span>
//                     {q.answers && q.answers.length > 0 && (
//                         <ul style={{ marginLeft: 'auto', listStyle: 'none', display: 'flex', gap: '8px' }}>
//                             {q.answers.map((a, idx) => (
//                                 <li key={idx}>{a.Text}</li>
//                             ))}
//                         </ul>
//                     )}

//                 </li>
//             ))}
//         </ul>
//     ) : (
//         <div>No questions yet.</div>
//     )}
//         </div>
//     );
// };

// export default QuestionList;

// QuestionList.tsx

import { Lesson } from '../../Models/Lesson';
import AddAnswer from './AddAnswer';
import AddQuestion from './AddQuestion';

const QuestionList = ({ record, setRecord }: { record: Lesson; setRecord: any }) => (


    <div>
        <h3>Questions</h3>
        {record.questions?.map((q, idx) => (
            <div key={idx} style={{ marginBottom: 16, border: '1px solid #ccc', padding: 8 }}>
                <div><b>{q.text}</b></div>
                <ul>
                    {q.answers?.length === 0 && <li>No answers yet.</li>}

                    {q.answers?.map((a, i) => <li key={i}>{a.text}</li>)}
                </ul>
                <AddAnswer question={q} record={record} setRecord={setRecord} />
            </div>
        ))}
        <AddQuestion record={record} setRecord={setRecord} />
    </div>
);
export default QuestionList;
