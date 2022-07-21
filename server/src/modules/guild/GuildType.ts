import { globalIdField } from 'graphql-relay';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

import { withFilter, connectionArgs, objectIdResolver, connectionDefinitions } from '@entria/graphql-mongo-helpers';

import * as UserLoader from '../user/UserLoader';
import { GraphQLContext } from '../../graphql/context';
import { UserConnection, UserType } from '../user/UserType';
import { nodeInterface } from '../node/typeRegister';
import { ChannelConnection } from '../channel/ChannelType';
import * as ChannelLoader from '../channel/ChannelLoader';

import { GuildDocument } from './GuildModel';

const GuildType = new GraphQLObjectType<GuildDocument, GraphQLContext>({
  name: 'Guild',
  description: 'A guild, kinda like a discord server',
  fields: () => ({
    id: globalIdField('Guild'),
    ...objectIdResolver,
    name: {
      type: GraphQLString,
      resolve: guild => guild.name,
    },
    description: {
      type: GraphQLString,
      resolve: guild => guild.description,
    },
    owner: {
      type: new GraphQLNonNull(UserType),
      description: 'The guild owner',
      resolve: async (guild, _, context) => {
        UserLoader.load(context, guild.owner);
      },
    },
    channels: {
      type: new GraphQLNonNull(ChannelConnection.connectionType),
      description: 'The guilds channels',
      args: { ...connectionArgs },
      resolve: async (guild, args, context) => {
        return ChannelLoader.loadAll(context, withFilter(args, { guild: guild._id }));
      },
    },
    members: {
      type: new GraphQLNonNull(UserConnection.connectionType),
      description: 'The guild members',
      args: { ...connectionArgs },
      resolve: async (guild, args, context) => {
        return UserLoader.loadAll(context, withFilter(args, { guilds: guild._id }));
      },
    },
  }),
  interfaces: () => [nodeInterface],
});

const GuildConnection = connectionDefinitions({
  name: 'Guild',
  nodeType: GuildType,
});

export { GuildType, GuildConnection };
