import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user";

// interfaces
import { IUserLogin, IUserRegister, IUserUpdate } from "../helpers/interfaces";
import GetUser from "../helpers/get-user";
import { validateLogin, validateRegister } from "../helpers/validations";
import saveImages from "../helpers/save-images";


class UserController
{
     static async Login(req: Request, res: Response) : Promise<Response>
     {
          const { email, password } = req.body as IUserLogin;
          
          try
          {
               // validar dados
               const validate = validateLogin(email, password);
               if (validate !== null) return res.status(422).json({ message: validate });

               // verificar se o usuário existe
               const user = await GetUser(email);
               if (user === null) return res.status(404).json({ message: 'user not found' });

               // o erro para requisção 
               const passwordIsValid = await bcrypt.compare(password, user.password);
               if (!passwordIsValid) return res.status(401).json({ message: 'invalid credentials' });

               // gerar token
               const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY as string, {
                    expiresIn: 86400,
               });

               return res.status(201).json({ message: 'login', token });
          }
          catch (error)
          {
               console.log(error);
               return res.status(500).json({ message: 'internal server error' });
          }

     }

     static async Register(req: Request, res: Response) : Promise<Response>
     {
          const { name, email, password, confirmPassword } = req.body as IUserRegister;

          // validar dados
          const validate = validateRegister(name, email, password, confirmPassword);

          if (validate !== null) return res.status(422).json({ message: validate });

          // verificar se o usuário existe
          const user = await GetUser(email);

          if (user !== null) return res.status(409).json({ message: 'user already exists' });


          // criptografar senha
          const salt = await bcrypt.genSalt(12);
          const hash = await bcrypt.hash(password, salt);


          // vamos criar o usuário e pegar o id
          const newUser = await User.create({
               name,     
               email,    
               password: hash,
               profileImage: null,
          }) as any;

          // definir o token
          const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.SECRET_KEY as string, {
               expiresIn: 86400,
          });

          return res.status(201).json({ message: 'register', token });
     }

     static Logout(req: Request, res: Response) : Response
     {
          res.setHeader('Authorization', '');
          return res.status(200).json({ message: 'logout' });
     }

     static async Profile(req: Request, res: Response) : Promise<Response>
     {
          const token = req.headers.authorization as string;
          try
          {
               const tokenFormat = token.split(' ')[1];
               const decoded = jwt.verify(tokenFormat, process.env.SECRET_KEY as string) as any;

               const user = await User.findOne({
                    where: {
                         id: decoded.id,
                         email: decoded.email,
                    },
                    attributes: ['name', 'email', 'profileImage'],
                    raw: true,
               })
               .catch((error) => {
                    console.error(error);
                    return undefined;
               });

               if (user === undefined) return res.status(500).json({ message: 'internal server error' });
               else if (user === null) return res.status(404).json({ message: 'user not found' });

               return res.status(200).json({ message: 'profile', user });
          }
          catch (error)
          {
               return res.status(401).json({ message: 'invalid token' });
          }
     }

     static async UpdateProfile(req: Request, res: Response) : Promise<Response>
     {
          const { name, password, profileImage } = req.body as IUserUpdate;

          return res.status(200).json({ message: 'update profile' });
     }

}


export default UserController;