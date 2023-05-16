import api from "../services/api";
import { ICall } from "./interfaces";


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