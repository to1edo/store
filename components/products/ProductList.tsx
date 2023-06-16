import { FC } from 'react';
import { IProduct } from '@/intefaces';
import { ProductCard } from './ProductCard';
import { Grid } from '@mui/material';

interface Props{
  products:IProduct[]
}

export const ProductList: FC<Props> = ({products}) => {
  return (
    <Grid container spacing={4}> 
      {
        products.map(product => (
          <ProductCard key={product.slug} product={product} />
        ))
      }
    </Grid>
  )
}
