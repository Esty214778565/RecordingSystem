import FileDownload from "./FileDownload";



const Try = () => {
    const fileToDownload = {
        name: 'example.pdf',
        url: 'https://s3.us-east-1.amazonaws.com/my-first-records-bucket.testpnoren/44.wmv'
    };

    return (
        <div>
            <h1>File Download Example</h1>
            <FileDownload file={fileToDownload} />
        </div>
    );
};

export default Try;
