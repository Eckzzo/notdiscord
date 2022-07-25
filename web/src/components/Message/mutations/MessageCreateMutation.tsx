import { graphql } from 'relay-runtime';

const MessageCreate = graphql`
  mutation MessageCreateMutation($input: MessageCreateInput!) {
    MessageCreateMutation(input: $input) {
      newMessageEdge {
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
