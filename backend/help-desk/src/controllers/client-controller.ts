import { Request, Response } from "express";
// models
import Client from "../models/client";
// helpers/interfaces
import { IClientBody } from "../helpers/interfaces";
// helpers/*
import { validateClient } from "../helpers/validations";


class ClientController
{
     public static async Create(req: Request, res: Response) : Promise<Response>
     {
          const { id } = res.locals.user; 
          
          const body = req.body as IClientBody;
          const validate = validateClient(body);

          if (typeof validate === 'string') return res.status(400).json({ message: validate });

          try
          {
               const client = await Client.create({
                    name: validate.name,
                    gender: validate.gender,
                    dateBirth: validate.dateBirth,
                    address: validate.address,
                    number: validate.number,
                    complement: validate.complement,
                    district: validate.district,
                    city: validate.city,
                    state: validate.state,
                    cep: validate.cep,
                    phone_1: validate.phone_1,
                    phone_2: validate.phone_2,
                    email: validate.email,
                    cpf: validate.cpf,
                    cnpj: validate.cnpj,
                    userId: id,
               }) as any; 

               client.userId = undefined;    
               return res.status(201).json({ message: 'client created', client });
          }
          catch (err)
          {
               console.error(err);
               return res.status(500).json({ message: 'internal server error' });
          }
          
     }

     public static async Update(req: Request, res: Response) : Promise<Response>
     {
          const { id } = req.params;
          const { id: userId } = res.locals.user;
          const body = req.body as IClientBody;

          const validate = validateClient(body);

          if (typeof validate === 'string') return res.status(400).json({ message: validate });

          try
          {
               // check if client exists
               const client = await Client.findOne({ where: { id, userId } });

               if (!client) return res.status(404).json({ message: 'client not found' });

               // update client
               await Client.update(validate, {
                    where: { id, userId }
               });  
           
               return res.status(200).json({ message: 'client updated' });
          }
          catch (err)
          {
               console.error(err);
               return res.status(500).json({ message: 'internal server error' });
          }

     }

     public static async Delete(req: Request, res: Response) : Promise<Response>
     {
          const { id } = req.params;
          const { id: userId } = res.locals.user;

          await Client.destroy({ where: { id, userId } })
          .then((del) => {
               if (!del) return res.status(404).json({ message: 'client not found' });
               return res.status(200).json({ message: 'client deleted' });
          })
          .catch(err => {
               console.error(err);
               return res.status(500).json({ message: 'internal server error' });
          });

          return res.end();
     }

     public static async Get(req: Request, res: Response) : Promise<Response>
     {   
          const { id } = req.params;
          const { id: userId } = res.locals.user;

          await Client.findOne({ where: { id, userId }, 
               attributes: { exclude: ['userId'] },
               raw: true 
          })
          .then((client) => {
               if (!client) return res.status(404).json({ message: 'client not found' });
               return res.status(200).json({ message: 'client found', client });
          })
          .catch(err => {
               console.error(err);
               return res.status(500).json({ message: 'internal server error' });
          });

          return res.end();
     }

     public static async GetAll(req: Request, res: Response) : Promise<Response>
     {
          const { id } = res.locals.user;

          await Client.findAll({ where: 
               { userId: id }, 
               attributes: { exclude: ['userId'] },
               raw: true 
          })
          .then((clients) => {
               if (!clients) clients = [];
               return res.status(200).json({ message: 'clients found', clients });
          })
          .catch(err => {
               console.error(err);
               return res.status(500).json({ message: 'internal server error' });    
          });


          return res.end();
     }
}


export default ClientController;