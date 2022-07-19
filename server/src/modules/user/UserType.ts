import { globalIdField } from 'graphql-relay';
import {
	GraphQLBoolean,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from 'graphql';
import {
	connectionArgs,
	connectionDefinitions,
	objectIdResolver,
	timestampResolver,
	withFilter,
} from '@entria/graphql-mongo-helpers';

import { load } from './UserLoader';
import { UserDocument } from './UserModel';
import { GraphQLContext } from '../../graphql/context';
import { registerTypeLoader } from '../node/typeRegister';
import { FriendshipModel } from '../friendship/FriendshipModel';
import * as FriendshipLoader from '../friendship/FriendshipLoader';
import {
	FriendshipConnection,
	FriendshipConnectionArgs,
} from '../friendship/FriendshipType';
import {
	FriendshipStatusEnum,
	FriendshipTargetEnum,
} from '../friendship/FriendshipFilterInputType';

const UserType = new GraphQLObjectType<UserDocument, GraphQLContext>({
	name: 'User',
	description: 'NotDiscord user',
	fields: () => ({
		id: globalIdField('User'),
		username: {
			type: new GraphQLNonNull(GraphQLString),
			resolve: (user) => user.username,
		},
		email: {
			type: GraphQLString,
			resolve: (user) => user.email,
		},
		denominator: {
			type: new GraphQLNonNull(GraphQLString),
			resolve: (user) => user.denominator.toString().padStart(4, '0'),
		},
		avatar: {
			type: GraphQLString,
			description: 'The user avatar hash',
			resolve: (user) => user.avatar ?? null,
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
		isFriend: {
			type: new GraphQLNonNull(GraphQLBoolean),
			resolve: async (user, __, ctx) => {
				if (!ctx.user) {
					return false;
				}
				if (user._id.toString() === ctx.user?.id) {
					return true;
				}
				const friendship = await FriendshipModel.findOne({
					sender: ctx.user.id,
					receiver: user.id,
				});
				return !!friendship;
			},
		},
		...objectIdResolver,
		...timestampResolver,
	}),
});

const UserConnection = connectionDefinitions({
	name: 'User',
	nodeType: UserType,
});

registerTypeLoader(UserType, load);

export { UserType, UserConnection };
