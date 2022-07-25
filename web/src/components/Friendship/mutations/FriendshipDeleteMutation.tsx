import { graphql } from 'react-relay';

const FriendshipDelete = graphql`
  mutation FriendshipDeleteMutation($input: FriendshipDeleteInput!, $connections: [ID!]!) {
    FriendshipDeleteMutation(input: $input) {
      deletedNode {
        id @deleteEdge(connections: $connections)
      }
    }
  }
`;

export { FriendshipDelete };
