import { graphql } from 'relay-runtime';

const GuildJoin = graphql`
  mutation GuildJoinMutation($input: GuildJoinInput!, $connections: [ID!]!) {
    GuildJoinMutation(input: $input) {
      error {
        field
        message
      }
      joinedGuildEdge @prependEdge(connections: $connections) {
        node {
          id
          name
        }
      }
    }
  }
`;

export { GuildJoin };
