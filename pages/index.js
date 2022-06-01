import { Box, Code, Container, Heading, SimpleGrid } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';

export default function Home() {
  return (
    <Box minH="100vh">
      <Heading textAlign="center">
        Home Page <Code>index.js</Code>
      </Heading>
      <Container maxW="container.xl">
        <SimpleGrid columns={[1, null, 3, 4]} spacing={10}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
