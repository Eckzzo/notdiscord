import { fromGlobalId, toGlobalId } from 'graphql-relay';
import { withFilter } from 'graphql-subscriptions';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { subscriptionWithClientId } from 'graphql-relay-subscription';

import { MessageConnection } from '../MessageType';
import { pubSub, EVENTS } from '../../../pubSub';
import { GraphQLContext } from '../../../graphql/context';
import { MessageDocument, MessageModel } from '../MessageModel';

interface MessageNew {
  messageId: string;
}

interface MessageNewSubscriptionArgs {
  location: string;
}

interface MessageNewSubscriptionPayload {
  message: MessageDocument;
}

const MessageNewSubscription = subscriptionWithClientId<MessageNew, GraphQLContext>({
  name: 'MessageNew',
  inputFields: {
    location: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    message: {
      type: MessageConnection.edgeType,
      resolve: async ({ messageId }: { messageId: string }) => {
        const message = await MessageModel.findOne({ _id: messageId });

        if (!message) {
          return null;
        }

        return {
          cursor: toGlobalId('Message', message._id),
          node: message,
        };
      },
    },
  },
  subscribe: withFilter(
    () => pubSub.asyncIterator(EVENTS.MESSAGE.NEW),
    (payload: MessageNewSubscriptionPayload, { location }: MessageNewSubscriptionArgs) => {
      const channel = fromGlobalId(location);
      return payload.message.location.equals(channel.id);
    },
  ),
});

export { MessageNewSubscription };
