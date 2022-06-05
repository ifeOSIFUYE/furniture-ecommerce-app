import React from 'react';
import {
  useHMSStore,
  selectLocalPeer,
  selectPeers,
} from '@100mslive/react-sdk';
import { Box } from '@chakra-ui/react';
import VideoTile from './VideoTile';
import ControlBar from './ControlBar';

const Room = () => {
  const localPeer = useHMSStore(selectLocalPeer);
  const peers = useHMSStore(selectPeers);

  return (
    <Box>
      {localPeer && <VideoTile peer={localPeer} isLocal={true} />}
      {peers &&
        peers
          .filter((peer) => !peer.isLocal)
          .map((peer) => {
            return <VideoTile key={peer} isLocal={false} peer={peer} />;
          })}
      <Box>
        <ControlBar />
      </Box>
    </Box>
  );
};

export default Room;
