import { graphql } from 'react-relay';
import { RecordSourceSelectorProxy, ROOT_ID } from 'relay-runtime';

import { connectionUpdater } from 'utils/connectionUpdater';

const FriendshipSend = graphql`
  mutation FriendshipSendMutation($input: FriendshipSendInput!) {
    FriendshipSendMutation(input: $input) {
      friendshipEdge {
        node {
          id
          status
          recipient {
            ...FriendshipCardFragment
          }
        }
      }
      success
      error {
        field
        message
      }
    }
  }
`;

const FriendshipSendUpdater = (store: RecordSourceSelectorProxy) => {
  const edge = store.getRootField('FriendshipSendMutation')?.getLinkedRecord('friendshipEdge');

  if (!edge) {
    return;
  }

  connectionUpdater({
    edge,
    store,
    parentId: ROOT_ID,
    connectionName: 'FriendshipsSent_friendships',
  });
};

export { FriendshipSend, FriendshipSendUpdater };
