import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { useGlobalContext } from '../context/context';
import React from 'react';
import getStripe from '../lib/getStripe';
import CartItem from './CartItem';

const CartDrawer = () => {
  const { cart, totalPrice, clearCart } = useGlobalContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // use cart Items
      body: JSON.stringify(cart),
    });
    if (response.statusCode === 500) return;
    const data = await response.json();
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Bag
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your bag</DrawerHeader>

          <DrawerBody>
            {cart.length === 0 ? (
              <Text>is currently empty</Text>
            ) : (
              cart.map((item) => <CartItem key={item._id} item={item} />)
            )}
          </DrawerBody>

          <DrawerFooter gap={7}>
            <Text>Total ${totalPrice}</Text>
            <Button variant="outline" colorScheme="red" onClick={clearCart}>
              clear cart
            </Button>
            <Button onClick={handleCheckout}>Checkout</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
