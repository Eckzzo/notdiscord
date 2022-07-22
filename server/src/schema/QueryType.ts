import { fromGlobalId } from 'graphql-relay';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs, withFilter } from '@entria/graphql-mongo-helpers';

import { UserType } from '../modules/user/UserType';
import { GraphQLContext } from '../graphql/context';
import { GuildType } from '../modules/guild/GuildType';
import * as UserLoader from '../modules/user/UserLoader';
import { GuildModel } from '../modules/guild/GuildModel';
import * as GuildLoader from '../modules/guild/GuildLoader';
import { ChannelType } from '../modules/channel/ChannelType';
import * as ChannelLoader from '../modules/channel/ChannelLoader';
import { nodeField, nodesField } from '../modules/node/typeRegister';
import * as FriendshipLoader from '../modules/friendship/FriendshipLoader';
import { FriendshipConnection, FriendshipConnectionArgs } from '../modules/friendship/FriendshipType';
import { FriendshipStatusEnum, FriendshipTargetEnum } from '../modules/friendship/FriendshipFilterInputType';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Queries',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    me: {
      type: UserType,
      resolve: (_, __, ctx: GraphQLContext) => {
        return UserLoader.load(ctx, ctx.user?.id);
      },
    },
    friendships: {
      type: new GraphQLNonNull(FriendshipConnection.connectionType),
      args: {
        status: {
          type: new GraphQLNonNull(FriendshipStatusEnum),
        },
        target: {
          type: new GraphQLNonNull(FriendshipTargetEnum),
        },
        ...connectionArgs,
      },
      resolve: async (_, { target, status, ...args }: FriendshipConnectionArgs, ctx: GraphQLContext) => {
        return FriendshipLoader.loadAll(ctx, withFilter(args, { status, [target]: ctx.user?._id }));
      },
    },
    guild: {
      type: GuildType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (_, { id }, ctx) => {
        const guild = fromGlobalId(id);
        return GuildLoader.load(ctx, guild.id);
      },
    },
    channel: {
      type: ChannelType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (_, { id }, ctx) => {
        // Only users should be able to load channels
        if (!ctx.user) return null;
        const channelId = fromGlobalId(id);
        const channel = await ChannelLoader.load(ctx, channelId.id);
        if (!channel) return null;
        // If channel is a guild channel
        if (channel.channelType === 1) {
          // This shouldn't happen but doesn't hurt to do
          if (!channel.guild) return null;
          // If member isn't part of the guild return null
          // Better to use a loader and check if member is in array or use findOne?
          const guild = await GuildModel.findOne({ guild: channel.guild, members: ctx.user });
          if (!guild) {
            return null;
          }
          return channel;
        }
        // TODO: add logic to load DMs
        return null;
      },
    },
  }),
});

export { QueryType };
