// // React Component
// import React, { useState } from 'react';
// import axios from 'axios';

// const FileUploader = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [progress, setProgress] = useState(0);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     console.log("enter to handleUpload");
//     console.log("file:" + file);


//     if (!file) return;

//     try {
//       // שלב 1: קבלת Presigned URL מהשרת
//       const response = await axios.get('https://localhost:7043/api/upload/presigned-url-up', {
//         params: { fileName: file.name }
//       });

//       const presignedUrl = response.data.url;
//       console.log("persignurl:" + presignedUrl);

//       console.log("file.type" + file.type);
//       console.log("file.name" + file.name);

//       // שלב 2: העלאת הקובץ ישירות ל-S3
//       await axios.put(presignedUrl, file, {
//         headers: {
//           'Content-Type': file.type,
//           //'Content-Type': "video/x-ms-wmv",
//         },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round(
//             (progressEvent.loaded * 100) / (progressEvent.total || 1)
//           );
//           setProgress(percent);
//         },
//       });

//       alert('הקובץ הועלה בהצלחה!');



//     } catch (error) {
//       console.error('שגיאה בהעלאה:', error);
//     }

//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>העלה קובץ</button>
//       {progress > 0 && <div>התקדמות: {progress}%</div>}
//     </div>

//   );
// };

// export default FileUploader;


// FileUploader.tsx



// FileUploader.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface FileUploaderProps {
  onUploadSuccess: (presignedUrl: string, fileName: string, fileType: string, fileSize: number) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

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
      debugger;
      console.log("persigned url in upload:" + presignedUrl);

      console.log(file.type);

      // שלב 2: העלאת הקובץ ישירות ל-S3
      debugger;
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
      onUploadSuccess(basePresignedUrl, file.name, file.type, file.size);

      alert('הקובץ הועלה בהצלחה!');

    } catch (error) {
      console.error('שגיאה בהעלאה:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>העלה קובץ</button>
      {progress > 0 && <div>התקדמות: {progress}%</div>}
    </div>
  );
};

export default FileUploader;
