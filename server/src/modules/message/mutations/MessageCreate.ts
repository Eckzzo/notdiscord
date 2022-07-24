import { GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { EVENTS, pubSub } from '../../../pubSub';
import { MessageModel } from '../MessageModel';
import * as MessageLoader from '../MessageLoader';
import { MessageConnection } from '../MessageType';
import { ChannelModel } from '../../channel/ChannelModel';
import { GraphQLContext } from '../../../graphql/context';

interface MessageCreateArgs {
  location: string;
  content: string;
}

const MessageCreateMutation = mutationWithClientMutationId({
  name: 'MessageCreate',
  description: 'Create a NotDiscord Message',
  inputFields: {
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    location: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ location, content }: MessageCreateArgs, ctx: GraphQLContext) => {
    if (!ctx.user) {
      throw new Error('Unauthorized');
    }

    const channelId = fromGlobalId(location);

    const channel = await ChannelModel.findOne({ _id: channelId.id });

    if (!channel) {
      throw new Error('Invalid Location');
    }

    const newMessage = await new MessageModel({ content, location: channel._id, sender: ctx.user._id }).save();

    if (!newMessage) {
      throw new Error('Something went wrong');
    }

    await pubSub.publish(EVENTS.MESSAGE.NEW, { id: newMessage._id, channel: newMessage.location });

    return {
      success: 'Message created!',
      id: newMessage._id,
    };
  },
  outputFields: {
    newMessageEdge: {
      type: MessageConnection.edgeType,
      resolve: async ({ id }, _, ctx) => {
        const message = await MessageLoader.load(ctx, id);

        if (!message) return null;

        return {
          cursor: toGlobalId('Message', message._id),
          node: message,
        };
      },
    },
  },
});

export { MessageCreateMutation };
