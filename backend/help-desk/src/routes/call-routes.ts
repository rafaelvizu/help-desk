import { Router } from "express";


class CallRoutes {
    private static Router: Router = Router();

     public static get Routes(): Router
     {

          return this.Router;
     }
}


export default CallRoutes;