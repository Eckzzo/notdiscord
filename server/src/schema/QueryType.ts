import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { connectionArgs, withFilter } from '@entria/graphql-mongo-helpers';

import { GraphQLContext } from '../graphql/context';
import { UserType } from '../modules/user/UserType';
import * as UserLoader from '../modules/user/UserLoader';
import * as FriendshipLoader from '../modules/friendship/FriendshipLoader';
import {
	FriendshipStatusEnum,
	FriendshipTargetEnum,
} from '../modules/friendship/FriendshipFilterInputType';
import {
	FriendshipConnection,
	FriendshipConnectionArgs,
} from '../modules/friendship/FriendshipType';

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
			resolve: async (
				_,
				{ target, status, ...args }: FriendshipConnectionArgs,
				ctx: GraphQLContext
			) => {
				return FriendshipLoader.loadAll(
					ctx,
					withFilter(args, { status, [target]: ctx.user?._id })
				);
			},
		},
	}),
});

export { QueryType };
