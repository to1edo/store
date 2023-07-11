import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { ItemCounter } from "../ui";
import { FC, useContext } from "react";
import { ICartProduct } from "@/intefaces";
import { CartContext } from "@/context";

interface Props {
  editable?: boolean;
  items: ICartProduct[];
}
export const CartList: FC<Props> = ({ editable = false, items }) => {
  const { addProductToCart, deleteProductFromCart } = useContext(CartContext);

  const selectQuantity = (quantity: number, product?: ICartProduct) => {
    if (product) {
      if (quantity > 0) {
        product.quantity = quantity;
        addProductToCart(product as ICartProduct);
      }
    }
  };

  const deleteItem = (product: ICartProduct)=>{
    if(confirm('Deseja excluir este produto?')){
      deleteProductFromCart(product)
    }
  }

  return (
    <>
      {items.map((product) => (
        <Grid container spacing={2} sx={{ mb: 3 }} key={product.slug}>
          <Grid item xs={3}>
            <Link href={`/product/${product.slug}`}>
              <CardActionArea>
                <CardMedia
                  image={`/products/${product.image}`}
                  component={"img"}
                  alt={product.title}
                  sx={{ borderRadius: "5px" }}
                />
              </CardActionArea>
            </Link>
          </Grid>

          <Grid item xs={7}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="subtitle1">{product.title}</Typography>
              <Typography variant="body2">
                Tamanho: <strong>{`${product.size}`}</strong>
              </Typography>

              {editable ? (
                <ItemCounter
                  quantity={product.quantity}
                  selectQuantity={selectQuantity}
                  product={product}
                />
              ) : (
                <Typography variant="h6" mt={2}>{`${product.quantity} produto${
                  product.quantity > 1 ? "s" : ""
                }`}</Typography>
              )}

              {editable && (
                <Button
                  onClick={()=>deleteItem(product)}
                  variant="text"
                  color="secondary"
                  sx={{ alignSelf: "flex-start" }}
                >
                  Eliminar
                </Button>
              )}
            </Box>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="subtitle1">{(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
          </Grid>
        </Grid>
      ))}
    </>
  );
};
