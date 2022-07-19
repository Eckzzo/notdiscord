import { Suspense } from 'react';
import { GetServerSideProps } from 'next';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';

import { getToken } from 'auth/getToken';
import { Layout } from 'components/Layout/Layout';
import { getPreloadedQuery } from 'relay/network';
import { MeLayout } from 'components/Layout/MeLayout';
import layoutQuery from '__generated__/LayoutQuery.graphql';
import { NextPageWithLayout } from 'relay/ReactRelayContainer';
import pageQuery, {
	pending_PageQuery,
} from '__generated__/pending_PageQuery.graphql';
import { FriendshipPendingList } from 'components/Friendship/FriendshipPendingList';

const PendingQuery = graphql`
	query pending_PageQuery(
		$after: String
		$first: Int!
		$status: FriendshipStatus!
		$target: FriendshipTarget!
	) {
		...FriendshipPendingListFragment
	}
`;

interface PendingProps {
	queryRefs: {
		pageQueryRef: PreloadedQuery<pending_PageQuery>;
	};
}

const Pending: NextPageWithLayout<PendingProps> = ({ queryRefs }) => {
	const data = usePreloadedQuery<pending_PageQuery>(
		PendingQuery,
		queryRefs.pageQueryRef
	);

	if (!data) {
		return null;
	}
	return (
		<Suspense fallback="Loading...">
			<FriendshipPendingList fragmentRef={data} />
		</Suspense>
	);
};

Pending.getLayout = (page) => {
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
					{ status: 'PENDING', target: 'RECIPIENT', first: 20, after: null },
					token
				),
			},
		},
	};
};

export { PendingQuery };

export default Pending;
