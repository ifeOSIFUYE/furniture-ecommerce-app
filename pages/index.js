import { Box, Code, Container, Heading, SimpleGrid } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import { client } from '../lib/client';

export default function Home({ products }) {
  return (
    <Box minH="100vh">
      <Heading textAlign="center">
        Home Page <Code>index.js</Code>
      </Heading>
      <Container maxW="container.xl">
        <SimpleGrid columns={[1, null, 3, 4]} spacing={10}>
          {products &&
            products.map((product) => (
              <Box key={product._id}>
                <ProductCard product={product} />
              </Box>
            ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export async function getStaticProps() {
  const query = '*[_type == "product"]';
  const data = await client.fetch(query);

  return {
    props: { products: data },
  };
}
