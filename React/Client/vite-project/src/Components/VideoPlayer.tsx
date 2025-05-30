const VideoPlayer: React.FC<{ url: string; vttUrl: string }> = ({ url, vttUrl }) => {
    const videoUrl = `https://s3.amazonaws.com/my-first-records-bucket.testpnoren/${url}`;

    return (
        <div>
            <video crossOrigin="anonymous" width="600" controls>
                <source src={videoUrl} type="video/mp4" />

                <track
                    kind="subtitles"
                    srcLang="he"
                    src={"https://s3.amazonaws.com/my-first-records-bucket.testpnoren/" + vttUrl}
                    label="עברית"
                    default
                />
                <track
                    kind="subtitles"
                    srcLang="en"
                    src={"https://s3.amazonaws.com/my-first-records-bucket.testpnoren/" + vttUrl}
                    label="English"
                    default
                />

                הדפדפן שלך לא תומך בוידאו.
            </video>
        </div>
    );
};
export default VideoPlayer;

