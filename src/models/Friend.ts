import { Document, Schema, model } from "mongoose";

export interface IFriend extends Document {
  user_id: string;
  friends_ids: string[];
  friendsCount: number;
}

const FriendSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    friends_ids: {
      type: Array,
      required: true,
    },
    friendsCount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Friend = model<IFriend>("Friend", FriendSchema);
