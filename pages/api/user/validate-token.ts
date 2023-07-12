import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { db } from '@/database';
import { IUser } from '@/intefaces';
import { UserModel } from '@/models';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  if (req.method !== "GET") {
    return res.json({ message: "Method not allowed" });
  }

  const {token = ''} = req.cookies;

  if(!process.env.JWT_SECRET_KEY){
    return res.status(401).json({ message: "jwt secret key not found" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY!, async(err, decoded) => {
    if(err){
      return res.status(401).json({ message: "Invalid token" });
    }
    
    try {
      await db.connect();
  
      if(typeof decoded === 'object'){
        const user:IUser|null = await UserModel.findById(decoded.id); 
        if(user){
          return res.status(200).json({name:user.name, email:user.email, role:user.role, token});
        }else{
          return res.status(404).json({ message: "User not found" });
        }
      }
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro no servidor" });
  
    } finally {
      await db.disconnect();
    }
  });


}