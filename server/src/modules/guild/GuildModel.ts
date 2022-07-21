import { v4 } from 'uuid';
import { Schema, Types, Document, model } from 'mongoose';

interface IGuild {
  _id: Types.ObjectId;
  icon: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
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
  members: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
});

const GuildModel = model<GuildDocument>('Guild', GuildSchema);

export type { GuildDocument };
export { GuildModel };
