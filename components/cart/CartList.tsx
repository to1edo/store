import { initialData } from "@/database/products"
import { Box, Button, CardActionArea, CardMedia, Grid, Typography } from "@mui/material"
import Link from "next/link"
import { ItemCounter } from "../ui"
import { FC } from 'react';

const productsList = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

interface Props{
  editable?: boolean
}
export const CartList:FC<Props> = ({editable=false}) => {
  return (
    <>
      {
        productsList.map( product => (
          <Grid container spacing={2} sx={{ mb: 3 }} key={product.slug}>

            <Grid item xs={3}>
              <Link href={`/product/${product.slug}`}>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images[0]}`}
                    component={"img"}
                    alt={product.title}
                    sx={{ borderRadius: "5px"}}
                  />
                </CardActionArea>
              </Link>
            </Grid>

            <Grid item xs={7}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='subtitle1'>{product.title}</Typography>
                <Typography variant='body2' >Tamanho: <strong>{`${product.sizes[0]}`}</strong></Typography>
                
                {
                  editable?
                  <ItemCounter/>:
                  <Typography variant='h6' mt={2}>3 items</Typography>
                }

                {
                  editable&&
                  <Button variant='text' color='secondary' sx={{ alignSelf: 'flex-start'}}>Eliminar</Button>
                }

              </Box>
            </Grid>

            <Grid item xs={2}>
              <Typography variant='subtitle1'>${product.price}</Typography>
            </Grid>

          </Grid>
        ))
      }
    </>
  )
}
