import { useReducer } from "react";
import CartContext from "./cartContext.js";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = [...state.items, action.payload];
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case "REMOVE":
      const existingCartItemIndexRemove = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingItemRemove = state.items[existingCartItemIndexRemove];
      const updatedTotalAmountRemove =
        state.totalAmount - existingItemRemove.price;
      let updatedItemsRemove;
      if (existingItemRemove.amount === 1) {
        updatedItemsRemove = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        const updatedItem = {
          ...existingItemRemove,
          amount: existingItemRemove.amount - 1,
        };
        updatedItemsRemove = [...state.items];
        updatedItemsRemove[existingCartItemIndexRemove] = updatedItem;
      }
      return {
        items: updatedItemsRemove,
        totalAmount: updatedTotalAmountRemove,
      };

    case "DELETE_ALL":
      return {
        items: [],
        totalAmount: 0,
      };

    default:
      return defaultCartState;
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    return dispatchCartAction({ type: "ADD", payload: item });
  };
  const removeItemToCartHandler = (id) => {
    return dispatchCartAction({ type: "REMOVE", payload: id });
  };
  const clearAllItemToCartHandler = () => {
    return dispatchCartAction({ type: "DELETE_ALL" });
  };

  const context = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart: clearAllItemToCartHandler,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
