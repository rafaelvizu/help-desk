import { createContext, useState, useEffect } from 'react';
import { ReactNode } from 'react';
import { IUser, IAuthContextData } from '../helpers/interfaces';
import profile from '../helpers/profile';

export const AuthContext: React.Context<IAuthContextData> = createContext({} as IAuthContextData);

interface Props {
     children: ReactNode;
}


function AuthProvider(props: Props)
{
     const [token, setToken] = useState<string | undefined>(undefined);
     const [user, setUser] = useState<IUser | undefined>(undefined);

     useEffect(() => {
          if (token)
          {    
               updateProfile(token);
          }
     }, [token]);

     async function updateProfile(userToken: string)
     {
          const user = await profile(userToken);
          if (user !== null)
          {
               setUser(user);
               return;   
          }

          setUser(undefined)
     }     

     return (
          <AuthContext.Provider value={{ token, setToken, setUser, user }}>
               {props.children}
          </AuthContext.Provider>
     )
}



export default AuthProvider;