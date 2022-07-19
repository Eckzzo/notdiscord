import { GraphQLNonNull, GraphQLString } from 'graphql';
import { successField } from '@entria/graphql-mongo-helpers';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { UserModel } from '../../user/UserModel';
import { FriendshipModel } from '../FriendshipModel';
import * as FriendshipLoader from '../FriendshipLoader';
import { fieldError } from '../../../utils/fieldError';
import { FriendshipConnection } from '../FriendshipType';
import { GraphQLContext } from '../../../graphql/context';
import { FieldErrorField } from '../../field-error/FieldErrorField';
import { stringToUserQuery } from '../../../utils/stringToUserQuery';

interface FriendshipSendMutationArgs {
	username: string;
}

const FriendshipSendMutation = mutationWithClientMutationId({
	name: 'FriendshipSend',
	inputFields: {
		username: {
			type: new GraphQLNonNull(GraphQLString),
		},
	},
	mutateAndGetPayload: async (
		{ username }: FriendshipSendMutationArgs,
		context: GraphQLContext
	) => {
		// TODO - move this check to a middleware
		if (!context.user) {
			return fieldError('username', 'Unauthorized');
		}

		// Check if user is trying to friend himself
		// TODO: Probably could use a better check here
		if (username === `${context.user.username}#${context.user.denominator}`) {
			return fieldError('username', 'User not found');
		}

		// Convert username input into a object with a username and denominator
		const findUserParams = stringToUserQuery(username);

		if (!findUserParams) {
			return fieldError('username', 'Invalid username');
		}

		// Check if the provided user exists
		const user = await UserModel.findOne({ ...findUserParams });

		if (!user) {
			return fieldError('username', 'User not found');
		}

		// Check if accepted friendship already exists between users
		const friendship = await FriendshipModel.findOne({
			sender: context.user.id,
			recipient: user._id,
			// Accepted
			status: 1,
		});

		if (friendship) {
			return fieldError(
				'username',
				`You're already friends with user ${username}`
			);
		}

		// Upsert new friendship, since if there's a pending request we don't care
		const newFriendship = await FriendshipModel.findOneAndUpdate(
			{
				recipient: user._id,
				sender: context.user.id,
				status: 0,
			},
			{},
			{ upsert: true, new: true }
		);

		// Something bad happened 😨
		if (!newFriendship) {
			return fieldError(
				'username',
				'Something went wrong... Please try again later'
			);
		}

		return {
			error: null,
			id: newFriendship._id,
			success: `Friend Request sent to ${username}`,
		};
	},
	outputFields: {
		friendshipEdge: {
			type: FriendshipConnection.edgeType,
			resolve: async ({ id }, _, context) => {
				const friendship = await FriendshipLoader.load(context, id);

				if (!friendship) {
					return null;
				}

				return {
					cursor: toGlobalId('Friendship', friendship._id),
					node: friendship,
				};
			},
		},
		...successField,
		...FieldErrorField,
	},
});

export { FriendshipSendMutation };
