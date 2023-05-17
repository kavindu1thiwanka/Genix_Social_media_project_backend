import { Document, Schema, model } from "mongoose";

export interface IPost extends Document {
    user_id: string;
    date: string;
    time: string;
    description: string;
    img?: string;
}

const PostSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Post = model<IPost>("Post", PostSchema);
