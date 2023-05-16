import api from "../services/api";
import { IUser } from "./interfaces";


async function profile(token: string) : Promise<IUser | null>
{
     return await api.get('/user/profile', {
          headers: {
               Authorization: `Bearer ${token}`
          },
     })
     .then(response => {
          const user = response.data.user;
          return user as IUser;
     })
     .catch(error => {
          console.error(error);
          return null;
     });
}


export default profile;