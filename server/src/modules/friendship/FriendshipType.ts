import { ConnectionArguments, globalIdField } from 'graphql-relay';
import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { connectionDefinitions, objectIdResolver } from '@entria/graphql-mongo-helpers';

import { UserType } from '../user/UserType';
import * as UserLoader from '../user/UserLoader';
import { GraphQLContext } from '../../graphql/context';

import { registerTypeLoader } from '../node/typeRegister';

import { FriendshipDocument } from './FriendshipModel';
import { load } from './FriendshipLoader';

interface FriendshipConnectionArgs extends ConnectionArguments {
  status: 0 | 1;
  target: 'receiver' | 'sender';
}

const FriendshipType = new GraphQLObjectType<FriendshipDocument, GraphQLContext>({
  name: 'Friendship',
  description: 'The friendship status between two users',
  fields: () => ({
    id: globalIdField('Friendship'),
    sender: {
      type: new GraphQLNonNull(UserType),
      description: 'The user that sent this friendship',
      resolve: (friendship, _, context) => UserLoader.load(context, friendship.sender),
    },
    recipient: {
      type: new GraphQLNonNull(UserType),
      description: 'The user that is the recipient of this friendship',
      resolve: (friendship, _, context) => UserLoader.load(context, friendship.recipient),
    },
    status: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The status that this friendship is',
      resolve: friendship => friendship.status,
    },
    ...objectIdResolver,
  }),
});

const FriendshipConnection = connectionDefinitions({
  name: 'Friendship',
  nodeType: FriendshipType,
});

registerTypeLoader(FriendshipType, load);

export type { FriendshipConnectionArgs };
export { FriendshipType, FriendshipConnection };
