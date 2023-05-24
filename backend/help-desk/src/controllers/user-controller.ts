import { Request, Response } from "express";
import fs from "fs";

// models
import User from "../models/user";

// helpers/interfaces
import { IUserLogin, IUserRegister, IUserUpdate } from "../helpers/interfaces";

// helpers/*
import GetUser from "../helpers/get-user";
import { validateLogin, validateName, validatePassword, validateRegister } from "../helpers/validations";
import { generateToken } from "../helpers/token";
import { compareHashPassword, getHashPassword } from "../helpers/hash-password";


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
               const passwordIsValid = await compareHashPassword(password, user.password);
               if (!passwordIsValid) return res.status(401).json({ message: 'invalid credentials' });

               // gerar token
               const token = generateToken(user.email, user.id);

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
          const hash = await getHashPassword(password);

          // vamos criar o usuário e pegar o id
          const newUser = await User.create({
               name,     
               email,    
               password: hash,
               profileImage: null,
          }) as any;

          // definir o token
          const token = generateToken(newUser.email, newUser.id);

          return res.status(201).json({ message: 'register', token });
     }

     static Logout(req: Request, res: Response) : Response
     {
          res.setHeader('Authorization', '');
          return res.status(200).json({ message: 'logout' });
     }

     static async Profile(req: Request, res: Response) : Promise<Response>
     {    
          const { id, email } = res.locals.user;
          

          const user = await User.findOne({
               where: {
                    id,
                    email,
               },
               attributes: ['name', 'email', 'profileImage'],
               raw: true,
          })
          .catch((error) => {
               console.error(error);
               return undefined;
          }) as any;

          if (user === undefined) return res.status(500).json({ message: 'internal server error' });

          // pega a url da imagem e transforma em base 64
          if (user.profileImage != null)
          {
               try
               {
                    const image = fs.readFileSync(`./uploads/profile-images/${user.profileImage}`)
                    // deixar a imagem em base 64 para ser exibida no front-end
                    user.profileImage = image.toString('base64');
                    user.profileImage = `data:image/png;base64,${user.profileImage}`;
             
               }
               catch (error)
               {
                    user.profileImage = null;
               }
          }

          return res.status(200).json({ message: 'profile', user });          
     }

     static async UpdateProfile(req: Request, res: Response) : Promise<Response>
     {
          const { name, password, confirmPassword } = req.body as IUserUpdate;
          const { id, email } = res.locals.user;

          if (!name && !password && !confirmPassword && !req.file) 
          {
               return res.status(422).json({ message: 'no data to update' });
          }

          const upd = {} as IUserUpdate
          // validar dados
          if (password || confirmPassword)
          {
               const validate = validatePassword(password, confirmPassword);
               if (validate !== null) return res.status(422).json({ message: validate });
               const hash = await getHashPassword(password)
               .catch((error) => {
                    console.error(error);
                    return undefined;
               })

               if (hash === undefined) return res.status(500).json({ message: 'internal server error' });

               upd.password = hash;
          }

          if (name)
          {
               const validate = validateName(name);
               if (validate !== null) return res.status(422).json({ message: validate });

               upd.name = name;
          }

          if (req.file)
          {
               upd.profileImage = req.file.filename;
          }

          
          try
          {
               const profileImage = await User.findOne({
                    where: {
                         id,
                         email,
                    },
                    attributes: ['profileImage'],
                    raw: true,
               }) as any;

               if (profileImage === null) return res.status(404).json({ message: 'user not found' });

               if (profileImage.profileImage != null)
               {
                    try
                    {
                         // deletar imagem antiga
                         fs.unlinkSync(`./uploads/profile-images/${profileImage.profileImage}`);
                    }
                    catch (error)
                    {
                         console.error(error);
                    }
               }

               await User.update(upd, {
                    where: {
                         id,
                         email,
                    },
               })
               .then(() => {
                    return res.status(200).json({ message: 'profile updated' });
               });
          }
          catch (error)  
          {
               console.error(error);
               return res.status(500).json({ message: 'internal server error' });
          }

          return res.end();
     }

}


export default UserController;