import { graphql } from 'react-relay';

const FriendshipCancel = graphql`
	mutation FriendshipCancelMutation($input: FriendshipCancelInput!) {
		FriendshipCancelMutation(input: $input) {
			id @deleteRecord
		}
	}
`;

export { FriendshipCancel };
