import { AspectRatio, Box, Divider, Image, Text } from '@chakra-ui/react';

const ProductCard = () => {
  return (
    <Box boxSize="sm">
      <AspectRatio ratio={1}>
        <Image src="/images/nathan-fertig-FBXuXp57eM0-unsplash.jpg" alt="hr" />
      </AspectRatio>
      <Text>Im a product</Text>
      <Divider />
      <Text>$15.00</Text>
    </Box>
  );
};

export default ProductCard;
