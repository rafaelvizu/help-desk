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
          toast.success(`Client ${response.data.client.name} created successfully!`);
          return response.data.client;
     })
     .catch((err) => {
          toast.error(err.response.data.message);
          return null;
     });  
}

export async function getClient(id: string, token: string)
{
     return await api.get(`/client/${id}`, {
          headers: {
               Authorization: `Bearer ${token}`,
          },
     }).then(response => {
          const client: IClient = response.data.client;
          return client;
     }).catch(error => {
          console.log(error);
          return null;
     }); 
}

export async function deleteClient(id: string, token: string)
{
     return await api.delete(`/client/delete/${id}`, {
          headers: {
               Authorization: `Bearer ${token}`,
          },
     }).then(response => {
          toast.success(response.data.message);
          return true;
     }).catch(error => {
          toast.error(error.response.data.message);
          return false;
     }); 
}

export async function updateClient(id: string, client: IClient, token: string)  
{
     return await api.put(`/client/update/${id}`, client, {
          headers: {
               Authorization: `Bearer ${token}`,
          },
     })
     .then((response) => {
          toast.success(response.data.message);
          return true
     })
     .catch((err) => {
          toast.error(err.response.data.message);
          return false;
     });
}