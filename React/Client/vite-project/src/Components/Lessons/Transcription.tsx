
// import React, { useState } from 'react';
// import axios from 'axios';

// interface TranscriptionComponentProps {
//     file: File | null; // Accepting file as a prop
// }

// const TranscriptionComponent: React.FC<TranscriptionComponentProps> = ({ file }) => {
//     const [transcription, setTranscription] = useState<string | null>(null);
//     const [error, setError] = useState<string | null>(null);

//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         if (!file) {
//             setError("No file provided.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axios.post('https://localhost:7043/api/openai/transcribe', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             setTranscription(response.data);
//             setError(null);
//         } catch (err: any) {
//             setError(err.response?.data || "An error occurred while processing your request.");
//             setTranscription(null);
//         }
//     };

//     return (
//         <div>
//             <h1>Audio Transcription</h1>
//             <form onSubmit={handleSubmit}>
//                 <button type="submit">Transcribe</button>
//             </form>
//             {transcription && <div><h2>Transcription Result:</h2><p>{transcription}</p></div>}
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//         </div>
//     );
// };

// export default TranscriptionComponent;


import React, { useState } from 'react';
import { Lesson } from '../../Models/Lesson';

interface TranscriptionComponentProps {
    // File prop to be passed into the component
    audioFile: File;
}

const TranscriptionComponent: React.FC<TranscriptionComponentProps> = ({ audioFile }) => {
    const [transcription, setTranscription] = useState<string | null>(null); // Store the transcription result
    const [error, setError] = useState<string | null>(null); // Store any errors
    const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

    // Function to handle the transcription process
    const handleTranscription = async () => {
        if (!audioFile) {
            setError('No audio file provided.');
            return;
        }

        // Create FormData to send the file to the server
        const formData = new FormData();
        formData.append('file', audioFile);

        setIsLoading(true);
        setError(null);

        try {
            // Send the file to the server for transcription
            // const response = await fetch('https://recordingsystem-server.onrender.com/api/openai/transcribe', {
                const response = await fetch('https://localhost:7043/api/openai/transcribe', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                debugger;
                throw new Error(`Server error: ${response.statusText}`);
            }

            // Parse the JSON response from the server
            const data = await response.json();

            // Display the transcription result
            setTranscription(data.transcription);
        } catch (err) {
            // Handle errors
            debugger;
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };
// const handleUploadSuccess = async (presignedUrl: string, fileType: string, fileSize: number) => {
//         const lessonData: Lesson = {
//             fileName: audioFile.name,
//             description: "id-t",
//             s3Key: presignedUrl,
//             fileType: fileType,
//             size: fileSize,
//             folderId: Number(teacherFolderId),
//         };
//         try {
//             setLoading(true);
//             const result = await dispatch(addLesson(lessonData));
//             console.log("Lesson successfully saved:", result);
//             alert("Lesson uploaded successfully!");
//         } catch (error) {
//             console.error("Error saving lesson:", error);
//             alert("An error occurred while saving the lesson. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };
    return (
        <div>
            <h2>Transcription Tool</h2>
            <button onClick={handleTranscription} disabled={isLoading}>
                {isLoading ? 'Transcribing...' : 'Start Transcription'}
            </button>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {transcription && (
                <div>
                    <h3>Transcription Result:</h3>
                    <p>{transcription}</p>
                </div>
            )}
        </div>
    );
};

export default TranscriptionComponent;