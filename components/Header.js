import { Box, Code } from '@chakra-ui/react';
import Navbar from './Navbar';
import { useGlobalContext } from '../context/context';
import CartDrawer from './CartDrawer';
import React from 'react';

const Header = () => {
  return (
    <Box>
      <Navbar />
      <Code>header.js</Code>
    </Box>
  );
};

export default Header;
