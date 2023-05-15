import { Document, Schema, model } from "mongoose";

export interface IPost extends Document {
    post_id: string;
    user_id: string;
    date: string;
    time: string;
    description: string;
    img?: string;
}

const PostSchema = new Schema(
  {
    post_id: {
      type: String,
      required: true,
    },
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
