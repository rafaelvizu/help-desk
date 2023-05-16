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
     const [token, setToken] = useState<string | undefined>('');
     const [user, setUser] = useState<IUser | undefined>({} as IUser);

     useEffect(() => {
          if (token)
          {
               Profile()
          }
     }, [token, setToken]);

     async function Profile()
     {
          const userRes: IUser | null = await profile(token as string);
          if (user === null)
          {
               setUser({} as IUser);
               return;
          }

          setUser(userRes as IUser);
     }

     return (
          <AuthContext.Provider value={{ token, setToken, setUser, user }}>
               {props.children}
          </AuthContext.Provider>
     )
}



export default AuthProvider;