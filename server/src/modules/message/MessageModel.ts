import { Schema, Types, Document, model } from 'mongoose';

interface IMessage {
  _id: Types.ObjectId;
  sender: Types.ObjectId;
  location: Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

type MessageDocument = IMessage & Document;

const MessageSchema = new Schema<MessageDocument>(
  {
    content: {
      type: String,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: 'Channel',
    },
  },
  {
    collection: 'Message',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

const MessageModel = model<MessageDocument>('Message', MessageSchema);

export type { MessageDocument };
export { MessageModel };
