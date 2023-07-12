import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '@/database';
import { UserModel } from '@/models';
import { IUser } from '@/intefaces';

type Data = { message: string }|
{
  token: string;
  name:string;
  email:string;
  role:'admin'|'client';
}
export default async function handler(req:NextApiRequest, res:NextApiResponse<Data>) {

  if (req.method !== "POST") {
    return res.json({ message: "Method not allowed" });
  }

  const {email=''	, password=''} = req.body;

  try {

    await db.connect();
    const user:IUser|null = await UserModel.findOne({email:email.toLocaleLowerCase()}).lean();
    
    if(user){
      const isMatch = bcrypt.compareSync(password, user.password as string);
      
      if(isMatch){

        const {_id,password,createdAt,updatedAt, ...result} = user;
        
        const token = jwt.sign({ id:user._id}, process.env.JWT_SECRET_KEY!, { expiresIn: '12h' });

        return res.status(200).json({...result, token});
      }

      return res.status(400).json({ message: "Senha incorreta" });

    }else{
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Erro no servidor" });

  } finally {

    await db.disconnect();

  }


}