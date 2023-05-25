import { createContext, useEffect, 
          useState, ReactNode, useContext } from "react";
import { IClientContextData, IClient } from "../helpers/interfaces";
import api from "../services/api";
import {AuthContext} from "./auth";
import { toast } from "react-toastify";

export const ClientContext = createContext({} as IClientContextData);


export default function ClientProvider(props: { children: ReactNode; })
{
     const [clients, setClients] = useState<IClient[]>([]);
     const { token } = useContext(AuthContext);

     useEffect(() => {
          if (token)
          {
               getClients();
          }
     }, [token]);   

     async function getClients()
     {
          await api.get('/client', {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          })
          .then(response => {
               setClients(response.data.clients);               
          })
          .catch(error => {
               toast.error('error to get clients');
               console.log(error);
          });
          await Promise.all([
               new Promise(resolve => setTimeout(resolve, 10000))
          ]);
          
          return getClients();

     }

     return ( 
          <ClientContext.Provider value={{ clients }}> 
               {props.children}
          </ClientContext.Provider>
     )


}
