import { globalIdField } from 'graphql-relay';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { objectIdResolver, timestampResolver, connectionDefinitions } from '@entria/graphql-mongo-helpers';

import { GraphQLContext } from '../../graphql/context';

import { UserType } from '../user/UserType';
import * as UserLoader from '../user/UserLoader';
import { ChannelType } from '../channel/ChannelType';
import * as ChannelLoader from '../channel/ChannelLoader';

import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

import { load } from './MessageLoader';
import { MessageDocument } from './MessageModel';

const MessageType = new GraphQLObjectType<MessageDocument, GraphQLContext>({
  name: 'Message',
  description: 'A NotDiscord Message',
  fields: () => ({
    id: globalIdField('Message'),
    content: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: message => message.content,
    },
    sender: {
      type: new GraphQLNonNull(UserType),
      resolve: async (message, _, ctx) => {
        return UserLoader.load(ctx, message.sender);
      },
    },
    location: {
      type: new GraphQLNonNull(ChannelType),
      resolve: async (message, _, ctx) => {
        return ChannelLoader.load(ctx, message.location);
      },
    },
    ...objectIdResolver,
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

const MessageConnection = connectionDefinitions({
  name: 'Message',
  nodeType: MessageType,
});

registerTypeLoader(MessageType, load);

export { MessageType, MessageConnection };
