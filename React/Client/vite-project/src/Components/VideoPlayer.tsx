
const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {

    // let src = "https://us-east-1.console.aws.amazon.com/s3/object/my-first-records-bucket.testpnoren?region=us-east-1&bucketType=general&prefix=";
    let src = "https://s3.us-east-1.amazonaws.com/my-first-records-bucket.testpnoren/7.wmv"
    //src += videoUrl;

    console.log("enter VideoPlayer");
    console.log("src:" + src);
    //src = "7.wmv";

    return (
        <div>
            <video width="600" controls>
                <source src={videoUrl} type="video/x-ms-wmv" />
                {/* <source src={`${src}.webm`} type="video/webm" />
                <source src={`${src}.ogg`} type="video/ogg" /> */}
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;

