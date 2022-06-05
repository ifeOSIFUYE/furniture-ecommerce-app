import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Container,
  Heading,
} from '@chakra-ui/react';
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from '@100mslive/react-sdk';
import Room from '../components/Room';
import { useSession } from 'next-auth/react';

const endPoint =
  'https://prod-in2.100ms.live/hmsapi/furniture-ecommerce.app.100ms.live/';

const PreviewScreen = () => {
  const { status } = useSession();
  const [userName, setUserName] = useState('');
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);

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
    return <Heading>Access Denied</Heading>;
  }

  return (
    <Container>
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
            <Button type="submit">Submit</Button>
          </FormControl>
        </form>
      ) : (
        <Room />
      )}
    </Container>
  );
};

export default PreviewScreen;
