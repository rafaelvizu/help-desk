import { createContext, useEffect, 
     useState, ReactNode, useContext } from "react";   
import api from "../services/api";
import { toast } from "react-toastify";
import { ICallContextData, ICall } from "../helpers/interfaces";
import { AuthContext } from "./auth";

export const CallContext = createContext({} as ICallContextData);


export default function CallProvider(props: { children: ReactNode; })
{
     const [calls, setCalls] = useState<ICall[]>([]);
     const { token } = useContext(AuthContext);

     useEffect(() => {
          getCalls();
     }, [token]);

     async function getCalls()
     {
          while (token)
          {
               await api.get('/call', {
                    headers: {
                         Authorization: `Bearer ${token}`,
                    },
               })
               .then(response => {
                    setCalls(response.data.calls);               
               })
               .catch(error => {
                    toast.error('error to get calls');
                    console.log(error);
               });
               await Promise.all([
                    new Promise(resolve => setTimeout(resolve, 10000))
               ]);
          }
     
     }

     return (
          <CallContext.Provider value={{ calls }}>
               {props.children}
          </CallContext.Provider>
     )
}