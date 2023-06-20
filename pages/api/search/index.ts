import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req:NextApiRequest, res:NextApiResponse) {

  res.status(400).json({message:'This endpoint is not available'})
}