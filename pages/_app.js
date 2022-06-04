import { ChakraProvider } from '@chakra-ui/react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { SessionProvider } from 'next-auth/react';
import theme from '../lib/theme';
import { AppProvider } from '../context/context';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <AppProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </AppProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
