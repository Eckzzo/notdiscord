import { graphql } from 'react-relay';
import { UserContextFragment$key } from '../__generated__/UserContextFragment.graphql';

import { createRootContext } from './Root';

const UserContextFragment = graphql`
  fragment UserContextFragment on Query {
    me {
      id
      username
      denominator
    }
  }
`;

interface UserContextValue {
  user: UserContextFragment$key;
}

const [UserContextProvider, useUserContext] = createRootContext<UserContextValue>('UserContext');

interface UserContextProps {
  fragmentRef: UserContextFragment$key;
  children?: React.ReactNode;
}

const UserContext: React.FC<UserContextProps> = ({ fragmentRef, children }) => {
  return <UserContextProvider user={fragmentRef}>{children}</UserContextProvider>;
};

UserContext.displayName = 'UserContext';

export { UserContextFragment, UserContext, useUserContext };
