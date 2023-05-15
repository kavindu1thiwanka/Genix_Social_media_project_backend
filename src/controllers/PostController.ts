import { RequestHandler, Request, Response } from "express";
import mongoose, { ClientSession } from "mongoose";
import { Post } from "../models/Post";

export default class PostController {
  createPost: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    let session: ClientSession | null = null;

    try {

      session = await mongoose.startSession();
      session.startTransaction();

      const post = new Post(req.body);

      let newPost = await post.save();

      await session.commitTransaction();
      session.endSession();

      return res
        .status(200)
        .json({ message: "New Post created.", responseData: newPost });
    } catch (error: unknown) {
      if (session != null) {
        try {
          await session.abortTransaction();
        } catch (abortError) {
          console.log(`Error aborting transaction: ${abortError}`);
        }
      }

      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };

  retrieveAllPosts: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const posts = await Post.find();
      return res.status(200).json({ responseData: posts });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };

  updatePost: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      let updatedPost = await Post.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res
        .status(200)
        .json({ message: "Post updated.", responseData: updatedPost });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };

  deletePost: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      let deletedPost = await Post.findByIdAndDelete(id);

      return res
        .status(200)
        .json({ message: "Post deleted.", responseData: deletedPost });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };

  searchPostByCategory = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      let posts = await Post.find({ categoryId: id });
      return res.status(200).json({ responseData: posts });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };
}
