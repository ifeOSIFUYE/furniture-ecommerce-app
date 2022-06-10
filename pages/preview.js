import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Container,
  Heading,
  Center,
  Text,
  HStack,
  VStack,
  Icon,
} from '@chakra-ui/react';
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from '@100mslive/react-sdk';
import Room from '../components/Room';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { WarningIcon } from '@chakra-ui/icons';

const endPoint =
  'https://prod-in2.100ms.live/hmsapi/furniture-ecommerce.app.100ms.live/';

const PreviewScreen = () => {
  const { status } = useSession();
  const [userName, setUserName] = useState('');
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const getToken = async () => {
      const response = await fetch(`${endPoint}api/token`, {
        method: 'POST',
        body: JSON.stringify({
          user_id: userName,
          role: 'host',
          type: 'app',
          room_id: '629ba2d92630221c75a3bd45',
        }),
      });
      const { token } = await response.json();
      return token;
    };

    const myToken = await getToken();
    hmsActions.join({
      userName: userName,
      authToken: myToken,
    });
  };

  useEffect(() => {
    window.onunload = () => {
      hmsActions.leave();
    };
  }, [hmsActions]);

  if (status === 'unauthenticated') {
    return (
      <Center h="90vh" bg="orange.100">
        <VStack>
          <WarningIcon w={20} h={20} color="red" />
          <Heading>ACCESS DENIED</Heading>
          <Text textAlign="center">
            Seems like you are not <br /> allowed to access this page{' '}
          </Text>
          <Button
            aria-label="Go to home page"
            size="lg"
            colorScheme="green"
            onClick={() => router.push('/')}
          >
            Go Back
          </Button>
        </VStack>
      </Center>
    );
  }

  return (
    <Center h="90vh" bg="orange.100">
      {!isConnected ? (
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel htmlFor={userName}>User name</FormLabel>
            <Input
              type="text"
              value={userName}
              name={userName}
              placeholder="User name"
              onChange={(e) => setUserName(e.target.value)}
            />
            <FormHelperText>
              Experience secure video chatting with our sales assistants.
            </FormHelperText>
            <Button
              type="submit"
              variant="outline"
              colorScheme="blue"
              onClick={handleSubmit}
              mt={5}
            >
              Submit
            </Button>
          </FormControl>
        </form>
      ) : (
        <Room />
      )}
    </Center>
  );
};

export default PreviewScreen;
