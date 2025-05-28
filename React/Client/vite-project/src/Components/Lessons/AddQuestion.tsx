

// import React, { useState } from 'react';
// import { Lesson } from '../../Models/Lesson';

// const AddQuestion: React.FC<{ record: Lesson; setRecord: any }> = ({ record, setRecord }) => {
//     const [questionText, setQuestionText] = useState('');

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         const newQuestion: any = {
//             id: 0, // ניתן לייצר מזהה ייחודי
//             text: questionText,
//             answers: []
//         };
//         setRecord({ ...record, questions: [...(record.questions || []), newQuestion] });
//         setQuestionText('');
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
//             <button type="submit">הוסף שאלה</button>
//         </form>
//     );
// };

// export default AddQuestion;

"use client"

import type React from "react"
import { useState } from "react"
import type { Lesson } from "../../Models/Lesson"
import { HelpCircle, Plus, Sparkles, Users, MessageSquare, TrendingUp } from "lucide-react"
import './AddQuestion.css'

const AddQuestion: React.FC<{ record: Lesson; setRecord: any }> = ({ record, setRecord }) => {
  const [questionText, setQuestionText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!questionText.trim()) return

    setIsLoading(true)

    // Simulate processing time for better UX
    await new Promise((resolve) => setTimeout(resolve, 800))

    const newQuestion: any = {
      id: 0, // Generate unique ID
      text: questionText,
      answers: [],
    }

    setRecord({ ...record, questions: [...(record.questions || []), newQuestion] })
    setQuestionText("")
    setIsLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === "Enter") {
      handleSubmit(e as any)
    }
  }

  return (
    <div className="add-question-container">
      <div className="add-question-card">
        {/* Header Section */}
        <div className="add-question-header">
          <div className="header-content">
            <div className="header-icon">
              <HelpCircle className="icon-main" />
              <Sparkles className="icon-sparkle" />
            </div>
            <div className="header-text">
              <h2 className="header-title">Create New Question</h2>
              <div className="header-badge">
                <span>Engage Your Students</span>
              </div>
            </div>
          </div>
          <div className="header-gradient-bar"></div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="question-form">
          <div className="form-group">
            <label className="form-label">
              <MessageSquare className="label-icon" />
              Question Text
            </label>
            <div className="input-container">
              <input
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What would you like to ask your students?"
                required
                disabled={isLoading}
                className="question-input"
                maxLength={200}
              />
              <div className="input-icon">
                <HelpCircle />
              </div>
            </div>
            <div className="input-footer">
              <span className="character-count">{questionText.length}/200 characters</span>
              <span className="keyboard-hint">Press Ctrl+Enter to submit</span>
            </div>
          </div>

          <button type="submit" disabled={!questionText.trim() || isLoading} className="submit-button">
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                Creating Question...
              </>
            ) : (
              <>
                <Plus className="button-icon" />
                Create Question
              </>
            )}
          </button>
        </form>

        {/* Features Section */}
        <div className="features-section">
          <h3 className="features-title">Why Create Questions?</h3>
          <div className="features-grid">
            <div className="feature-item">
              <Users className="feature-icon" />
              <span>Engage Students</span>
            </div>
            <div className="feature-item">
              <MessageSquare className="feature-icon" />
              <span>Foster Discussion</span>
            </div>
            <div className="feature-item">
              <TrendingUp className="feature-icon" />
              <span>Track Understanding</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddQuestion
