import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Link,
} from '@chakra-ui/react';

const Navbar = () => {
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
        <Button>Log In</Button>
        <Button>Bag</Button>
      </HStack>
    </Flex>
  );
};

export default Navbar;
