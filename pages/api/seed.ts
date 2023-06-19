import { db, initialData } from '@/database';
import { ProductModel } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  
  if(process.env.NODE_ENV === 'production'){
    return res.status(401).json({message: 'Don\'t have permission to perform this action.'})
  }

  if(req.method !== 'GET'){
    return res.json({message: 'Method not allowed'})
  }

  try {
    db.connect();

    await ProductModel.deleteMany();
    await ProductModel.insertMany(initialData.products);
    await db.disconnect();

    res.status(200).json({ message: 'Data seeded' });
    
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }

}