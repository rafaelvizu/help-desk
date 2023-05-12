import { Request, Response } from "express";
// models
import Call from "../models/call";
// helpers/interfaces
import { ICallBody } from "../helpers/interfaces";
// helpers/*
import { validateCall } from "../helpers/validations";
import Client from "../models/client";


class CallController
{
     static async Create(req: Request, res: Response) : Promise<Response>
     {
          const { id } = res.locals.user;
          const body = req.body as ICallBody;

          const validate = validateCall(body);

          if (typeof validate === 'string') 
               return res.status(400).json({ message: validate });
          
          try
          {
               // cria o chamado
               await Call.create({
                    subject: validate.subject,
                    status: validate.status,
                    complement: validate.complement,
                    clientId: validate.clientId,
                    userId: id,
               });

               return res.status(201).json({ message: 'call created' });
               
          }
          catch (err)
          {
               console.error(err);
               return res.status(500).json({ message: 'internal error' });
          }

     }

     static async Update(req: Request, res: Response)
     {
          // id do chamado
          const { id } = req.params    

          // id do usuário
          const { id: userId } = res.locals.user;

          // body da requisição
          const body = req.body as ICallBody;
          

          const validate = validateCall(body);

          if (typeof validate === 'string')  
          {
               return res.status(422).json({ message: validate });
          }

          try
          {
               // upd do chamado
               const upd = await Call.update(validate, { 
                    where: { 
                         id,
                         userId,
                    } 
               });

               if (upd[0] === 0) return res.status(404).json({ message: 'call not found' });


               return res.status(200).json({ message: 'call updated' });
          }
          catch (err)
          {
               console.error(err);
               return res.status(500).json({ message: 'internal error' });
          }
     }

     public static async Delete(req: Request, res: Response)
     {
          // id do chamado
          const { id } = req.params

          // id do usuário
          const { id: userId } = res.locals.user;

          try
          {               
               const del = await Call.destroy({ where: {
                    id,
                    userId,
               }});

               if (del === 0) return res.status(404).json({ message: 'call not found' });

               return res.status(200).json({ message: 'call deleted' });
          }
          catch (err)
          {
               console.error(err);
               return res.status(500).json({ message: 'internal error' });
          }

     }

     static async GetAll(req: Request, res: Response)
     {
          // id do usuário
          const { id: userId } = res.locals.user;

          try
          {
               let calls = await Call.findAll({
                    where: { userId },
                    raw: true,
               });

               if (!calls)  calls = [];

               return res.status(200).json({message: 'calls found', calls});
          }
          catch (err)
          {
               console.error(err);
               return res.status(500).json({ message: 'internal error' }); 
          }
       
     }

     static async Get(req: Request, res: Response)
     {
          // id do chamado
          const { id } = req.params;

          // id do usuário
          const { id: userId } = res.locals.user;

          try
          {
               const call = await Call.findOne({
                    where: {
                         id,
                         userId,   
                    },
                    raw: true,
               });

               if (!call) return res.status(404).json({ message: 'call not found' });

               return res.status(200).json({ message: 'call found', call });
          }
          catch (err)
          {
               console.error(err);
               return res.status(500).json({ message: 'internal error' });
          }
     }

}


export default CallController;