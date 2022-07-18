import { GetServerSideProps } from 'next';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';

import { getToken } from '../auth/getToken';
import { Layout } from '../components/Layout/Layout';
import { getPreloadedQuery } from '../relay/network';
import layoutQuery from '../__generated__/LayoutQuery.graphql';
import { NextPageWithLayout } from '../relay/ReactRelayContainer';
import homeQuery, { pagesHomeQuery } from '../__generated__/pagesHomeQuery.graphql';

interface HomeProps {
  queryRefs: {
    query: PreloadedQuery<pagesHomeQuery>;
  };
}

const HomeQuery = graphql`
  query pagesHomeQuery {
    me {
      username
    }
  }
`;

const Home: NextPageWithLayout<HomeProps> = ({ queryRefs }) => {
  const data = usePreloadedQuery(HomeQuery, queryRefs.query);
  return <h1>Very Cool Page</h1>;
};

Home.getLayout = page => {
  return <Layout queryRef={page.props.queryRefs.layout}>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      preloadedQueries: {
        query: await getPreloadedQuery(homeQuery, {}, getToken(context.req.headers)),
        layout: await getPreloadedQuery(layoutQuery, {}, getToken(context.req.headers)),
      },
    },
  };
};

export default Home;
