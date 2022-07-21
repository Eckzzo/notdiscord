import { graphql } from 'relay-runtime';

const AddChannel = graphql`
	mutation AddChannelMutation(
		$input: GuildAddChannelInput!
		$connections: [ID!]!
	) {
		GuildAddChannelMutation(input: $input) {
			newChannelEdge @appendEdge(connections: $connections) {
				cursor
				node {
					id
					name
					description
				}
			}
		}
	}
`;

export { AddChannel };
