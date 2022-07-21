import { GraphQLNonNull, GraphQLID } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { errorField, getObjectId, successField } from '@entria/graphql-mongo-helpers';

import { FriendshipType } from '../FriendshipType';
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
  mutateAndGetPayload: async ({ friendship }: FriendshipDeleteMutationArgs, context: GraphQLContext) => {
    // TODO - move this check to a middleware
    if (!context.user) {
      return {
        error: 'Unauthorized',
      };
    }

    // Check if accepted friendship exists
    const friendshipToDelete = await FriendshipModel.findOne({
      _id: getObjectId(friendship),
      recipient: context.user.id,
      // Accepted Status
      status: 1,
    });

    if (!friendshipToDelete) {
      return {
        error: 'Friendship not found',
      };
    }

    await FriendshipModel.deleteOne({
      recipient: context.user.id,
      sender: friendshipToDelete.sender,
    });

    await FriendshipModel.deleteOne({
      sender: context.user.id,
      recipient: friendshipToDelete.sender,
    });

    return {
      error: null,
      success: 'Friendship Removed',
      deletedFriendship: friendshipToDelete,
    };
  },
  outputFields: {
    deletedNode: {
      type: FriendshipType,
      resolve: async ({ deletedFriendship }) => deletedFriendship,
    },
    ...errorField,
    ...successField,
  },
});

export { FriendshipDeleteMutation };
