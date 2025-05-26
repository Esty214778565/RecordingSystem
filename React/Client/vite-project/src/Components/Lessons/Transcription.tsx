

"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  CircularProgress,
  Button,
  Divider,
  Paper,
} from "@mui/material"
import {
  Mic,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Zap,
  Brain,
  AudioWaveformIcon as Waveform,
  Clock,
  FileAudio,
  MessageSquare,
} from "lucide-react"
import './Transcription.css'

interface TranscriptionComponentProps {
  // File prop to be passed into the component
  audioFile: File
}

const TranscriptionComponent: React.FC<TranscriptionComponentProps> = ({ audioFile }) => {
  const [transcription, setTranscription] = useState<string | null>(null) // Store the transcription result
  const [error, setError] = useState<string | null>(null) // Store any errors
  const [isLoading, setIsLoading] = useState<boolean>(false) // Loading state
  const [progress, setProgress] = useState<number>(0) // Progress simulation

  // Function to handle the transcription process
  const handleTranscription = async () => {
    if (!audioFile) {
      setError("No audio file provided.")
      return
    }

    // Create FormData to send the file to the server
    const formData = new FormData()
    formData.append("file", audioFile)

    setIsLoading(true)
    setError(null)
    setProgress(0)

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.random() * 15
      })
    }, 500)

    try {
      // Send the file to the server for transcription
      const response = await fetch("https://recordingsystem-server.onrender.com/api/openai/transcribe", {
        // const response = await fetch('https://localhost:7043/api/openai/transcribe', {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        debugger
        throw new Error(`Server error: ${response.statusText}`)
      }

      // Parse the JSON response from the server
      const data = await response.json()

      // Display the transcription result
      setTranscription(data.transcription)
      setProgress(100)
    } catch (err) {
      // Handle errors
      debugger
      setError((err as Error).message)
      clearInterval(progressInterval)
    } finally {
      setIsLoading(false)
      clearInterval(progressInterval)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getEstimatedTime = (fileSize: number) => {
    // Rough estimation: 1MB = ~1 minute of audio = ~30 seconds processing
    const estimatedMinutes = Math.ceil((fileSize / (1024 * 1024)) * 0.5)
    return estimatedMinutes < 1 ? "< 1 minute" : `~${estimatedMinutes} minutes`
  }

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      {/* Main Transcription Card */}
      <Card
        sx={{
          borderRadius: "24px",
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: "2px solid rgba(139, 92, 246, 0.1)",
          boxShadow: "0 16px 50px rgba(15, 23, 42, 0.1)",
          position: "relative",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 20px 60px rgba(15, 23, 42, 0.15)",
            border: "2px solid rgba(139, 92, 246, 0.3)",
          },
        }}
        className="transcription-main-card"
      >
        {/* Header gradient overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #8b5cf6, #06b6d4, #f59e0b)",
          }}
        />

        <CardContent sx={{ p: 4 }}>
          {/* Header Section */}
          <Box sx={{ textAlign: "center", mb: 4 }} className="transcription-header">
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
                boxShadow: "0 16px 40px rgba(139, 92, 246, 0.3)",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: "-3px",
                  background: "linear-gradient(135deg, #f59e0b, #8b5cf6)",
                  borderRadius: "50%",
                  zIndex: -1,
                  opacity: 0.5,
                },
              }}
              className="transcription-icon-pulse"
            >
              <Brain style={{ fontSize: "40px", color: "white" }} />
            </Box>

            <Chip
              icon={<Sparkles style={{ color: "#8b5cf6" }} />}
              label="🧠 AI-Powered Transcription"
              sx={{
                background: "linear-gradient(135deg, #8b5cf615, #06b6d410)",
                color: "#0f172a",
                fontWeight: 700,
                fontSize: "0.9rem",
                mb: 3,
                border: "2px solid #8b5cf630",
                boxShadow: "0 8px 24px rgba(139, 92, 246, 0.2)",
                px: 2,
                py: 1,
              }}
              className="transcription-badge-glow"
            />

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontFamily: "'Playfair Display', serif",
                background: "linear-gradient(135deg, #0f172a, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: { xs: "1.5rem", md: "1.8rem" },
              }}
              className="transcription-title-shimmer"
            >
              Audio{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Transcription
              </Box>{" "}
              Tool
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#64748b",
                fontWeight: 500,
                maxWidth: "500px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Transform your audio content into accurate text using advanced AI technology. Perfect for creating
              accessible educational materials.
            </Typography>
          </Box>

          {/* Audio File Info */}
          <Box
            sx={{
              p: 3,
              background: "linear-gradient(135deg, #8b5cf608, #06b6d405)",
              borderRadius: "16px",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              mb: 4,
            }}
            className="audio-file-info"
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 24px rgba(139, 92, 246, 0.3)",
                }}
                className="audio-file-icon-pulse"
              >
                <FileAudio style={{ fontSize: "24px", color: "white" }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "#0f172a",
                    fontFamily: "'Playfair Display', serif",
                    mb: 0.5,
                  }}
                >
                  {audioFile.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                  <Chip
                    icon={<Mic style={{ fontSize: "14px" }} />}
                    label={audioFile.type}
                    size="small"
                    sx={{
                      background: "linear-gradient(135deg, #8b5cf615, #06b6d410)",
                      color: "#8b5cf6",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />
                  <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                    {formatFileSize(audioFile.size)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Clock style={{ fontSize: "14px", color: "#64748b" }} />
                    <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                      Est. {getEstimatedTime(audioFile.size)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Transcription Button */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Button
              onClick={handleTranscription}
              disabled={isLoading}
              sx={{
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                color: "white",
                fontWeight: 800,
                fontSize: "1.1rem",
                py: 2,
                px: 6,
                borderRadius: "16px",
                boxShadow: "0 16px 40px rgba(139, 92, 246, 0.3)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  background: "linear-gradient(135deg, #7c3aed, #0891b2)",
                  transform: "translateY(-4px)",
                  boxShadow: "0 20px 60px rgba(139, 92, 246, 0.4)",
                },
                "&:disabled": {
                  background: "#64748b",
                  color: "white",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                  transition: "left 0.6s",
                },
                "&:hover::before": {
                  left: "100%",
                },
              }}
              className="transcription-button-glow"
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {isLoading ? (
                  <>
                    <CircularProgress size={20} sx={{ color: "white" }} className="transcription-spinner" />
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      Transcribing...
                    </Typography>
                    <Waveform style={{ fontSize: "20px" }} />
                  </>
                ) : (
                  <>
                    <Brain style={{ fontSize: "20px" }} />
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      Start Transcription
                    </Typography>
                    <Zap style={{ fontSize: "20px" }} />
                  </>
                )}
              </Box>
            </Button>
          </Box>

          {/* Progress Section */}
          {isLoading && (
            <Box sx={{ mb: 4 }} className="transcription-progress-section">
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 700, color: "#0f172a" }}>
                  AI Processing Audio...
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 700, color: "#8b5cf6" }}>
                  {Math.round(progress)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  "& .MuiLinearProgress-bar": {
                    background: "linear-gradient(90deg, #8b5cf6, #06b6d4)",
                    borderRadius: 4,
                  },
                }}
                className="transcription-progress-bar-glow"
              />
              <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600, mt: 1, display: "block" }}>
                Converting speech to text using advanced AI models...
              </Typography>
            </Box>
          )}

          {/* Error Section */}
          {error && (
            <Box
              sx={{
                p: 3,
                background: "linear-gradient(135deg, #ef444415, #ef444410)",
                borderRadius: "16px",
                border: "2px solid rgba(239, 68, 68, 0.2)",
                mb: 4,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
              className="transcription-error-section"
            >
              <AlertCircle style={{ fontSize: "24px", color: "#ef4444" }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#ef4444", mb: 0.5 }}>
                  Transcription Error
                </Typography>
                <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 500 }}>
                  {error}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Transcription Result */}
          {transcription && (
            <Box className="transcription-result-section">
              <Divider sx={{ mb: 4, background: "linear-gradient(90deg, #8b5cf6, #06b6d4)" }} />

              {/* Success Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                  p: 2,
                  background: "linear-gradient(135deg, #10b98115, #06b6d410)",
                  borderRadius: "12px",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                }}
                className="transcription-success-header"
              >
                <CheckCircle style={{ fontSize: "24px", color: "#10b981" }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#10b981" }}>
                  Transcription Completed Successfully!
                </Typography>
              </Box>

              {/* Result Card */}
              <Paper
                elevation={0}
                sx={{
                  background: "linear-gradient(135deg, #f8fafc, #ffffff)",
                  borderRadius: "20px",
                  p: 4,
                  border: "2px solid rgba(139, 92, 246, 0.1)",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="transcription-result-card"
              >
                {/* Result header */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #06b6d415, #10b98110)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MessageSquare style={{ fontSize: "24px", color: "#06b6d4" }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#0f172a",
                        fontFamily: "'Playfair Display', serif",
                        mb: 0.5,
                      }}
                    >
                      Transcription Result
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600 }}>
                      AI-generated text from your audio content
                    </Typography>
                  </Box>
                </Box>

                {/* Transcription Text */}
                <Box
                  sx={{
                    background: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "16px",
                    p: 3,
                    border: "1px solid rgba(139, 92, 246, 0.1)",
                    maxHeight: "300px",
                    overflowY: "auto",
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#f1f1f1",
                      borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                      borderRadius: "4px",
                    },
                  }}
                  className="transcription-text-container"
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#0f172a",
                      lineHeight: 1.8,
                      fontSize: "1.1rem",
                      fontWeight: 500,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {transcription}
                  </Typography>
                </Box>

                {/* Stats */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, flexWrap: "wrap", gap: 2 }}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: "#8b5cf6",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {transcription.split(" ").length}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                      Words
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: "#06b6d4",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {transcription.length}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                      Characters
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: "#10b981",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {transcription.split(".").length - 1}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                      Sentences
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          )}

          {/* Features Section */}
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 3, background: "linear-gradient(90deg, #8b5cf6, #06b6d4)" }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#0f172a",
                fontFamily: "'Playfair Display', serif",
                mb: 3,
                textAlign: "center",
              }}
            >
              AI Transcription Features
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 2 }}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #8b5cf615, #06b6d410)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1,
                  }}
                >
                  <Brain style={{ fontSize: "24px", color: "#8b5cf6" }} />
                </Box>
                <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                  AI Powered
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #06b6d415, #10b98110)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1,
                  }}
                >
                  <Zap style={{ fontSize: "24px", color: "#06b6d4" }} />
                </Box>
                <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                  Fast Processing
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #10b98115, #f59e0b10)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1,
                  }}
                >
                  <CheckCircle style={{ fontSize: "24px", color: "#10b981" }} />
                </Box>
                <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                  High Accuracy
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default TranscriptionComponent
