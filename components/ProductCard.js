import {
  AspectRatio,
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Text,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import getStripe from '../lib/getStripe';
import { urlFor } from '../lib/client';

const ProductCard = ({ product: { image, name, slug, price } }) => {
  // const handleCheckout = async () => {
  //   const stripe = await getStripe();

  //   const response = await fetch('/api/checkout_sessions', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     // use cart Items
  //     body: JSON.stringify({
  //       image: '/images/nathan-fertig-FBXuXp57eM0-unsplash.jpg',
  //       name: 'sofa',
  //       price: '400.99',
  //     }),
  //   });

  //   if (response.statusCode === 500) return;

  //   const data = await response.json();

  //   stripe.redirectToCheckout({ sessionId: data.id });
  // };

  return (
    <Box
      as="article"
      maxW="sm"
      boxShadow="lg"
      overflow="hidden"
      borderRadius="lg"
      background="yellow.600"
    >
      <NextLink href={`/product/${slug.current}`} passHref>
        <Link>
          <AspectRatio ratio={4 / 3}>
            <Image
              src={urlFor(image && image[0])}
              alt={name}
              objectFit="cover"
            />
          </AspectRatio>
          <Box p={6}>
            <Text noOfLines={1}>{name}</Text>
            <Divider />
            <HStack>
              <Text>${price}</Text>
            </HStack>
          </Box>
        </Link>
      </NextLink>
    </Box>
  );
};

export default ProductCard;
