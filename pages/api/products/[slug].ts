import { db } from "@/database";
import { IProduct } from "@/intefaces";
import { ProductModel } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";


type Data = {message: string} | IProduct;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.json({ message: "Method not allowed" });
  }

  switch (req.method) {
    case "GET": 
      return getProductBySlug(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }

}


const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  
  const {slug} = req.query;

  try {

    await db.connect();
    const product = await ProductModel.findOne({slug}).select("title images price inStock slug -_id").lean();
    
    if(product){
      return res.status(200).json(product);
    }else{
      return res.status(404).json({ message: "Product not found" });
    }

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Error in server" });

  } finally {

    await db.disconnect();

  }
}