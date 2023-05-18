import { Navigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth";


interface RouteWrapperProps
{
     defaultComponent: React.ComponentType;
     isPrivate: boolean;
}


export default function RouteWrapper({
     defaultComponent: Component,
     isPrivate,
}: RouteWrapperProps)
{
     const [signed, setSigned] = useState(false);
     const [loading, setLoading] = useState(true);
     const { token, setToken } = useContext(AuthContext);

     useEffect(() => {
          if (token)
          {
               setSigned(true);
               setLoading(false);
               localStorage.setItem('token', token);
               return;
          }
          const tokenLocal: string | null = localStorage.getItem('token')
          if (tokenLocal)
          {
               setToken(tokenLocal);
               setSigned(true);
               setLoading(false);
               return;
          }

          setSigned(false);
          setToken('');
          setLoading(false);

     }, [token, setToken]);

     if (loading)
     {
          return <></>
     }

     if (!signed && isPrivate)
     {
          return <Navigate to="/signin" />
     }

     if (signed && !isPrivate)
     {
          return <Navigate to="/" />
     }

     return <Component />
}