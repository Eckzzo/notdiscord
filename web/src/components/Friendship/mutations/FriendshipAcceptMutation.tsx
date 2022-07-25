import { graphql } from 'react-relay';
import { RecordSourceSelectorProxy, ROOT_ID } from 'relay-runtime';
import { connectionDeleteEdgeUpdater } from 'utils/connectionDeleteEdgeUpdater';
import { connectionUpdater } from 'utils/connectionUpdater';

const FriendshipAccept = graphql`
  mutation FriendshipAcceptMutation($input: FriendshipAcceptInput!) {
    FriendshipAcceptMutation(input: $input) {
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
      error
    }
  }
`;

const FriendshipAcceptUpdater = (nodeId: string) => (store: RecordSourceSelectorProxy) => {
  const edge = store.getRootField('FriendshipAcceptMutation')?.getLinkedRecord('friendshipEdge');

  if (!edge) {
    return;
  }

  connectionUpdater({
    store,
    parentId: ROOT_ID,
    connectionName: 'FriendList_friendships',
    edge,
  });

  connectionDeleteEdgeUpdater({
    store,
    parentId: ROOT_ID,
    connectionName: 'FriendshipsPending_friendships',
    nodeId,
  });
};

export { FriendshipAccept, FriendshipAcceptUpdater };
