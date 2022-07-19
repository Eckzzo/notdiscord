import { graphql } from 'react-relay';

const FriendshipSend = graphql`
	mutation FriendshipSendMutation(
		$input: FriendshipSendInput!
		$connections: [ID!]!
	) {
		FriendshipSendMutation(input: $input) {
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
			error {
				field
				message
			}
		}
	}
`;

export { FriendshipSend };
