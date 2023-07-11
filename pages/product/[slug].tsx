import { FC, useContext, useState } from "react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ShopLayout } from "@/components/layouts";
import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ProductSlideShow, SizeSelector } from "@/components/products";
import { ItemCounter } from "@/components/ui";
import { ICartProduct, IProduct, IValidSizes } from "@/intefaces";
import { dbProducts } from "@/database";
import { CartContext } from "@/context";

interface Props {
  product: IProduct;
}
const Product: FC<Props> = ({ product }) => {
  const router = useRouter()
  const { addProductToCart } = useContext(CartContext)

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    slug: product.slug,
    size: undefined,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const selectSize = (size: IValidSizes) => {
    setTempCartProduct({ ...tempCartProduct, size });
  };

  const selectQuantity = (quantity: number) => {
    if (quantity > product.inStock || quantity <= 0) return;
    setTempCartProduct({ ...tempCartProduct, quantity });
  };

  const addToCart = () => {
    if (!tempCartProduct.size) return;
    addProductToCart(tempCartProduct)
    router.push('/checkout/summary')
  };

  return (
    <ShopLayout
      title={product?.title || "Não encontrado"}
      description={product?.description || "Não encontrado"}
    >
      {!product?.title ? (
        <Typography variant="h1" component="h1" sx={{ textAlign: "center" }}>
          Produto não encontrado
        </Typography>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7}>
            <ProductSlideShow images={product.images} />
          </Grid>

          <Grid item xs={12} sm={5}>
            <Box display="flex" flexDirection="column">
              <Typography variant="h1" component="h1">
                {product.title}
              </Typography>

              <Typography variant="subtitle1" component="h2">
                ${product.price}
              </Typography>

              <Box my={2}>
                <Typography variant="subtitle2" component="p" fontWeight={600}>
                  Cantidade
                </Typography>

                <ItemCounter
                  quantity={tempCartProduct.quantity}
                  selectQuantity={selectQuantity}
                />
              </Box>

              <Box mb={3}>
                <Typography variant="subtitle2" component="p" fontWeight={600}>
                  Tamanho
                </Typography>

                <SizeSelector
                  sizes={product.sizes}
                  selectedSize={tempCartProduct.size}
                  selectSize={selectSize}
                />
              </Box>

              {product.inStock > 0 ? (
                <Button onClick={addToCart} color="secondary" className="circular-btn" size="large">
                  {tempCartProduct.size
                    ? "Adicionar ao carrinho"
                    : "Selecione um tamanho"}
                </Button>
              ) : (
                <Chip
                  label="Não disponível"
                  color="error"
                  variant="outlined"
                  sx={{ mt: 2 }}
                />
              )}

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" component="p">
                  Descrição
                </Typography>
                <Typography variant="body2" component="p">
                  {product.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </ShopLayout>
  );
};

export default Product;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {

//   const {slug = ''} = ctx.query
//   const product = await dbProducts.getProductBySlug(slug as string)

//   return {
//     props:{
//       product
//     }
//   }
// }

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const slugs = await dbProducts.getAllProductsSlugs();
  const paths: { params: { slug: string } }[] = slugs.map((slug) => ({
    params: slug,
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug as string);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};
