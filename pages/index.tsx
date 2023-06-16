import Typography from '@mui/material/Typography'
import {ShopLayout} from '../components/layouts'
import { Card, CardActionArea, CardContent, CardMedia, Grid } from '@mui/material'
import { initialData } from '@/database/products'

export default function Home() {
  return (
    <ShopLayout title="Inicio" description={'Dê uma olhada em nossos produtos'}>
      <Typography variant="h1" >Loja Virtual</Typography>
      <Typography variant="h2" sx={{mb:2}}>Todos os produtos</Typography>

      <Grid container spacing={4}> 
        {
          initialData.products.map(product => (
            <Grid item xs={6} sm={4} key={product.slug}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={`/products/${product.images[0]}`}
                    alt={product.title}
                  />
                  <CardContent>
                    <Typography>{product.title}</Typography>
                    <Typography>${product.price}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        }
      </Grid>

    </ShopLayout>
  )
}
