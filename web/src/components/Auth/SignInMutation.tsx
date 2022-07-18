import { graphql } from 'react-relay';
import { SignInMutation as SignInMutationType } from '__generated__/SignInMutation.graphql';

const SignInMutation = graphql`
  mutation SignInMutation($input: UserSignInMutationInput!) {
    UserSignInMutation(input: $input) {
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

export { SignInMutation };
export type { SignInMutationType };
