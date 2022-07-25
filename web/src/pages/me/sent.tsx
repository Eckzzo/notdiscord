import React, { Suspense } from 'react';
import { GetServerSideProps } from 'next';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';

import { getToken } from 'auth/getToken';
import { Layout } from 'components/Layout/Layout';
import { getPreloadedQuery } from 'relay/network';
import { MeLayout } from 'components/Layout/MeLayout';
import pageQuery from '__generated__/sent_PageQuery.graphql';
import layoutQuery from '__generated__/LayoutQuery.graphql';
import { NextPageWithLayout } from 'relay/ReactRelayContainer';
import { sent_PageQuery } from '__generated__/sent_PageQuery.graphql';
import { FriendshipSentList } from 'components/Friendship/FriendshipSentList';

const SentQuery = graphql`
  query sent_PageQuery($after: String, $first: Int!, $status: FriendshipStatus!, $target: FriendshipTarget!) {
    ...FriendshipSentListFragment
  }
`;

interface SentProps {
  queryRefs: {
    pageQueryRef: PreloadedQuery<sent_PageQuery>;
  };
}

const Sent: NextPageWithLayout<SentProps> = ({ queryRefs }: SentProps) => {
  const data = usePreloadedQuery<sent_PageQuery>(SentQuery, queryRefs.pageQueryRef);

  if (!data) {
    return null;
  }
  return (
    <Suspense fallback='Loading...'>
      <FriendshipSentList fragmentRef={data} />
    </Suspense>
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
        layout: await getPreloadedQuery(layoutQuery, { first: 10 }, token),
        pageQueryRef: await getPreloadedQuery(
          pageQuery,
          { status: 'PENDING', target: 'SENDER', first: 20, after: null },
          token,
        ),
      },
    },
  };
};

export { SentQuery };

export default Sent;
