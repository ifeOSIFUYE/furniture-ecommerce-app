import React, { useReducer, useContext, useEffect } from 'react';
import cartItems from './data';
import reducer from './reducer';

const AppContext = React.createContext();

const initialState = {
  cart: [],
  totalPrice: 0,
  numItemsInCart: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const increase = (id) => {
    dispatch({ type: 'INCREASE', payload: id });
  };

  const decrease = (id) => {
    dispatch({ type: 'DECREASE', payload: id });
  };

  useEffect(() => {
    dispatch({ type: 'GET_TOTAL_PRICE_AND_NUM_ITEMS' });
  }, [state.cart]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <AppContext.Provider
      value={{ ...state, clearCart, removeItem, increase, decrease, addToCart }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
