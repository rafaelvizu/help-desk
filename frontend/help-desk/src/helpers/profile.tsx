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
          const user = response.data.user as IUser;
          
          if (user.profileImage === null)
          {
               user.profileImage = `${import.meta.env.VITE_API_URL}/profile.png`;
          }

          console.log(user);  
          return user;
          
     })
     .catch(error => {
          console.error(error);
          return null;
     });
}


export default profile;