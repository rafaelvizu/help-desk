import { Navigate } from "react-router-dom";


// configurar ract para que ele entenda que o componente é um componente
// e não uma função
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
     const signed = false;

     if (!signed && isPrivate)
     {
          return <Navigate to="/login" />
     }

     if (signed && !isPrivate)
     {
          return <Navigate to="/" />
     }

     return <Component />
}