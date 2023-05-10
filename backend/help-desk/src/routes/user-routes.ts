import { Router } from "express";
import UserController from "../controllers/user-controller";

class UserRoutes
{
     private static Router: Router = Router();

     public static get Routes() : Router
     {
          this.Router.post('/register', UserController.Register);
          this.Router.post('/login', UserController.Login);

          this.Router.delete('/logout', UserController.Logout);
          this.Router.get('/profile', UserController.Profile);
          this.Router.put('/updata-profile', UserController.UpdateProfile);

          return this.Router;
     }
}


export default UserRoutes;