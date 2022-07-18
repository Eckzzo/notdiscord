import { GetServerSideProps } from 'next';

import { getToken } from '../../auth/getToken';
import { Layout } from '../../components/Layout/Layout';
import { MeLayout } from '../../components/Layout/MeLayout';
import { getPreloadedQuery } from '../../relay/network';
import pageQuery from '../../__generated__/sentQuery.graphql';
import { sentQuery } from '../../__generated__/sentQuery.graphql';
import layoutQuery from '../../__generated__/LayoutQuery.graphql';
import { NextPageWithLayout } from '../../relay/ReactRelayContainer';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { Suspense } from 'react';

const SentQuery = graphql`
  query sentQuery($input: FriendshipFilter!, $first: Int) {
    friendships(input: $input, first: $first)
      @connection(key: "FriendshipsSent_friendships") {
      __id
      edges {
        node {
          id
          recipient {
            username
          }
        }
      }
    }
  }
`;

interface SentProps {
  queryRefs: {
    pageQueryRef: PreloadedQuery<sentQuery>;
  };
}

const Sent: NextPageWithLayout<SentProps> = ({ queryRefs }) => {
  const data = usePreloadedQuery(SentQuery, queryRefs.pageQueryRef);
  return (
    <ul>
      <Suspense fallback="Loading...">
        {data.friendships.edges.map(edge => {
          return <li key={edge?.node.id}>{edge?.node?.recipient.username}</li>;
        })}
      </Suspense>
    </ul>
  );
};

Sent.getLayout = page => {
  return (
    <Layout queryRef={page.props.queryRefs.layout}>
      <MeLayout>{page}</MeLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const token = getToken(context.req.headers);
  return {
    props: {
      preloadedQueries: {
        layout: await getPreloadedQuery(layoutQuery, {}, token),
        pageQueryRef: await getPreloadedQuery(
          pageQuery,
          {
            input: { target: 'SENDER', status: 'PENDING' },
          },
          token,
        ),
      },
    },
  };
};

export { SentQuery };

export default Sent;
