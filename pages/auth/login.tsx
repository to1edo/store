import { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/layouts";
import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { isEmail } from "@/utils";
import {shopApi} from "@/api";
import { ErrorOutline } from "@mui/icons-material";

type Inputs = {
  email: string;
  password: string;
};
const LoginPage = () => {

  const [showError, setShowError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async(formData) => {
    await shopApi.post('/user/login',{...formData})
    .then(({data})=>console.log(data))
    .catch(error =>{ 
      console.log(error.response.data.message); 
      setShowError(true)
      setTimeout(() => {
        setShowError(false) 
      }, 3000);
    })
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1">Iniciar sessão</Typography>

              <Chip
                label="Erro no email ou senha"
                color="error"
                icon={<ErrorOutline/>}
                sx={{display: showError? 'flex':'none'}}
              />
            
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register("email", {
                  required: "Campo obligatorio",
                  validate: isEmail
                })}
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("password", {
                  required: "Campo obligatorio",
                  minLength: { value: 6, message: "Senha inválida" }
                })}
                type="password"
                label="Senha"
                variant="filled"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                fullWidth
              >
                Entrar
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <Link href="/auth/register">
                <Typography color="secondary" variant="body2" sx={{ mt: 1 }}>
                  Não tem uma conta?
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
