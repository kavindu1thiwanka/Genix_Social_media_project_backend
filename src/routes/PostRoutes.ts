import express, { Router } from "express";
import PostController from "../controllers/PostController";

export default class PostRoutes {
  private router: Router = express.Router();
  private postController: PostController = new PostController();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    // POST /genix/v1/post
    this.router.post("/", this.postController.createPost);

    // GET /genix/v1/post
    this.router.get("/", this.postController.retrieveAllPosts);

    // PUT /genix/v1/post/:id
    this.router.put("/:id", this.postController.updatePost);

    // DELETE /genix/v1/post/:id
    this.router.delete("/:id", this.postController.deletePost);
  };

  public getRouter = (): Router => {
    return this.router;
  };
}
