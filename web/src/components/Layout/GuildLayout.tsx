import { Fragment } from 'react';
import { ChatBubbleIcon, PlusIcon } from '@radix-ui/react-icons';
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay';

import { Text } from '@ui/Text';
import { Flex } from '@ui/Flex';
import { SubNav } from './SubNav';
import { IconButton } from '@ui/IconButton';
import { LinkButton } from '@ui/LinkButton';
import { AddChannelDialog } from 'components/Guild/AddChannelDialog';
import { GuildLayoutQuery as GuildLayoutQueryType } from '__generated__/GuildLayoutQuery.graphql';

const GuildLayoutQuery = graphql`
	query GuildLayoutQuery($id: String!, $first: Int) {
		guild(id: $id) {
			id
			name
			channels(first: $first)
				@connection(key: "GuildConnection_channels", filters: ["guildId"]) {
				...AddChannelDialogFragment
				edges {
					node {
						id
						name
					}
				}
			}
		}
	}
`;

interface GuildLayoutProps {
	children?: React.ReactNode;
	queryRef: PreloadedQuery<GuildLayoutQueryType>;
}

const GuildLayout: React.FC<GuildLayoutProps> = ({ children, queryRef }) => {
	const data = usePreloadedQuery<GuildLayoutQueryType>(
		GuildLayoutQuery,
		queryRef
	);

	if (!data.guild) {
		return null;
	}

	const { guild } = data;

	return (
		<Fragment>
			<SubNav>
				<Flex direction="column" css={{ py: '$4', px: '$2' }} gap={2} grow>
					<Flex align="center" justify="between">
						<Text
							variant="cap"
							weight="semibold"
							css={{ px: '$3' }}
							spaced
							uppercase
						>
							Channels
						</Text>
						<AddChannelDialog guildId={guild.id} fragmentKey={guild.channels}>
							<IconButton variant="ghost" size="xs">
								<PlusIcon />
							</IconButton>
						</AddChannelDialog>
					</Flex>
					{data.guild.channels.edges.map((edge) => {
						return (
							<LinkButton
								variant="secondary"
								size="md"
								href={`/guild/${guild.id}/channel/${edge?.node?.id}`}
								key={`channel_${edge?.node?.id}`}
								isFullWidth
							>
								<ChatBubbleIcon />
								{edge?.node?.name}
							</LinkButton>
						);
					})}
				</Flex>
			</SubNav>
			{children}
		</Fragment>
	);
};

export { GuildLayout };
