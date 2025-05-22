import React from 'react';
import DownLoadS3 from './DownLoadS3';

interface FileDownloadProps {
    file: {
        name: string;
        url: string;
    };
}

const FileDownload: React.FC<FileDownloadProps> = ({ file }) => {
    const handleDownload = () => {
        // Using window.open to download the file
        window.open(file.url, '_blank');

        // Alternatively, you can create an anchor element and click it programmatically
        // const link = document.createElement('a');
        // link.href = file.url;
        // link.setAttribute('download', file.name); // Optional: specify a filename
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
    };

    return (
        <div>
            <button onClick={handleDownload}>
                Download {file.name}
            </button>
            <DownLoadS3 />
        </div>
    );
};

export default FileDownload;
