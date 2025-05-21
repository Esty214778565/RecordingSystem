// import React from 'react';

// interface AudioPlayerProps {
//   audioUrl: string;
// }

// const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
//   return (
//     <div>
//       <h2>נגן MP3</h2>
//       <audio controls>
//         <source src={audioUrl} type="audio/mpeg" />
//         Your browser does not support the audio tag.
//       </audio>
//     </div>
//   );
// };

// export default AudioPlayer;

import React from 'react';
import { Box, Typography } from '@mui/material';

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {

  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        נגן MP3
      </Typography>
      <audio controls>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
    </Box>
  );
};

export default AudioPlayer;
