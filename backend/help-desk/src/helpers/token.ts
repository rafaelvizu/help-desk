import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { ITokenDecoded } from './interfaces';

export function generateToken(email: string, id: number) {
    return jwt.sign({ id, email }, process.env.SECRET as string, {
        expiresIn: 86400, // 24 hours
    });
}

export function decodeToken(token: string) : ITokenDecoded | null
{
     try
     {
          return jwt.verify(token, process.env.SECRET as string) as ITokenDecoded;
     }
     catch
     {
          return null;
     }
}