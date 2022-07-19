import { graphql } from 'react-relay';

const FriendshipAccept = graphql`
	mutation FriendshipAcceptMutation(
		$input: FriendshipAcceptInput!
		$connections: [ID!]!
	) {
		FriendshipAcceptMutation(input: $input) {
			id @deleteRecord
			friendshipEdge @appendEdge(connections: $connections) {
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

export { FriendshipAccept };
