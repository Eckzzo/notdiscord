import { graphql } from 'relay-runtime';

const GuildCreate = graphql`
	mutation GuildCreateMutation(
		$input: GuildCreateInput!
		$connections: [ID!]!
	) {
		GuildCreateMutation(input: $input) {
			newGuildEdge @appendEdge(connections: $connections) {
				node {
					id
					name
				}
			}
		}
	}
`;

export { GuildCreate };
