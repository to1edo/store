import { SHOP_CONSTANTS, db } from "@/database";
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
      return getProducts(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }

}


const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { gender = null } = req.query;

  if (gender !== null && !SHOP_CONSTANTS.validGenders.includes(gender as string)) {
    return res.status(400).json({ message: `${gender} is not a valid gender` });
  }

  try {

    await db.connect();
    const products = await ProductModel.find(gender ? { gender } : {}).select("title images price inStock slug -_id").lean();
    res.status(200).json(products);

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Error in server" });

  } finally {

    await db.disconnect();

  }
}