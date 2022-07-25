import { useMemo } from 'react';
import { useSubscription } from 'react-relay';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { NewMessageSubscription, NewMessageSubscription$variables } from '__generated__/NewMessageSubscription.graphql';
import { MessageNew } from './NewMessageSubscription';

const useChannelSubscription = (variables: NewMessageSubscription$variables) => {
  const newMessageConfig = useMemo<GraphQLSubscriptionConfig<NewMessageSubscription>>(
    () => ({
      subscription: MessageNew,
      variables,
    }),
    [variables],
  );

  useSubscription(newMessageConfig);
};

export { useChannelSubscription };
