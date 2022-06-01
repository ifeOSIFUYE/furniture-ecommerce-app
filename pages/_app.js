import { ChakraProvider } from '@chakra-ui/react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
