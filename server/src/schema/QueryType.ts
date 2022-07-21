import { fromGlobalId } from 'graphql-relay';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs, withFilter } from '@entria/graphql-mongo-helpers';

import { GraphQLContext } from '../graphql/context';
import { UserType } from '../modules/user/UserType';
import * as UserLoader from '../modules/user/UserLoader';
import * as GuildLoader from '../modules/guild/GuildLoader';
import * as ChannelLoader from '../modules/channel/ChannelLoader';
import * as FriendshipLoader from '../modules/friendship/FriendshipLoader';
import { FriendshipStatusEnum, FriendshipTargetEnum } from '../modules/friendship/FriendshipFilterInputType';
import { FriendshipConnection, FriendshipConnectionArgs } from '../modules/friendship/FriendshipType';
import { GuildType } from '../modules/guild/GuildType';
import { ChannelType } from '../modules/channel/ChannelType';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Queries',
  fields: () => ({
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
          // Load guild to get members
          const guild = await GuildLoader.load(ctx, channel.guild);
          // If member isn't part of the guild return null
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
