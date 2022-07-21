import { graphql } from 'relay-runtime';
import { GetServerSideProps } from 'next';
import { PreloadedQuery, usePreloadedQuery } from 'react-relay';

import { Layout } from 'components/Layout/Layout';
import { GuildLayout } from 'components/Layout/GuildLayout';
import { NextPageWithLayout } from 'relay/ReactRelayContainer';
import layoutQuery, { LayoutQuery } from '__generated__/LayoutQuery.graphql';
import nestedLayoutQuery, {
	GuildLayoutQuery,
} from '__generated__/GuildLayoutQuery.graphql';

import { getToken } from 'auth/getToken';
import { getPreloadedQuery } from 'relay/network';
import { Heading } from '@ui/Heading';
import pageQuery, {
	Gid_GuildQuery,
} from '__generated__/Gid_GuildQuery.graphql';
import { Flex } from '@ui/Flex';
import { Highlight } from '@ui/Highlight';
import { Text } from '@ui/Text';
import { Header } from '@ui/Header';
import { Separator } from '@ui/Separator';

const GuildQuery = graphql`
	query Gid_GuildQuery($id: String!) {
		guild(id: $id) {
			id
			name
			description
		}
	}
`;

interface GuildProps {
	queryRefs: {
		layoutQuery: PreloadedQuery<LayoutQuery>;
		pageQuery: PreloadedQuery<Gid_GuildQuery>;
		nestedLayoutQuery: PreloadedQuery<GuildLayoutQuery>;
	};
}

const Guild: NextPageWithLayout<GuildProps> = ({ queryRefs }) => {
	const data = usePreloadedQuery(GuildQuery, queryRefs.pageQuery);

	if (!data || !data.guild) {
		return null;
	}

	const { guild } = data;

	return (
		<Flex direction="column" grow>
			<Header>
				<Flex align="center" gap={3}>
					<Text variant="p3" weight="semibold">
						{guild.name}
					</Text>
					<Separator orientation="vertical" />
					<Text color="lowContrast">{guild.description}</Text>
				</Flex>
			</Header>
			<Flex direction="column" align="center" justify="center" gap={1} grow>
				<Heading variant="h4">
					Welcome to <Highlight color="violet">{guild.name}</Highlight>
				</Heading>
				<Text variant="p2" color="lowContrast">
					Choose a Channel and start chatting!
				</Text>
			</Flex>
		</Flex>
	);
};

Guild.getLayout = (page) => {
	return (
		<Layout queryRef={page.props.queryRefs.layoutQuery}>
			<GuildLayout queryRef={page.props.queryRefs.nestedLayoutQuery}>
				{page}
			</GuildLayout>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const token = getToken(context.req.headers);

	// If user isn't logged in redirect
	if (!token) {
		return {
			redirect: {
				permanent: false,
				destination: '/auth/signin',
			},
			props: {},
		};
	}

	const id = context.params?.gid as string;

	if (!id) {
		return {
			redirect: {
				permanent: false,
				destination: '/404',
			},
			props: {},
		};
	}

	return {
		props: {
			preloadedQueries: {
				pageQuery: await getPreloadedQuery(pageQuery, { id }, token),
				layoutQuery: await getPreloadedQuery(layoutQuery, { first: 10 }, token),
				nestedLayoutQuery: await getPreloadedQuery(
					nestedLayoutQuery,
					{
						id,
						first: null,
					},
					token
				),
			},
		},
	};
};

export default Guild;
