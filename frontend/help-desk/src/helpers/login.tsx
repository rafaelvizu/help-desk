import api from "../services/api";
import { ILogin } from "./interfaces";

export default async function login(data: ILogin) : Promise<string | null>
{
     return await api.post('/login', data)
     .then(response => {
          const { token } = response.data;
          return token;
     })
     .catch(error => {
          console.error(error);
          return null;
     });
}