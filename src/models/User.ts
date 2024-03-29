import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  user_id: string;
  user_name: string;
  user_password: string;
  birthDay: string;
  address: string;
  email: string;
  contactNumber: string;
  gender: string;
  userImg?: string;
  description?:string;
  relation?:string;
  education?:string;
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
    gender: {
      type: String,
      required: true,
    },
    userImg: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    relation: {
      type: String,
      required: false,
    },
    education: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
