import { RequestHandler, Request, Response } from "express";
import mongoose, { ClientSession } from "mongoose";
import { User } from "../models/User";

export default class PostController {
  addUser: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    let session: ClientSession | null = null;

    try {
      session = await mongoose.startSession();
      session.startTransaction();

      const user = new User(req.body);

      let newUser = await user.save();

      await session.commitTransaction();
      session.endSession();

      return res
        .status(200)
        .json({ message: "New User Added.", responseData: newUser });
    } catch (error: unknown) {
      if (session != null) {
        try {
          await session.abortTransaction();
        } catch (abortError) {
          console.log(`Error aborting transaction: ${abortError}`);
        }
      }

      if (error instanceof Error) {
        return res.status(500).json({ message: error.message, responseData: false });
      } else {
        return res.status(500).json({ message: "Unknown error occured.", responseData: false });
      }
    }
  };

  getAllUsers: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const users = await User.find();
      return res.status(200).json({ responseData: users });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };

  checkLogin: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const users = await User.find();
      for (let index = 0; index < users.length; index++) {
        if(users[index].email == req.params.email){
          if(users[index].user_password == req.params.password){
            return res.status(200).json({ responseData: true });
            break;
          }else{
            return res.status(200).json({ responseData: false });
            break;
          }
        }else{
          continue;
        }
      }
      return res.status(200).json({ responseData: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };

  updateUser: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      let updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res
        .status(200)
        .json({ message: "User updated.", responseData: updatedUser });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };

  deleteUser: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      let deletedUser = await User.findByIdAndDelete(id);

      return res
        .status(200)
        .json({ message: "User deleted.", responseData: deletedUser });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Unknown error occured." });
      }
    }
  };
}
