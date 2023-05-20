import express, { Router } from "express";
import UserController from "../controllers/UserController";

export default class UserRoutes {
  private router: Router = express.Router();
  private userController: UserController = new UserController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    
    this.router.post("/", this.userController.addUser);

    this.router.get("/", this.userController.getAllUsers);

    this.router.get("/:email&:password", this.userController.checkLogin);

    this.router.get("/:user_id", this.userController.getUserDetails);

    this.router.put("/:id", this.userController.updateUser);

    this.router.delete("/:id", this.userController.deleteUser);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
