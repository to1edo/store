import { useState , useContext} from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthLayout } from "@/components/layouts";
import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { isEmail } from "@/utils";
import { shopApi } from "@/api";
import { ErrorOutline } from "@mui/icons-material";
import {AuthContext} from "@/context"

type Inputs = {
  name: string;
  email: string;
  password: string;
};
const RegisterPage = () => {

  const {registerUser} = useContext(AuthContext)
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({email, password, name}) => {
    const res = await registerUser(email, password, name)

    if(res.error){
      setShowError(res.error)
      setErrorMessage(res.message!)
      setTimeout(() => {
        setShowError(false) 
      }, 3000);
      return
    }
    router.replace('/')

  };

  return (
    <AuthLayout title="Criar uma conta">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1">Criar uma conta</Typography>

              <Chip
                label={errorMessage}
                color="error"
                icon={<ErrorOutline/>}
                sx={{display: showError? 'flex':'none'}}
              />

            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register("name", {
                  required: "Campo obligatorio",
                  minLength: { value: 2, message: "mínimo 2 caracteres" }
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                type="text"
                label="Nome Completo"
                variant="filled"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register("email", {
                  required: "Campo obligatorio",
                  validate: isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                type="email" 
                label="Correo" 
                variant="filled" 
                fullWidth 
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register("password", {
                  required: "Campo obligatorio",
                  minLength: { value: 6, message: "mínimo 6 caracteres" }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                type="password"
                label="Senha"
                variant="filled"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" color="secondary" className="circular-btn" fullWidth>
                Criar conta
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <Link href="/auth/login">
                <Typography color="secondary" variant="body2" sx={{ mt: 1 }}>
                  Já tem uma conta? Iniciar sessão
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
