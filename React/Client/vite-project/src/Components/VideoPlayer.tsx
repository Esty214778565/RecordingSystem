
// const VideoPlayer: React.FC<{ url: string, vttUrl: string }> = ({ url, vttUrl }) => {
//     vttUrl = "https://s3.us-east-1.amazonaws.com/my-first-records-bucket.testpnoren/transcriptions/69e19313-1e93-4cb1-a23e-a424e1e7a59a.vtt"
//     //   const params = useParams<{ url?: string }>();
//     const videoUrl = url
//         ? `https://s3.amazonaws.com/my-first-records-bucket.testpnoren/${url}`
//         : '';
//     // let src = "https://us-east-1.console.aws.amazon.com/s3/object/my-first-records-bucket.testpnoren?region=us-east-1&bucketType=general&prefix=";
//     //let src = "https://s3.us-east-1.amazonaws.com/my-first-records-bucket.testpnoren/7.wmv"
//     //src += videoUrl;

//     console.log("enter VideoPlayer");
//     console.log("videoUrl:", videoUrl);

//     //console.log("src:" + src);
//     //src = "7.wmv";

//     return (
//         <div>
//             <video width="600" controls>
//                 {/* <source src={videoUrl.replace('.wmv', '.mp4')} type="video/mp4" /> */}
//                 <source src={videoUrl} type="video/mp4" />
//                 <source src={videoUrl} type="video/x-ms-wmv" />
//                 Your browser does not support the video tag.

//                 <track
//                     kind="subtitles"
//                     srcLang="he"
//                     src={vttUrl}
//                     label="עברית"
//                     default
//                 />
//             </video>
//         </div>
//     );
// };

// export default VideoPlayer;

// // Good: store as string
// // updateDate: new Date().toISOString()
// // Bad: store as Date object
// // updateDate: new Date()

// const VideoPlayer: React.FC<{ url: string, vttUrl: string }> = ({ url }) => {
//     // Ensure vttUrl uses https
//     // const safeVttUrl = vttUrl?.replace(/^http:\/\//, 'https://');

//     const videoUrl = url
//         ? `https://s3.amazonaws.com/my-first-records-bucket.testpnoren/${url}`
//         : '';

//     console.log("enter VideoPlayer");

//     console.log("videoUrl:", videoUrl);

//     const aaa = "https://s3.us-east-1.amazonaws.com/my-first-records-bucket.testpnoren/transcriptions/35ee9393-f834-4dfe-a4c5-76b867d760ba.vtt"
//     return (
//         <div>
//             <video width="600" controls>
//                 <source src={videoUrl} type="video/mp4" />
//                 <source src={videoUrl} type="video/x-ms-wmv" />
//                 Your browser does not support the video tag.


//                 <track
//                     kind="subtitles"
//                     srcLang="he"
//                     src={`https://recordingsystem-server.onrender.com/api/Transcription/proxy-vtt?url=${encodeURIComponent(aaa)}`}


//                     label="עברית"
//                     default
//                 />

//                 {/* {safeVttUrl && ( */}
//                 {/* <track
//                         kind="subtitles"
//                         srcLang="he"
//                         src={`https://localhost:7043/api/Transcription/proxy-vtt?url=${encodeURIComponent(vttUrl)}`}
//                         label="עברית"
//                         default
//                     /> */}
//                 {/* ) */}
//                 {/* } */}
//             </video>
//         </div>
//     );
// };

// export default VideoPlayer;


// const VideoPlayer: React.FC<{ url: string; vttUrl: string }> = ({ url }) => {
//     const videoUrl = `https://s3.amazonaws.com/my-first-records-bucket.testpnoren/${url}`;

//     // const vttFileName = ((fullUrl: string): string => {
//     //     debugger;
//     //     const parts = fullUrl.split('/');
//     //     return parts[parts.length - 1]; // מחזיר את שם הקובץ בלבד

//     // })(vttUrl);

//     return (
//         <div>
//             <video width="600" controls>
//                 <source src={videoUrl} type="video/mp4" />
//                 <track
//                     kind="subtitles"
//                     srcLang="he"
//                     src="https://s3.amazonaws.com/my-first-records-bucket.testpnoren/transcriptions/89c1ea0c-696b-49bb-9023-8aa20d390f6e.vtt"
//                     // src={`https://localhost:7043/api/Transcription/vtt/${vttFileName}`}
//                     //src={`https://recordingsystem-server.onrender.com/api/Transcription/vtt/${vttFileName}`}
//                     label="עברית"
//                     default
//                 />
//                 הדפדפן שלך לא תומך בוידאו.
//             </video>
//         </div>
//     );
// };


// export default VideoPlayer;



const VideoPlayer: React.FC<{ url: string; vttUrl: string }> = ({ url, vttUrl }) => {
    const videoUrl = `https://s3.amazonaws.com/my-first-records-bucket.testpnoren/${url}`;
    // Ensure vttUrl uses https
    // const safeVttUrl = vttUrl?.replace(/^http:\/\//, 'https://');

    return (
        <div>
            <video width="600" controls>
                <source src={videoUrl} type="video/mp4" />

                <track
                    kind="subtitles"
                    srcLang="he"
                    src={"https://s3.amazonaws.com/my-first-records-bucket.testpnoren/" + vttUrl}
                    label="עברית"
                    default
                />

                הדפדפן שלך לא תומך בוידאו.
            </video>
        </div>
    );
};
export default VideoPlayer;

