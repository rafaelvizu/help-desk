import { createContext, useState } from 'react';
import { ReactNode } from 'react';

export const AuthContext = createContext({} as any);

// para tirar o erro das props
interface Props {
     children: ReactNode;
}

function AuthProvider(props: Props)
{
     const [token, setToken] = useState<string | undefined>(undefined);

     return (
          <AuthContext.Provider value={{ token, setToken }}>
               {props.children}
          </AuthContext.Provider>
     )
}



export default AuthProvider;