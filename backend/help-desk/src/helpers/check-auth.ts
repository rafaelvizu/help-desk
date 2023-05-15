import { Request, Response, NextFunction } from "express";

// helpers
import { decodeToken } from "./token";
// models
import User from "../models/user";


export async function checkAuth(req: Request, res: Response, next: NextFunction) : Promise<Response | void>
{
     const token = req.headers.authorization as string;

     if (token === undefined || token === null || token === '') 
          return res.status(401).json({ message: 'not authorized' });


     try
     {
          const tokenFormat = token.split(' ')[1];
          const decoded = decodeToken(tokenFormat);

          if (decoded === null)
          {
               res.setHeader('Authorization', '');
               return res.status(401).json({ message: 'invalid token' })
          }

          const user = await User.findOne({
               where: {
                    id: decoded?.id,
                    email: decoded?.email,   
               },
               attributes: ['id', 'email'],
               raw: true,
          })
          .catch((error) => {
               console.error(error);
               return undefined;
          }) as any;

          if (user === undefined) return res.status(500).json({ message: 'internal server error' });
          else if (user === null) return res.status(404).json({ message: 'user not found' });

          // para acessar os dados no controller
          res.locals.user = user;

          return next();
     }
     catch (error)
     {
          return res.status(401).json({ message: 'invalid token' });
     }
}    

export function checkUnAuth(req: Request, res: Response, next: NextFunction) : Response | void 
{
     const token = req.headers.authorization as string;

     if (token === undefined || token === null || token === '')
     {
          return next();
     }

     return res.status(401).json({ message: 'not authorized' });
     
}