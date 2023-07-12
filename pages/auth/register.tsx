import { useState } from "react";
import { AuthLayout } from "@/components/layouts";
import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";
import { isEmail } from "@/utils";
import { shopApi } from "@/api";
import { ErrorOutline } from "@mui/icons-material";

type Inputs = {
  name: string;
  email: string;
  password: string;
};
const RegisterPage = () => {
  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    await shopApi
      .post("/user/register", { ...formData })
      .then(({ data }) => console.log(data))
      .catch((error) => {

        console.log(error.response.data.message);
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000);

      });
  };

  return (
    <AuthLayout title="Criar uma conta">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1">Criar uma conta</Typography>

              <Chip
                label="Erro ao fazer registro"
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
