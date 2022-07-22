import { graphql } from 'react-relay';

const MessageNew = graphql`
	subscription NewMessageSubscription(
		$input: MessageNewInput!
		$connections: [ID!]!
	) {
		MessageNewSubscription(input: $input) {
			message @prependEdge(connections: $connections) {
				node {
					...MessageFragment
				}
			}
		}
	}
`;

export { MessageNew };
