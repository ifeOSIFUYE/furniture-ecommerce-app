import {
  AspectRatio,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useGlobalContext } from '../../context/context';
import { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr';

const ProductDetails = ({ product }) => {
  const [amount, setAmount] = useState(1);
  const { image, name, details, price } = product;
  const productWithAmount = { ...product, amount };
  const { addToCart } = useGlobalContext();
  const toast = useToast();

  return (
    <Box minH="90vh" p={5} pt={10} bg="orange.100">
      <Container maxW="container.lg" centerContent>
        <Stack gap={10} direction="column">
          <AspectRatio ratio={1}>
            <Image
              src={urlFor(image && image[0])}
              alt={name}
              w={10}
              objectFit="contain"
            />
          </AspectRatio>

          <Stack direction="column">
            <Heading>{name}</Heading>

            <Heading>${price}</Heading>
            <Text>Quantity</Text>
            <HStack>
              <IconButton
                icon={<GrFormSubtract />}
                variant="ghost"
                colorScheme="teal"
                onClick={() =>
                  setAmount((prev) => (prev - 1 < 1 ? 1 : prev - 1))
                }
              />

              <Text>{amount}</Text>
              <IconButton
                icon={<GrFormAdd />}
                variant="ghost"
                colorScheme="teal"
                onClick={() => {
                  setAmount((prev) => prev + 1);
                }}
              />
            </HStack>
            <Button
              variant="outline"
              colorScheme="blue"
              onClick={() => {
                addToCart(productWithAmount);
                toast({
                  title: 'Item successfully added to cart ',
                  status: 'info',
                  duration: 4000,
                  isClosable: true,
                });
              }}
            >
              ADD TO CART
            </Button>
            <Heading>PRODUCT INFO</Heading>
            <Text>{details}</Text>
          </Stack>
        </Stack>
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
