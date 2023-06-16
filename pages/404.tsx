import { ShopLayout } from "@/components/layouts";
import { Box, Typography } from "@mui/material";

const Page404 = () => {
  return (
    <ShopLayout
      title="Página não encontrada"
      description="Página não encontrada"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Typography variant="h6">Erro 404</Typography>
        <Typography variant="h1" sx={{display: {xs: 'none', sm: 'block'}}}>|</Typography>
        <Typography variant="h1">Página não encontrada</Typography>
      </Box>
    </ShopLayout>
  );
};

export default Page404;
