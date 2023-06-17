import { AuthLayout } from '@/components/layouts'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <AuthLayout title='Login'>
        <Box sx={{ width: 350, padding:'10px 20px' }}>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Typography variant='h1'>Iniciar sessão</Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField type='email' label='Correo' variant='filled' fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField type='password' label='Senha' variant='filled' fullWidth />
                </Grid>

                <Grid item xs={12}>
                  <Button color="secondary" className="circular-btn" fullWidth>
                    Entrar
                  </Button>                
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='end'>
                  <Link href="/auth/register" >
                    <Typography color="secondary" variant="body2" sx={{mt:1}}>Não tem uma conta?</Typography>
                  </Link>
                </Grid>

            </Grid>
        </Box>
    </AuthLayout>
  )
}

export default LoginPage