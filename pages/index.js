import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import { client } from '../lib/client';
import { useRouter } from 'next/router';

export default function Home({ products }) {
  const router = useRouter();

  const handleRoute = (productSlug) => {
    router.push(`/product/${productSlug}`);
  };

  return (
    <Box minH="100vh" background="orange.100">
      <Container maxW="container.lg" p={5} pt={10} centerContent>
        <SimpleGrid columns={[1, null, 2, 3]} spacing={10}>
          {products &&
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                handleRoute={handleRoute}
              />
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
