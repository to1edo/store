import { useContext } from "react"
import { CartContext } from "@/context"
import { Grid, Typography } from "@mui/material"

export const OrderSummary = () => {

  const {items, orderSummary} = useContext(CartContext)


  return (
    <Grid container >

      <Grid item xs={6}>
        <Typography variant='body1'>N. de Produtos:</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
        <Typography variant='body1'>{orderSummary.quantity}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography variant='body1'>Subtotal:</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
        <Typography variant='body1'>{(orderSummary.subtotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography variant='body1'>Impostos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%):</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
        <Typography variant='body1'>{(orderSummary.tax).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
      </Grid>

      <Grid item xs={6} mt={2}>
        <Typography variant='subtitle1'>Total:</Typography>
      </Grid>
      <Grid item xs={6} mt={2} display={'flex'} justifyContent={'flex-end'}>
        <Typography variant='subtitle1'>{(orderSummary.subtotal+orderSummary.tax).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
      </Grid>

    </Grid>
  )
}
