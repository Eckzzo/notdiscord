import { GetServerSideProps } from 'next';

import { getToken } from '../../auth/getToken';
import { Layout } from '../../components/Layout/Layout';
import { getPreloadedQuery } from '../../relay/network';
import layoutQuery from '../../__generated__/LayoutQuery.graphql';
import { NextPageWithLayout } from '../../relay/ReactRelayContainer';
import { MeLayout } from '../../components/Layout/MeLayout';
import pageQuery, { sentQuery } from '../../__generated__/sentQuery.graphql';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';
import { SentQuery } from './sent';

interface MeProps {
	queryRefs: {
		pageQueryRef: PreloadedQuery<sentQuery>;
	};
}

const Me: NextPageWithLayout<MeProps> = ({ queryRefs }) => {
	const data = usePreloadedQuery(SentQuery, queryRefs.pageQueryRef);
	return (
		<ul>
			{data.friendships.edges.map(({ node }, index) => {
				return <li key={index}>{node.recipient.username}</li>;
			})}
		</ul>
	);
};

Me.getLayout = (page) => {
	return (
		<Layout queryRef={page.props.queryRefs.layout}>
			<MeLayout>{page}</MeLayout>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			preloadedQueries: {
				layout: await getPreloadedQuery(
					layoutQuery,
					{},
					getToken(context.req.headers)
				),
				pageQueryRef: await getPreloadedQuery(
					pageQuery,
					{
						input: { target: 'SENDER', status: 'PENDING' },
					},
					getToken(context.req.headers)
				),
			},
		},
	};
};

export default Me;
