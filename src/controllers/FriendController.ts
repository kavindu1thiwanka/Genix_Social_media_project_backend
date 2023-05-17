import { RequestHandler, Request, Response } from "express";
import mongoose, { ClientSession } from "mongoose";
import { Friend } from "../models/Friend";

export default class PostController {
  createFriendList: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    let session: ClientSession | null = null;
    try {
      session = await mongoose.startSession();
      session.startTransaction();

      const friend = new Friend(req.body);

      let newFriend = await friend.save();

      await session.commitTransaction();
      session.endSession();

      return res
        .status(200)
        .json({ message: "New Post created.", responseData: newFriend });
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

  addFriendtoList: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const friends = await Friend.find();
      return res.status(200).json({ responseData: friends });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };

  retrieveAllFriends: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const friends = await Friend.findById(req.params.id);
      return res.status(200).json({ responseData: friends });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };

  removeFriendFromList: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { _id } = req.params;
      let updatedFriend = await Friend.findByIdAndUpdate(_id, req.body, {
        new: true,
      });
      return res
        .status(200)
        .json({ message: "Post updated.", responseData: updatedFriend });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };

  removeFriend: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { _id } = req.params;
      let deletedFriend = await Friend.findByIdAndDelete(_id);

      return res
        .status(200)
        .json({ message: "Friend deleted.", responseData: deletedFriend });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };
}
