import { graphql } from 'react-relay';

const FriendshipReject = graphql`
  mutation FriendshipRejectMutation($input: FriendshipRejectInput!) {
    FriendshipRejectMutation(input: $input) {
      id @deleteRecord
    }
  }
`;

export { FriendshipReject };
