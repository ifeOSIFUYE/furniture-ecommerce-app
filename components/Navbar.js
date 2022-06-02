import {
  Badge,
  Box,
  Button,
  Code,
  Flex,
  Heading,
  HStack,
  Input,
  Link,
} from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useGlobalContext } from '../context/context';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const { data: session } = useSession();
  const { numItemsInCart } = useGlobalContext();

  return (
    <Flex>
      <Heading>ReceiptBook</Heading>
      <HStack>
        <Link>Shop</Link>
        <Link>About</Link>
        <Link>FAQ</Link>
        <Link>Contact</Link>
      </HStack>
      <HStack>
        <Input placeholder="Search..." />
        {!session && (
          <Button
            onClick={() => {
              signIn('github');
            }}
          >
            Sign In
          </Button>
        )}
        {session && (
          <Button
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </Button>
        )}
        <Box position="relative">
          <CartDrawer />
          <Badge colorScheme="red" position="absolute" right={0} rounded="full">
            {numItemsInCart}
          </Badge>
        </Box>
      </HStack>
      <Code>navbar.js</Code>
    </Flex>
  );
};

export default Navbar;
