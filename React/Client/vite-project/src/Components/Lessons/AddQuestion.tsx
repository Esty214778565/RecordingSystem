// // AddQuestion.tsx
// import React, { useState } from 'react';
// import { Answer, Lesson } from '../../Models/Lesson';

// const AddQuestion: React.FC<{ record: Lesson; setRecord: any }> = ({ record, setRecord }) => {
//     const [questionText, setQuestionText] = useState('');
//     const [answers, setAnswers] = useState<Answer[]>([]);

//     const addAnswer = () => {
//         setAnswers([...answers, { Id: 0, Text: '', QuestionId: 0, Question: null }]);
//     };

//     const handleAnswerChange = (index: number, value: string) => {
//         const updatedAnswers = [...answers];
//         updatedAnswers[index] = { ...updatedAnswers[index], Text: value };
//         setAnswers(updatedAnswers);
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         const newQuestion: any = {
//             id: 0, // ניתן לייצר מזהה ייחודי
//             text: questionText,
//             answers
//         };
//         setRecord({ ...record, questions: [...(record.questions || []), newQuestion] });
//         setQuestionText('');
//         setAnswers([]); // איפוס שדות
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>הוסף שאלה חדשה</h2>
//             <input
//                 type="text"
//                 value={questionText}
//                 onChange={(e) => setQuestionText(e.target.value)}
//                 placeholder="שאלה"
//                 required
//             />
//             {answers.map((answer, index) => (
//                 <div key={index}>
//                     <input
//                         type="text"
//                         value={answer.Text}
//                         onChange={(e) => handleAnswerChange(index, e.target.value)}
//                         placeholder="תשובה"
//                     />
//                 </div>
//             ))}
//             <button type="button" onClick={addAnswer}>הוסף תשובה</button>
//             <button type="submit">הוסף שאלה</button>
//         </form>
//     );
// };

// export default AddQuestion;
import React, { useState } from 'react';
import { Lesson } from '../../Models/Lesson';

const AddQuestion: React.FC<{ record: Lesson; setRecord: any }> = ({ record, setRecord }) => {
    const [questionText, setQuestionText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newQuestion: any = {
            id: 0, // ניתן לייצר מזהה ייחודי
            text: questionText,
            answers: []
        };
        setRecord({ ...record, questions: [...(record.questions || []), newQuestion] });
        setQuestionText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>הוסף שאלה חדשה</h2>
            <input
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="שאלה"
                required
            />
            <button type="submit">הוסף שאלה</button>
        </form>
    );
};

export default AddQuestion;