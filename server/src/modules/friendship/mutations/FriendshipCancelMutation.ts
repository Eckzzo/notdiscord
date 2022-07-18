import { GraphQLNonNull, GraphQLID } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { errorField, getObjectId, successField } from '@entria/graphql-mongo-helpers';

import { FriendshipType } from '../FriendshipType';
import { FriendshipModel } from '../FriendshipModel';
import * as FriendshipLoader from '../FriendshipLoader';
import { GraphQLContext } from '../../../graphql/context';

interface FriendshipCancelMutationArgs {
  friendship: string;
}

const FriendshipCancelMutation = mutationWithClientMutationId({
  name: 'FriendshipCancel',
  inputFields: {
    friendship: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ friendship }: FriendshipCancelMutationArgs, context: GraphQLContext) => {
    // TODO - move this check to a middleware
    if (!context.user) {
      return {
        error: 'Unauthorized',
      };
    }

    // Only the sender should be able to cancel it
    const friendshipRequest = await FriendshipModel.findOne({
      _id: getObjectId(friendship),
      sender: context.user.id,
      // Pending Status
      status: 0,
    });

    if (!friendshipRequest) {
      return {
        error: 'Friend Request not found',
      };
    }

    await friendshipRequest.remove();

    return {
      error: null,
      id: getObjectId(friendship),
      success: 'Friend Request cancelled',
    };
  },
  outputFields: {
    friendship: {
      type: FriendshipType,
      resolve: async ({ id }, _, context) => {
        return FriendshipLoader.load(context, id);
      },
    },
    ...errorField,
    ...successField,
  },
});

export { FriendshipCancelMutation };
