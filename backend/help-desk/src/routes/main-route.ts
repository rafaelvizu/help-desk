import { Router } from "express";
// routes
import UserRoutes from "./user-routes";
import ClientRoutes from "./client-routes";
import CallRoutes from "./call-routes";


class MainRoutes
{
     private static Router: Router = Router();

     public static get Routes() : Router
     {
          this.Router.use('/user', UserRoutes.Routes);
          this.Router.use('/client', ClientRoutes.Routes);
          this.Router.use('/call', CallRoutes.Routes);

          return this.Router;
     }
}


export default MainRoutes;