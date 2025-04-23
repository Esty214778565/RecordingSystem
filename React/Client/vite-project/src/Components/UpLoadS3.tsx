import React, { useState } from 'react';
import axios from 'axios';
import TranscriptionComponent from './Lessons/Transcription';

interface FileUploaderProps {
  onUploadSuccess: (presignedUrl: string, fileType: string, fileSize: number) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [transcribe, setTranscribe] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      // שלב 1: קבלת Presigned URL מהשרת
      const response = await axios.get('https://localhost:7043/api/upload/presigned-url-up', {
        params: { fileName: file.name }
      });

      const presignedUrl = response.data.url;

      console.log("persigned url in upload:" + presignedUrl);

      console.log(file.type);

      // שלב 2: העלאת הקובץ ישירות ל-S3

      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percent);
        },
      });

      const basePresignedUrl = presignedUrl.split('?')[0];
      // קריאה לפונקציה על מנת להחזיר את המידע הנדרש
      onUploadSuccess(basePresignedUrl, file.type, file.size);

      alert('The file was uploaded successfully!');

    } catch (error) {
      console.error('Upload Error', error);
    }
  };
  const handletranscribe = () => {
    setTranscribe(true);
  }
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Save File</button>
      {progress > 0 && <div>Process: {progress}%</div>}
      <button onClick={handletranscribe}>Transcribe</button>
      {transcribe && file && <TranscriptionComponent audioFile={file} />}
    </div>
  );
};

export default FileUploader;
