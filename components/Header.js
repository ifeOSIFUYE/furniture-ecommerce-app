import { Box, Container } from '@chakra-ui/react';
import Navbar from './Navbar';
import { signIn, useSession } from 'next-auth/react';

import React from 'react';
import WholeSiteMessage from './WholeSiteMessage';

const Header = () => {
  const { data: session } = useSession();

  return (
    <Box borderBottom="2px solid orange">
      <WholeSiteMessage session={session} signIn={signIn} />
      <Container maxW="container.xl">
        <Navbar />
      </Container>
    </Box>
  );
};

export default Header;
