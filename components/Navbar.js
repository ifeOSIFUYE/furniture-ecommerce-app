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
import NextLink from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useGlobalContext } from '../context/context';
import CartDrawer from './CartDrawer';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { data: session } = useSession();
  const { numItemsInCart } = useGlobalContext();
  const router = useRouter();

  const openVideoPreview = () => {
    router.push('/preview');
  };

  return (
    <Flex>
      <NextLink href="/" passHref>
        <Link>
          <Heading>ReceiptBook</Heading>
        </Link>
      </NextLink>
      <HStack>
        <Link>Shop</Link>
        <Link>About</Link>
        <Link>FAQ</Link>
        <Link>Contact</Link>
      </HStack>
      <HStack>
        {!session && (
          <Button
            onClick={() => {
              signIn();
            }}
          >
            Sign In
          </Button>
        )}
        {session && (
          <HStack>
            <Button
              variant="outline"
              colorScheme="blue"
              onClick={openVideoPreview}
            >
              Video Chat
            </Button>
            <Button
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </Button>
          </HStack>
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
