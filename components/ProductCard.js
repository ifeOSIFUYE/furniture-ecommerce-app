import {
  AspectRatio,
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Text,
} from '@chakra-ui/react';

const ProductCard = () => {
  return (
    <Box
      as="article"
      maxW="sm"
      boxShadow="lg"
      overflow="hidden"
      borderRadius="lg"
      background="yellow.600"
    >
      <AspectRatio ratio={1}>
        <Image
          src="/images/nathan-fertig-FBXuXp57eM0-unsplash.jpg"
          alt="alternative text"
          objectFit="cover"
        />
      </AspectRatio>
      <Box p={6}>
        <Text>Im a product</Text>
        <Divider />
        <HStack>
          <Text>$15.00</Text>
          <Button variant="outline" colorScheme="teal">
            Checkout
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
