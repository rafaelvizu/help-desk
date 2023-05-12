import { Request, Response } from "express";
// models
import Call from "../models/call";
// helpers/interfaces
import { ICallBody } from "../helpers/interfaces";
// helpers/*
import { validateCall } from "../helpers/validations";
import Client from "../models/client";
import checkClient from "../helpers/check-client";


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
               // verifica se o cliente pertence ao usuário
               if (!await checkClient(id, validate.clientId)) 
                    return res.status(400).json({ message: 'client not found' });

               // cria o chamado
               await Call.create({
                    subject: validate.subject,
                    status: validate.status,
                    complement: validate.complement,
                    clientId: validate.clientId,
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
          const { id } = req.params;
          const { id: userId } = res.locals.user;

          const body = req.body as ICallBody;
          const validate = validateCall(body);

          if (typeof validate === 'string')
          {
               return res.status(400).json({ message: validate });
          }

          try
          {
               if (!await checkClient(userId, validate.clientId))
               {
                    return res.status(400).json({ message: 'client not found' });
               }

               const upd = await Call.update({...validate}, {
                    where: { clientId: validate.clientId },
               });

               if (upd[0] === 0)
               {
                    return res.status(400).json({ message: 'call not found' });
               }

               return res.status(200).json({ message: 'call updated' });
          }
          catch (err)
          {
               console.error(err);
               return res.status(500).json({ message: 'internal error' });
          }

          // o status comum para 
          
     }

     static async Delete(req: Request, res: Response)
     {

     }

     static async Get(req: Request, res: Response)
     {

     }

     static async GetAll(req: Request, res: Response)
     {

     }
}


export default CallController;