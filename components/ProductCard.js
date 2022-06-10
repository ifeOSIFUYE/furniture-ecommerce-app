import {
  AspectRatio,
  Box,
  Divider,
  HStack,
  Text,
  Image,
  Icon,
  Circle,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { BsBag } from 'react-icons/bs';
import { useGlobalContext } from '../context/context';
import { urlFor } from '../lib/client';

const ProductCard = ({ product, handleRoute }) => {
  const { image, name, slug, price } = product;
  const [show, setShow] = useState(false);
  const [amount] = useState(1);
  const productWithAmount = { ...product, amount };
  const { addToCart } = useGlobalContext();
  const toast = useToast();

  return (
    <Box
      as={motion.article}
      whileHover={{ scale: 1.1 }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      position="relative"
    >
      <Box
        maxW="sm"
        boxShadow="0 0 10px grey"
        overflow="hidden"
        borderRadius="lg"
        cursor="pointer"
        onClick={() => handleRoute(slug.current)}
      >
        <AspectRatio ratio={4 / 3}>
          <Image src={urlFor(image && image[0])} alt={name} objectFit="cover" />
        </AspectRatio>
        <Box p={6} background="yellow.600">
          <Text noOfLines={1}>{name}</Text>
          <Divider />
          <HStack>
            <Text>${price}</Text>
          </HStack>
        </Box>
      </Box>
      <Circle
        as="button"
        size="50px"
        bg="tomato"
        display={show ? 'block' : 'none'}
        position="absolute"
        right="4%"
        bottom={['30%', null, '32%', '35%']}
        onClick={() => {
          addToCart(productWithAmount);
          toast({
            title: 'Item successfully added to cart ',
            status: 'info',
            duration: 4000,
            isClosable: true,
          });
        }}
        boxShadow="lg"
      >
        <Icon
          as={BsBag}
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
        />
      </Circle>
    </Box>
  );
};

export default ProductCard;
