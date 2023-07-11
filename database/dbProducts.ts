import { db } from ".";
import { ProductModel } from "@/models";


export const getProductBySlug = async (slug:string) => {

  try {

    await db.connect();
    const product = await ProductModel.findOne({slug}).select("title images price inStock slug sizes description gender _id").lean();
    
    if(!product){
      return null;
    }

    return JSON.parse(JSON.stringify(product));

  } catch (error) {
    console.log(error);
  } finally {

    await db.disconnect();

  }
}

export interface ProductsSlugs{
  slug:string
}
export const getAllProductsSlugs = async ():Promise<ProductsSlugs[]>	 => {

    await db.connect();
    const productsSlugs  = await ProductModel.find().select("slug -_id").lean();
    await db.disconnect();

    return productsSlugs ;

}