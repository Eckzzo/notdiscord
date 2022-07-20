import { graphql } from 'relay-runtime';
import { useFragment } from 'react-relay';
import { EnvelopeClosedIcon, PlusIcon } from '@radix-ui/react-icons';

import { Flex } from '@ui/Flex';
import { styled } from '@stitches';
import { Separator } from '@ui/Separator';
import { IconButton } from '@ui/IconButton';
import { NewGuildDialog } from 'components/Guild/NewGuildDialog';

import { UserDropdownMenu } from './UserDropdownMenu';
import { SideNavFragment$key } from '../../__generated__/SideNavFragment.graphql';

/* -------------------------------------------------------------------------------------------------
 * GraphQL
 * ----------------------------------------------------------------------------------------------- */

const SideNavFragment = graphql`
	fragment SideNavFragment on User {
		guilds(first: $first) @connection(key: "SideNav_guilds", filters: []) {
			...NewGuildDialogFragment
			edges {
				node {
					id
					name
				}
			}
		}
		...UserDropdownMenuFragment
	}
`;

/* -------------------------------------------------------------------------------------------------
 * Styled Items
 * ----------------------------------------------------------------------------------------------- */

const StyledSideNav = styled('nav', {
	boxSizing: 'border-box',
	width: '72px',
	height: '100%',
	py: '$4',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	alignItems: 'center',
	borderRight: '1px solid $gray300',
});

/* -------------------------------------------------------------------------------------------------
 * SideNav
 * ----------------------------------------------------------------------------------------------- */

interface SideNavProps {
	fragmentKey: SideNavFragment$key;
}

const SideNav: React.FC<SideNavProps> = ({ fragmentKey }) => {
	const data = useFragment(SideNavFragment, fragmentKey);

	return (
		<StyledSideNav>
			<Flex direction="column" gap={4}>
				<IconButton>
					<EnvelopeClosedIcon />
				</IconButton>
				<Separator />
			</Flex>
			<Flex direction="column" gap={2}>
				{data.guilds.edges.map((edge) => {
					return (
						<IconButton key={edge?.node?.id}>
							<PlusIcon />
						</IconButton>
					);
				})}
				<NewGuildDialog fragmentKey={data.guilds}>
					<IconButton variant="tertiary">
						<PlusIcon />
					</IconButton>
				</NewGuildDialog>
			</Flex>
			<Flex direction="column" gap={4}>
				<Separator />
				{data && <UserDropdownMenu fragmentKey={data} />}
			</Flex>
		</StyledSideNav>
	);
};

SideNav.displayName = 'SideNav';

export { SideNav };
