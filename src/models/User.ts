import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  user_id: string;
  user_name: string;
  user_password: string;
  birthDay: string;
  address: string;
  email: string;
  contactNumber: string;
  user_img?: string;
}

const UserSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    user_password: {
      type: String,
      required: true,
    },
    birthDay: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    user_img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
