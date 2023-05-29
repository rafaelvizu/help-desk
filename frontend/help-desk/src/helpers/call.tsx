import api from "../services/api";
import { ICall } from "./interfaces";
import { toast } from 'react-toastify';


export async function getCall(token: string) : Promise<ICall[]>
{
     return await api.get('/call/', {
          headers: {
               Authorization: `Bearer ${token}`
          },
     })
     .then((response) => {
          return response.data.calls as ICall[];
     })
     .catch((err) => {
          console.log(err);
          return [] as ICall[];
     });
}

export async function getCallById(id: number, token: string) : Promise<ICall>
{
     return await api.get(`/call/${id}`, {
          headers: {
               Authorization: `Bearer ${token}`
          },
     })
     .then((response) => {
          return response.data as ICall;
     })
     .catch((err) => {
          console.log(err);
          return {} as ICall;
     });
}

export async function createCall(call: ICall, token: string, ) : Promise<ICall | null>
{
     return await api.post('/call/create', call, {
          headers: {
               Authorization: `Bearer ${token}`,
          },
     })
     .then((response) => {
          toast.success(response.data.message);
          return response.data.call as ICall;
     })
     .catch((err) => {
          toast.error(err.response.data.message);
          return null
     });
}

export async function updateCall(call: ICall, id: string,  token: string) : Promise<ICall | null>
{
     console.log(call, id, token);
     return await api.put(`/call/update/${id}`, call, {
          headers: {
               Authorization: `Bearer ${token}`,
          },
     })
     .then((response) => {
          toast.success(response.data.message);
          return response.data.call as ICall;
     })
     .catch((err) => {
          toast.error(err.response.data.message);
          return null
     });
}

export async function deleteCall(id: string, token: string) : Promise<boolean>
{
     return await api.delete(`/call/delete/${id}`, {
          headers: {
               Authorization: `Bearer ${token}`,
          },
     })
     .then((response) => {
          toast.success(response.data.message);
          return true;
     })
     .catch((err) => {
          toast.error(err.response.data.message);
          return false;
     });
}