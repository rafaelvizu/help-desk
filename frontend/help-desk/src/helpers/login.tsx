import api from "../services/api";
import { ILogin } from "./interfaces";
import { toast } from 'react-toastify';

export default async function login(data: ILogin) : Promise<string | null>
{
     return await api.post('/user/login', data)
     .then(response => {
          const { token } = response.data;
          localStorage.setItem('token', token);
          window.location.href = '/';
          return token;
     })
     .catch(error => {
          toast.error(error.response.data.message);
          console.error(error);
          return null;
     });
}