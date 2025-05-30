
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

const VideoPlayer: React.FC<{ url: string, vttUrl: string }> = ({ url, vttUrl }) => {
    // Ensure vttUrl uses https
    const safeVttUrl = vttUrl?.replace(/^http:\/\//, 'https://');

    const videoUrl = url
        ? `https://s3.amazonaws.com/my-first-records-bucket.testpnoren/${url}`
        : '';

    console.log("enter VideoPlayer");
    console.log("videoUrl:", videoUrl);

    return (
        <div>
            <video width="600" controls>
                <source src={videoUrl} type="video/mp4" />
                <source src={videoUrl} type="video/x-ms-wmv" />
                Your browser does not support the video tag.

                {safeVttUrl && (
                    <track
                        kind="subtitles"
                        srcLang="he"
                        src={safeVttUrl}
                        label="עברית"
                        default
                    />
                )}
            </video>
        </div>
    );
};

export default VideoPlayer;

