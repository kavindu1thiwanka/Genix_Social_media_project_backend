import express, { Router } from "express";
import PostController from "../controllers/PostController";

export default class PostRoutes {
  private router: Router = express.Router();
  private postController: PostController = new PostController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    
    this.router.post("/", this.postController.createPost);

    this.router.get("/", this.postController.retrieveAllPosts);

    this.router.put("/:id", this.postController.updatePost);

    this.router.delete("/:id", this.postController.deletePost);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
