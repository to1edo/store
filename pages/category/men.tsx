import Typography from '@mui/material/Typography'
import {ShopLayout} from '@/components/layouts'
import { ProductList } from '@/components/products'
import { IProduct } from '@/intefaces'
import { useProducts } from '@/hooks'
import {FullScreenLoading} from '@/components/ui'

export default function MenPage() {

  const {isError, isLoading, products} = useProducts('/products?gender=men', )

  return (
    <ShopLayout title="Produtos para hombres" description={'Dê uma olhada em nossos produtos para hombres'}>
      <Typography variant="h1" >Loja Virtual</Typography>
      <Typography variant="h2" sx={{mb:2}}>Produtos para hombres</Typography>

      {
        isLoading ? <FullScreenLoading/>:
        isError ? <div>failed to load</div> :
        <ProductList products={products as IProduct[]}/>
      }

    </ShopLayout>
  )
}
