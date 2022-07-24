import { fromGlobalId, toGlobalId } from 'graphql-relay';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { subscriptionWithClientId } from 'graphql-relay-subscription';
import { withFilter } from 'graphql-subscriptions';

import { MessageConnection } from '../MessageType';
import { pubSub, EVENTS } from '../../../pubSub';
import { GraphQLContext } from '../../../graphql/context';
import * as MessageLoader from '../MessageLoader';

interface MessageNew {
  id: string;
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
      resolve: async ({ id }, _, context) => {
        const node = await MessageLoader.load(context, id);
        if (!node) {
          return null;
        }

        return {
          node,
          cursor: toGlobalId('Message', node._id),
        };
      },
    },
  },
  subscribe: withFilter(
    () => {
      return pubSub.asyncIterator(EVENTS.MESSAGE.NEW);
    },
    (v, _, c) => {
      // we dont talk about this
      return v.channel.equals(fromGlobalId(c.variableValues.input.location).id);
    },
  ),
  getPayload: ({ id }: MessageNew) => {
    return {
      id: id,
    };
  },
});

export { MessageNewSubscription };
