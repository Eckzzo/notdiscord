import { Suspense } from 'react';
import NextLink from 'next/link';
import { graphql, useFragment } from 'react-relay';

import { Avatar } from '@ui/Avatar';
import { GuildItemFragment$key } from '__generated__/GuildItemFragment.graphql';

const GuildItemFragment = graphql`
	fragment GuildItemFragment on Guild {
		id
		name
	}
`;

interface GuildItemProps {
	fragmentKey: GuildItemFragment$key;
}

const GuildItem: React.FC<GuildItemProps> = ({ fragmentKey }) => {
	const data = useFragment(GuildItemFragment, fragmentKey);

	if (!data) {
		return null;
	}

	return (
		<Suspense>
			<NextLink
				key={`guild_${data.id}`}
				href={`/guild/${encodeURIComponent(data.id)}`}
			>
				<Avatar fallback={data.name} />
			</NextLink>
		</Suspense>
	);
};

export { GuildItem };
