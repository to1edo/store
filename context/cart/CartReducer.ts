import { ICartProduct, IProduct } from "@/intefaces"
import { CartState } from "./"
import Cookie from 'js-cookie';

type CartActionType =
{ type:'[Cart] - Load cart from cookies', payload:ICartProduct[] }|
{ type:'[Cart] - Add product to cart', payload: ICartProduct }|
{ type:'[Cart] - Delete product from cart', payload: ICartProduct }|
{ type:'[Cart] - Update order summary',
  payload:{
    subtotal:number,
    tax: number,
    quantity:number
  }
}


export const CartReducer = (state: CartState, action: CartActionType)=>{

  switch (action.type) {
    case '[Cart] - Load cart from cookies':
      return{
        ...state,
        items: action.payload
      }

    case '[Cart] - Add product to cart':
      return{
        ...state,
        items: updateCart(state.items, action.payload),
      }

    case '[Cart] - Delete product from cart':
      return{
        ...state,
        items: deleteItem(state.items, action.payload)
      }

    case '[Cart] - Update order summary':
      return{
        ...state,
        orderSummary: {...action.payload}
      }

    default:
      return state
  }
}

const updateCart = (items:ICartProduct[], product:ICartProduct)=>{

  if(items.some( item => item._id === product._id && item.size === product.size)){

    return items.map( item =>{
      if( item._id === product._id && item.size === product.size){
        item.quantity = product.quantity
      }
      return item
    })

  }else{
    return [...items, product]
  }
}


const deleteItem = (items:ICartProduct[], product:ICartProduct)=>{
  return items.filter( item => {
    if(item._id !== product._id){
      return true
    }else{
      return item.size !== product.size
    }
  })
}