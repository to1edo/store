import { db } from '@/database';
import { IUser } from '@/intefaces';
import { UserModel } from '@/models';
import { isValidEmail } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

type Data = { message: string } | {
  name: string;
  email: string;
  role: 'admin' | 'client';
  token: string;
}
export default async function handler(req:NextApiRequest, res:NextApiResponse<Data>) {

  if (req.method !== "POST") {
    return res.json({ message: "Method not allowed" });
  }

  const {name='', email='', password=''} = req.body as { name:string, email:string, password:string };

  try {

    await db.connect();
    const existUser:IUser|null = await UserModel.findOne({email: email.toLocaleLowerCase()}).lean();

    if(existUser){
      return res.status(400).json({ message: "Usuário já existe" });
    }

    if(password.length<6){
      return res.status(400).json({ message: "A senha deve ter pelo menos 6 caracteres" });
    }
    if(name.length<2){
      return res.status(400).json({ message: "O nome deve ter pelo menos 2 caracteres" });
    }
    if(!isValidEmail(email)){
      return res.status(400).json({ message: "E-mail inválido" });
    }

    const user:IUser = await UserModel.create({ name, email: email.toLocaleLowerCase(), password });
    const token = jwt.sign({ id:user._id}, process.env.JWT_SECRET_KEY!, { expiresIn: '12h' });
    
    return res.status(200).json({name:user.name, email:user.email, role:user.role, token});

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Erro no servidor" });

  } finally {

    await db.disconnect();

  }

}