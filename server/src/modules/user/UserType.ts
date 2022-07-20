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
import * as GuildLoader from '../guild/GuildLoader';
import { GuildConnection } from '../guild/GuildType';
import { GraphQLContext } from '../../graphql/context';
import { registerTypeLoader } from '../node/typeRegister';
import { FriendshipModel } from '../friendship/FriendshipModel';

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
		guilds: {
			type: new GraphQLNonNull(GuildConnection.connectionType),
			description: 'The guild members',
			args: { ...connectionArgs },
			resolve: async (user, args, context) => {
				return GuildLoader.loadAll(
					context,
					withFilter(args, { members: user._id })
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
					status: 1,
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
