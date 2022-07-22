import { GraphQLObjectType } from 'graphql';

import { UserMutations } from '../modules/user/UserMutations';
import { GuildMutations } from '../modules/guild/GuildMutations';
import { MessageMutations } from '../modules/message/MessageMutations';
import { FriendshipMutations } from '../modules/friendship/FriendshipMutations';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...GuildMutations,
    ...MessageMutations,
    ...FriendshipMutations,
  }),
});

export { MutationType };
