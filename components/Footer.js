import { Box, Container, Link, Spacer, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

const Footer = () => {
  return (
    <Box p={5} bg="#fdd996">
      <Container maxW="container.lg">
        <Stack direction={['column', 'row']}>
          <Text fontSize={12} fontWeight="bold">
            &copy; receiptBook 2022
          </Text>
          <Spacer />
          <Stack gap={2} direction={['column', 'row']}>
            <NextLink href="#" passHref>
              <Link fontSize={12}>Terms</Link>
            </NextLink>
            <NextLink href="#" passHref>
              <Link fontSize={12}>Cookie Policy</Link>
            </NextLink>
            <NextLink href="#" passHref>
              <Link fontSize={12}>Privacy Policy</Link>
            </NextLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
