import { graphql } from 'react-relay';

const FriendshipDelete = graphql`
	mutation FriendshipDeleteMutation($input: FriendshipDeleteInput!) {
		FriendshipDeleteMutation(input: $input) {
			id @deleteRecord
		}
	}
`;

export { FriendshipDelete };
