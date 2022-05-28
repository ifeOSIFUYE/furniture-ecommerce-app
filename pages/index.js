import { Box, Heading } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';

export default function Home() {
  return (
    <Box h="60vh">
      <Heading>Main Page</Heading>
      <ProductCard />
    </Box>
  );
}
