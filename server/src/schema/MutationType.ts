import { GraphQLObjectType } from 'graphql';

import { UserMutations } from '../modules/user/UserMutations';
import { FriendshipMutations } from '../modules/friendship/FriendshipMutations';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...FriendshipMutations,
  }),
});

export { MutationType };
