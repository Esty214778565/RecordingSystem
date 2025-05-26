import React, { useState } from 'react';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';

const FileDownloader = () => {
    const [fileName, setFileName] = useState('');
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [video, setVideo] = useState(false);
    const [url, setUrl] = useState('');
    const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.value);
    };

    const handleDownload = async () => {
        if (!fileName) return;

        try {
            // Step 1: Get Presigned URL from the server
            const response = await axios.get('https://recordingsystem-server.onrender.com/api/upload/presigned-url-down', {
                params: { fileName }
            });

            const presignedUrl = response.data.url;
            console.log("Presigned URL:", presignedUrl);
            setUrl(presignedUrl);
            setVideo(true);
            // Step 2: Download the file using axios
            const downloadResponse = await axios.get(presignedUrl, {
                responseType: 'blob', // Important for downloading files
                onDownloadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                    setDownloadProgress(percent);
                },
            });

            // Create a blob link to download the file
            const url = window.URL.createObjectURL(new Blob([downloadResponse.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); // Set the file name for download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url); // Clean up the URL object

            alert('הקובץ יורד...');
        } catch (error) {
            console.error('שגיאה בהורדה:', error);
        }
    };

    return (
        <div>
            <input type="text" placeholder="הכנס שם קובץ" onChange={handleFileNameChange} />
            <button onClick={handleDownload}>הורד קובץ</button>
            {downloadProgress > 0 && <div>התקדמות: {downloadProgress}%</div>}

            {video && <VideoPlayer />}
        </div>
    );
};

export default FileDownloader;
