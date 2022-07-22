import { globalIdField } from 'graphql-relay';
import { GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs, connectionDefinitions, objectIdResolver, withFilter } from '@entria/graphql-mongo-helpers';

import { GraphQLContext } from '../../graphql/context';

import * as MessageLoader from '../message/MessageLoader';
import { MessageConnection } from '../message/MessageType';
import { nodeInterface, registerTypeLoader } from '../node/typeRegister';

import { load } from './ChannelLoader';
import { ChannelDocument } from './ChannelModel';

const ChannelType = new GraphQLObjectType<ChannelDocument, GraphQLContext>({
  name: 'Channel',
  description: 'A channel where messages are located',
  fields: () => ({
    id: globalIdField('Channel'),
    name: {
      type: GraphQLString,
      resolve: channel => channel.name,
    },
    description: {
      type: GraphQLString,
      resolve: channel => channel.description,
    },
    messages: {
      type: MessageConnection.connectionType,
      args: { ...connectionArgs },
      resolve: async (channel, args, ctx) => {
        return MessageLoader.loadAll(ctx, withFilter(args, { location: channel._id }));
      },
    },
    ...objectIdResolver,
  }),
  interfaces: () => [nodeInterface],
});

const ChannelConnection = connectionDefinitions({
  name: 'Channel',
  nodeType: ChannelType,
});

registerTypeLoader(ChannelType, load);

export { ChannelType, ChannelConnection };
