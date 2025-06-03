
"use client"

import type React from "react"
import { useState } from "react"
import axios from "axios"
import { Box, Typography, LinearProgress, Card, CardContent, Chip, Divider, Button } from "@mui/material"
import { Upload, FileAudio, CheckCircle, Zap, Music, Mic, Play, Sparkles, CloudUpload } from "lucide-react"
import './UpLoadS3.css'

interface FileUploaderProps {
  onUploadSuccess: (presignedUrl: string, fileType: string, fileSize: number) => void
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
      setProgress(0)
      setUploadComplete(false)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    try {
      debugger;
      setIsUploading(true)
      // שלב 1: קבלת Presigned URL מהשרת
      const response = await axios.get("https://recordingsystem-server.onrender.com/api/upload/presigned-url-up", {
        //const response = await axios.get("https://localhost:7043/api/upload/presigned-url-up", {
        params: { fileName: file.name, fileType: file.type },
      })

      const presignedUrl = response.data.url

      console.log("persigned url in upload:" + presignedUrl)
      console.log(file.type)

      // שלב 2: העלאת הקובץ ישירות ל-S3
      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
          "Content-Disposition": "inline",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
          setProgress(percent)
        },
      })

      const basePresignedUrl = presignedUrl.split("?")[0]
      // קריאה לפונקציה על מנת להחזיר את המידע הנדרש
      onUploadSuccess(basePresignedUrl, file.type, file.size)

      setUploadComplete(true)
      setIsUploading(false)
      alert("The file was uploaded successfully!")

    } catch (error) {
      console.error("Upload Error", error)
      setIsUploading(false)
    }
  }



  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      {/* Main Upload Card */}
      <Card
        sx={{
          borderRadius: "24px",
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: "2px solid rgba(245, 158, 11, 0.1)",
          boxShadow: "0 16px 50px rgba(15, 23, 42, 0.1)",
          position: "relative",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 20px 60px rgba(15, 23, 42, 0.15)",
            border: "2px solid rgba(245, 158, 11, 0.3)",
          },
        }}
        className="file-uploader-main-card"
      >
        {/* Header gradient overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #f59e0b, #06b6d4, #8b5cf6)",
          }}
        />

        <CardContent sx={{ p: 4 }}>
          {/* Header Section */}
          <Box sx={{ textAlign: "center", mb: 4 }} className="uploader-header">
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #f59e0b, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
                boxShadow: "0 16px 40px rgba(245, 158, 11, 0.3)",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: "-3px",
                  background: "linear-gradient(135deg, #8b5cf6, #f59e0b)",
                  borderRadius: "50%",
                  zIndex: -1,
                  opacity: 0.5,
                },
              }}
              className="uploader-icon-pulse"
            >
              <CloudUpload style={{ fontSize: "40px", color: "white" }} />
            </Box>

            <Chip
              icon={<Sparkles style={{ color: "#f59e0b" }} />}
              label="🎵 Audio Upload Center"
              sx={{
                background: "linear-gradient(135deg, #f59e0b15, #06b6d410)",
                color: "#0f172a",
                fontWeight: 700,
                fontSize: "0.9rem",
                mb: 3,
                border: "2px solid #f59e0b30",
                boxShadow: "0 8px 24px rgba(245, 158, 11, 0.2)",
                px: 2,
                py: 1,
              }}
              className="uploader-badge-glow"
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
              className="uploader-title-shimmer"
            >
              Upload Your{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(135deg, #f59e0b, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Audio Content
              </Box>
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#64748b",
                fontWeight: 500,
                maxWidth: "400px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Share your knowledge through high-quality audio recordings. Upload files to create engaging
              educational content.
            </Typography>
          </Box>

          {/* File Upload Section */}
          <Box
            sx={{
              border: "2px dashed rgba(245, 158, 11, 0.3)",
              borderRadius: "20px",
              p: 4,
              textAlign: "center",
              background: "linear-gradient(135deg, #f59e0b08, #06b6d405)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                border: "2px dashed rgba(245, 158, 11, 0.6)",
                background: "linear-gradient(135deg, #f59e0b12, #06b6d408)",
                transform: "translateY(-2px)",
              },
            }}
            className="file-drop-zone"
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <input
              id="file-input"
              type="file"
              // accept=".mp3,.mp4,.wmv,video/mp4,video/x-ms-wmv,audio/mpeg"
              accept=".mp3,.mp4,video/mp4,audio/mpeg"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #8b5cf615, #f59e0b10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
                border: "2px solid rgba(139, 92, 246, 0.2)",
              }}
              className="upload-icon-bounce"
            >
              <Upload style={{ fontSize: "28px", color: "#8b5cf6" }} />
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#0f172a",
                mb: 1,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Drop your audio or video file here
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600, mb: 2 }}>
              or click to browse files
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748b" }}>
              Supports MP3, MP4 files up to 100MB
            </Typography>
          </Box>

          {/* File Info Section */}
          {file && (
            <Box
              sx={{
                mt: 4,
                p: 3,
                background: "linear-gradient(135deg, #06b6d408, #8b5cf605)",
                borderRadius: "16px",
                border: "1px solid rgba(6, 182, 212, 0.2)",
              }}
              className="file-info-section"
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 24px rgba(6, 182, 212, 0.3)",
                  }}
                  className="file-icon-pulse"
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
                    {file.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Chip
                      icon={<Music style={{ fontSize: "14px" }} />}
                      label={file.type}
                      size="small"
                      sx={{
                        background: "linear-gradient(135deg, #06b6d415, #8b5cf610)",
                        color: "#06b6d4",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    />
                    <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                      {formatFileSize(file.size)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Progress Bar */}
              {progress > 0 && (
                <Box sx={{ mb: 3 }} className="progress-section">
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#0f172a" }}>
                      Upload Progress
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#f59e0b" }}>
                      {progress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "rgba(245, 158, 11, 0.1)",
                      "& .MuiLinearProgress-bar": {
                        background: "linear-gradient(90deg, #f59e0b, #06b6d4)",
                        borderRadius: 4,
                      },
                    }}
                    className="progress-bar-glow"
                  />
                </Box>
              )}

              {/* Upload Complete */}
              {uploadComplete && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    background: "linear-gradient(135deg, #10b98115, #06b6d410)",
                    borderRadius: "12px",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                    mb: 3,
                  }}
                  className="upload-success-section"
                >
                  <CheckCircle style={{ fontSize: "24px", color: "#10b981" }} />
                  <Typography variant="body1" sx={{ fontWeight: 700, color: "#10b981" }}>
                    Upload completed successfully!
                  </Typography>
                </Box>
              )}

              {/* Action Buttons */}
              <Button
                variant="contained"
                onClick={handleUpload}
                disabled={isUploading || uploadComplete}
                sx={{
                  background: "linear-gradient(135deg, #f59e0b, #06b6d4)",
                  color: "white",
                  fontWeight: 700,
                  borderRadius: "12px",
                  px: 4,
                  py: 1.5,
                  boxShadow: "0 8px 24px rgba(245, 158, 11, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #d97706, #0891b2)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 32px rgba(245, 158, 11, 0.4)",
                  },
                  "&:disabled": {
                    background: "#64748b",
                    color: "white",
                  },
                }}
                className="upload-button-glow"
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Upload style={{ fontSize: "18px" }} />
                  {isUploading ? "Uploading..." : "Save File"}
                </Box>
              </Button>

            </Box>
          )}

          {/* Features Section */}
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 3, background: "linear-gradient(90deg, #f59e0b, #06b6d4)" }} />
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
              Upload Features
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 2 }}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #f59e0b15, #06b6d410)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1,
                  }}
                >
                  <Zap style={{ fontSize: "24px", color: "#f59e0b" }} />
                </Box>
                <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                  Fast Upload
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #06b6d415, #8b5cf610)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1,
                  }}
                >
                  <Mic style={{ fontSize: "24px", color: "#06b6d4" }} />
                </Box>
                <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                  High Quality
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #8b5cf615, #10b98110)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1,
                  }}
                >
                  <Play style={{ fontSize: "24px", color: "#8b5cf6" }} />
                </Box>
                <Typography variant="caption" sx={{ color: "#64748b", fontWeight: 600 }}>
                  Instant Preview
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default FileUploader

