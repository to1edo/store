import Typography from '@mui/material/Typography'
import {ShopLayout} from '../components/layouts'
import { ProductList } from '@/components/products'
import { IProduct } from '@/intefaces'
import { useProducts } from '@/hooks'
import {FullScreenLoading} from '@/components/ui'

export default function Home() {

  const {isError, isLoading, products} = useProducts('/products', )

  return (
    <ShopLayout title="Inicio" description={'Dê uma olhada em nossos produtos'}>
      <Typography variant="h1" >Loja Virtual</Typography>
      <Typography variant="h2" sx={{mb:2}}>Todos os produtos</Typography>

      {
        isLoading ? <FullScreenLoading/>:
        isError ? <div>failed to load</div> :
        <ProductList products={products as IProduct[]}/>
      }

    </ShopLayout>
  )
}
