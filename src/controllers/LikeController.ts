import { RequestHandler, Request, Response } from "express";
import mongoose, { ClientSession } from "mongoose";
import { Like } from "../models/Like";

export default class PostController {
  createLikeCollection: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    let session: ClientSession | null = null;

    try {
      session = await mongoose.startSession();
      session.startTransaction();

      const like = new Like(req.body);

      let newLike = await like.save();

      await session.commitTransaction();
      session.endSession();

      return res
        .status(200)
        .json({ message: "New Like Added.", responseData: newLike });
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

  retrieveAllLikes: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const likes = await Like.find();
      for (let index = 0; index < likes.length; index++) {
        if (likes[index].post_id == req.params.post_id) {
          return res.status(200).json({ responseData: likes[index].likeCount });
        } else {
          continue;
        }
      }
      return res.status(404).send("Invalid Post");
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };

  updateLikes: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const likes = await Like.find();
      for (let index = 0; index < likes.length; index++) {
        if (likes[index].post_id == req.params.id) {
          let updatedPost = await Like.findByIdAndUpdate(
            likes[index]._id,
            req.body,
            {
              new: true,
            }
          );
          return res.status(200).json({ responseData: updatedPost });
        } else {
          continue;
        }
      }
      return res.status(404).send("Invalid Post");
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };

  deleteLikeCollection: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const likes = await Like.find();
      for (let index = 0; index < likes.length; index++) {
        if (likes[index].post_id == req.params.id) {
          let deletedPost = await Like.findByIdAndDelete(likes[index]._id);
          return res.status(200).json({message: "Collection Deleted.", responseData: deletedPost });
        } else {
          continue;
        }
      }
      return res.status(404).send("Invalid Post");
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };
}
