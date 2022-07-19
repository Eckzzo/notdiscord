import { GraphQLNonNull, GraphQLID } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import {
	errorField,
	getObjectId,
	successField,
} from '@entria/graphql-mongo-helpers';

import { FriendshipModel } from '../FriendshipModel';
import { GraphQLContext } from '../../../graphql/context';

interface FriendshipDeleteMutationArgs {
	friendship: string;
}

const FriendshipDeleteMutation = mutationWithClientMutationId({
	name: 'FriendshipDelete',
	inputFields: {
		friendship: {
			type: new GraphQLNonNull(GraphQLID),
		},
	},
	mutateAndGetPayload: async (
		{ friendship }: FriendshipDeleteMutationArgs,
		context: GraphQLContext
	) => {
		// TODO - move this check to a middleware
		if (!context.user) {
			return {
				error: 'Unauthorized',
			};
		}

		// Check if accepted friendship exists
		const acceptedFriendship = await FriendshipModel.findOne({
			_id: getObjectId(friendship),
			recipient: context.user.id,
			// Accepted Status
			status: 1,
		});

		if (!acceptedFriendship) {
			return {
				error: 'Friendship not found',
			};
		}

		await FriendshipModel.deleteOne({
			recipient: context.user.id,
			sender: acceptedFriendship.sender,
		});

		await FriendshipModel.deleteOne({
			sender: context.user.id,
			recipient: acceptedFriendship.sender,
		});

		return {
			error: null,
			id: getObjectId(friendship),
			success: 'Friendship Removed',
		};
	},
	outputFields: {
		id: {
			type: GraphQLID,
			resolve: ({ id }) => toGlobalId('Friendship', id),
		},
		...errorField,
		...successField,
	},
});

export { FriendshipDeleteMutation };
