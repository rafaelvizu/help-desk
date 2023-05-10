import { Router } from "express";
import UserRoutes from "./user-routes";

class MainRoutes
{
     private static Router: Router = Router();

     public static get Routes() : Router
     {
          this.Router.use('/user', UserRoutes.Routes);

          return this.Router;
     }
}


export default MainRoutes;