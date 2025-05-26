



"use client"

import type React from "react"
import { useState } from "react"
import type { Lesson, Answer } from "../../Models/Lesson"
import { MessageCircle, Send, Sparkles, Users, CheckCircle2 } from "lucide-react"
import './AddAnswer.css'

const AddAnswer: React.FC<{ question: any; record: Lesson; setRecord: any }> = ({ question, record, setRecord }) => {
    const [answerText, setAnswerText] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleAddAnswer = async () => {
        if (!answerText.trim()) return

        setIsSubmitting(true)

        // Simulate processing time for better UX
        await new Promise((resolve) => setTimeout(resolve, 800))

        const newAnswer: Answer = {
            id: 0,
            text: answerText,
            questionId: question.id,
            question: null,
        }

        const updatedQuestions = record.questions.map((q) =>
            q === question ? { ...q, answers: [...(q.answers || []), newAnswer] } : q,
        )

        setRecord({ ...record, questions: updatedQuestions })
        setAnswerText("")
        setIsSubmitting(false)
    }

    return (
        <div className="add-answer-container">
            {/* Header Section */}
            <div className="add-answer-header">
                <div className="header-content">
                    <div className="header-icon">
                        <MessageCircle className="message-icon" />
                    </div>
                    <div className="header-text">
                        <h3 className="section-title">
                            <span className="shimmer-text">Share Your Insight</span>
                        </h3>
                        <p className="section-subtitle">Contribute to the Academic Discussion</p>
                    </div>
                </div>

                <div className="header-badges">
                    <div className="badge primary-badge">
                        <Sparkles size={14} />
                        <span>Knowledge Sharing</span>
                    </div>
                    <div className="badge secondary-badge">
                        <Users size={14} />
                        <span>Community Input</span>
                    </div>
                </div>
            </div>

            {/* Input Section */}
            <div className="input-section">
                {/* Input Field */}
                <div className="input-container">
                    <div className="input-wrapper">
                        <div className="input-icon">
                            <MessageCircle size={20} />
                        </div>
                        <input
                            type="text"
                            value={answerText}
                            onChange={(e) => setAnswerText(e.target.value)}
                            placeholder="Share your thoughtful response..."
                            className="answer-input"
                            disabled={isSubmitting}
                            onKeyPress={(e) => {
                                if (e.key === "Enter" && !isSubmitting) {
                                    handleAddAnswer()
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Button on separate line */}
                <div className="button-container">
                    <button
                        type="button"
                        onClick={handleAddAnswer}
                        disabled={!answerText.trim() || isSubmitting}
                        className={`submit-button ${isSubmitting ? "submitting" : ""}`}
                    >
                        {isSubmitting ? (
                            <div className="loading-content">
                                <div className="spinner"></div>
                                <span>Submitting...</span>
                            </div>
                        ) : (
                            <div className="button-content">
                                <Send size={18} />
                                <span>Submit Answer</span>
                            </div>
                        )}
                    </button>
                </div>

                {/* Character Counter */}
                <div className="input-footer">
                    <div className="character-count">
                        <span className={answerText.length > 200 ? "warning" : ""}>{answerText.length}/500 characters</span>
                    </div>
                    <div className="input-hint">
                        <span>Press Enter to submit quickly</span>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="features-section">
                <div className="feature-item">
                    <CheckCircle2 size={16} />
                    <span>Thoughtful Responses</span>
                </div>
                <div className="feature-item">
                    <MessageCircle size={16} />
                    <span>Academic Discussion</span>
                </div>
                <div className="feature-item">
                    <Users size={16} />
                    <span>Peer Learning</span>
                </div>
            </div>
        </div>
    )
}

export default AddAnswer

