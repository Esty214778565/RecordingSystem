// AddAnswer.tsx
import React, { useState } from 'react';
import { Lesson, Answer } from '../../Models/Lesson';

const AddAnswer: React.FC<{ question: any; record: Lesson; setRecord: any }> = ({ question, record, setRecord }) => {
    const [answerText, setAnswerText] = useState('');


    const handleAddAnswer = () => {
        if (!answerText.trim()) return;
        const newAnswer: Answer = { id: 0, text: answerText, questionId: question.id, question: null };
        debugger;
        const updatedQuestions = record.questions.map(q =>
            q === question ? { ...q, answers: [...(q.answers || []), newAnswer] } : q
        );
        setRecord({ ...record, questions: updatedQuestions });
        setAnswerText('');
    };

    return (
        <div>
            <input
                type="text"
                value={answerText}
                onChange={e => setAnswerText(e.target.value)}
                placeholder="הוסף תשובה"
            />
            <button type="button" onClick={handleAddAnswer}>הוסף תשובה</button>
        </div>
    );
};

export default AddAnswer;