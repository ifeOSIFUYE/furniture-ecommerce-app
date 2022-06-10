import {
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  useHMSActions,
  useHMSStore,
} from '@100mslive/react-sdk';
import { Box, Button, HStack, IconButton } from '@chakra-ui/react';
import React from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import { GrVolumeMute } from 'react-icons/gr';
import { VscUnmute } from 'react-icons/vsc';

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
        {isLocalAudioEnabled ? (
          <IconButton
            icon={<GrVolumeMute />}
            onClick={toggleAudio}
            colorScheme="red"
          />
        ) : (
          <IconButton
            icon={<VscUnmute />}
            onClick={toggleAudio}
            colorScheme="green"
          />
        )}

        {isLocalVideoEnabled ? (
          <IconButton
            icon={<BiHide />}
            onClick={toggleVideo}
            colorScheme="red"
          />
        ) : (
          <IconButton
            icon={<BiShow />}
            onClick={toggleVideo}
            colorScheme="green"
          />
        )}
      </HStack>
    </Box>
  );
};

export default ControlBar;
