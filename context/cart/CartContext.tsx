import { ICartProduct } from '@/intefaces'
import {createContext} from 'react'

interface ContextProps{
  isLoaded:boolean,
  items: ICartProduct[],
  orderSummary: {
    subtotal:number,
    tax: number,
    quantity:number
  },

  addProductToCart: (product: ICartProduct) => void,
  deleteProductFromCart: (product: ICartProduct) => void
}

export const CartContext = createContext({} as ContextProps)