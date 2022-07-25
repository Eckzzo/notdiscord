import { graphql } from 'react-relay';

const FriendshipCancel = graphql`
  mutation FriendshipCancelMutation($input: FriendshipCancelInput!, $connections: [ID!]!) {
    FriendshipCancelMutation(input: $input) {
      deletedNode {
        id @deleteEdge(connections: $connections)
      }
    }
  }
`;

export { FriendshipCancel };
