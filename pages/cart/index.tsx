import { CartList, OrderSummary } from "@/components/cart"
import { ShopLayout } from "@/components/layouts"
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material"

const CartPage = () => {
  return (
    <ShopLayout title='Carrinho de compras' description='Carrinho de compras'>
      <Typography variant='h1' component='h1'>Carrinho de compras</Typography>

      <Grid container sx={{ mt: 4 }} spacing={2}>

        <Grid item xs={12} sm={7} >

          <CartList editable/>

        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>

              <Typography variant='h2'>Resumo do pedido</Typography>

              <Divider sx={{ my:2 }}/>

              <OrderSummary/>

              <Typography variant='subtitle1' mt={2}>Endereço de entrega</Typography>

              <Box sx={{ mt: 3 }}>
                <Button color='secondary' className='circular-btn' fullWidth>Comprar</Button>
              </Box>

            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </ShopLayout>
  )
}

export default CartPage