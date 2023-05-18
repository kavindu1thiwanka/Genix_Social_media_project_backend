import express, { Router } from "express";
import LikeController from "../controllers/LikeController";

export default class LikeRoutes {
  private router: Router = express.Router();
  private likeController: LikeController = new LikeController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    
    this.router.post("/", this.likeController.createLikeCollection);

    this.router.get("/:post_id", this.likeController.retrieveAllLikes);

    this.router.put("/:id", this.likeController.updateLikes);

    this.router.delete("/:id", this.likeController.deleteLikeCollection);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
