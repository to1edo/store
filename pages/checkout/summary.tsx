import { useContext } from "react";
import NextLink from "next/link";
import { CartContext } from "@/context";
import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";

const SummaryPage = () => {

  const { items } = useContext(CartContext)

  return (
    <ShopLayout title="Carrinho de compras" description="Carrinho de compras">
      <Typography variant="h1" component="h1">
        Resumo do pedido
      </Typography>

      <Grid container sx={{ mt: 4 }} spacing={2}>
        <Grid item xs={12} sm={7}>
          <CartList items={items} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumo do pedido</Typography>

              <Divider sx={{ my: 2 }} />

              <Box display={"flex"} mb={1} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="subtitle1">
                  Endereço de entrega
                </Typography>
                <Box display="flex" justifyContent={'flex-end'}>
                  <NextLink href={"/checkout/address"} >
                    <Typography color="secondary" component={'p'}>Editar Endereço</Typography>
                  </NextLink>
                </Box>
              </Box>

              <Typography variant="body1">João Paulo</Typography>
              <Typography variant="body1">Brasil, AM</Typography>
              <Typography variant="body1">Manaus, 69068-350</Typography>
              <Typography variant="body1">+55 82 45632147</Typography>


              <Divider sx={{ my: 2 }} />

              <Box display={"flex"} mb={1} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="subtitle1">
                  Pedido
                </Typography>
                <Box display="flex" justifyContent={'flex-end'}>
                  <NextLink href={"/cart"} >
                    <Typography color="secondary" component={'p'}>Editar pedido</Typography>
                  </NextLink>
                </Box>
              </Box>

              <OrderSummary />
              
              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirmar pedido
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
