import Typography from '@mui/material/Typography'
import {ShopLayout} from '@/components/layouts'
import { ProductList } from '@/components/products'
import { IProduct } from '@/intefaces'
import { useProducts } from '@/hooks'
import {FullScreenLoading} from '@/components/ui'

export default function WomenPage() {

  const {isError, isLoading, products} = useProducts('/products?gender=women', )

  return (
    <ShopLayout title="Produtos para mulheres" description={'Dê uma olhada em nossos produtos para mulheres'}>
      <Typography variant="h1" >Loja Virtual</Typography>
      <Typography variant="h2" sx={{mb:2}}>Produtos para mulheres</Typography>

      {
        isLoading ? <FullScreenLoading/>:
        isError ? <div>failed to load</div> :
        <ProductList products={products as IProduct[]}/>
      }

    </ShopLayout>
  )
}
