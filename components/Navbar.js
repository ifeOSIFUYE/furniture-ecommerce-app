import {
  Button,
  Code,
  Flex,
  Heading,
  HStack,
  Input,
  Link,
} from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

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
        <Button>Bag</Button>
      </HStack>
      <Code>navbar.js</Code>
    </Flex>
  );
};

export default Navbar;
