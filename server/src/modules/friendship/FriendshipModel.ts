import { Types, Schema, Document, model } from 'mongoose';

enum FriendshipStatus {
  Pending = 0,
  Accepted = 1,
  Rejected = 2,
}

interface IFriendship {
  _id: Types.ObjectId;
  sender: Types.ObjectId;
  recipient: Types.ObjectId;
  status: FriendshipStatus;
}

type FriendshipDocument = IFriendship & Document;

const FriendshipSchema = new Schema<FriendshipDocument>(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: Number, enum: FriendshipStatus, default: 0, required: true },
  },
  { collection: 'Friendship' },
);

const FriendshipModel = model<FriendshipDocument>('Friendship', FriendshipSchema);

export type { FriendshipDocument };
export { FriendshipModel };
