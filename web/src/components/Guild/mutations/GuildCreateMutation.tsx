import { graphql } from 'relay-runtime';

const GuildCreate = graphql`
  mutation GuildCreateMutation($input: GuildCreateInput!, $connections: [ID!]!) {
    GuildCreateMutation(input: $input) {
      newGuildEdge @prependEdge(connections: $connections) {
        node {
          id
          name
        }
      }
    }
  }
`;

export { GuildCreate };
