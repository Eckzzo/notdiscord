import { GraphQLNonNull, GraphQLID } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import {
	errorField,
	getObjectId,
	successField,
} from '@entria/graphql-mongo-helpers';

import { FriendshipModel } from '../FriendshipModel';
import * as FriendshipLoader from '../FriendshipLoader';
import { FriendshipConnection } from '../FriendshipType';
import { GraphQLContext } from '../../../graphql/context';

interface FriendshipAcceptMutationArgs {
	friendship: string;
}

const FriendshipAcceptMutation = mutationWithClientMutationId({
	name: 'FriendshipAccept',
	inputFields: {
		friendship: {
			type: new GraphQLNonNull(GraphQLID),
		},
	},
	mutateAndGetPayload: async (
		{ friendship }: FriendshipAcceptMutationArgs,
		context: GraphQLContext
	) => {
		// TODO - move this check to a middleware
		if (!context.user) {
			return {
				error: 'Unauthorized',
			};
		}

		// Only the recipient should be able to accept it
		const friendshipRequest = await FriendshipModel.findOneAndUpdate(
			{
				_id: getObjectId(friendship),
				recipient: context.user.id,
				// Pending status
				status: 0,
			},
			{ status: 1 },
			{ new: true }
		);

		if (!friendshipRequest) {
			return {
				error: 'Friend Request not found',
			};
		}

		// Upsert the other 'side' of the friendship
		const acceptedFriendship = await FriendshipModel.findOneAndUpdate(
			{
				sender: context.user.id,
				recipient: friendshipRequest.sender,
				status: 0,
			},
			{ status: 1 },
			{ upsert: true, new: true }
		);

		if (!acceptedFriendship) {
			return { error: 'Something bad happened 😵‍💫' };
		}

		return {
			error: null,
			id: getObjectId(friendshipRequest),
			acceptedId: acceptedFriendship._id,
			success: 'Friend Request accepted',
		};
	},
	outputFields: {
		friendshipEdge: {
			type: FriendshipConnection.edgeType,
			resolve: async ({ acceptedId }, _, context) => {
				const friendship = await FriendshipLoader.load(context, acceptedId);

				if (!friendship) {
					return null;
				}

				return {
					cursor: toGlobalId('Friendship', friendship._id),
					node: friendship,
				};
			},
		},
		...errorField,
		...successField,
	},
});

export { FriendshipAcceptMutation };
