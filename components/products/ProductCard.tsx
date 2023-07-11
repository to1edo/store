import { FC, useMemo, useState } from "react";
import { IProduct } from "@/intefaces";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import Link from "next/link";

interface Props {
  product: IProduct;
}
export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const productImage = useMemo(() => {
    return isHovered
      ? `/products/${product.images[1]}`
      : `/products/${product.images[0]}`;
  }, [isHovered, product.images]);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <Link href={`/product/${product.slug}`}>
          <CardActionArea>
            {
              product.inStock <=0 &&
              <Chip
                label="Não disponível"
                color="error"
                variant="outlined"
                sx={{ position:'absolute', zIndex:10, top:'10px', left:'10px' }}
              />
            }
            <CardMedia
              className="fadeIn"
              component="img"
              image={productImage}
              alt={product.title}
              onLoad={() => setIsImageLoaded(true)}
            />
          </CardActionArea>
        </Link>
      </Card>

      <Box
        sx={{ mt: 1, display: isImageLoaded ? "block" : "none" }}
        className="fadeIn"
      >
        <Typography fontWeight="700">{product.title}</Typography>
        <Typography fontWeight="400">{(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
      </Box>
    </Grid>
  );
};
