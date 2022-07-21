import { Schema, Types, Document, model } from 'mongoose';

enum ChannelTypes {
  DM = 0,
  GUILD_CHAT = 1,
}

interface IChannel {
  _id: Types.ObjectId;
  name?: string;
  description?: string;
  guild?: Types.ObjectId;
  channelType: ChannelTypes;
  participants?: Types.ObjectId[];
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
    guild: {
      type: Schema.Types.ObjectId,
      ref: 'Guild',
    },
    participants: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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
