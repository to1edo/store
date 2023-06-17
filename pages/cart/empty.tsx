import { ShopLayout } from "@/components/layouts";
import { Box, Typography } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import NextLink from "next/link";

const EmpryCart = () => {
  return (
    <ShopLayout
      title="Carrinho Vazio"
      description="Não há produtos no carrinho"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          alignItems: "center",
          flexDirection: "column",
          height: "calc(100vh - 200px)",
        }}
      >
        <Typography variant="h1" sx={{ display: { xs: "none", sm: "block" } }}>
          Carrinho Vazio
        </Typography>
        <ShoppingCartOutlined sx={{ fontSize: 200 }} />

        <NextLink
          href="/"
          style={{
            textDecoration: "none",
            marginTop: "20px",
            fontWeight: "bold",
            color: "black",
          }}
        >
          ↩ Voltar
        </NextLink>
      </Box>
    </ShopLayout>
  );
};

export default EmpryCart;
