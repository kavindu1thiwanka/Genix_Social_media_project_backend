import { RequestHandler, Request, Response } from "express";
import mongoose, { ClientSession } from "mongoose";
import { Friend } from "../models/Friend";

export default class PostController {
  createFriendListCollection: RequestHandler = async (
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
      for (let index = 0; index < friends.length; index++) {
        if (friends[index]._id == req.params.id) {
          friends[index].friends_ids.push(req.params.friend_id);
          friends[index].friendsCount += 1;
          return res.status(200).send("Friend Added to List.");
          break;
        } else {
          continue;
        }
      }
      return res.status(404).send("Invalid User.");
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
      const friend = await Friend.find();
      for (let index = 0; index < friend.length; index++) {
        if (friend[index].user_id == req.params.id) {
          var a = friend[index].friends_ids;
          return res.status(200).json({ responseData: a });
          break;
        } else {
          continue;
        }
      }
      return res.status(200).send("Invalid User..");
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
      const { id } = req.params;
      let updatedFriend = await Friend.findByIdAndUpdate(id, req.body, {
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
      const { id } = req.params;
      let deletedFriend = await Friend.findByIdAndDelete(id);

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
