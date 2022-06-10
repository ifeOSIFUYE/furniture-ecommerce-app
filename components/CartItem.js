import { CloseIcon } from '@chakra-ui/icons';
import {
  AspectRatio,
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr';
import React, { useState } from 'react';
import { useGlobalContext } from '../context/context';
import { urlFor } from '../lib/client';

const CartItem = ({ item: { _id, name, price, image, amount } }) => {
  const { removeItem, increase, decrease } = useGlobalContext();
  const [show, setShow] = useState(false);

  return (
    <HStack
      pos="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Box boxSize="5rem">
        <AspectRatio ratio={1}>
          <Image src={urlFor(image && image[0])} alt={name} objectFit="cover" />
        </AspectRatio>
      </Box>
      <Box>
        <Text noOfLines={1}>{name}</Text>
        <Text>${price}</Text>
        <HStack>
          <IconButton
            icon={<GrFormSubtract />}
            variant="ghost"
            colorScheme="teal"
            onClick={() => decrease(_id)}
          />
          <Text>{amount}</Text>
          <IconButton
            icon={<GrFormAdd />}
            variant="ghost"
            colorScheme="teal"
            onClick={() => increase(_id)}
          />
        </HStack>
        <IconButton
          icon={<CloseIcon />}
          colorScheme="gray"
          onClick={() => removeItem(_id)}
          size="xs"
          position="absolute"
          right="0"
          top="2%"
          display={show ? 'block' : 'none'}
        />
      </Box>
    </HStack>
  );
};

export default CartItem;
