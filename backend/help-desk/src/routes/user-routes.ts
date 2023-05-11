import { Router } from "express";
import UserController from "../controllers/user-controller";
import { checkAuth, checkUnAuth } from "../helpers/check-auth";


class UserRoutes
{
     private static Router: Router = Router();

     public static get Routes() : Router
     {
          this.Router.post('/register', checkUnAuth, UserController.Register);
          this.Router.post('/login', checkUnAuth, UserController.Login);

          this.Router.delete('/logout', checkAuth, UserController.Logout);
          this.Router.get('/profile', checkAuth, UserController.Profile);
          this.Router.put('/update-profile', checkAuth, UserController.UpdateProfile);

          return this.Router;
     }
}


export default UserRoutes;