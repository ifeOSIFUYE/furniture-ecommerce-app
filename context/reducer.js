const reducer = (state, action) => {
  switch (action.type) {
    case 'CLEAR_CART': {
      return { ...state, cart: [] };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };
    }
    case 'INCREASE': {
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem._id === action.payload) {
          return { ...cartItem, amount: cartItem.amount + 1 };
        }
        return cartItem;
      });
      return { ...state, cart: tempCart };
    }
    case 'DECREASE': {
      let tempCart = state.cart
        .map((cartItem) => {
          if (cartItem._id === action.payload) {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.amount !== 0);
      return { ...state, cart: tempCart };
    }
    case 'GET_TOTAL_PRICE_AND_NUM_ITEMS': {
      let { totalPrice, numItemsInCart } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;

          cartTotal.totalPrice += itemTotal;
          cartTotal.numItemsInCart += amount;
          return cartTotal;
        },
        {
          totalPrice: 0,
          numItemsInCart: 0,
        }
      );
      totalPrice = parseFloat(totalPrice.toFixed(2));

      return { ...state, totalPrice, numItemsInCart };
    }
    case 'ADD_TO_CART': {
      const isProductInCart = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (!isProductInCart) {
        return { ...state, cart: [...state.cart, action.payload] };
      }
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem._id === isProductInCart._id) {
          return {
            ...cartItem,
            amount: cartItem.amount + action.payload.amount,
          };
        }
        return cartItem;
      });
      return { ...state, cart: tempCart };
    }

    default:
      return state;
  }
};

export default reducer;
