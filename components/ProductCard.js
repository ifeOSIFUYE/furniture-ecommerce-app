import {
  AspectRatio,
  Box,
  Divider,
  HStack,
  Image,
  Text,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { urlFor } from '../lib/client';

const ProductCard = ({ product: { image, name, slug, price } }) => {
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
