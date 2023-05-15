import express, { Router } from "express";
import UserController from "../controllers/UserController";

export default class UserRoutes {
  private router: Router = express.Router();
  private userController: UserController = new UserController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    // POST /genix/v1/user
    this.router.post("/", this.userController.addUser);

    // GET /genix/v1/user
    this.router.get("/", this.userController.getAllUsers);

    // PUT /genix/v1/user/:id
    this.router.put("/:id", this.userController.updateUser);

    // DELETE /genix/v1/user/:id
    this.router.delete("/:id", this.userController.deleteUser);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
