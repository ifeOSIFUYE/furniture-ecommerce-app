import {
  selectCameraStreamByPeerID,
  useHMSActions,
  useHMSStore,
} from '@100mslive/react-sdk';
import { Box, Text } from '@chakra-ui/react';
import React, { useRef, useEffect } from 'react';

const VideoTile = ({ peer, isLocal }) => {
  const hmsActions = useHMSActions();
  const videoRef = useRef(null);
  const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id));

  useEffect(() => {
    (async () => {
      if (videoRef.current && videoTrack) {
        if (videoTrack.enabled) {
          await hmsActions.attachVideo(videoTrack.id, videoRef.current);
        } else {
          await hmsActions.detachVideo(videoTrack.id, videoRef.current);
        }
      }
    })();
  }, [hmsActions, videoTrack]);

  return (
    <Box>
      <video ref={videoRef} autoPlay={true} playsInline muted={true}></video>
      <Text>{peer.name}</Text>
    </Box>
  );
};

export default VideoTile;
