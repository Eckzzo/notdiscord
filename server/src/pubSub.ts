import { PubSub } from 'graphql-subscriptions';

const EVENTS = {
  MESSAGE: {
    NEW: 'MESSAGE_NEW',
  },
};

const pubSub = new PubSub();

export { EVENTS, pubSub };
