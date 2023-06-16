import Typography from '@mui/material/Typography'
import {ShopLayout} from '../components/layouts'
import { initialData } from '@/database/products'
import { ProductList } from '@/components/products'
import { IProduct } from '@/intefaces'

export default function Home() {
  return (
    <ShopLayout title="Inicio" description={'Dê uma olhada em nossos produtos'}>
      <Typography variant="h1" >Loja Virtual</Typography>
      <Typography variant="h2" sx={{mb:2}}>Todos os produtos</Typography>

      <ProductList products={initialData.products as IProduct[]}/>

    </ShopLayout>
  )
}
