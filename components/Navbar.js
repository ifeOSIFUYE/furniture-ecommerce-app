import {
  Badge,
  Box,
  Button,
  IconButton,
  Flex,
  Heading,
  HStack,
  Link,
  Icon,
  Image,
  Stack,
  Spacer,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useGlobalContext } from '../context/context';
import Cart from './Cart';
import { useRouter } from 'next/router';
import { HamburgerIcon } from '@chakra-ui/icons';
import { BsPerson } from 'react-icons/bs';

const Navbar = () => {
  const { data: session } = useSession();
  const { numItemsInCart } = useGlobalContext();
  const router = useRouter();

  const openVideoPreview = () => {
    router.push('/preview');
  };

  return (
    <Stack direction="row" p={4}>
      <NextLink href="/" passHref>
        <Link>
          <Image src="/noun-furniture-842829.png" alt="site logo" w={59} />
        </Link>
      </NextLink>
      <Spacer />
      <HStack gap={5} display={['none', 'none', 'flex']}>
        <NextLink href="/" passHref>
          <Link fontSize={18}>Shop</Link>
        </NextLink>
        <NextLink href="#" passHref>
          <Link fontSize={18}>About</Link>
        </NextLink>
        <NextLink href="#" passHref>
          <Link fontSize={18}>FAQ</Link>
        </NextLink>
        <NextLink href="#" passHref>
          <Link fontSize={18}>Contact</Link>
        </NextLink>
      </HStack>
      <Spacer />
      <HStack>
        {!session ? (
          <Button
            variant="ghost"
            aria-label="Log in"
            leftIcon={<BsPerson />}
            onClick={() => {
              signIn();
            }}
          >
            Log In
          </Button>
        ) : (
          <HStack>
            <Button
              variant="outline"
              colorScheme="blue"
              onClick={openVideoPreview}
              display={['none', 'none', 'block']}
            >
              Video Chat
            </Button>
            <Button
              variant="ghost"
              aria-label="Log out"
              leftIcon={<BsPerson />}
              onClick={() => {
                signOut();
              }}
            >
              Log Out
            </Button>
          </HStack>
        )}
        <Box position="relative">
          <Cart />
          <Badge colorScheme="red" position="absolute" right={0} rounded="full">
            {numItemsInCart}
          </Badge>
        </Box>
        <IconButton
          variant="ghost"
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          display={['block', 'block', 'none']}
        />
      </HStack>
    </Stack>
  );
};

export default Navbar;
