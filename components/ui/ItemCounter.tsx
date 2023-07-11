import { FC } from 'react';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { ICartProduct } from '@/intefaces';


interface Props{
  quantity:number,
  selectQuantity: (quantity:number, product?:ICartProduct)=>void,
  product?:ICartProduct
}
export const ItemCounter:FC<Props> = ({quantity,selectQuantity,product}) => {

  return (
    <Box display="flex" alignItems="center">
      <IconButton  onClick={()=> selectQuantity(quantity-1,product)}>
        <RemoveCircleOutline/>
      </IconButton>

      <Typography sx={{ margin: '0px 10px' }}>{quantity}</Typography>

      <IconButton onClick={()=> selectQuantity(quantity+1,product)}>
        <AddCircleOutline/>
      </IconButton>

    </Box>
  )
}
