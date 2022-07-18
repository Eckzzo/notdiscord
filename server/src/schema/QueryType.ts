import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { connectionArgs, withFilter } from '@entria/graphql-mongo-helpers';

import { GraphQLContext } from '../graphql/context';
import { UserType } from '../modules/user/UserType';
import * as UserLoader from '../modules/user/UserLoader';
import * as FriendshipLoader from '../modules/friendship/FriendshipLoader';
import { FriendshipFilterInputType } from '../modules/friendship/FriendshipFilterInputType';
import { FriendshipConnection, FriendshipConnectionArgs } from '../modules/friendship/FriendshipType';

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
        input: {
          type: new GraphQLNonNull(FriendshipFilterInputType),
        },
        ...connectionArgs,
      },
      resolve: async (_, { input, ...args }: FriendshipConnectionArgs, ctx: GraphQLContext) => {
        const { status, target } = input;
        return FriendshipLoader.loadAll(ctx, withFilter(args, { status, [target]: ctx.user?._id }));
      },
    },
  }),
});

export { QueryType };
