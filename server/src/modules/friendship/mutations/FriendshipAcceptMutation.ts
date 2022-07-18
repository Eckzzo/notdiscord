import { GraphQLNonNull, GraphQLID } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { errorField, getObjectId, successField } from '@entria/graphql-mongo-helpers';

import { FriendshipType } from '../FriendshipType';
import { FriendshipModel } from '../FriendshipModel';
import * as FriendshipLoader from '../FriendshipLoader';
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
  mutateAndGetPayload: async ({ friendship }: FriendshipAcceptMutationArgs, context: GraphQLContext) => {
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
      { new: true },
    );

    if (!friendshipRequest) {
      return {
        error: 'Friend Request not found',
      };
    }

    // Upsert the other 'side' of the friendship
    await FriendshipModel.findOneAndUpdate(
      {
        sender: context.user.id,
        recipient: friendshipRequest.sender,
        status: 0,
      },
      { status: 0 },
      { upsert: true },
    );

    return {
      error: null,
      id: friendshipRequest._id,
      success: 'Friend Request accepted',
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

export { FriendshipAcceptMutation };
