import express, { Router } from "express";
import FriendController from "../controllers/FriendController";

export default class PostRoutes {
  private router: Router = express.Router();
  private friendController: FriendController = new FriendController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    this.router.post("/", this.friendController.createFriendList);
    
    this.router.put("/:user_id&friend_id", this.friendController.addFriendtoList);

    this.router.get("/:id", this.friendController.retrieveAllFriends);

    this.router.put("/:user_id&friend_id", this.friendController.removeFriendFromList);

    this.router.delete("/:id", this.friendController.removeFriend);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
