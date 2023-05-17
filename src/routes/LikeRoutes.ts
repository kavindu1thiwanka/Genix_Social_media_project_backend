import express, { Router } from "express";
import LikeController from "../controllers/LikeController";

export default class LikeRoutes {
  private router: Router = express.Router();
  private likeController: LikeController = new LikeController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    
    this.router.post("/", this.likeController.createPost);

    this.router.get("/", this.likeController.retrieveAllPosts);

    this.router.put("/:id", this.likeController.updatePost);

    this.router.delete("/:id", this.likeController.deletePost);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
