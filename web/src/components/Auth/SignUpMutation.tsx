import { graphql } from 'react-relay';
import { SignUpMutation as SignUpMutationType } from '__generated__/SignUpMutation.graphql';

const SignUpMutation = graphql`
  mutation SignUpMutation($input: UserSignUpMutationInput!) {
    UserSignUpMutation(input: $input) {
      error {
        field
        message
      }
      me {
        id
        username
        denominator
      }
    }
  }
`;

export { SignUpMutation };
export type { SignUpMutationType };
