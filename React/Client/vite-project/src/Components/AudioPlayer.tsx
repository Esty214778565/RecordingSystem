

import React from 'react';
import { Box } from '@mui/material';
// import { useParams } from 'react-router-dom';

// interface AudioPlayerProps {
//   audioUrl: string;
// }

const AudioPlayer: React.FC<{ url: string }> = ({ url }) => {


  // const params = useParams<{ url?: string }>();
  const audioUrl = url
    ? `https://s3.amazonaws.com/my-first-records-bucket.testpnoren/${url}`
    : '';
  console.log('AudioPlayer component rendered with audioUrl:', audioUrl);
  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <audio controls>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
    </Box>
  );
};

export default AudioPlayer;
