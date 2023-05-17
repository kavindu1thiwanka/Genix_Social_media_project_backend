import { Document, Schema, model } from "mongoose";

export interface ILike extends Document {
    post_id: string;
    likeCount : number;
}

const LikeSchema = new Schema(
  {
    post_id: {
      type: String,
      required: true,
    },
    likeCount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Like = model<ILike>("Like", LikeSchema);
