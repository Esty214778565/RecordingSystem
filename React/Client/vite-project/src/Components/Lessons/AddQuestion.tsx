"use client"

import type React from "react"
import { useState } from "react"
import type { Lesson } from "../../Models/Lesson"
import {
  HelpCircle,
  Plus,
  Sparkles,
  Users,
  MessageSquare,
  TrendingUp,
} from "lucide-react"
import "./AddQuestion.css"

const AddQuestion: React.FC<{ record: Lesson; setRecord: any }> = ({
  record,
  setRecord,
}) => {
  const [questionText, setQuestionText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false) // חדש

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!questionText.trim()) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))

    const newQuestion: any = {
      id: 0,
      text: questionText,
      answers: [],
    }

    setRecord({
      ...record,
      questions: [...(record.questions || []), newQuestion],
    })
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
        <div
          className="add-question-header"
          onClick={() => setShowForm((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          <div className="header-content">
            <div className="header-icon">
              <HelpCircle className="icon-main" />
              <Sparkles className="icon-sparkle" />
            </div>

            <div
              className="header-text"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "row" }}
                className="header-title-container"
              >
                <h2
                  className="header-title"
                  style={{ paddingLeft: 55, paddingRight: 8 }}
                >
                  I Have a Question
                </h2>
                <span
                  role="img"
                  aria-label="thinking face"
                  style={{
                    fontSize: 50,
                    marginRight: 8,
                    verticalAlign: "middle",
                  }}
                >
                  🤔
                </span>
              </div>

              <div className="header-badge">
                <span>Have a Question? Let Us Know!</span>
              </div>
            </div>
          </div>
          <div className="header-gradient-bar"></div>
        </div>

        {/* Form Section with smooth transition */}
        <div className={`form-wrapper ${showForm ? "open" : ""}`}>
          <form onSubmit={handleSubmit} className="question-form">
            <div className="form-group">
              <label className="form-label">
                <MessageSquare className="label-icon" />
                My Question
              </label>
              <div className="input-container">
                <input
                  type="text"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="What would you like to ask?"
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
                <span className="character-count">
                  {questionText.length}/200 characters
                </span>
                <span className="keyboard-hint">
                  Press Ctrl+Enter to submit
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!questionText.trim() || isLoading}
              className="submit-button"
            >
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
        </div>

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
