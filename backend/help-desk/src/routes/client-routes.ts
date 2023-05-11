import { Router } from "express";
// helpers
import { checkAuth } from "../helpers/check-auth";
// controllers
import ClientController from "../controllers/client-controller";

class ClientRoutes
{
     private static Router: Router = Router();

     public static get Routes() : Router
     {
          this.Router.delete('/delete/:id', checkAuth, ClientController.Delete)
          this.Router.put('/update/:id', checkAuth, ClientController.Update)
          this.Router.post('/create', checkAuth, ClientController.Create)

          this.Router.get('/:id', checkAuth, ClientController.Get)
          this.Router.get('/', checkAuth, ClientController.GetAll)

          return this.Router;
     }
}


export default ClientRoutes;
