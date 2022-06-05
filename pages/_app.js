import { ChakraProvider } from '@chakra-ui/react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { SessionProvider } from 'next-auth/react';
import theme from '../lib/theme';
import { AppProvider } from '../context/context';
import { HMSRoomProvider } from '@100mslive/react-sdk';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <HMSRoomProvider>
          <AppProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </AppProvider>
        </HMSRoomProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
