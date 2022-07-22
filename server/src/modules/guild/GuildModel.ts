import { v4 } from 'uuid';
import { Schema, Types, Document, model } from 'mongoose';

import { generatePasscode } from '../../utils/generatePasscode';
import { ChannelModel } from '../channel/ChannelModel';

interface IGuild {
  _id: Types.ObjectId;
  icon: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  passcode: string;
  description?: string;
  owner: Types.ObjectId;
  members: Types.ObjectId[];
  channels: Types.ObjectId[];
}

type GuildDocument = IGuild & Document;

const GuildSchema = new Schema<GuildDocument>({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
    required: true,
    default: v4(),
  },
  passcode: {
    type: String,
    required: true,
    default: generatePasscode(),
  },
  members: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
});

GuildSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  await ChannelModel.deleteMany({ guild: this._id }).exec();
  next();
});

GuildSchema.pre('deleteMany', { document: false, query: true }, async function (next) {
  const doc = await this.model.find(this.getFilter());
  const guilds = doc.map(item => item._id);
  await ChannelModel.deleteMany({ guild: { $in: guilds } });
  next();
});

const GuildModel = model<GuildDocument>('Guild', GuildSchema);

export type { GuildDocument };
export { GuildModel };
