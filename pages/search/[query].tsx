import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import {ShopLayout} from '@/components/layouts'
import { ProductList } from '@/components/products'
import { IProduct } from '@/intefaces'
import { useProducts } from '@/hooks'
import {FullScreenLoading} from '@/components/ui'

export default function SearchPage() {

  const router = useRouter()
  const {query} = router.query;
  const {isError, isLoading, products} = useProducts(`search/${query}`)

  return (
    <ShopLayout title="Buscar Produtos" description={'Dê uma olhada em nossos produtos'}>
      <Typography variant="h1" >Buscar Produtos</Typography>
      <Typography variant="h2" sx={{mb:2}}>Resultados de: "{query}"</Typography>

      {
        isLoading ? <FullScreenLoading/>:
        isError ? <div>failed to load</div> :
        !products?.length? <Typography variant="h2" sx={{textAlign:'center', mt:2}}>Nenhum resultado encontrado para o termo «{query}»</Typography> :
        <ProductList products={products as IProduct[]}/>
      }

    </ShopLayout>
  )
}
