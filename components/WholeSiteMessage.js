import { Icon } from '@chakra-ui/icons';
import { Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { BsCameraVideo } from 'react-icons/bs';
import { useRouter } from 'next/router';

const WholeSiteMessage = ({ session, signIn }) => {
  const router = useRouter();
  return (
    <Box bgColor="blackAlpha.900" p={2}>
      <HStack
        as="a"
        justify="center"
        onClick={() => {
          if (!session) {
            signIn();
          }
          router.push('/preview');
        }}
        cursor="pointer"
      >
        <Icon as={BsCameraVideo} color="whatsapp.100" />
        <Text textAlign="center" color="whatsapp.100" fontSize="sm">
          Log in to try our video call feature
        </Text>
      </HStack>
    </Box>
  );
};

export default WholeSiteMessage;
