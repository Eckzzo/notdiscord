import { graphql } from 'relay-runtime';

const MessageCreate = graphql`
	mutation MessageCreateMutation(
		$input: MessageCreateInput!
		$connections: [ID!]!
	) {
		MessageCreateMutation(input: $input) {
			newMessageEdge @prependEdge(connections: $connections) {
				node {
					id
					content
					createdAt
					sender {
						username
					}
				}
			}
		}
	}
`;

export { MessageCreate };
