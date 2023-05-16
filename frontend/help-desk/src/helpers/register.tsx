import api from "../services/api";
import { IRegister } from "./interfaces";
import { toast } from 'react-toastify';

export default async function register(data: IRegister) : Promise<string | null>
{
     return await api.post('/user/register', data)
     .then(response => {
          const { token } = response.data;
          localStorage.setItem('token', token);
          return token;
     })
     .catch(error => {
          console.error(error);
          toast.error(error.response.data.message);
          return null;
     });
}