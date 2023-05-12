import { Router } from "express";
// controllers
import CallController from "../controllers/call-controller";
// helpers/*
import { checkAuth } from "../helpers/check-auth";


class CallRoutes {
    private static Router: Router = Router();

     public static get Routes(): Router
     {    
          this.Router.delete('/delete/:id', checkAuth, CallController.Delete);
          this.Router.put('/update/:id', checkAuth, CallController.Update);
          this.Router.post('/create', checkAuth, CallController.Create);

          this.Router.get('/:id', checkAuth, CallController.Get); 
          this.Router.get('/', checkAuth, CallController.GetAll);

          return this.Router;
     }
}


export default CallRoutes;