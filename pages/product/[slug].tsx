import { ShopLayout } from "@/components/layouts"
import { Box, Button, Chip, Grid, Typography } from "@mui/material"
import { initialData } from "@/database/products"
import { ProductSlideShow, SizeSelector } from "@/components/products"
import { ItemCounter } from "@/components/ui"

const Product = () => {

  const product = initialData.products[0]

  return (
    <ShopLayout title={product.title} description={product.description}>

      <Grid container spacing={3}>

        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images}/>
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
              <ItemCounter/>
            </Box>

            <Box mb={3}>
              <Typography variant="subtitle2" component="p" fontWeight={600}>
                Tamanho
              </Typography>
              <SizeSelector sizes={product.sizes} selectedSize={product.sizes[2]}/>
            </Box>



            <Button color="secondary" className="circular-btn" size="large">
              Adicionar ao carrinho
            </Button>

            <Chip label="Não disponível" color="error" variant="outlined" sx={{ mt: 2 }} />

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

    </ShopLayout>
  )
}

export default Product