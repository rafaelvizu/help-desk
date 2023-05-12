import Client from "../models/client";


export default async function checkClient(client_id : number, user_id: number) : Promise<boolean>
{
     return await Client.findOne({
          where: { id: client_id, userId: user_id },
          attributes: ['id'],
          raw: true,
     })
     .then((client) => {
          if (!client) return false;
          return true;
     });
}