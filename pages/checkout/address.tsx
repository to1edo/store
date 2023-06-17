import { ShopLayout } from '@/components/layouts'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'

const AddressPage = () => {
  return (
    <ShopLayout title='Endereço' description='configuração de endereço'>
      <Typography variant='h1' component='h1'>Endereço</Typography>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6}>
          <TextField label='Nome Completo' variant='filled' fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label='Endereço' variant='filled' fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label='Endereço 2 (opcional)' variant='filled' fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label='Telephone' variant='filled' fullWidth />
        </Grid>


        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select variant='filled' label='Pais' value='0'>
              <MenuItem value={'0'} disabled>Selecione o país</MenuItem>
              <MenuItem value={'1'}>Argentina</MenuItem>
              <MenuItem value={'2'}>Brasil</MenuItem>
              <MenuItem value={'3'}>Chile</MenuItem>
              <MenuItem value={'4'}>Colombia</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label='Estado' variant='filled' fullWidth />
        </Grid>


        <Grid item xs={12} sm={6}>
          <TextField label='Ciudade' variant='filled' fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label='Código postal' variant='filled' fullWidth />
        </Grid>
      </Grid>

      <Box mt={5} display='flex' justifyContent='center'>
        <Button color='secondary' className='circular-btn' size='large'>Continuar</Button>
      </Box>
    </ShopLayout>
  )
}

export default AddressPage