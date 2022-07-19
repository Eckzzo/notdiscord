import { Suspense } from 'react';
import { GetServerSideProps } from 'next';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';

import { getToken } from 'auth/getToken';
import { Layout } from 'components/Layout/Layout';
import { getPreloadedQuery } from 'relay/network';
import { MeLayout } from 'components/Layout/MeLayout';
import layoutQuery from '__generated__/LayoutQuery.graphql';
import { FriendList } from 'components/Friendship/FriendList';
import { NextPageWithLayout } from 'relay/ReactRelayContainer';
import pageQuery, { me_PageQuery } from '__generated__/me_PageQuery.graphql';

const MeIndexQuery = graphql`
	query me_PageQuery(
		$after: String
		$first: Int!
		$status: FriendshipStatus!
		$target: FriendshipTarget!
	) {
		...FriendListFragment
	}
`;

interface MeIndexProps {
	queryRefs: {
		pageQueryRef: PreloadedQuery<me_PageQuery>;
	};
}

const Index: NextPageWithLayout<MeIndexProps> = ({ queryRefs }) => {
	const data = usePreloadedQuery<me_PageQuery>(
		MeIndexQuery,
		queryRefs.pageQueryRef
	);

	if (!data) {
		return null;
	}
	return (
		<Suspense fallback="Loading...">
			<FriendList fragmentRef={data} />
		</Suspense>
	);
};

Index.getLayout = (page) => {
	return (
		<Layout queryRef={page.props.queryRefs.layout}>
			<MeLayout>{page}</MeLayout>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const token = getToken(context.req.headers);
	return {
		props: {
			preloadedQueries: {
				layout: await getPreloadedQuery(layoutQuery, {}, token),
				pageQueryRef: await getPreloadedQuery(
					pageQuery,
					{
						status: 'ACCEPTED',
						target: 'RECIPIENT',
						first: 20,
						after: null,
					},
					token
				),
			},
		},
	};
};

export default Index;
