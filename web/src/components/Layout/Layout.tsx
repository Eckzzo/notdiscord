import { styled } from '@stitches';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';

import { SideNav } from './SideNav';
import { LayoutQuery as LayoutQueryType } from '../../__generated__/LayoutQuery.graphql';

/* -------------------------------------------------------------------------------------------------
 * GraphQL
 * ----------------------------------------------------------------------------------------------- */

const LayoutQuery = graphql`
  query LayoutQuery {
    me {
      ...SideNavFragment
    }
  }
`;

/* -------------------------------------------------------------------------------------------------
 * Styled Items
 * ----------------------------------------------------------------------------------------------- */

const StyledLayout = styled('main', {
  overflow: 'hidden',
  height: '100vh',
  display: 'flex',
});

/* -------------------------------------------------------------------------------------------------
 * Layout
 * ----------------------------------------------------------------------------------------------- */

interface LayoutProps {
  queryRef: PreloadedQuery<LayoutQueryType>;
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ queryRef, children }) => {
  const data = usePreloadedQuery<LayoutQueryType>(LayoutQuery, queryRef);

  if (!data.me) {
    // TODO: Loading state
    return null;
  }

  return (
    <StyledLayout>
      <SideNav fragmentKey={data.me} />
      {children}
    </StyledLayout>
  );
};

Layout.displayName = 'Layout';

export { Layout };
