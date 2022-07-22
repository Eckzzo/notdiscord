import { GraphQLObjectType } from 'graphql';

import { MessageNewSubscription } from '../modules/message/subscriptions/MessageNewSubscription';

const SubscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    MessageNewSubscription: MessageNewSubscription as any,
  },
});

export { SubscriptionType };
