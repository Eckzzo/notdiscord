import { GraphQLNonNull, GraphQLID } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import { errorField, getObjectId, successField } from '@entria/graphql-mongo-helpers';

import { FriendshipModel } from '../FriendshipModel';
import { GraphQLContext } from '../../../graphql/context';

interface FriendshipRejectMutationArgs {
  friendship: string;
}

const FriendshipRejectMutation = mutationWithClientMutationId({
  name: 'FriendshipReject',
  inputFields: {
    friendship: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ friendship }: FriendshipRejectMutationArgs, context: GraphQLContext) => {
    // TODO - move this check to a middleware
    if (!context.user) {
      return {
        error: 'Unauthorized',
      };
    }

    // Only the recipient should be able to reject it
    const friendshipRequest = await FriendshipModel.findOne({
      _id: getObjectId(friendship),
      // Pending status
      recipient: context.user.id,
      status: 0,
    });

    if (!friendshipRequest) {
      return {
        error: 'Friend Request not found',
      };
    }

    await friendshipRequest.deleteOne({ _id: friendshipRequest._id });

    return {
      error: null,
      id: getObjectId(friendship),
      success: 'Friend Request rejected',
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

export { FriendshipRejectMutation };
