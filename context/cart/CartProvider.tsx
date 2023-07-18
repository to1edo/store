import { FC, ReactNode, useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import { CartContext, CartReducer } from "./";
import { ICartProduct } from "@/intefaces";
import Cookie from "js-cookie";

export interface CartState {
  isLoaded:boolean,
  items: ICartProduct[],
  orderSummary:{
    subtotal:number,
    tax: number,
    quantity:number
  };
}
const INITIAL_STATE = {
  isLoaded: true,
  items: [],
  orderSummary:{
    subtotal:0,
    tax: 0,
    quantity:0
  },
};

interface Props {
  children: ReactNode;
}
export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);

  const addProductToCart = (product: ICartProduct) => {
    dispatch({ type: "[Cart] - Add product to cart", payload: product });
  };

  const deleteProductFromCart = (product: ICartProduct) => {
    dispatch({ type: "[Cart] - Delete product from cart", payload: product });
  };

  useEffect(() => {
    if (state.items.length) {
      Cookie.set("cartItems", JSON.stringify(state.items));
    }
  }, [state.items]);

  useEffect(() => {
    const summary = state.items.reduce(
      (prev, curr) => {
        return {
          subtotal: prev.subtotal + curr.price * curr.quantity,
          quantity: prev.quantity + curr.quantity,
        };
      },
      { subtotal: 0, quantity: 0 }
    );

    const orderSummary = {
      subtotal: summary.subtotal,
      tax: summary.subtotal *  Number(process.env.NEXT_PUBLIC_TAX_RATE),
      quantity: summary.quantity
    };

    dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });

  }, [state.items]);

  useEffect(() => {
    try {
      const cookie = JSON.parse(Cookie.get("cartItems") || "[]");
      dispatch({ type: "[Cart] - Load cart from cookies", payload: cookie });
    } catch (error) {
      dispatch({ type: "[Cart] - Load cart from cookies", payload: [] });
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        deleteProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
