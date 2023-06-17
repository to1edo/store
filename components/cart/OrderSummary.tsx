import { Grid, Typography } from "@mui/material"

export const OrderSummary = () => {
  return (
    <Grid container >

      <Grid item xs={6}>
        <Typography variant='body1'>N. de Produtos:</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
        <Typography variant='body1'>3</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography variant='body1'>Subtotal:</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
        <Typography variant='body1'>$405</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography variant='body1'>Impostos (15%):</Typography>
      </Grid>
      <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
        <Typography variant='body1'>$60,75</Typography>
      </Grid>

      <Grid item xs={6} mt={2}>
        <Typography variant='subtitle1'>Total:</Typography>
      </Grid>
      <Grid item xs={6} mt={2} display={'flex'} justifyContent={'flex-end'}>
        <Typography variant='subtitle1'>$465,75</Typography>
      </Grid>

    </Grid>
  )
}
