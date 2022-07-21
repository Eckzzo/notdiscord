import { Suspense } from 'react';
import { graphql } from 'relay-runtime';
import { useFragment } from 'react-relay';

import { Flex } from '@ui/Flex';
import { GuildItem } from './GuildItem';
import { GuildListFragment$key } from '__generated__/GuildListFragment.graphql';

const GuildListFragment = graphql`
	fragment GuildListFragment on GuildConnection {
		edges {
			node {
				id
				...GuildItemFragment
			}
		}
	}
`;

interface GuildListProps {
	fragmentKey: GuildListFragment$key;
}

const GuildList: React.FC<GuildListProps> = ({ fragmentKey }) => {
	const data = useFragment(GuildListFragment, fragmentKey);

	if (!data) {
		return null;
	}

	return (
		<Suspense>
			<Flex direction="column" gap={2}>
				{data.edges.map((edge) => {
					return <GuildItem key={edge?.node?.id} fragmentKey={edge?.node!} />;
				})}
			</Flex>
		</Suspense>
	);
};

export { GuildList };
