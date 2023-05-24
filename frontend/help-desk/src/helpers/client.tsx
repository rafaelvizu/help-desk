import api from "../services/api";
import { IClient } from "./interfaces";
import { toast } from 'react-toastify';


export async function createClient(newClient: IClient, token: string) : Promise<IClient | null>
{
     newClient.cnpj = newClient.cnpj?.replace(/[^0-9]/g, '') || null;
     newClient.cpf = newClient.cpf?.replace(/[^0-9]/g, '') || null;
     newClient.phone_1 = newClient.phone_1?.replace(/[^0-9]/g, '') || null;
     newClient.phone_2 = newClient.phone_2?.replace(/[^0-9]/g, '') || null;     
     newClient.cep = newClient.cep?.replace(/[^0-9]/g, '') || null;

     return await api.post('/client/create', newClient, {
          headers: {    
               Authorization: `Bearer ${token}`,
          },   
     })
     .then((response) => {
          toast.success(`Client ${response.data.name} created successfully!`);
          return response.data;
     })
     .catch((err) => {
          toast.error(err.response.data.message);
          return null;
     });  
}
