import { db } from "@/database";
import { IProduct } from "@/intefaces";
import { ProductModel } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";


type Data = {message: string} | IProduct[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.json({ message: "Method not allowed" });
  }

  switch (req.method) {
    case "GET": 
      return searchProducts(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }

}


const searchProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  
  let {q=''} = req.query;

  if(q===''){
    return res.status(400).json({ message: "Invalid query" });
  }

  q = q.toString().toLowerCase()

  try {

    await db.connect();
    const products = await ProductModel.find({
      $text: {
        $search: q
      }
    }).select("title images price inStock slug -_id").lean();
    
    return res.status(200).json(products);

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Error in server" });

  } finally {

    await db.disconnect();

  }
}