import {
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  useHMSActions,
  useHMSStore,
} from '@100mslive/react-sdk';
import { Box, Button, HStack } from '@chakra-ui/react';
import React from 'react';

const ControlBar = () => {
  const hmsActions = useHMSActions();
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);

  const toggleAudio = async () => {
    await hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
  };

  const toggleVideo = async () => {
    await hmsActions.setLocalVideoEnabled(!isLocalVideoEnabled);
  };

  return (
    <Box>
      <HStack>
        <Button onClick={toggleAudio}>
          {isLocalAudioEnabled ? 'Mute' : 'Unmute'}
        </Button>
        <Button onClick={toggleVideo}>
          {isLocalVideoEnabled ? 'Hide' : 'Show'}
        </Button>
      </HStack>
    </Box>
  );
};

export default ControlBar;
