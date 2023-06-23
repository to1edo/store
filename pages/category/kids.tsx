import Typography from '@mui/material/Typography'
import {ShopLayout} from '@/components/layouts'
import { ProductList } from '@/components/products'
import { IProduct } from '@/intefaces'
import { useProducts } from '@/hooks'
import {FullScreenLoading} from '@/components/ui'

export default function KidsPage() {

  const {isError, isLoading, products} = useProducts('/products?gender=kid', )

  return (
    <ShopLayout title="produtos para crianças" description={'Dê uma olhada em nossos produtos para crianças'}>
      <Typography variant="h1" >Loja Virtual</Typography>
      <Typography variant="h2" sx={{mb:2}}>Produtos para crianças</Typography>

      {
        isLoading ? <FullScreenLoading/>:
        isError ? <div>failed to load</div> :
        <ProductList products={products as IProduct[]}/>
      }

    </ShopLayout>
  )
}
