import { Schema, Types, Document, model } from 'mongoose';

enum ChannelTypes {
  DM = 0,
  GUILD_CHAT = 1,
}

interface IChannel {
  _id: Types.ObjectId;
  channelType: ChannelTypes;
  name?: string;
  description?: string;
}

type ChannelDocument = IChannel & Document;

const ChannelSchema = new Schema<ChannelDocument>(
  {
    channelType: {
      type: Number,
      required: true,
      enum: ChannelTypes,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    collection: 'Channel',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

const ChannelModel = model<ChannelDocument>('Channel', ChannelSchema);

export type { ChannelDocument };
export { ChannelModel };
