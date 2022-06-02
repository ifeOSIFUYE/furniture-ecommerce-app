import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useGlobalContext } from '../context/context';
import { urlFor } from '../lib/client';

const CartItem = ({ item: { _id, name, price, image, amount } }) => {
  const { removeItem, increase, decrease } = useGlobalContext();

  return (
    <HStack borderWidth={1}>
      <Box boxSize="5rem">
        <AspectRatio ratio={1}>
          <Image src={urlFor(image && image[0])} alt={name} objectFit="cover" />
        </AspectRatio>
      </Box>
      <Box>
        <Text noOfLines={1}>{name}</Text>
        <Text>${price}</Text>
        <HStack>
          <Button onClick={() => decrease(_id)}>minus</Button>
          <Text>{amount}</Text>
          <Button onClick={() => increase(_id)}>add</Button>
        </HStack>
        <Button colorScheme="red" onClick={() => removeItem(_id)}>
          remove
        </Button>
      </Box>
    </HStack>
  );
};

export default CartItem;
