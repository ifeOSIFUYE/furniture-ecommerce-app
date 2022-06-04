import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useGlobalContext } from '../../context/context';
import { useState } from 'react';
import { client, urlFor } from '../../lib/client';

const ProductDetails = ({ product }) => {
  const [amount, setAmount] = useState(1);
  const { image, name, details, price } = product;
  const productWithAmount = { ...product, amount };
  const { addToCart } = useGlobalContext();

  return (
    <Box minH="100vh">
      <Container minW="container.lg">
        <Flex gap={10}>
          <VStack>
            <Box boxSize="lg" borderWidth={1}>
              <AspectRatio ratio={1}>
                <Image
                  src={urlFor(image && image[0])}
                  alt={name}
                  objectFit="contain"
                />
              </AspectRatio>
            </Box>
            <Stack direction="row">
              <Box boxSize="4rem" borderWidth={1}></Box>
              <Box boxSize="4rem" borderWidth={1}></Box>
              <Box boxSize="4rem" borderWidth={1}></Box>
            </Stack>
          </VStack>
          <Box>
            <Heading>{name}</Heading>

            <Heading>${price}</Heading>
            <Text>Quantity</Text>
            <HStack>
              <Button
                onClick={() =>
                  setAmount((prev) => (prev - 1 < 1 ? 1 : prev - 1))
                }
              >
                minus
              </Button>
              <Text>{amount}</Text>
              <Button onClick={() => setAmount((prev) => prev + 1)}>add</Button>
            </HStack>
            <Button
              variant="outline"
              colorScheme="teal"
              onClick={() => addToCart(productWithAmount)}
            >
              Add to Cart
            </Button>
            <Heading>PRODUCT INFO</Heading>
            <Text>{details}</Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const query = `*[_type == "product"] {slug {current}}`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    // always takes string value
    params: { slug: product.slug.current },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;

  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const data = await client.fetch(query);

  return {
    props: { product: data },
  };
}
